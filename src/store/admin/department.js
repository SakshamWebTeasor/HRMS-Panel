import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import TokenExpiredError from "../checkingToken";
const env = require('../../env.json');
const notify = (x, iserror = false) => iserror ? toast.error(x, { theme: "colored", }) : toast.success(x, { theme: "colored", });
/*
    ................
    .....getAll......
    ................
*/
const getAll = createAsyncThunk(
    'department/getAll',
    async (action) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': action.jwt,
        }
        const page = action ? (action.pageno ? action.pageno : 1) : 1;
        const param = action ? (action.param ? action.param : "created_at") : "created_at";
        const key = action ? (action.x ? 1 : -1) : -1;
        const type = action ? action.type ? action.type : "all" : "all"
        const first = action.firstTime ? action.firstTime : false
        const isHead = action.isHead ? action.isHead : false
        const limit = action ? (action.limit ? action.limit : env.LIMIT) : env.LIMIT
        try {
            //.....first time visit...//
            if (first) {
                //...get all user Head...//
                let url3 = env.ADMIN_API_URL + 'department?type=head';
                let option3 = {
                    method: 'GET',
                    headers: header,
                }
                const all_head_response = await (await fetch(url3, option3)).json();
                //....get user_head ...//
                let url1 = env.ADMIN_API_URL + 'department?type=head&page=' + page + '&key=' + type + '&limit=' + limit;
                let option1 = {
                    method: 'GET',
                    headers: header,
                }
                const head_response = await (await fetch(url1, option1)).json();
                //....get department ....//
                if (head_response.status === "successfull") {
                    let url = env.ADMIN_API_URL + 'department?type=subHead&limit=' + limit + '&page=' + page + '&param=' + param + '&sort=' + key + "&key=" + type;
                    let option = {
                        method: 'GET',
                        headers: header,
                    }
                    const response = await (await fetch(url, option)).json();
                    if (response.status === "successfull") {
                        return { response, head_response, all_head_response, field: param, sort: key === 1 ? true : false, type, isHead, first };
                    } else if (response.status === "token_expire") {
                        TokenExpiredError()
                        return false
                    } else {
                        for (const element of response.errors) {
                            notify(element.msg, true);
                        }
                        return false;
                    }
                } else if (head_response.status === "token_expire") {
                    TokenExpiredError()
                    return false
                } else {
                    for (const element of head_response.errors) {
                        notify(element.msg, true);
                    }
                    return false
                }
            }
            if (isHead) {
                //....get user_head ...//
                let url1 = env.ADMIN_API_URL + 'department?type=head&page=' + page + '&key=' + type + '&limit=' + limit;
                let option1 = {
                    method: 'GET',
                    headers: header,
                }
                const head_response = await (await fetch(url1, option1)).json();
                if (head_response.status === "successfull") {
                    return { head_response, field: param, sort: key === 1 ? true : false, type, isHead, first };
                } else if (head_response.status === "token_expire") {
                    TokenExpiredError()
                    return false
                } else {
                    for (const element of head_response.errors) {
                        notify(element.msg, true);
                    }
                    return false;
                }
            } else {
                //...get depatment ....//
                let url = env.ADMIN_API_URL + 'department?type=subHead&page=' + page + '&limit=' + limit + '&param=' + param + '&sort=' + key + "&key=" + type;
                let option = {
                    method: 'GET',
                    headers: header,
                }
                const response = await (await fetch(url, option)).json();
                if (response.status === "successfull") {
                    return { response, field: param, sort: key === 1 ? true : false, type, isHead, first };
                } else if (response.status === "token_expire") {
                    TokenExpiredError()
                    return false
                } else {
                    for (const element of response.errors) {
                        notify(element.msg, true);
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
    .....Searching Data.....
    ........................
*/
const serchingData = createAsyncThunk(
    'department/serchingData',
    async (action) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': action.jwt,
        }
        let searchKey = action ? action.searchKey ? action.searchKey : '' : '';
        let page = action ? (action.pageno ? action.pageno : 1) : 1;
        let limit = action ? (action.limit ? action.limit : env.LIMIT) : env.LIMIT
        try {
            let url = env.ADMIN_API_URL + 'department/search?limit=' + limit + '&page=' + page + '&search=' + searchKey.trim();
            let option = {
                method: 'GET',
                headers: header
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
    'department/addRecord',
    async (action) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': action.jwt,
        }
        try {
            var response1 = {};
            if (action.dep !== "empty") {
                let url1 = env.ADMIN_API_URL + 'department/' + action.dep;
                let option1 = {
                    method: 'GET',
                    headers: header,
                }
                response1 = await (await fetch(url1, option1)).json();
                if (response1.status === "token_expire") {
                    TokenExpiredError()
                    return [[], false]
                } else if (response1.status !== "successfull") {
                    for (const element of response1.errors) {
                        if (element.param === "refrence error")
                            notify(element.msg, true);
                    }
                    notify('This department is not Available', true);
                    return [response1.errors, false];
                }
            }
            //......//
            let url = env.ADMIN_API_URL + 'department';
            let option = {
                method: 'POST',
                headers: header,
                body: JSON.stringify({
                    "name": action.name.trim(),
                    "user_head": action.dep === 'empty' ? null : response1.data.name,
                })
            }
            const response = await (await fetch(url, option)).json();
            if (response.status === "successfull") {
                action.dep === "empty" ? notify("New Department Head Created", false) : notify("New Department Created", false)
                console.log("2");
                return [response.data, true, action.dep === "empty" ? true : false];
            } else if (response.status === "token_expire") {
                TokenExpiredError()
                console.log("3");
                return [[], false]
            } else {
                for (const element of response.errors) {
                    // if (element.param === "refrence error")
                    //     notify(element.msg, true);
                    notify(element.msg, true);
                }
                return [response.errors, false];
            }
        } catch (error) {
            notify("Something went wrong !", true)
            console.log("error:", error)
            return [[], false];;
        }
    }
)
/*
    .......................
    .....Update Record.....
    .......................
*/
const updateRecord = createAsyncThunk(
    'department/updateRecord',
    async (action) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': action.jwt,
        }
        try {
            //...validation...//
            var response1 = {};
            if (action.dep !== "empty") {
                let url1 = env.ADMIN_API_URL + 'department/' + action.dep;

                let option1 = {
                    method: 'GET',
                    headers: header,
                }
                response1 = await (await fetch(url1, option1)).json();
                if (response1.status === "token_expire") {
                    TokenExpiredError()
                    return ['', '', false]
                }
                if (response1.status !== "successfull") {
                    for (const element of response1.errors) {
                        if (element.param === "refrence error")
                            notify(element.msg, true);
                    }
                    notify('This department is not Available', true);
                    return ['', '', false]
                }
            }
            //......//
            let url = env.ADMIN_API_URL + 'department/' + action.id;
            let option = {
                method: 'PUT',
                headers: header,
                body: JSON.stringify({
                    "name": action.name,
                    "user_head": action.dep === 'empty' ? null : response1.data.name,
                    "updated_at": new Date(Date.now()).toISOString()
                })
            }
            const response = await (await fetch(url, option)).json();
            if (response.status === "successfull") {
                notify(action.dep === 'empty' ? "Department Head Updated !" : "Department Updated !", false);
                return [response.data, action.id, true, action.dep === "empty" ? true : false];
            } else if (response.status === "token_expire") {
                TokenExpiredError()
                return [[], '', false]
            } else {
                for (const element of response.errors) {
                    if (element.param === "refrence error")
                        notify(element.msg, true);
                }
                return [response.errors, '', false]
            }
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error)
            return [[], '', false];
        }
    }
)
/*
    ....................
    .....Delete Record..
    ....................
*/
const deleteRecord = createAsyncThunk(
    'department/deleteRecord',
    async (action) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': action.jwt,
        }
        try {
            let url1 = env.ADMIN_API_URL + 'department/' + action.id;
            let option1 = {
                method: 'DELETE',
                headers: header,
            }
            let response1 = await (await fetch(url1, option1)).json();
            if (response1.status === "successfull") {
                notify("Deleted Successfully !", true);
                return [action.id, action.isHead, true];
            } else if (response1.status === "token_expire") {
                TokenExpiredError()
                return ['', '', false]
            } else {
                for (const element of response1.errors) {
                    notify(element.msg, true);
                }
                return ['', '', false]
            }
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error);
            return ['', '', false];
        }
    }
)

