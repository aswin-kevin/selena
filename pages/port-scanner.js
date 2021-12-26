import { FaAngleRight } from "react-icons/fa";
import Targets from "../components/port-scan/Targets";
import Results from "../components/port-scan/Results";

const PortScanner = () => {
  return (
    <div className="flex flex-col gap-3 mt-5 ml-5">
      <div className="flex flex-row gap-2">
        <div className="rounded-2xl text-gray-700 bg-gray-200 p-1">
          <FaAngleRight size="20" />
        </div>
        <div className="text-xl font-bold text-center">Network Scanner</div>
      </div>
      <Targets />
      <Results />
    </div>
  );
};

export default PortScanner;
