import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    success: false,
    bank: [],
    error: ''
}

export const addBankAccount = createAsyncThunk('bank/addBankAccount', async (bankData) => {
    try {
        const {data} = await axios.post(`/api/v1/bankAccount/add`, bankData)
        return data
    } catch (err) {
        return err.response.data
    }
})

export const getBankAccount = createAsyncThunk('bank/getBankAccount', async () => {
    try {
        const {data} = await axios.get(`/api/v1/bankAccount/details`)
        return data
    } catch (err) {
        return err.response.data
    }
})

const bankSlice = createSlice({
    name: 'bankSlice',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(addBankAccount.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(addBankAccount.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.bank = action.payload.bank
        })
        builder.addCase(addBankAccount.rejected, (state, action) => {
            state.error = action.payload
        })

        builder.addCase(getBankAccount.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getBankAccount.fulfilled, (state, action) => {
            state.loading = false
            // state.success = action.payload.success
            state.bank = action.payload.bank
        })
        builder.addCase(getBankAccount.rejected, (state, action) => {
            state.error = action.payload
        })
    }
})

export default bankSlice.reducer