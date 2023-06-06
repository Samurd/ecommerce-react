import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice'
import axios from 'axios'


export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        }
    }
})

export const {setProducts} = productsSlice.actions;

export default productsSlice.reducer;

/*
export const myFunctionThunk = () => dispatch => {
    dispatch(actionNamel())

    dispatch(actionNamel2())
}
*/

export const getProductThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
    .then(res => dispatch(setProducts(res.data)))
    .catch(error => console.error(error))
    .finally(() => dispatch(setIsLoading(false)))
}

export const filterCategoryThunk = (id) => dispatch => {
    dispatch(setIsLoading(true))

    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
    .then(res => dispatch(setProducts(res.data)))
    .catch(error => console.error(error))
    .finally(() => dispatch(setIsLoading(false)))
}

export const filterCategoryNameThunk = (searchValue) => dispatch => {
    dispatch(setIsLoading(true))
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${searchValue}`)
    .then(res => dispatch(setProducts(res.data)))
    .catch(error => console.error(error))
    .finally(() => dispatch(setIsLoading(false)))
}