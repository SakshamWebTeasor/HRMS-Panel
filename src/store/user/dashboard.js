import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import TokenExpiredError from "../checkingToken";
const notify = (x, iserror = false) =>
  iserror
    ? toast.error(x, { theme: "colored" })
    : toast.success(x, { theme: "colored" });
const env = require("../../env.json");
/*
........................
......get All ..........
........................
*/
const getAll = createAsyncThunk("userDashboard/getAll", async (action) => {
  const header = {
    "Content-Type": "application/json",
    Authorization: action.jwt,
  };
  try {
    let url = env.USER_API_URL + "dashboard";
    let option = {
      method: "get",
      headers: header,
    };
    const response = await (await fetch(url, option)).json();
    if(response.status==="successfull"){
      return response
    }else if(response.status === "token_expire"){
      TokenExpiredError()
      return false
    }else{
      for (const element of response.errors) {
        notify(element.msg,true);
    }
      return false
    }
  } catch (error) {
    notify("Something went wrong !", true)
    console.log(error);
    return false;
  }
});
/*
........................
......make Attendence...
........................
*/
const makeAttendence = createAsyncThunk(
  "userDashboard/makeAttendence",
  async (action) => {
    const header = {
      "Content-Type": "application/json",
      Authorization: action.jwt,
    };
    try {
      let url = env.USER_API_URL + "attendance";
      let option = {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          type: action.type.trim(),
          longitude: action.longitude,
          latitude: action.latitude,
        }),
      };
      const response = await (await fetch(url, option)).json();
      if (response.status === "successfull") {
        action.type === "check_in"
          ? notify("You checked in to office !")
          : notify("You checked out from office !", true);
        return response.data;
      }else if(response.status === "token_expire"){
        TokenExpiredError()
        return false
      }else{
        for (const element of response.errors) {
          notify(element.msg,true);
        }
        return false;
      }
    } catch (error) {
      notify("Something went wrong !", true)
      console.log(error);
      return false;
    }
  }
);
const userDashboardSlice = createSlice({
  name: "userDashboard",
  initialState: {
    isSubmit: false,
    todayAttendance: {},
    total_leaves:{},
    working_hour:{},
    salary_chart:[],
    attendance_chart:[],
    total_present: 0,
    total_salary: 0,
    isSubmitting:false,
    isLoading : true,
    is_error : false,
  },
  reducers: {
    setIsSubmitting(state, action){
      if(action)
        return {...state,isSubmitting:true }
      return {...state, isSubmitting:false}
    }
  },
  extraReducers: (builder) => {
    //......Make Attendence...//
    builder.addCase(makeAttendence.pending, (state) => {
      return { ...state, isSubmitting:true };
    });
    builder.addCase(makeAttendence.fulfilled, (state, action) => {
      if (action.payload)
        return {
          ...state,
          todayAttendance: { ...action.payload },
          isSubmitting:false
        };
      else return { ...state, isLoading:false, isSubmitting:false };
    });
    builder.addCase(makeAttendence.rejected, (state) => {
      return { ...state, isSubmitting:false };
    });
    //......Get All...//
    builder.addCase(getAll.pending, (state) => {
      return { ...state };
    });
    builder.addCase(getAll.fulfilled, (state, action) => {
      console.log("action.payload:",action.payload)
      if (action.payload)
        return {
          ...state,
          todayAttendance : { ...action.payload.attendance },
          total_present: action.payload.total_present,
          total_salary: action.payload.salary,
          total_leaves:action.payload.total_leaves,
          salary_chart:action.payload.salary_chart.reverse(),
          attendance_chart:action.payload.attendance_chart.reverse(),
          working_hour:action.payload.working_hour,
          isLoading:false
        };
      else return { ...state, isLoading:false};
    });
    builder.addCase(getAll.rejected, (state) => {
      return { ...state };
    });
  },
});
export { getAll, makeAttendence };
export const { setIsSubmitting } = userDashboardSlice.actions
export default userDashboardSlice.reducer;
