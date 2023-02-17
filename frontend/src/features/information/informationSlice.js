import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    loading: false,
    success: false,
    information: [],
    error: ''
}

export const createInformation = createAsyncThunk('information/createInformation', async (userData)=> {
    try {
        const {data} = await axios.post(`/api/v1/information/create`, userData)
        return data
    } catch (error) {
        return error.response.date.messages
    }
})

const informationSlice = createSlice({
    name: 'information',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createInformation.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createInformation.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.information = action.payload.information
            state.error = ''
        })
        builder.addCase(createInformation.rejected, (state, action) => {
            state.loading = false
            state.information = []
            state.error = action.payload
        })
        
    }
})

export default informationSlice.reducer