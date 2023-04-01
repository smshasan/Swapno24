import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

    const initialState = {
        loading: false,
        success: false,
        withdraw: [],
        withdrawRequests: [],
        error: ''
    }

    export const withdrawSalary = createAsyncThunk('bank/withdrawsalary', async (bankData) => {
        try {
            const {data} = await axios.post(`/api/v1/salary/withdraw`, bankData)
            return data
        } catch (err) {
            return err.response.data
        }
    })

    export const salaryWithdrawRequests = createAsyncThunk('bank/withdrawRequests', async() => {
        try {
            const {data} = await axios.get(`/api/v1/salary/withdraw/requests`)
            return data
        } catch (error) {
            return error.response.data
        }
    })

    const withdrawSlice = createSlice({
        name: 'withdraw',
        initialState,
        extraReducers: (builder) => {

            builder.addCase(withdrawSalary.pending, (state, action) => {
                state.loading = true
            })

            builder.addCase(withdrawSalary.fulfilled, (state, action) => {
                state.loading = false
                state.success = action.payload.success
                state.withdraw = action.payload.withdraw
            })

            builder.addCase(withdrawSalary.rejected, (state, action) => {
                state.error = action.payload
            })

            builder.addCase(salaryWithdrawRequests.pending, (state, action) => {
                state.loading = true
            })

            builder.addCase(salaryWithdrawRequests.fulfilled, (state, action) => {
                state.loading = false
                state.success = action.payload.success
                state.withdrawRequests = action.payload.withdraw
            })

            builder.addCase(salaryWithdrawRequests.rejected, (state, action) => {
                state.error = action.payload
            })
        }   
    })

    export default withdrawSlice.reducer


    
