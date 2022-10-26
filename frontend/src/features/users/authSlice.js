import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    user: [],
    isAuthenticated: false,
    error: ''
}


export const fetchRegistration = createAsyncThunk('auth/fetchRegistration', async (userData) => {

    try {
        const {data} =  await axios.post('/api/v1/register', userData)
        console.log('fetchReg', data)
        return data
    } catch (error) {
        return error.response.data.message
    }
})


export const fetchLogin = createAsyncThunk('auth/fetchLogin', async(userData) => {
    try {

        const {data} = await axios.post('/api/v1/login', userData)
        console.log('data', data)
        return data
        
    } catch (error) {

        return error.response.data.message
        
    }
})


export const fetchLogout = createAsyncThunk('auth/logout', async() => {
    try {
        await axios.post('/api/v1/logout')
    } catch (error) {
        return error.response.data.message
    }
})


export const loadUser = createAsyncThunk('auth/loadUser', async() => {
    try {
        const {data} = await axios.get('/api/v1/me')
        console.log('loadUser', data)
        return data
    } catch (error) {
        return error.response.data.message
    }
})

 const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchLogin.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user
            state.error =''
        })

        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = []
            state.error = action.payload
        })

        builder.addCase(fetchLogout.fulfilled, (state) => {
            state.isAuthenticated = false
            state.user = []
        })

        builder.addCase(fetchRegistration.pending, (state) => {
            state.loading = true
            
        })

        builder.addCase(fetchRegistration.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user
        })

        builder.addCase(fetchRegistration.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = []
            state.error = action.payload
        })

        builder.addCase(loadUser.pending, (state, action) => {
            state.loading = false
        })

        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.user = action.payload.user
        })

        builder.addCase(loadUser.rejected, (state, action) => {
            state.error = action.payload
        })
    }
 })

 export default authSlice.reducer