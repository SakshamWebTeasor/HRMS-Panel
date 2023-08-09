import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import TokenExpiredError from "../checkingToken";
const notify = (x, iserror=false) => iserror ?  toast.error(x, {theme: "colored",}) : toast.success(x, {theme: "colored",});
const env = require('../../env.json');
/*
    ................
    .....getAll......
    ................
 */
const getAll = createAsyncThunk(
    'holidays/getAll',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let page = action?(action.pageno?action.pageno:1):1;
        var param = action?(action.param?action.param:"created_at"):"created_at";
        var limit = action?(action.limit?action.limit:10):10;
        var key = action?(action.x?1:-1):-1;
        try {
            let url = env.USER_API_URL+'holiday?limit='+limit+'&page='+page+'&param='+param+'&sort='+key;
            let option = {
                method : 'GET',
                mode: 'cors',
                headers: header,
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                return {response, field: param, sort: key===1?true:false};
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


const holidaySlice = createSlice({
    name: 'holidays',
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
            return { ...state, isLoading:true };
        });
        builder.addCase(getAll.fulfilled,(state, action) => {
            if (action.payload)
                return {
                    ...state,
                    allData: [...action.payload.response.data],
                    currentpage: Number(action.payload.response.page),
                    totalpages: Number(action.payload.response.total_page),
                    isLoading : false
                }
            else
                return{...state, isLoading : false }
        });
        builder.addCase(getAll.rejected, (state, action) => {
            return {...state, isLoading : false};
        });
    
    }
})

export {getAll };
export default holidaySlice.reducer;