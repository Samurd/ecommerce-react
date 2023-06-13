import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getConfig } from '../../utils/getConfig';


export const alertErrorSlice = createSlice({
    name: 'alertError',
    initialState: "none",
    reducers: {
        setAlertError: (state, action) => {
            return action.payload
        }
    }
})

export const {setAlertError} = alertErrorSlice.actions;

export default alertErrorSlice.reducer;