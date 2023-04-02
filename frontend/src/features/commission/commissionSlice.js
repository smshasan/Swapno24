import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    success: false,
    commission: [],
    error: ''
}

export const createCommission = createAsyncThunk('commission/createCommission', async (commssionData) => {
    try {
        const {data} = await axios.post(`/api/v1/commission/create`, commssionData)
        return data
    } catch (error) {
        return error.response.data
    }
})

export const getCommission = createAsyncThunk('commission/getCommission', async (id) => {
    try {
        const {data} = await axios.get(`/api/v1/commission/${id}`)
        return data
    } catch (error) {
        return error.response.data
    }
})

export const getMyCommission = createAsyncThunk('commission/getMyCommission', async () => {
    try {
        const {data} = await axios.get(`/api/v1/commission/me`)
        return data
    } catch (error) {
        return error.response.data
    }
})

export const getAllCommision = createAsyncThunk('commission/getAllCommision', async () => {
    try {
        const {data} = await axios.get(`/api/v1/commission/all`)
        return data
    } catch (error) {
        return error.response.data
    }
})


const commissionSlice = createSlice({
    name: 'commission',
    initialState,
    extraReducers: (builder) => {

        //createCommission
        builder.addCase(createCommission.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createCommission.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.commission = action.payload.commission
        })
        builder.addCase(createCommission.rejected, (state, action) => {
            state.error = action.payload
        })

        //getCommission
        builder.addCase(getCommission.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getCommission.fulfilled, (state, action) => {
            state.success = action.payload.success
            state.commission = action.payload.commission
        })
        builder.addCase(getCommission.rejected, (state, action) => {
            state.error = action.payload
        })

        //getMyCommission
        builder.addCase(getMyCommission.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getMyCommission.fulfilled, (state, action) => {
            state.success = action.payload.success
            state.commission = action.payload.commission
        })
        builder.addCase(getMyCommission.rejected, (state, action) => {
            state.error = action.payload
        })

        //getAllCommission
        builder.addCase(getAllCommision.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllCommision.fulfilled, (state, action) => {
            state.success = action.payload.success
            state.commission = action.payload.commission
        })
        builder.addCase(getAllCommision.rejected, (state, action) => {
            state.error = action.payload
        })


    }
})

export default commissionSlice.reducer