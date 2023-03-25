import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    products: [],
    error: ''
}



export const fetchProductsBySubCategory = createAsyncThunk('products/fetchProductsBySubCategory', async (id) => {
    try {
        const {data} = await axios.get(`/api/v1/products/uid/${id}`)
        return data
    } catch (error) {
        return error.response.data.message
    }
})

const productsBySubCategorySlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {

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

export default productsBySubCategorySlice.reducer