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

export const getInformation = createAsyncThunk('information/getInformation', async () => {
    try {
        const {data} = await axios.get(`/api/v1/information/get`)
        return data
    } catch (error) {
        return error.response.data
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

        builder.addCase(getInformation.pending, (state, action) => {
            state.loading = true
          
        })
        builder.addCase(getInformation.fulfilled, (state, action) => {
            state.information = action.payload.information
           
        })
        builder.addCase(getInformation.rejected, (state, action) => {
            state.error = action.payload
        })


        
    }
})

export default informationSlice.reducer