import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "./Store";

const Counter = () => {
  const dispatch = useDispatch();
  const counterVal = useSelector((state) => state.counter.counter);
  const addCounter = () => {
    dispatch(counterActions.increaseOne());
  };
  return (
    <div className="flex flex-row gap-4 mt-5">
      <span className="px-2 rounded-md border-2 border-black">
        {counterVal}
      </span>
      <button
        onClick={addCounter}
        className="px-2 rounded-md bg-red-600 text-white font-semibold"
      >
        ADD
      </button>
    </div>
  );
};

export default Counter;
