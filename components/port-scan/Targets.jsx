const Targets = () => {
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      <div className="row-span-3 ml-9">
        <div className="text-xs mb-1 font-mono text-gray-800">TARGET IPs</div>
        <textarea
          className="text-sm p-1 outline-none h-40 w-128 border-[1.5px] border-blue-400 rounded-md"
          placeholder="Example : 192.34.56.15,192.45.32.89 or 164.78.97.10/18"
        ></textarea>
      </div>
      <div className="col-span-2 ml-4">
        <div className="text-xs mb-1 font-mono text-gray-800">TARGET PORTS</div>
        <textarea
          className="text-sm p-1 outline-none h-10 w-128 border-[1.5px] border-blue-400 rounded-md"
          placeholder="Example : 80-120 or 80,8080,443"
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
              <span className="ml-2 text-gray-700">Version enumeration</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-gray-600"
              />
              <span className="ml-2 text-gray-700">Random agent</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-gray-600"
              />
              <span className="ml-2 text-gray-700">Top 100 ports</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-gray-600"
              />
              <span className="ml-2 text-gray-700">Banner grabbing</span>
            </label>
          </div>
          <div className="col-span-2 justify-self-center">
            <button className="bg-blue-600 text-white rounded-md px-2 py-1 font-semibold text-sm shadow-lg shadow-blue-200">
              Launch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Targets;
