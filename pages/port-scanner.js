import { FaAngleRight } from "react-icons/fa";

const PortScanner = () => {
  return (
    <div className="flex flex-col gap-3 mt-5 ml-5">
      <div className="flex flex-row gap-2">
        <div className="rounded-2xl text-gray-700 bg-gray-200 p-1">
          <FaAngleRight size="20" />
        </div>
        <div className="text-xl font-bold text-center">Network Scanner</div>
      </div>

      <textarea
        className="text-sm p-1 ml-8 outline-none h-40 w-128 border-[1.5px] border-blue-400 rounded-md"
        placeholder="192.34.56.15,192.45.32.89 or 164.78.97.10/18"
      ></textarea>
    </div>
  );
};

export default PortScanner;
