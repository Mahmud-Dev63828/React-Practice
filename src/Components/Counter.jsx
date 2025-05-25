import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, reset } from "../Features/slice/counterSlice";
const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <h1 className="text-4xl font-bold text-gray-800">{count}</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => dispatch(increment())}
          className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
