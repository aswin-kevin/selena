import { FaAngleRight } from "react-icons/fa";

const Dns = () => {
  return (
    <div className="mt-5 ml-5">
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="rounded-2xl text-gray-700 bg-gray-200 p-1">
          <FaAngleRight size="20" />
        </div>
        <div className="text-xl font-bold text-center">DNS Resolver</div>
      </div>
    </div>
  );
};

export default Dns;
