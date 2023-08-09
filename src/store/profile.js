import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import TokenExpiredError from "./checkingToken";
const env = require('../env.json');
const notify = (x, iserror=false) => iserror ?  toast.error(x, {theme: "colored",}) : toast.success(x, {theme: "colored",});
/*
    ...........................
    .....profile get data......
    ...........................
*/
const getAll = createAsyncThunk(
    'profile/gatAll',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let url = env.ADMIN_API_URL+'profile';
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
            }else if(response.status === "failed"){
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


const authSlice = createSlice({
    name: 'profile',
    initialState : {
        isSubmitting: false,
        current_user : {},
        isLoading:true,
    },
    reducers:{
    },
    extraReducers: (builder)=>{
    //.....getAll......//
        builder.addCase(getAll.pending, (state, action)=>{
            return {...state };
        });
        builder.addCase(getAll.fulfilled,(state, action) => {
            if (action.payload)
                return {...state,
                    current_user: action.payload.data,
                    isAuthenticated : true,
                    isLoading : false,
                };
        });
        builder.addCase(getAll.rejected, (state, action) => {
            return {...state};
        });
   
    }
})

export {getAll};
export default authSlice.reducer;