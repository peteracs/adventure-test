import Head from "next/head"; // Head section
import styles from "../styles/Home.module.css"; // Basic next.js style
import { getSession, useSession } from "next-auth/react"; // Setup session
import Navbar from "../components/flowbite/Navbar";
import Home from "./index";
import FollowersTable from "../components/FollowersTable";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [followers, setFollowers] = useState({ total: 0, data: [] });

  useEffect(() => {
    if (!session) return;
    async function fetchFollowers() {
      const headers = [
        ["Authorization", "Bearer " + session.access_token],
        ["Client-Id", session.client_id],
      ];
      const res = await fetch(
        `https://api.twitch.tv/helix/users/follows?to_id=${session.uid}&first=50`,
        {
          headers,
        }
      );
      try {
        const followers = await res.json();
        if (followers.data) {
          setFollowers(followers);
        }
      } catch (e) {
        console.log(e);
        return {};
      }
    }
    fetchFollowers();
  }, []);

  if (!session) return <Home />;

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Assignment</title>
          <meta name="description" content="Assignment" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />
        <main className={styles.main}></main>
        <h1 className="text-5xl font-bold pb-5">Statistics</h1>
        <p>
          Followers: <span>{followers?.total}</span>
        </p>
        <FollowersTable followers={followers.data} />
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
