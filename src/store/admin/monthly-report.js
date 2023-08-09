import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import TokenExpiredError from "../checkingToken";
const env = require("../../env.json");
const notify = (x, iserror = false) =>
  iserror
    ? toast.error(x, { theme: "colored" })
    : toast.success(x, { theme: "colored" });

/*
***********************
****get all************
***********************
*/
const getAll = createAsyncThunk(
    'monthlyReport/getAll',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let url = env.ADMIN_API_URL+'users/';
            let option ={
                method : 'GET',
                headers : header
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                return response.data;
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
    }
)
/*
************************
****** Get Report ******
************************
*/
const getReport = createAsyncThunk(
    'monthlyReport/getReport',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let id = action?action.user_id?action.user_id:'':''
        try {
            let url = env.ADMIN_API_URL+'attendance-report?startFrom='+action.start_date+"&toDate="+action.end_date+'&id='+id
            let option ={
                method : 'GET',
                headers : header,
            }
            const response = await (await fetch(url, option)).json()
            if(response.status==="successfull"){
                return response;
            }else if(response.status === "token_expire"){
                TokenExpiredError()
                return false
            }else{
                for (const element of response.errors) {
                    notify(element.msg,true);
                }
                return false
            }
        }catch(error) {
            notify("Something went wrong !", true)
            console.log(error); 
            return false;
        }
    }
)

const monthlyReportSlice = createSlice({
    name:"montalyReport",
    initialState : {
        reportAllData : [],
        attendance_all_sheet : [],
        allUserData : [],
        isLoding : true,
        isAvailable : false,
        isSubmiting:false
    },
    reducers:{
    },

    extraReducers: (builder)=>{
    //.....Get All....//
        builder.addCase(getAll.pending,(state)=>{
            return { ...state };
        });
        builder.addCase(getAll.fulfilled,(state,action)=>{
            if(action.payload)
                return {
                    ...state,
                    allUserData : action.payload.data.filter((item)=>!item.is_deleted),
                    isLoding : false,
                    isAvailable: false
                };
            return { ...state }
        });
        builder.addCase(getAll.rejected,(state)=>{
            return { ...state, isLoding: false }
        })
         //.....Get Report....//
         builder.addCase(getReport.pending,(state)=>{
            return { ...state, isAvailable : false, isSubmiting:true };
        });
        builder.addCase(getReport.fulfilled,(state,action)=>{
            if(action.payload)
                return {
                    ...state,
                    reportAllData : action.payload.data,
                    attendance_all_sheet:action.payload.attendance_sheet,
                    isAvailable : true,
                    isSubmiting:false
                }
            else
                return {...state, isAvailable: false, isSubmiting:false}
        });
        builder.addCase(getReport.rejected,(state)=>{
            return {...state, isAvailable: true, isSubmiting:false}
        })
    }
})

export { getAll, getReport }
export default monthlyReportSlice.reducer;