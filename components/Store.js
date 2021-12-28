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
  data: [],
};
const PortsTableSlice = createSlice({
  name: "ports table",
  initialState: portsTable,
  reducers: {
    addData(state, action) {
      state.data.push(action.payload);
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
