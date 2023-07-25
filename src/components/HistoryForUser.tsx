import { toast } from "react-hot-toast";
import { RouterOutputs, api } from "~/utils/api";

// type PostWithUser = RouterOutputs["calculatorHistory"]["getHistByUserId"][number];
interface abc {
  userId: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  setExpression: React.Dispatch<React.SetStateAction<string>>;
}

type Hist = RouterOutputs["calculatorHistory"]["getHistByUserId"][number];

const handleHistoryClick = (hist: Hist, setResult: React.Dispatch<React.SetStateAction<string>>, setExpression: React.Dispatch<React.SetStateAction<string>>) => {
  const equation = hist.content;
  const equationParts = equation.split("=");
  const result = equationParts[1];
  const expression = equationParts[0];
  if (result === undefined || expression === undefined) {
    toast.error("This equation is invalid");
    return;
  }
  setResult(result);
  setExpression(expression);
};

const HistoryForUser = (props: abc) => {
  // const { data, isLoading } = api.calculatorHistory.getByUserId.useQuery();
  const { data, isLoading } = api.calculatorHistory.getHistByUserId.useQuery({ userId: "user_2SkyEypAywRHAoEYxRkJlaDSDXw" });
  // const b = api.calculatorHistory.getAll.useQuery();

  //   const { data, isLoading } = api.calculatorHistory.getAll.useQuery();
  //   if (isLoading) return <div>loading</div>;
  console.log("getByUserId data in HistoryForUser component:", data);
  return (
    <div>
      <div>
        {isLoading ? (
          <div>load for user</div>
        ) : (
          data?.map((hist) => (
            <div className="hover:bg-slate-200" key={hist.id} onClick={() => handleHistoryClick(hist, props.setResult, props.setExpression)}>
              {hist.content} : {hist.createdAt.getDate()}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryForUser;
