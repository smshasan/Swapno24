import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError }  from "axios"

const initialState = {
    loading: false,
    approved: '',
    deleted: '',
    error: ''
}


export const approveProductAction = createAsyncThunk('product/approveProductAction', async (id) => {
    try {
        const {data} = await axios.put(`/api/v1/approve/product/${id}`)
        return data
    } catch (error) {
        return error.response.data.message
    }
})

export const deleteProductAction = createAsyncThunk('product/deleteProductAction', async(id) => {
    try {
        const data = await axios.delete(`/api/v1/admin/product/${id}`)
        return data
    } catch (error) {
        return error.response.data.message
    }
})


const approveProductSlice = createSlice({
    name: 'approveProduct',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(approveProductAction.pending, (state) => {
            state.loading = true
        })
        builder.addCase(approveProductAction.fulfilled, (state, action) => {
            state.loading = false
            state.approved = action.payload
            state.error = ''
        })
        builder.addCase(approveProductAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(deleteProductAction.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(deleteProductAction.fulfilled, (state, action) => {
            state.loading = false
            state.deleted = action.payload
            state.error = ''
        })

        builder.addCase(deleteProductAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export default approveProductSlice.reducer