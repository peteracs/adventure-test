import styles from "../styles/Home.module.css"; // Basic next.js style
import Head from "next/head"; // Head section
import { useRouter } from "next/router"; // Router to have access to GET parameters sent back by Twitch
import { getCsrfToken, getSession, useSession } from "next-auth/react"; // Get Twitch provider and CSRF token from next-auth
import Navbar from "../components/flowbite/Navbar"; // Navbar from Tailwind CSS Flowbite
import Error from "../components/flowbite/Error"; // Error from Tailwind CSS Flowbite
import { useEffect, useState } from "react"; // Setting CSRF token
import Dashboard from "./dashboard"; // Error component

export default function Home() {
  const { data: session } = useSession();
  const [csrfToken, setCsrfToken] = useState(""); // Setup CSRF token for logging in
  const { error } = useRouter().query; // Get Twitch error response from GET parameters
  useEffect(() => {
    if (session) return;
    // Set CSRF token for login
    const fetchCsrf = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };
    fetchCsrf().catch(console.error);
  }, []);

  if (session) return <Dashboard />;

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Assignment</title>
          <meta name="description" content="Assignment" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />
        {error && (
          <Error message="Please check console for more information!" />
        )}
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to the assignment!</h1>
          <p className={styles.description}>Get started by logging in!</p>
          <form action="/api/auth/signin/twitch" method="POST">
            <input type="hidden" name="callbackUrl" value="/dashboard" />
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Login
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
