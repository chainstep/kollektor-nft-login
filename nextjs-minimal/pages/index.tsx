import { useSession, signIn, signOut } from "next-auth/react";
import LoginView from "../components/login";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div id="main">
      {status === "authenticated" ? (
        <section>
          <h1>You are Logged In</h1>
          <a onClick={() => signOut()}>Log out</a>
        </section>
      ) : (
        <LoginView siteTitle="Minimal NFT Kollektor.io OAuth Demo" />
      )}
    </div>
  );
}
