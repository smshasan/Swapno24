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
        return error.response.data
    }
})

export const loadStuff = createAsyncThunk('stuff/loadStuff', async () => {
    try {
        const {data} = await axios.get(`/api/v1/stuff/me`)
        console.log('stuff', data)
        return data
    } catch (err) {
        return err.response.data
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

        builder.addCase(loadStuff.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(loadStuff.fulfilled, (state, action) => {
            state.loading = false
            state.stuff = action.payload.stuff
            state.error = ''
        })
        builder.addCase(loadStuff.rejected, (state, action) => {
            state.error = action.payload
        })
    }
})

export default stuffSlice.reducer