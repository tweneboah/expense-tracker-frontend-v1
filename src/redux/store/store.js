import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import expenses from "../slices/expenses/expenseSlices";
import income from "../slices/income/incomeSlices";
import statistics from "../slices/accountStats/accountStatsSlices";
const store = configureStore({
  reducer: {
    users: usersReducer,
    expenses,
    income,
    statistics,
  },
});

export default store;
