import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios  from "axios"

    const initialState = {
        loading: false,
        products: [],
        error: ''
    }

   export const fetchUnApprovedProducts = createAsyncThunk('product/fetchUnApprovedProducts' , async () => {
        try {
            const {data} = await axios.get('/api/v1/unapproved/products')
            return data
        } catch (error) {
            return error.response.data.message
        }
    })


    const unApproveProductSlice = createSlice({
        name: 'unApproveProductSlice',
        initialState,
        extraReducers: (builder) => {

            builder.addCase(fetchUnApprovedProducts.pending, (state) => {
                state.loading = true
            })
            builder.addCase(fetchUnApprovedProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.products
                state.error = ''
            })
            builder.addCase(fetchUnApprovedProducts.rejected, (state, action) => {
                state.loading = false
                state.products = []
                state.error = action.payload
            })
        }
    })

    export default unApproveProductSlice.reducer