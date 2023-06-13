import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getConfig } from '../../utils/getConfig';


export const alertSuccessSlice = createSlice({
    name: 'alertSuccess',
    initialState: "none",
    reducers: {
        setAlertSuccess: (state, action) => {
            return action.payload
        }
    }
})

export const {setAlertSuccess} = alertSuccessSlice.actions;

export default alertSuccessSlice.reducer;