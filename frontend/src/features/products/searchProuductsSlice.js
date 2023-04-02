import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    success: false,
    products: [],
    error: ''
}

export const getSearchedProducts = createAsyncThunk('products/getSearchedProducts', async (keyword) => {
    try {
        const {data} = await axios.get(`/api/v1/products?keyword=${keyword}`)
        return data
    } catch (error) {
        return error.response.data
    }
})


const searchProductsSlice = createSlice({
    name: 'productsSearch',
    initialState,
    extraReducers: (builder) => {
        
        builder.addCase(getSearchedProducts.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getSearchedProducts.fulfilled, (state, action) => {
           state.success = action.payload.success
           state.products = action.payload.products
        })
        builder.addCase(getSearchedProducts.rejected, (state, action) => {
            state.error = action.payload
        })
    }
})

export default searchProductsSlice.reducer