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

const Store = configureStore({
  reducer: {
    counter: CounterSlice.reducer,
  },
});

export default Store;
