import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import TokenExpiredError from "../checkingToken";
const env = require('../../env.json');
const notify = (x, iserror = false) => iserror ? toast.error(x, { theme: "colored", }) : toast.success(x, { theme: "colored", });

/*
    ................
    .....getAll.....
    ................
 */
const getAll = createAsyncThunk(
    'timeSlot/getAll',
    async (action) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': action.jwt,
        }
        let page = action ? (action.pageno ? action.pageno : 1) : 1;
        try {
            let url = env.ADMIN_API_URL + 'time-slot?limit=10&page=' + page;
            let option = {
                method: 'GET',
                mode: 'cors',
                headers: header,
            }
            const response = await (await fetch(url, option)).json();
            if (response.status === "successfull") {
                return response;
            } else if (response.status === "token_expire") {
                TokenExpiredError()
                return false
            } else {
                for (const element of response.errors) {
                    notify(element.msg, true);
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
    ...................
    .....add Record....
    ...................
*/
const addRecord = createAsyncThunk(
    'timeSlot/addRecord',
    async (action) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': action.jwt,
        }
        try {
            let url = env.ADMIN_API_URL + 'time-slot';
            let option = {
                method: 'POST',
                headers: header,
                body: JSON.stringify({
                    "shift": action.shift,
                    "time_in": action.startTime,
                    "time_out": action.endTime,
                    "lunch_time": action.lunchTime
                })
            }
            const response = await (await fetch(url, option)).json();
            if (response.status === "successfull") {
                notify("New Record Created Successfully !", false);
                return [response.data, true];
            } else if (response.status === "token_expire") {
                TokenExpiredError()
                return [[], false]
            } else {
                for (const element of response.errors) {
                    if (element.param === "refrence error")
                        notify(element.msg, true);
                }
                return [response.errors, false];
            }
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error)
            return ['', false];;
        }
    }
)
/*
    ........................
    .....Update Record......
    ........................
*/
const updateRecord = createAsyncThunk(
    " timeSlot/updateRecord",
    async (action) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': action.jwt,
        }
        try {
            let url = env.ADMIN_API_URL + 'time-slot/' + action.id;
            let option = {
                method: 'PUT',
                headers: header,
                body: JSON.stringify({
                    "shift": action.shift,
                    "time_in": action.startTime,
                    "time_out": action.endTime,
                    "lunch_time": action.lunchTime
                })
            }
            const response = await (await fetch(url, option)).json();
            if (response.status === "successfull") {
                notify("Updated Successfully !", false);
                return [true, response.data, action.id];
            } else if (response.status === "token_expire") {
                TokenExpiredError()
                return [false, []]
            } else {
                for (const element of response.errors) {
                    if (element.param === "refrence error")
                        notify(element.msg, true);
                }
                return [false, response.errors];
            }
            //....validation....//
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error)
            return [false]
        }
    }
)
/*
    ........................
    .....Update status......
    ........................
*/
const updateStatus = createAsyncThunk(
    " timeSlot/updateStatus",
    async (action) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': action.jwt,
        }
        try {
            if (!action.id) {
                notify('Something went wrong !', true)
                return false;
            }
            let url = env.ADMIN_API_URL + 'time-slot/' + action.id;
            let newAction = {...action.data, active: action.active}
            let option = {
                    method: 'PUT',
                    headers: header,
                    body: JSON.stringify({
                        ...newAction
                    })
                }
            const response = await (await fetch(url, option)).json();
            console.log('response',response);
            if (response.status === "successfull") {
                !action.active ? notify("Shift has been Dactivated !", true) : notify("Shift has been Activated!", false);
                return [{
                    active: action.active,
                }, { index: action.index }];
            } else if (response.status === "token_expire") {
                TokenExpiredError()
                return false
            } else {
                for (const element of response.errors) {
                    if (element.param === "refrence error")
                        notify(element.msg, true);
                }
                return false;
            }
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error)
            return false
        }
    }
)
const timeSlotSlice = createSlice({
    name: 'time-slot',
    initialState: {
        allData: [],
        singledata: [],
        isError: false,
        errors: [],
        editErrors: [],
        currentpage: 1,
        totalpages: 0,
        isLoading: true,
        isSubmitting: false,
        isEditSubmitting: false,
    },
    reducers: {
        getOne(state, action) {
            return { ...state, singledata: state.allData.filter((product) => product._id === action.payload), currentSelect: true, errors: [], editErrors: [], isError: false };
        },
    },
    extraReducers: (builder) => {
        //..... Get All ....//
        builder.addCase(getAll.pending, (state) => {
            return { ...state, isError: false, errors: [], editErrors: [] };
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload)
                return {
                    ...state,
                    allData: [...action.payload.data],
                    currentpage: action.payload.page,
                    totalpages: action.payload.total_page,
                    isLoading: false
                }
            return { ...state, isLoading: false }
        });
        builder.addCase(getAll.rejected, (state) => {
            return { ...state, isLoading: false }
        });
        //..... Add Record ....//
        builder.addCase(addRecord.pending, (state) => {
            return { ...state, isError: true, errors: [], editErrors: [], isSubmitting: true }
        });
        builder.addCase(addRecord.fulfilled, (state, action) => {
            if (action.payload[1]) {
                return {
                    ...state,
                    allData: [{ ...action.payload[0], no_of_users: 0 }, ...state.allData.filter((d, i) => i !== 9)],
                    isError: false,
                    isSubmitting: false
                }
            } else {
                return { ...state, isError: true, errors: [...action.payload[0]], isSubmitting: false }
            }
        });
        builder.addCase(addRecord.rejected, (state) => {
            return { ...state, isSubmitting: false }
        });
        //.....Update Record...//
        builder.addCase(updateRecord.pending, (state) => {
            return { ...state, isError: true, errors: [], editErrors: [], isEditSubmitting: true }
        });
        builder.addCase(updateRecord.fulfilled, (state, action) => {
            if (action.payload[0]) {
                return {
                    ...state,
                    allData: state.allData.map(
                        (data) => data._id === action.payload[2] ? { ...data, ...action.payload[1] } : data
                    ),
                    isError: false,
                    isEditSubmitting: false
                }
            }
            return { ...state, isError: true, editErrors: [...action.payload[1]], isEditSubmitting: false }
        });
        builder.addCase(updateRecord.rejected, (state) => {
            return { ...state, isEditSubmitting: false }
        });
        //.....Update Status...//
        builder.addCase(updateStatus.pending, (state) => {
            return { ...state }
        });
        builder.addCase(updateStatus.fulfilled, (state, action) => {
            if (action.payload) {
                var index = action.payload[1].index;
                return {
                    ...state,
                    allData: [...state.allData.map(
                        (data, i) => i === index ? { ...data, ...action.payload[0] } : data
                    )]
                }
            }
            return { ...state }
        });
        builder.addCase(updateStatus.rejected, (state) => {
            return { ...state }
        });
    }
})

export { getAll, addRecord, updateStatus, updateRecord };
export const { getOne } = timeSlotSlice.actions
export default timeSlotSlice.reducer;