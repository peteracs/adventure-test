import "../styles/globals.css"; // import TailwindCSS
import { SessionProvider } from "next-auth/react"; // expose useSession in the app

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
