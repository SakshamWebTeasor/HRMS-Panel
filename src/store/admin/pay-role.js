import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import TokenExpiredError from "../checkingToken";
const env = require('../../env.json');
const notify = (x, iserror=false) => iserror ?  toast.error(x, {theme: "colored",}) : toast.success(x, {theme: "colored",});

/*
    ................
    .....getAll......
    ................
 */
const getAll = createAsyncThunk(
    'payRoll/getAll',
    async(action) => {
        const d = new Date();
        const before_current_month = `${(d.getUTCMonth()).toString().padStart(2, '0')}-${d.getUTCFullYear()}`;
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let page = action?(action.pageno?action.pageno:1):1;
        let limit = action?(action.limit?action.limit:env.LIMIT):env.LIMIT
        let type= action?(action.type?action.type:"all"):"all"
        let month = action?(action.month?action.month:before_current_month):before_current_month
        let is_search = action.is_search?true:false
        try {
            let url = env.ADMIN_API_URL+`salary?limit=${limit}&page=${page}&status=pending&type=${type}&month=${month}`;
            let url1 =  env.ADMIN_API_URL+`salary?limit=${limit}&page=${page}&status=paid&type=${type}&month=${month}`;
            let option = {
                method : 'GET',
                headers: header,
            }
            if(type==="all"){
                let response = await (await fetch(url, option)).json();
                let response_paid = await ( await fetch(url1, option)).json();
                if(response.status === "successfull"){
                    return {response , response_paid, type, is_search};
                }else if(response.status === "token_expire"){
                    TokenExpiredError()
                    return false
                }else{
                    for (const element of response.errors) {
                        notify(element.msg,true);
                    }
                    return false;
                }
            }else if(type==="paid"){
                let response_paid = await ( await fetch(url1, option)).json();
                if(response_paid.status === "successfull"){
                    return { response_paid, type, is_search};
                }else if(response_paid.status === "token_expire"){
                    TokenExpiredError()
                    return false
                }else{
                    for (const element of response_paid.errors) {
                        notify(element.msg,true);
                    }
                    return false;
                }
            }else{
                let response = await (await fetch(url, option)).json();
                if(response.status === "successfull"){
                    return {response, type, is_search};
                }else if(response.status === "token_expire"){
                    TokenExpiredError()
                    return false
                }else{
                    for (const element of response.errors) {
                        notify(element.msg,true);
                    }
                    return false;
                }
            }
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error)
            return false;
        }
    }
)
/*
    ........................
    .....Create Salary......
    ........................
*/
    const createSalary = createAsyncThunk(
        'payRoll/createSalary',
        async(action) => {
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            try {
                let url = env.ADMIN_API_URL+'create-salary?month='+action.month;
                let option = {
                    method : 'GET',
                    headers: header,
                }
                const response = await (await fetch(url, option)).json();
                if(response.status === "successfull"){
                    return {response};
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
    ..............................
    .....Create Salary Slip ......
    ..............................
*/
const createSalarySlip = createAsyncThunk(
    'payRoll/createSalarySlip',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let url = env.ADMIN_API_URL+'create-salary-slip/'+action.id;
            let option = {
                method : 'PUT',
                headers: header,
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                notify(response.message, false)
                return [true,response.data,action.id];
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
    ................
    ..... pay ......
    ................
*/
    const pay = createAsyncThunk(
        'payRoll/pay',
        async(action) => {
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            try {
                let url = env.ADMIN_API_URL+'salary/'+action.id;
                let option = {
                    method : 'PUT',
                    headers: header,
                    body: JSON.stringify({
                        "status":true,
                    }) 
                }
                const response = await (await fetch(url, option)).json();
                if(response.status === 'successfull'){
                    notify("Payment Created Successfully !",false);
                    return {response};
                }else if(response.status === "token_expire"){
                    TokenExpiredError()
                    return false
                }else{
                    for (const element of response.errors) {
                        notify(element.msg,true);
                      }
                    return false;
                }
            }catch(error) {
                notify("Something went wrong !", true)
                console.log(error)
                return false;
            }
        }
    )
    
    


const payRollSlice = createSlice({
    name: 'payRoll',
    initialState : {
        allPendingData: [],
        allPaidData:[],
        singledata: [],
        pagination_allPaidData:{
            currentpage: 1,
            totalpages: 0,
        },
        pagination_allPendingData:{
            currentpage: 1,
            totalpages: 0,
        },
        isLoading: true,
        isSubmitting:false,
        isSubmittingGenerate:false,
        is_search:false,
    },
    reducers:{},
    extraReducers: (builder)=>{
    //..... Get All ....//
        builder.addCase(getAll.pending, (state)=>{
            return { ...state, isSubmitting:false, is_search:false };
        });
        builder.addCase(getAll.fulfilled,(state, action) => {
            if (action.payload){
                if(action.payload.type==="all"){
                    return {
                        ...state,
                        allPendingData: [...action.payload.response.data],
                        allPaidData : [...action.payload.response_paid.data],
                        pagination_allPaidData:{
                            ...state.pagination_allPaidData,
                            currentpage:action.payload.response_paid.page,
                            totalpages: action.payload.response_paid.total_page
                        },
                        pagination_allPendingData:{
                            ...state.pagination_allPendingData,
                            currentpage:action.payload.response.page,
                            totalpages: action.payload.response.total_page
                        },
                        isLoading : false,
                        is_search:action.payload.is_search,
                    }
                }else if(action.payload.type==="paid"){
                    return {
                        ...state,
                        allPaidData : [...action.payload.response_paid.data],
                        pagination_allPaidData:{
                            ...state.pagination_allPaidData,
                            currentpage:action.payload.response_paid.page,
                            totalpages: action.payload.response_paid.total_page
                        },
                        isLoading : false,
                        is_search:action.payload.is_search,
                    }
                }else{
                    return {
                        ...state,
                        allPendingData: [...action.payload.response.data],
                        pagination_allPendingData:{
                            ...state.pagination_allPendingData,
                            currentpage:action.payload.response.page,
                            totalpages: action.payload.response.total_page
                        },
                        isLoading : false,
                        is_search:action.payload.is_search,
                    }
                }
            }
            return { ...state, isLoading:false, is_search:false }
        });
        builder.addCase(getAll.rejected, (state) => {
            return { ...state, isLoading:false, is_search:false };
        }); 
    //..... Create Salary ....//
        builder.addCase(createSalary.pending, (state)=>{
            return { ...state, isSubmitting:true };
        });
        builder.addCase(createSalary.fulfilled,(state, action) => {
            if (action.payload)
                return {
                    ...state,
                    allPendingData: [...action.payload.response.data],
                    isLoading : false,
                    isSubmitting:false
                }
            return { ...state, isLoading:false, isSubmitting:false }
        });
        builder.addCase(createSalary.rejected, (state) => {
            return { ...state, isLoading:false, isSubmitting:false };
        });

        //..... Create Salary Slip ....//
        builder.addCase(createSalarySlip.pending, (state)=>{
            return { ...state, isSubmittingGenerate:true };
        });
        builder.addCase(createSalarySlip.fulfilled,(state, action) => {
            if (action.payload[0])
                return {
                    ...state,
                    allPaidData: state.allPaidData.map(
                        (data) => data._id === action.payload[2] ? {...data, ...action.payload[1]} : data
                    ),
                    isLoading : false,
                    isSubmittingGenerate:false
                }
            return { ...state, isLoading:false, isSubmittingGenerate:false }
        });
        builder.addCase(createSalarySlip.rejected, (state) => {
            return { ...state, isLoading:false, isSubmittingGenerate:false };
        });
        //..... pay .....//
        builder.addCase(pay.pending, (state)=>{
            return { ...state, isSubmitting:true };
        });
        builder.addCase(pay.fulfilled,(state, action) => {
            if (action.payload)
                return {
                    ...state,
                    allPaidData:[...state.allPaidData,action.payload.response.data],
                    allPendingData:state.allPendingData.filter((item) => item._id !== action.payload.response.data._id),
                    isSubmitting:false
                }
            else
                return { ...state, isSubmitting:false }
        });
        builder.addCase(pay.rejected, (state) => {
            return { ...state, isSubmitting:false };
        });      
    }
})

export {getAll, pay, createSalary, createSalarySlip }

export default payRollSlice.reducer;