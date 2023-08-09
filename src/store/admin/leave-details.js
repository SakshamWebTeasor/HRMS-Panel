import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
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
    'leaveDetails/getAll',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let url = env.ADMIN_API_URL+'leave/'+action.id;
            let option = {
                method : 'GET',
                headers: header,
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
                return false;
            }
        } catch (error) {
            notify("Something went wrong", true)
            console.log(error)
            return false;
        }
    }
)

const leaveDetailsSlice = createSlice({
    name: 'leaveDetails',
    initialState : {
        singledata: {},
        isLoading: true,
        isSubmitting:false,
    },
    reducers:{
        setIsSubmitting(state, action) {
            return {...state, isSubmitting: action.payload}
        },
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
                    singledata: action.payload,
                    isLoading : false
                }
            else
                return { ...state, isLoading:false }
        });
        builder.addCase(getAll.rejected, (state, action) => {
            return { ...state, isLoading : false };
        });        
    }
})

export {getAll};
export const { setIsSubmitting } = leaveDetailsSlice.actions

export default leaveDetailsSlice.reducer;