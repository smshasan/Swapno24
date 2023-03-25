import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'


const initialState = {
    loading: false,
    success: false,
    products: [],
    error: ''
}

export const newProduct = createAsyncThunk('product/newProduct', async (productData) => {

    try {
        const {data} = await axios.post('/api/v1/product/new', productData)
        return data
    } catch (error) {
        return error.response.data.messages
    }
    
})


const newProductSlice = createSlice({
    name: 'newProduct',
    initialState,
    extraReducers: (builder) => {
        
        builder.addCase(newProduct.pending, (state) => {
            state.loading = true
        })

        builder.addCase(newProduct.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.products = action.payload.product
        })

        builder.addCase(newProduct.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.payload
        })
    }
})

export default newProductSlice.reducer