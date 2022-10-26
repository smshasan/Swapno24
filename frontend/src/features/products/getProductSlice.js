import { createSlice, createAsyncThunk, bindActionCreators } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    loading: false,
    products: [],
    productsCount: 0,
    resPerPage: 0,
    filteredProductsCount: 0,
    error: ''
}


export const fetchProducts = createAsyncThunk('product/fetchProducts', () => {
        return axios
            .get(`/api/v1/products`)
            .then((response) => response.data)
            .catch ((error) => error.response.data.message )

})



const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {

            builder.addCase(fetchProducts.pending, (state) => {

                state.loading = true
            })

            builder.addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.products
                state.productsCount = action.payload.products
                state.resPerPage = action.payload.resPerPage
                state.filteredProductsCount = action.payload.filteredProductsCount
                state.error = ''
            })

            builder.addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.products = []
                state.error = action.payload
            })

            
    }
})

export default productSlice.reducer
