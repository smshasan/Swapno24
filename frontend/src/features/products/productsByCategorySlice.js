import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    products: [],
    error: ''
}

export const fetchProductsByCategory = createAsyncThunk('products/fetchProductsByCategory', async (id) => {
    try {
        const {data} = await axios.get(`/api/v1/products/fid/${id}`)
        return data
    } catch (error) {
        return error.response.data.message
    }
})

export const fetchProductsBySubCategory = createAsyncThunk('products/fetchProductsBySubCategory', async (id) => {
    try {
        const {data} = await axios.get(`/api/v1/products/uid/${id}`)
        return data
    } catch (error) {
        return error.response.data.message
    }
})

const productsByCategorySlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProductsByCategory.pending, (state) => {

            state.loading = true

        })
        builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {

            state.loading = false
            state.products = action.payload.products

        })
        builder.addCase(fetchProductsByCategory.rejected, (state, action) => {

            state.loading = false
            state.products = []
            state.error = action.payload
        })

        builder.addCase(fetchProductsBySubCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProductsBySubCategory.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload.products
        })
        builder.addCase(fetchProductsBySubCategory.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.payload
        })
    }
    
})

export default productsByCategorySlice.reducer