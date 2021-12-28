import { configureStore, createSlice } from "@reduxjs/toolkit";

let counterObj = { counter: 0 };
const CounterSlice = createSlice({
  name: "counter",
  initialState: counterObj,
  reducers: {
    increaseOne(state) {
      state.counter++;
    },
  },
});
export const counterActions = CounterSlice.actions;

// ports table redux slice
let portsTable = {
  data: [
    {
      ip: "127.0.0.1",
      ports: ["22", "443", "80"],
    },
  ],
};
const PortsTableSlice = createSlice({
  name: "ports table",
  initialState: portsTable,
  reducers: {
    addData(state, action) {
      state.data.concat(action.payload);
    },
  },
});
export const portsTableActions = PortsTableSlice.actions;

// store configuration
const Store = configureStore({
  reducer: {
    counter: CounterSlice.reducer,
    portsTable: PortsTableSlice.reducer,
  },
});

export default Store;
