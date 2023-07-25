import React, { useState } from "react";
import math from "mathjs";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import HistoryForUser from "./HistoryForUser";

const Calculator = () => {
  const [result, setResult] = useState<string>("");
  const [expression, setExpression] = useState<string>("");

  const handleButtonClick = (input: string) => {
    setResult((prevValue) => prevValue + input);
  };

  const { mutate } = api.calculatorHistory.create.useMutation({});
  const handleEquals = () => {
    try {
      // const ans: any = Math.round(eval(result) * 1000) / 1000;
      const ans: unknown = eval(result);
      setResult(String(ans));
      setExpression(result + "=");
    } catch (error) {
      // Handle the error if the expression is invalid
      toast.error("Invalid expression");
      // setResult("Error");
    }
  };

  const handleClear = () => {
    setResult("");
    setExpression("");
  };

  const handleNum = (x: string) => {
    setResult((prevValue) => prevValue + x);
    setExpression("");
  };
  // function evaluateExpression(expression: string): string {
  //   try {
  //     console.log("***********", expression);
  //     console.log("***********", typeof expression);
  //     console.log("***********", math.evaluate(expression));
  //     return "4+3";
  //   } catch (error) {
  //     console.error("Error while evaluating expression:", error);
  //     return "3+3";
  //   }
  // }

  return (
    <div className="max-w-lg bg-gray-100 p-4">
      <input type="text" id="expression" value={expression} readOnly className="w-full rounded bg-white p-2 text-right text-gray-500" />
      <input type="text" id="result" value={result} readOnly className="w-full rounded bg-white p-2 text-right" />
      <div className="mt-1 grid grid-cols-4 gap-1">
        <button onClick={() => handleClear()} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          AC
        </button>
        <button onClick={() => setResult((prev) => prev.slice(0, -1))} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          DE
        </button>
        <button onClick={() => setResult((prevValue) => prevValue + ".")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          .
        </button>
        <button onClick={() => setResult((prevValue) => prevValue + "/")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          /
        </button>
      </div>
      <div className="mt-1 grid grid-cols-4 gap-1">
        <button onClick={() => handleNum("7")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          7
        </button>
        <button onClick={() => handleNum("8")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          8
        </button>
        <button onClick={() => handleNum("9")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          9
        </button>
        <button onClick={() => setResult((prevValue) => prevValue + "+")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          +
        </button>
      </div>
      <div className="mt-1 grid grid-cols-4 gap-1">
        <button onClick={() => handleNum("4")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          4
        </button>
        <button onClick={() => handleNum("5")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          5
        </button>
        <button onClick={() => handleNum("6")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          6
        </button>
        <button onClick={() => setResult((prevValue) => prevValue + "-")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          -
        </button>
      </div>
      <div className="mt-1 grid grid-cols-4 gap-1">
        <button onClick={() => handleNum("1")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          1
        </button>
        <button onClick={() => handleNum("2")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          2
        </button>
        <button onClick={() => handleNum("3")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          3
        </button>
        <button onClick={() => setResult((prevValue) => prevValue + "*")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          *
        </button>
      </div>

      <div className="mt-1 grid grid-cols-4 gap-1">
        <button onClick={() => handleNum("00")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          00
        </button>
        <button onClick={() => handleNum("0")} className="col-span-1 rounded bg-blue-500 p-4 text-white shadow-md shadow-slate-400 hover:bg-blue-400">
          0
        </button>
        <button onClick={() => handleEquals()} className="col-span-2 rounded bg-green-500 p-4 text-white">
          =
        </button>
      </div>
      <HistoryForUser userId="abc" setResult={setResult} setExpression={setExpression} />
    </div>
  );
};

export default Calculator;
