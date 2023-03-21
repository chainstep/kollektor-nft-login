import { signIn } from "next-auth/react";

interface LoginViewProps {
  siteTitle: string;
}

export default function LoginView({ siteTitle }: LoginViewProps) {
  return (
    <section style={{ height: "70vh" }} className="grid place-items-center">
      <div className="max-w-md p-6 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome to {siteTitle}!
        </h2>
        <br />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          You are currently not authenticated. Click the login button to get
          started!
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          In this example, you can login with a github account, or with a
          kollektor NFT.
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          To test the Kollektor login, go to{" "}
          <a href="https://app.kollektor.io/api/payment/create-buy-nft-checkout/?nftId=f47f0e4d-fd08-47a7-bb8e-00c4a5b2bf0b&ownerId=8aef3bcc-0f25-41e2-ba4e-fb58b06dd6b3">
            kollektor.io
          </a>{" "}
          and add an NFT to your kollektor account.
        </p>
        <button
          type="button"
          onClick={() => signIn()}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Login
        </button>
      </div>
    </section>
  );
}
