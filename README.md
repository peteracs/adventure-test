This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Tech used
- Next.js 
- TailwindCSS
- NextAuth.js with TwitchProvider

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Setup environment
- Copy .env.local.example to .env.local
- Edit .env.local and setup NEXTAUTH_URL like http://localhost:3000

### Generate hash 
- Run openssl rand -base64 32
- Add your hash to NEXTAUTH_SECRET

## Setup Twitch authentication
- Setup TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET

- You can get the credentials after setting up an application at https://dev.twitch.tv/console/apps

Make sure you restart the next.js server after updating your .env file