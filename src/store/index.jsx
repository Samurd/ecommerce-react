import { configureStore } from "@reduxjs/toolkit";
import isLoadingSlice from "./slices/isLoading.slice";
import productsSlice from "./slices/products.slice";
import cartSlice from "./slices/cart.slice";
import alertSuccessSlice from "./slices/alertSuccess.slice";
import alertErrorSlice from "./slices/alertError.slice";

export default configureStore({
    reducer: {
        isLoadingSlice: isLoadingSlice,
        productsSlice: productsSlice,
        cartSlice: cartSlice,
        alertSuccessSlice: alertSuccessSlice,
        alertErrorSlice: alertErrorSlice
    }
})