import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axiosInterceptor.js";
import { base_url } from '../../main.jsx'

const initialState = {
    allColleges: [],
    searchResult: [],
    selectedCollege: {},
    status: {
        getAllColleges: 'idle',
        addcollegeStatus: 'idle',
        deleteCollegeStatus: 'idle',
    },
    error: ""
}


export const getAllCollegesSlice = createAsyncThunk('college/getAllCollegesSlice', async () => {
    const response = await api.get(
        `${base_url}/api/college/all-colleges`,
        {
            headers: {
                'Content-Type': 'application/json',

            },
            withCredentials: true
        }
    );
    return response.data;
})

export const addCollegeSlice = createAsyncThunk('college/addCollegeSlice', async ({ collegeName, address, logo, courses }) => {
    const response = await api.post(
        `${base_url}/api/college/add`, {
        collegeName, address, logo, courses
    },
        {
            headers: {
                'Content-Type': 'application/json',

            },
            withCredentials: true
        }
    );
    return response.data;
})

export const deleteCollegeSlice = createAsyncThunk('college/deleteCollegeSlice', async (collegeid) => {
    const response = await api.delete(
        `${base_url}/api/college/${collegeid}`,
        {
            headers: {
                'Content-Type': 'application/json',

            },
            withCredentials: true
        }
    );
    return response.data;
})


export const searchCollegeByCourseSlice = createAsyncThunk('college/searchCollegeByCourseSlice', async ({ keyword }) => {
    const response = await api.get(
        `${base_url}/api/college/search/${keyword}`,
        {
            headers: {
                'Content-Type': 'application/json',

            },
            withCredentials: true
        }
    );
    console.log(response.data);
    return response.data;
})

export const getCollegeDetailsSlice = createAsyncThunk('college/getCollegeDetailsSlice', async (collegeid) => {
    const response = await api.get(
        `${base_url}/api/college/${collegeid}`,
        {
            headers: {
                'Content-Type': 'application/json',

            },
            withCredentials: true
        }
    );
    console.log(response.data);
    return response.data;
})




const collegeSlice = createSlice({
    name: 'college',
    initialState: initialState,
    reducers: {
        clearStatus: (state, action) => {
            state.status.deleteCollegeStatus = 'idle',
                state.status.addcollegeStatus = 'idle'
        },
        clearSearch: (state, action) => {
            state.searchResult = []
        }
    },
    extraReducers: (builder) => {
        builder

            // get profile
            .addCase(getAllCollegesSlice.pending, (state, action) => {
                state.status.getAllColleges = 'loading';
            })
            .addCase(getAllCollegesSlice.fulfilled, (state, action) => {
                state.status.getAllColleges = 'success';
                state.allColleges = action.payload.allColleges
            })
            .addCase(getAllCollegesSlice.rejected, (state, action) => {
                state.status.getAllColleges = 'failed';
            })
            // get profile
            .addCase(addCollegeSlice.pending, (state, action) => {
                state.status.addcollegeStatus = 'loading';
            })
            .addCase(addCollegeSlice.fulfilled, (state, action) => {
                state.status.addcollegeStatus = 'success';
            })
            .addCase(addCollegeSlice.rejected, (state, action) => {
                state.status.addcollegeStatus = 'failed';
            })
            // get profile
            .addCase(deleteCollegeSlice.pending, (state, action) => {
                state.status.deleteCollegeStatus = 'loading';
            })
            .addCase(deleteCollegeSlice.fulfilled, (state, action) => {
                state.status.deleteCollegeStatus = 'success';
                state.allColleges = action.payload.allColleges
            })
            .addCase(deleteCollegeSlice.rejected, (state, action) => {
                state.status.deleteCollegeStatus = 'failed';
            })
            // get college details 
            .addCase(getCollegeDetailsSlice.fulfilled, (state, action) => {
                state.selectedCollege = action.payload.college
            })

            // search college 

            .addCase(searchCollegeByCourseSlice.fulfilled, (state, action) => {
                state.searchResult = action.payload.searchResult
            })



    }
})


export default collegeSlice.reducer;
export const { clearStatus, clearSearch } = collegeSlice.actions;


// Export any actions you need
export const selectCollege = (state) => state.college;  
