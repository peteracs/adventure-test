import NextAuth from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";

export default NextAuth({
  // Configure Twitch provider
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
    }),
  ],
  // We handle login on main page
  pages: {
    signIn: "/",
  },

  // Add Bearer token to the session
  callbacks: {
    async jwt(response) {
      // Initial signin
      if (response.account && response.profile) {
        response.token.access_token = response.account.access_token;
        response.token.refresh_token = response.account.refresh_token;
        response.token.access_token_expires = response.account.expires_at;
        response.token.client_id = response.profile.aud;
      }
      return response.token;
    },
    async session({ session, token, user }) {
      // Append these values to the session
      session.access_token = token.access_token; // Add bearer token to session
      session.access_token_expires = token.access_token_expires; // Add access token expires
      session.refresh_token = token.refresh_token; // Add access refresh token
      session.uid = token.sub; // Add user id to session
      session.client_id = token.client_id; // Add twitch client_id to session

      // Refresh token strategy
      const now = Math.round(+new Date() / 1000); // 10 digits timestamp
      if (now > session.access_token_expires) {
        return refreshAccessToken(session);
      }

      // Return normal session strategy
      return session;
    },
  },
});

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  try {
    const url =
      "https://id.twitch.tv/oauth2/token?" +
      new URLSearchParams({
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      access_token_expires: +refreshedTokens.expires_at,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
