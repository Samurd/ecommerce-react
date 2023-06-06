import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getConfig } from '../../utils/getConfig';


export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})

export const {setCart} = cartSlice.actions;

export default cartSlice.reducer;

export const getCartThunk = () => dispatch => {
    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", getConfig())
    .then(res => {
        console.log(res.data)
        setCart(res.data)
    })
    .catch(error => console.error(error))
}