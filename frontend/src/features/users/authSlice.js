import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    user: null,
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
        return data.user
        
    } catch (error) {

        return error.response.data.message
        
    }
})

export const loadUser = createAsyncThunk('auth/loadUser', async() => {
    try {
        const {data} = await axios.get('/api/v1/me')
        console.log('loadUser', data)
        return data.user
    } catch (error) {
        return error.response.data.message
    }
})

export const fetchLogout = createAsyncThunk('auth/logout', async() => {
    try {
        await axios.get('/api/v1/logout')
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
            state.user = action.payload
            state.error =''
        })

        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null
            state.error = action.payload
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
            state.user = null
            state.error = action.payload
        })

        builder.addCase(loadUser.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
        })

        builder.addCase(loadUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = null
        })


        builder.addCase(fetchLogout.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(fetchLogout.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated =  false
            state.user = null
        })

        builder.addCase(fetchLogout.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.error  = action.payload
        })

        
    }
 })


 export default authSlice.reducer