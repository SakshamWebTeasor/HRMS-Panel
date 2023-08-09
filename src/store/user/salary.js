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
    'usersalary/getAll',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let page = action?(action.pageno?action.pageno:1):1;
        try {
            let url = env.USER_API_URL+'salary?limit=12&page='+page;
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
                    if(element.param==="refrence error")
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

const usersalary = createSlice({
    name: 'usersalary',
    initialState : {
        allData:[],
        currentpage: 1,
        totalpages: 0,
        isLoading: true,
    },
    reducers:{
    },
    extraReducers: (builder)=>{
    //..... Get All ....//
        builder.addCase(getAll.pending, (state, action)=>{
            return {...state, isLoading:true };
        });
        builder.addCase(getAll.fulfilled,(state, action) => {
            if (action.payload)
                return {
                    ...state,
                    allData: [...action.payload.data],
                    currentpage: Number(action.payload.page),
                    totalpages: Number(action.payload.total_page),
                    isLoading : false
                }
            else
                return { ...state, isLoading : false }
        });
        builder.addCase(getAll.rejected, (state, action) => {
            return { ...state, isLoading : false };
        });
    }
})

export { getAll };
export default usersalary.reducer;