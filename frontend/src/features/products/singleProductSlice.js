import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    loading: false,
    product: [],
    error: ''
}


export const fetchSingleProduct = createAsyncThunk('product/fetchSingleProduct', async (id) => {
       try {
         const {data} = await axios.get(`/api/v1/product/${id}`)
         return data
       } catch (error) {
         return error.response.data
       }

})


const singleProductSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {

            builder.addCase(fetchSingleProduct.pending, (state) => {

                state.loading = true
            })

            builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload.product
                state.error = ''
            })

            builder.addCase(fetchSingleProduct.rejected, (state, action) => {
                state.loading = false
                state.product = []
                state.error = action.payload
            })

            
    }
})

export default singleProductSlice.reducer
