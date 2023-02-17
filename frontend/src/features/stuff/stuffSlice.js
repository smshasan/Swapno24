import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    loading: false,
    stuff: null,
    error: ''
}

export const allStuff = createAsyncThunk('stuff/stuffSlice', async() => {
    try {
        const {data} = await axios.get('/api/v1/stuff/all')
        console.log('stuff', data)
        return data
    } catch (error) {
        return error.response.data.message
    }
})


const stuffSlice = createSlice({
    name: 'stuffSlice',
    initialState,
    extraReducers: (builder) => {


        builder.addCase(allStuff.pending, (state) => {
            state.loading = true
            
        })

        builder.addCase(allStuff.fulfilled, (state, action) => {
            state.loading = false
            state.stuff = action.payload.stuff
        })

        builder.addCase(allStuff.rejected, (state, action) => {
            state.loading = false
            state.stuff = null
            state.error = action.payload
        })
    }
})

export default stuffSlice.reducer