const departmentSlice = createSlice({
    name: 'department',
    initialState: {
        allData: [],
        headData: [],
        deleted_allData: [],
        singledata: [],
        isError: false,
        errors: [],
        editErrors: [],
        currentSelect: false,
        headAllData: [],
        deleted_headAllData: [],
        pagination_AllData: {
            currentpage: 1,
            totalpages: 0,
        },
        pagination_Deleted_AllData: {
            currentpage: 1,
            totalpages: 0,
        },
        pagination_headAllData: {
            currentpage: 1,
            totalpages: 0,
        },
        pagination_Deleted_headAllData: {
            currentpage: 1,
            totalpages: 0,
        },
        isFirstLoading: true,
        isLoading: true,
        isSubmitting: false,
        isEditSubmitting: false,
        isSearch: false,
        sorting_on: { field: 'created_at', sort: false }
    },
    reducers: {
        getOne(state, action) {
            const singleobj = state.allData.filter((product) => product._id === action.payload._id);
            if (!action.payload.isHead) {
                const headobj = state.headData.filter((head) => head.name === singleobj[0].user_head);
                return { ...state, singledata: [{ ...singleobj[0], user_head: headobj[0] }], currentSelect: true, isError: true, errors: [], editErrors: [] };
            }
            return { ...state, singledata: state.headAllData.filter((product) => product._id === action.payload._id), isError: false, errors: [], editErrors: [] };
        },
        unsetSingleData(state) {
            return { ...state, singledata: [], editErrors: [], isError: false }
        }
    },
    extraReducers: (builder) => {
        //..... Get All ....//
        builder.addCase(getAll.pending, (state) => {
            return { ...state, isLoading: true, isError: false, errors: [], editErrors: [] }
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload)
                if (action.payload.first) {
                    return {
                        ...state,
                        allData: [...action.payload.response.data.data],
                        headData: [...action.payload.all_head_response.data.data],
                        headAllData: [...action.payload.head_response.data.data],
                        deleted_allData: [...action.payload.response.deletd_data.data],
                        deleted_headAllData: [...action.payload.head_response.deletd_data.data],
                        pagination_AllData: {
                            ...state.pagination_AllData,
                            totalpages: Number(action.payload.response.data.total_page),
                            currentpage: Number(action.payload.response.data.page)
                        },
                        pagination_Deleted_AllData: {
                            ...state.pagination_Deleted_AllData,
                            totalpages: Number(action.payload.response.deletd_data.total_page),
                            currentpage: Number(action.payload.response.deletd_data.page)
                        },
                        pagination_headAllData: {
                            ...state.pagination_headAllData,
                            totalpages: Number(action.payload.head_response.data.total_page),
                            currentpage: Number(action.payload.head_response.data.page)
                        },
                        pagination_Deleted_headAllData: {
                            ...state.pagination_Deleted_headAllData,
                            totalpages: Number(action.payload.head_response.deletd_data.total_page),
                            currentpage: Number(action.payload.head_response.deletd_data.page)
                        },
                        sorting_on: { ...state.sorting_on, field: action.payload.field, sort: action.payload.sort },
                        isLoading: false,
                        isFirstLoading: false,
                        isSearch: false,
                    }
                } else if (action.payload.isHead) {
                    //.....manage state for head data../...//
                    if (action.payload.type === "deleted") {
                        return {
                            ...state,
                            deleted_headAllData: [...action.payload.head_response.deletd_data.data],
                            pagination_Deleted_headAllData: {
                                ...state.pagination_Deleted_headAllData,
                                totalpages: action.payload.head_response.deletd_data.total_page,
                                currentpage: Number(action.payload.head_response.deletd_data.page)
                            },
                            sorting_on: { ...state.sorting_on, field: action.payload.field, sort: action.payload.sort },
                            isLoading: false,
                            isFirstLoading: false,
                        }
                    } else {
                        return {
                            ...state,
                            headAllData: [...action.payload.head_response.data.data],
                            pagination_headAllData: {
                                ...state.pagination_headAllData,
                                totalpages: action.payload.head_response.data.total_page,
                                currentpage: Number(action.payload.head_response.data.page)
                            },
                            sorting_on: { ...state.sorting_on, field: action.payload.field, sort: action.payload.sort },
                            isLoading: false,
                            isFirstLoading: false,
                        }
                    }
                } else {
                    //.....manage state for all data.....//
                    if (action.payload.type === "deleted") {
                        return {
                            ...state,
                            deleted_allData: [...action.payload.response.deletd_data.data],
                            pagination_Deleted_AllData: {
                                ...state.pagination_Deleted_AllData,
                                totalpages: action.payload.response.deletd_data.total_page,
                                currentpage: Number(action.payload.response.deletd_data.page)
                            },
                            sorting_on: { ...state.sorting_on, field: action.payload.field, sort: action.payload.sort },
                            isLoading: false,
                            isFirstLoading: false,
                        }
                    } else {
                        return {
                            ...state,
                            allData: [...action.payload.response.data.data],
                            pagination_AllData: {
                                ...state.pagination_AllData,
                                totalpages: action.payload.response.data.total_page,
                                currentpage: Number(action.payload.response.data.page)
                            },
                            sorting_on: { ...state.sorting_on, field: action.payload.field, sort: action.payload.sort },
                            isLoading: false,
                            isFirstLoading: false,
                            isSearch: false,
                        }
                    }
                }
            return { ...state, isFirstLoading: false, isLoading: false }
        });
        builder.addCase(getAll.rejected, (state) => {
            return { ...state, isLoading: false, isFirstLoading: false };
        });
        //..... Serching ....//
        builder.addCase(serchingData.pending, (state) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(serchingData.fulfilled, (state, action) => {
            if (action.payload)
                return {
                    ...state,
                    allData: [...action.payload.data],
                    pagination_AllData: {
                        ...state.pagination_AllData,
                        totalpages: action.payload.total_page,
                        currentpage: Number(action.payload.page)
                    },
                    isSearch: true,
                    isLoading: false,
                }
            else
                return { ...state, isLoading: false }
        });
        builder.addCase(serchingData.rejected, (state) => {
            return { ...state, isLoading: false };
        });
        //..... Add Record ....//
        builder.addCase(addRecord.pending, (state) => {
            return { ...state, isSubmitting: true, isError: true, errors: [], editErrors: [] };
        });
        builder.addCase(addRecord.fulfilled, (state, action) => {
            if (action.payload[1]) {
                if (action.payload[2]) {
                    return {
                        ...state,
                        headAllData: [{ ...action.payload[0], no_of_designation: 0 }, ...state.headAllData.filter((d, i) => i !== 9)],
                        headData: [...state.headData, { ...action.payload[0] }],
                        isError: false,
                        isSubmitting: false
                    }
                }
                return {
                    ...state,
                    allData: [{ ...action.payload[0], no_of_designation: 0 }, ...state.allData.filter((d, i) => i !== 9)],
                    isError: false,
                    isSubmitting: false
                }
            } else {
                return { ...state, isError: true, errors: [...action.payload[0]], isSubmitting: false }
            }
        });
        builder.addCase(addRecord.rejected, (state) => {
            return { ...state, isSubmitting: false };
        });

        //..... Update Record ....//
        builder.addCase(updateRecord.pending, (state) => {
            return { ...state, isEditSubmitting: true, isError: true, editErrors: [], errors: [] }
        });
        builder.addCase(updateRecord.fulfilled, (state, action) => {
            if (action.payload[2]) {
                if (action.payload[3])
                    return {
                        ...state,
                        headAllData: state.headAllData.map(
                            (data) => data._id === action.payload[1] ? { ...data, ...action.payload[0] } : data
                        ),
                        headData: state.headData.map(
                            (data) => data._id === action.payload[1] ? { ...data, ...action.payload[0] } : data
                        ),
                        isError: false,
                        isEditSubmitting: false
                    }
                else
                    return {
                        ...state,
                        allData: state.allData.map(
                            (data) => data._id === action.payload[1] ? { ...data, ...action.payload[0] } : data
                        ),
                        isError: false,
                        isEditSubmitting: false
                    }
            } else {
                return { ...state, isError: true, editErrors: [...action.payload[0]], isEditSubmitting: false }
            }
        });
        builder.addCase(updateRecord.rejected, (state, action) => {
            return { ...state, isEditSubmitting: false }
        });
        //......delete.....//
        builder.addCase(deleteRecord.pending, (state) => {
            return { ...state }
        })
        builder.addCase(deleteRecord.fulfilled, (state, action) => {
            if (action.payload[2]) {
                if (action.payload[1]) {
                    return {
                        ...state,
                        deleted_headAllData: [state.headAllData.filter((data) => data._id === action.payload[0])[0], ...state.deleted_headAllData.filter((d, i) => i !== 9)],
                        headData: state.headData.filter(
                            (data) => data._id !== action.payload[0]
                        ),
                        headAllData: state.headAllData.filter(
                            (data) => data._id !== action.payload[0]
                        )
                    }
                }
                return {
                    ...state,
                    deleted_allData: [state.allData.filter((data) => data._id === action.payload[0])[0], ...state.deleted_allData.filter((d, i) => i !== 9)],
                    allData: state.allData.filter(
                        (data) => data._id !== action.payload[0]
                    ),
                    // allData: state.allData.map(
                    //     (data, index) => index === action.payload[0] ? {...data,is_deleted:true} : data
                    // ),
                }
            } else {
                return { ...state }
            }

        });
        builder.addCase(deleteRecord.rejected, (state, action) => {
            return { ...state }
        });

    }
})

export { getAll, addRecord, deleteRecord, updateRecord, serchingData };
export const { getOne, unsetSingleData } = departmentSlice.actions

export default departmentSlice.reducer;