import { createSlice } from "@reduxjs/toolkit";
import {
  addNewExpAction,
  deleteExpenseAction,
  fetchExpenseAction,
  fetchExpensesAction,
  resetExpCreated,
  resetExpDeleted,
  resetExpUpdated,
  updateExpenseAction,
} from "./expenseAction";

//--------------
//slices
//--------------
const expenseSlices = createSlice({
  name: "expenses",
  initialState: {},
  extraReducers: builder => {
    //create
    builder.addCase(addNewExpAction.pending, (state, action) => {
      state.expLoading = true;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
    });
    builder.addCase(resetExpCreated, (state, action) => {
      state.isExpCreated = true;
    });
    builder.addCase(addNewExpAction.fulfilled, (state, action) => {
      state.expLoading = false;
      state.expenseCreated = action?.payload;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
      state.isExpCreated = false;
    });
    builder.addCase(addNewExpAction.rejected, (state, action) => {
      state.expLoading = false;
      state.expAppErr = action?.payload?.message;
      state.expServerErr = action?.error?.message;
    });

    //fetch all
    builder.addCase(fetchExpensesAction.pending, (state, action) => {
      state.expLoading = true;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
    });
    builder.addCase(fetchExpensesAction.fulfilled, (state, action) => {
      state.expLoading = false;
      state.expenseList = action?.payload;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
      state.isExpCreated = false;
    });
    builder.addCase(fetchExpensesAction.rejected, (state, action) => {
      state.expLoading = false;
      state.expAppErr = action?.payload?.message;
      state.expServerErr = action?.error?.message;
    });

    //fetch single
    builder.addCase(fetchExpenseAction.pending, (state, action) => {
      state.expLoading = true;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
    });
    builder.addCase(fetchExpenseAction.fulfilled, (state, action) => {
      state.expLoading = false;
      state.expenseDetails = action?.payload;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
      state.isExpCreated = false;
    });
    builder.addCase(fetchExpenseAction.rejected, (state, action) => {
      state.expLoading = false;
      state.expAppErr = action?.payload?.message;
      state.expServerErr = action?.error?.message;
    });

    //Delete
    builder.addCase(deleteExpenseAction.pending, (state, action) => {
      state.expLoading = true;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
    });
    builder.addCase(resetExpDeleted, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deleteExpenseAction.fulfilled, (state, action) => {
      state.expLoading = false;
      state.isDeleted = false;
      state.expenseDeleted = action?.payload;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
      state.isExpCreated = false;
    });
    builder.addCase(deleteExpenseAction.rejected, (state, action) => {
      state.expLoading = false;
      state.expAppErr = action?.payload?.message;
      state.expServerErr = action?.error?.message;
    });

    //Update
    builder.addCase(updateExpenseAction.pending, (state, action) => {
      state.expLoading = true;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
    });
    builder.addCase(resetExpUpdated, (state, action) => {
      state.isExpUpdated = true;
    });
    builder.addCase(updateExpenseAction.fulfilled, (state, action) => {
      state.expLoading = false;
      state.expenseUpdated = action?.payload;
      state.isExpUpdated = false;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
      state.isExpCreated = false;
    });
    builder.addCase(updateExpenseAction.rejected, (state, action) => {
      state.expLoading = false;
      state.expAppErr = action?.payload?.message;
      state.expServerErr = action?.error?.message;
    });
  },
});

export default expenseSlices.reducer;
