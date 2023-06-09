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
        console.log(res.data);
        dispatch(setCart(res.data))
    })
    .catch(error => console.error(error))
}


export const addProductThunk = data => dispatch => {
    axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/cart", data, getConfig())
    .then(res => {
        console.log(res.data)
        dispatch(getCartThunk())
    })
    .catch(error => console.error(error))
}

export const updateProductThunk = (id, quantity) => dispatch => {
    const body = {
        quantity: quantity,
    }
    axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, body, getConfig())
    .then(() => dispatch(getCartThunk()))
}


export const deleteProductThunk = (id) => dispatch => {
    axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, getConfig())
    .then(() => dispatch(getCartThunk()))
}

export const purchasesCartThunk = () => dispatch => {
    axios.post(`https://e-commerce-api-v2.academlo.tech/api/v1/purchases`, {} , getConfig())
    .then(() => dispatch(getCartThunk()))
}