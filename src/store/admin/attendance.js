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
    'attendence/getAll',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let page = action?(action.pageno?action.pageno:1):1;
        let limit = action?(action.limit?action.limit:env.LIMIT):env.LIMIT;
        let date = action?(action.date?action.date:""):"";
        try {
            //...user...//
            let url1 = env.ADMIN_API_URL+'users/';
            let option1 ={
                method : 'GET',
                headers : header
            }
            const response1 = await (await fetch(url1, option1)).json();
            //...//
            let url = env.ADMIN_API_URL+'attendance?limit='+limit+'&page='+page+"&toDate="+date;
            let option = {
                method : 'GET',
                headers:header
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                return [true,response,response1];
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
            console.log(error)
            return [false];
        }
    }
)
/*
..........................
......Make Attendence.....
..........................
*/
const makeAttendence = createAsyncThunk(
    'attendence/makeAttendence',
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let url = env.ADMIN_API_URL+'attendance';
            let option = {
                method : 'POST',
                headers:header,
                body: JSON.stringify({
                    "users": action.users,
                    "in_time": action.start?new Date(action.start):'',
                    "out_time": action.end?new Date(action.end):'',
                    "longitude": action.longitude,
                    "latitude": action.latitude
                })
            }
            const response = await (await fetch(url, option)).json();
            if (response.status === 'successfull') {
                notify("Manual Attendance Done !")
                return [true,response.data];
            }else if(response.status === "token_expire"){
                TokenExpiredError()
                return [false,[]]
            }else{
                for(const element of response.errors) {
                    if(element.param==="refrence error")
                         notify(element.msg,true);
                } 
                return [false, response.errors]
            }
            
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error);
            return [false]
        }

    }
)

const attendence = createSlice({
    name: 'attendence',
    initialState : {
        allData:[],
        alluser:[],
        currentpage: 1,
        isError:false,
        errors:[],
        totalpages: 0,
        isLoading: true,
        isSubmitting:false
    },
    reducers:{
        setIsSubmitting(state, action) {
            return { ...state, isSubmitting: action.payload };
          },
        unsetErrors(state){
            return {...state, errors:[], isError:false}
        }
    },

    extraReducers: (builder)=>{
    //..... Get All ....//
        builder.addCase(getAll.pending, (state)=>{
            return { ...state,isLoading:true, errors:[], isError:false };
        });
        builder.addCase(getAll.fulfilled,(state, action) => {
            if (action.payload[0]){
                return {
                    ...state,
                    allData: [...action.payload[1].data],
                    alluser: [...action.payload[2].data.data],
                    currentpage: action.payload[1].page,
                    totalpages: action.payload[1].total_page,
                    isLoading : false
                }
            }else{
                return {...state, isLoading:false}
            }
        });
        builder.addCase(getAll.rejected, (state) => {
            return {...state};
        });
    //......Make Attendence...//
        builder.addCase(makeAttendence.pending,(state)=>{
            return{ ...state, isError:true }
        });
        builder.addCase(makeAttendence.fulfilled,(state,action)=>{
            if(action.payload[0])
                return { 
                    ...state,
                    allData: [action.payload[1], ...state.allData.filter((d,i) => i !== 9)],
                    isError:false
                }
            else
                return { ...state, isError:true, errors:[...action.payload[1]] }
        });
        builder.addCase(makeAttendence.rejected,(state,action)=>{
            return { ...state }
        })
    }
})

export {getAll, makeAttendence};
export const {  setIsSubmitting, unsetErrors } = attendence.actions;
export default attendence.reducer;