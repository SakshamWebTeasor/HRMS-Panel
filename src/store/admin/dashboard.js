import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import TokenExpiredError from "../checkingToken";
const notify = (x, iserror=false) => iserror ?  toast.error(x, {theme: "colored",}) : toast.success(x, {theme: "colored",});
const env = require("../../env.json");

const getAll = createAsyncThunk(
    "dashboard/getAll",
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let url = env.ADMIN_API_URL+'dashboard/';
            let option = {
                method : 'GET',
                headers: header,             
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === 'Successfull'){
                return[true, response]
            }else if(response.status === "token_expire"){
                TokenExpiredError()
                return [false]
            }else{
                for (const element of response.errors) {
                    notify(element.msg,true);
                }
                return [false];
            }
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error);
            return [false]
        }
    }
)

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState:{
        departmentWiseStaff:[],
        today_active_employee:0,
        today_absent:0,
        total_employee : 0,
        previous_month_salary_amount:0,
        salary_chart:[],
        attendance_chart:[],
        isLoading: true,
    },
    reducers:{
        setIsSubmitting(state, action) {
            return {...state, isSubmitting: action.payload}
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(getAll.pending, (state, action)=>{
            return { ...state }
        })
        builder.addCase(getAll.fulfilled, (state, action)=>{
            if(action.payload[0]){
                return {
                    ...state,
                    departmentWiseStaff: [...action.payload[1].departmentAllUsers],
                    today_active_employee: action.payload[1].today_attendance_count,
                    today_absent: action.payload[1].today_absent,
                    total_employee : action.payload[1].employee_count,
                    previous_month_salary_amount: action.payload[1].previous_month_salary_amount,
                    salary_chart: [...action.payload[1].salary_chart.reverse()],
                    attendance_chart: [...action.payload[1].attendance_chart.reverse()],
                    isLoading:false
                }
            }else{
                return {...state, isLoading: false}
            }
        })
    }

})

export {getAll}

export default dashboardSlice.reducer