import { RouterOutputs, api } from "~/utils/api";

// type PostWithUser = RouterOutputs["calculatorHistory"]["getHistByUserId"][number];
interface abc {
  xxx: string;
}

const HistoryForUser = (props: abc) => {
  // const { data, isLoading } = api.calculatorHistory.getByUserId.useQuery();
  const { data, isLoading } = api.calculatorHistory.getHistByUserId.useQuery({ userId: "user_2SkyEypAywRHAoEYxRkJlaDSDXw" });
  // const b = api.calculatorHistory.getAll.useQuery();

  //   const { data, isLoading } = api.calculatorHistory.getAll.useQuery();
  //   if (isLoading) return <div>loading</div>;
  console.log("getByUserId data in HistoryForUser component:", data);
  return (
    <div>
      <div>{isLoading ? <div>load for user</div> : data?.map((hist) => <div key={hist.id}>{hist.content}</div>)}</div>
    </div>
  );
};

export default HistoryForUser;
