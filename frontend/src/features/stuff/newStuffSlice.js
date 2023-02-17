import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    loading: false,
    stuff: null,
    isAuthenticated: false,
    error: ''
}


export const stuffRegistration = createAsyncThunk('stuff/stuffRegistration', async (userData) => {

    try {
        const {data} =  await axios.post('/api/v1/stuff/create', userData)
        console.log('stuffReg', data)
        return data
    } catch (error) {
        return error.response.data.message
    }
})

export const stuffLogin = createAsyncThunk('stuff/stuffLogin', async(userData) => {
    try {

        const {data} = await axios.post('/api/v1/stuff/login', userData)
        console.log('data', data)
        return data
        
    } catch (error) {

        return error.response.data.message
        
    }
})




const newStuffSlice = createSlice({
    name: 'newStuff',
    initialState,
    extraReducers: (builder) => {


        builder.addCase(stuffLogin.pending, (state) => {
            state.loading = true
        })

        builder.addCase(stuffLogin.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.stuff = action.payload.stuff
            state.error =''
        })

        builder.addCase(stuffLogin.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.stuff = null
            state.error = action.payload
        })



        builder.addCase(stuffRegistration.pending, (state) => {
            state.loading = true
            
        })

        builder.addCase(stuffRegistration.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.stuff = action.payload.stuff
        })

        builder.addCase(stuffRegistration.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.stuff = null
            state.error = action.payload
        })

       
    }
})

export default newStuffSlice.reducer