import { useState } from "react";

const Targets = () => {
  const [ipVal, setIpVal] = useState("");
  const [portVal, setPortVal] = useState("");

  const sliceIntoChunks = (arr, chunkSize) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };

  const GetValues = () => {
    let ipArr = [];
    let ipString = ipVal;

    for (const iterator of ipString.split("\n")) {
      for (const key in iterator.trim().split(",")) {
        ipArr.push(key);
      }
    }

    let portArr = [];
    let portString = portVal;

    for (const iterator of portString.split(",")) {
      for (const key in iterator.trim().split(",")) {
        portArr.push(key);
      }
    }

    // ipArr = [...new Set(ipArr)];
    // portArr = [...new Set(portArr)];

    console.log(`IP value is : ${ipArr.length}`);
    console.log(`Port value is : ${portArr.length}`);

    console.log(sliceIntoChunks(ipArr, 3));
  };

  const onIpChange = (event) => {
    event.preventDefault();
    setIpVal(event.target.value);
  };

  const onPortChange = (event) => {
    event.preventDefault();
    setPortVal(event.target.value);
  };

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      <div className="row-span-3 ml-9">
        <div className="text-xs mb-1 font-mono text-gray-800">TARGET IPs</div>
        <textarea
          value={ipVal}
          onChange={onIpChange}
          className="text-sm p-1 outline-none h-40 w-128 border-[1.5px] border-blue-400 rounded-md"
          placeholder="Example : 192.34.56.15,192.45.32.89 or 164.78.97.10/18 (comma separated or line by line)"
        ></textarea>
      </div>
      <div className="col-span-2 ml-4">
        <div className="text-xs mb-1 font-mono text-gray-800">TARGET PORTS</div>
        <textarea
          value={portVal}
          onChange={onPortChange}
          className="text-sm p-1 outline-none h-10 w-128 border-[1.5px] border-blue-400 rounded-md"
          placeholder="Example : 80-120 or 80,8080,443 (comma separated or hyphen)"
        ></textarea>
      </div>
      <div className="row-span-2 col-span-2 ml-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-gray-600"
              />
              <span className="ml-2 text-gray-700">No Ping (-Pn)</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-gray-600"
              />
              <span className="ml-2 text-gray-700">SYN Scan (-sS)</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-gray-600"
              />
              <span className="ml-2 text-gray-700">Random Agent</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-gray-600"
              />
              <span className="ml-2 text-gray-700">Top 100 Ports</span>
            </label>
          </div>
          <div className="col-span-2 justify-self-center">
            <button
              onClick={GetValues}
              className="bg-blue-600 text-white rounded-md px-2 py-1 font-semibold text-sm shadow-lg shadow-blue-200"
            >
              Launch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Targets;
