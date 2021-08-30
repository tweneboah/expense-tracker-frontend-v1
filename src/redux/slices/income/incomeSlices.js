import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

//Redirect action
const resetIncCreated = createAction("income/created/reset");
const resetIncomeUpdated = createAction("income/updated/reset");
const resetIncomeDeleted = createAction("income/deleted/reset");

//Create Expense
export const addNewIncomeAction = createAsyncThunk(
  "income/created",
  async (income, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/incomes`,
        {
          title: income?.title,
          description: income?.description,
          amount: income?.amount,
        },
        config
      );
      //dispatch
      dispatch(resetIncCreated());
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Fetch All Exp
export const fetchIncomesAction = createAsyncThunk(
  "income/list",
  async (page, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/incomes?page=${page}`,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Fetch Single Exp
export const fetchIncomeAction = createAsyncThunk(
  "income/details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/incomes/${id}`, config);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Delete
export const deleteIncomeAction = createAsyncThunk(
  "income/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/incomes/${id}`,
        config
      );
      //dispatch
      dispatch(resetIncomeDeleted());
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Update
export const updateIncomeAction = createAsyncThunk(
  "income/update",
  async (income, { rejectWithValue, getState, dispatch }) => {
    console.log(income);
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/incomes/${income?.id}`,
        {
          title: income?.title,
          description: income?.description,
          amount: income?.amount,
        },
        config
      );
      dispatch(resetIncomeUpdated());
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//--------------
//slices
//--------------
const incomeSlices = createSlice({
  name: "incomes",
  initialState: {},
  extraReducers: builder => {
    //create
    builder.addCase(addNewIncomeAction.pending, (state, action) => {
      state.incLoading = true;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(resetIncCreated, (state, action) => {
      state.isIncCreated = true;
    });
    builder.addCase(addNewIncomeAction.fulfilled, (state, action) => {
      state.incLoading = false;
      state.incCreated = action?.payload;
      state.incAppErr = undefined;
      state.incincServerErr = undefined;
      state.isIncCreated = false;
    });
    builder.addCase(addNewIncomeAction.rejected, (state, action) => {
      state.incLoading = false;
      state.incAppErr = action?.payload?.message;
      state.incincServerErr = action?.error?.message;
    });

    //fetch all
    builder.addCase(fetchIncomesAction.pending, (state, action) => {
      state.incLoading = true;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(fetchIncomesAction.fulfilled, (state, action) => {
      state.incLoading = false;
      state.incomeList = action?.payload;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(fetchIncomesAction.rejected, (state, action) => {
      state.incLoading = false;
      state.incAppErr = action?.payload?.message;
      state.incServerErr = action?.error?.message;
    });

    //fetch single
    builder.addCase(fetchIncomeAction.pending, (state, action) => {
      state.incLoading = true;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(fetchIncomeAction.fulfilled, (state, action) => {
      state.incLoading = false;
      state.incomeDetails = action?.payload;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(fetchIncomeAction.rejected, (state, action) => {
      state.incLoading = false;
      state.incAppErr = action?.payload?.message;
      state.incServerErr = action?.error?.message;
    });

    //Delete
    builder.addCase(deleteIncomeAction.pending, (state, action) => {
      state.incLoading = true;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(resetIncomeDeleted, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deleteIncomeAction.fulfilled, (state, action) => {
      state.incLoading = false;
      state.isDeleted = false;
      state.incomeDeleted = action?.payload;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(deleteIncomeAction.rejected, (state, action) => {
      state.incLoading = false;
      state.incAppErr = action?.payload?.message;
      state.incServerErr = action?.error?.message;
    });

    //Update
    builder.addCase(updateIncomeAction.pending, (state, action) => {
      state.incLoading = true;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(resetIncomeUpdated, (state, action) => {
      state.isIncUpdated = true;
    });
    builder.addCase(updateIncomeAction.fulfilled, (state, action) => {
      state.incLoading = false;
      state.incomeUpdated = action?.payload;
      state.isIncUpdated = false;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(updateIncomeAction.rejected, (state, action) => {
      state.incLoading = false;
      state.incAppErr = action?.payload?.message;
      state.incServerErr = action?.error?.message;
    });
  },
});

export default incomeSlices.reducer;
