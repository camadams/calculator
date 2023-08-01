import { SignIn, SignInButton, SignOutButton, clerkClient, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import Calculator from "~/components/Calculator";
import HistoryForUser from "~/components/HistoryForUser";
import { RouterOutputs, api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";

interface abc {
  firstName: string;
}

export default function Home() {
  // const user = useUser();
  type Hist = RouterOutputs["calculatorHistory"]["getAll"][number];
  const { data, isLoading, error } = api.calculatorHistory.getAll.useQuery({ userId: "hi" });
  // const byUserId = api.calculatorHistory.getHistByUserId.useQuery({ userId: "user_2SkyEypAywRHAoEYxRkJlaDSDXw" });

  // const users = clerkClient.users.getUser("hi");
  // users.then((e)=>{});
  // console.log("****** user.user.id in index.tsx: ", users.get[0].get);
  // console.log("****** user.user.id in index.tsx: ", user);
  // console.log("^&^&^&^&^&^&^ user signed in?: " + (user.isSignedIn === true ? "tr" : "fal"));
  // console.log("^&^&^&^&^&^&^ user.user.username: ", user.user?.username);
  // console.log("^&^&^&^&^&^&^ user.user.id: ", user.user?.id);
  return (
    <>
      {/* <div>
        {!user.isSignedIn && <SignInButton />}
        {user.isSignedIn && (
          <>
            <SignOutButton />
            <div>HI:{"user signed in?: " + (user.isSignedIn === true ? "tr" : "fal")}</div>
            <div>{user.user.username}</div>
            <div>{user.user.id}</div>
            <Calculator userId={user.user.id} />
          </>
        )}
      </div> */}

      <div>
        All below:
        {isLoading ? <div>loading</div> : data?.map((hist) => <div key={hist.id}>{hist.content}</div>)}
        <div>{error?.message}</div>
      </div>
      <AuthShowcase />
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.calculatorHistory.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20" onClick={sessionData ? () => void signOut() : () => void signIn()}>
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
