import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import Calculator from "~/components/Calculator";
import HistoryForUser from "~/components/HistoryForUser";
import { RouterOutputs, api } from "~/utils/api";

interface abc {
  firstName: string;
}

export default function Home() {
  const user = useUser();
  type Hist = RouterOutputs["calculatorHistory"]["getAll"][number];
  const { data, isLoading, error } = api.calculatorHistory.getAll.useQuery();
  const byUserId = api.calculatorHistory.getHistByUserId.useQuery({ userId: "user_2SkyEypAywRHAoEYxRkJlaDSDXw" });

  // console.log("****** user.user.id in index.tsx: ", user.user?.id);
  return (
    <>
      <div>
        {!user.isSignedIn && <SignInButton />}
        {!!user.isSignedIn && <SignOutButton />}
        <Calculator />
        {!!user.isSignedIn}
      </div>

      <div>
        All below:
        {isLoading ? (
          <div>loading</div>
        ) : (
          data?.map(({ hist, user }) => (
            <div key={hist.id}>
              {hist.content} - {user.username}
            </div>
          ))
        )}
        <div>{error?.message}</div>
      </div>
    </>
  );
}
