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
    }
    
})

export default productsByCategorySlice.reducer