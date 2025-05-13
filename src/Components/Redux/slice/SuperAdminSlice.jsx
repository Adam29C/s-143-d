import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PagesIndex from "../../Pages/PagesIndex";

export const getEmployeeList = createAsyncThunk(
  "superAdmin/getEmployeeList",
  async (id) => {

    try {
      const res = await PagesIndex.admin_services.EMPLOYEE_GET_LIST_API(id);
      return await res;
    } catch (err) {
      return err;
    }
  }
);

const CommonSlice = createSlice({
  name: "SuperAdminSlice",
  initialState: {
    getEmployeeListState: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeList.pending, (state, action) => {
        return {
          ...state,
          getEmployeeListState: [],
          isLoading: true,
        };
      })
      .addCase(getEmployeeList.fulfilled, (state, action) => {
        return {
          ...state,
          getEmployeeListState: action.payload?.data?.details,
          isLoading: false,
        };
      })
      .addCase(getEmployeeList.rejected, (state, action) => {
        return {
          ...state,
          getEmployeeListState: [],
          isLoading: false,
        };
      });
  },
});

export default CommonSlice;
