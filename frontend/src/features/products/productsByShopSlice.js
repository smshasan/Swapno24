import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    loading: false,
    products: [],
    error: ''
}


export const fetchProductsByShop = createAsyncThunk('product/fetchProducts', async (shopType) => {
       try {
         const {data} = await axios.get(`/api/v1/products/shop/${shopType}`)
         return data
       } catch (error) {
         return error.response.data    
       }
})



const productsByShopSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {

            builder.addCase(fetchProductsByShop.pending, (state) => {

                state.loading = true
            })

            builder.addCase(fetchProductsByShop.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.products
                state.error = ''
            })

            builder.addCase(fetchProductsByShop.rejected, (state, action) => {
                state.error = action.payload
            })

            
    }
})

export default productsByShopSlice.reducer
