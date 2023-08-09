import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import TokenExpiredError from "../checkingToken";
const env = require('../../env.json');
const notify = (x, iserror=false) => iserror ?  toast.error(x, {theme: "colored",}) : toast.success(x, {theme: "colored",});
/*
    ................
    .....getAll.....
    ................
*/
const getAll = createAsyncThunk(
    'userleave/getAll',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let page = action?(action.pageno?action.pageno:1):1;
        let limit = action?(action.limit?action.limit:env.LIMIT):env.LIMIT
        try {
            let url = env.USER_API_URL+'leave?limit='+limit+'&page='+page;
            let option = {
                method : 'GET',
                headers:header
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                return response;
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
            console.log(error)
            return false;
        }
    }
)
/*
    .....................
    .....Leave Apply.....
    .....................
*/
const leaveApply = createAsyncThunk(
    'userleave/leaveApply',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let url = env.USER_API_URL+'leave';
            let option = {
                method : 'POST',
                headers: header,
                body: JSON.stringify({
                    "type": action.type,
                    "start_date": action.start,
                    "end_date": action.end,
                    "reason": action.reason.trim(),
                    'half_day':action.halfday
                  })                   
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                notify("Leave Apply Successfully !",false);
                return [response.data,true];
            }else if(response.status === "token_expire"){
                TokenExpiredError()
                return [[],false]
            }else{
                for(const element of response.errors) {
                    if(element.param==="refrence error")
                         notify(element.msg,true);
                }
                return [response.errors,false];
            }
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error)
            return['', false];
        }
    }
)


const userleave = createSlice({
    name: 'userleave',
    initialState : {
        allData:[],
        allLeaveType : [],
        isError:false,
        errors:[],
        currentpage: 1,
        totalpages: 0,
        isLoading: true,
        isFirstTimeLoding:true,
        isSubmitting: false,
    },
    reducers:{
        setIsSubmitting(state, action) {
            return {...state, isSubmitting: action.payload}
        },
        cleanError(state, action){
            return {...state, errors:[], isError:false}
        }
    },
    extraReducers: (builder)=>{
    //..... Get All ....//
        builder.addCase(getAll.pending, (state)=>{
            return {...state, isLoading:true };
        });
        builder.addCase(getAll.fulfilled,(state, action) => {
            if (action.payload)
                return {
                    ...state,
                    allData: [...action.payload.data],
                    allLeaveType: [...action.payload.leaveType],
                    currentpage: Number(action.payload.page),
                    totalpages: Number(action.payload.total_page),
                    isLoading : false,
                    isFirstTimeLoding:false
                }
            else
                return { ...state, isLoading : false, isFirstTimeLoding:false }
        });
        builder.addCase(getAll.rejected, (state) => {
            return {...state, isLoading : false, isFirstTimeLoding:false};
        });
    //..... Leave Apply ....//
        builder.addCase(leaveApply.pending, (state)=>{
            return {...state, isError:true, errors:[]};
        });
        builder.addCase(leaveApply.fulfilled,(state, action) => {
            if(action.payload[1]){
                return {
                    ...state,
                    allData: [action.payload[0], ...state.allData.filter((d,i) => i !== 9)],
                    isError:false,
                }
            }else{
                return { ...state, errors:[...action.payload[0]] }
            }
        });
        builder.addCase(leaveApply.rejected, (state) => {
            return {...state};
        });
    }
})

export {getAll, leaveApply};
export const { setIsSubmitting, cleanError} = userleave.actions
export default userleave.reducer;