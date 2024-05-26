import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import adminReducer from './slices/adminSlice'
import collegeReducer from './slices/collegeSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        college: collegeReducer,

    },
})