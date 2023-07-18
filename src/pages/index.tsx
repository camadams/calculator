import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();
  const { data } = api.calculatorHistory.getAll.useQuery();
  console.log("*********", data);
  return (
    <>
      <div>
        {!user.isSignedIn && <SignInButton />}
        {!!user.isSignedIn && <SignOutButton />}
      </div>
      <div>
        {data?.map((hist) => (
          <div key={hist.id}> {hist.content}</div>
        ))}
      </div>
    </>
  );
}
