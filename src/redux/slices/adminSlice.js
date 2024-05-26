import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axiosInterceptor.js";
import { base_url } from '../../main.jsx'

const initialState = {
    allUsers: [],
    status: {
        getAllUsers: 'idle',
        makeUser: 'idle',
        makeAdmin: 'idle',
    },
    error: ""
}


export const getAllUserSlice = createAsyncThunk('admin/getAllUserSlice', async () => {
    const response = await api.get(
        `${base_url}/api/admin/all-users`,
        {
            headers: {
                'Content-Type': 'application/json',

            },
            withCredentials: true
        }
    );
    return response.data;
})

export const makeUserSlice = createAsyncThunk('admin/makeUserSlice', async (userid) => {
    const response = await api.get(
        `${base_url}/api/admin/make-user/${userid}`,
        {
            headers: {
                'Content-Type': 'application/json',

            },
            withCredentials: true
        }
    );
    return response.data;
})

export const makeAdminSlice = createAsyncThunk('admin/makeAdminSlice', async (userid) => {
    const response = await api.get(
        `${base_url}/api/admin/make-admin/${userid}`,
        {
            headers: {
                'Content-Type': 'application/json',

            },
            withCredentials: true
        }
    );
    return response.data;
})


const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            // get profile
            .addCase(getAllUserSlice.pending, (state, action) => {
                state.status.getAllUsers = 'loading';
            })
            .addCase(getAllUserSlice.fulfilled, (state, action) => {
                state.status.getAllUsers = 'success';
                state.allUsers = action.payload.allUsers
            })
            .addCase(getAllUserSlice.rejected, (state, action) => {
                state.status.getAllUsers = 'failed';
            })
            // get profile
            .addCase(makeUserSlice.pending, (state, action) => {
                state.status.makeUser = 'loading';
            })
            .addCase(makeUserSlice.fulfilled, (state, action) => {
                state.status.makeUser = 'success';
                state.allUsers = action.payload.allUsers
            })
            .addCase(makeUserSlice.rejected, (state, action) => {
                state.status.makeUser = 'failed';
            })
            // get profile
            .addCase(makeAdminSlice.pending, (state, action) => {
                state.status.makeAdmin = 'loading';
            })
            .addCase(makeAdminSlice.fulfilled, (state, action) => {
                state.status.makeAdmin = 'success';
                state.allUsers = action.payload.allUsers
            })
            .addCase(makeAdminSlice.rejected, (state, action) => {
                state.status.makeAdmin = 'failed';
            })

    }
})


export default adminSlice.reducer;


// Export any actions you need
export const selectAdmin = (state) => state.admin;  
