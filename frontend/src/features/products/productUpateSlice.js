import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'


const initialState = {
    loading: false,
    success: false,
    product: [],
    error: ''
}


export const updateProduct = createAsyncThunk('product/updateProduct', async (id, productData) => {

    try {
        const {data} = await axios.post(`/api/v1/control/product/${id}`, productData)
        return data
    } catch (error) {
        return error.response.data.messages
    }
    
})

const updateProductSlice = createSlice({
    name: 'updateProduct',
    initialState,
    extraReducers: (builder) => {
        
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true
        })

        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.products = action.payload.product
        })

        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.payload
        })
    }
})

export default updateProductSlice.reducer
