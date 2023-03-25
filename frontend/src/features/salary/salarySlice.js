import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    salary: [], 
    error: ''
}

export const createSalary = createAsyncThunk('salary/createSalary', async (salaryData) => {

    try {
        const {data} = await axios.post('/api/v1/salary/create', salaryData)
        return data

    } catch (err) {
        return err.response.data
    }

}) 

export const getMySalary = createAsyncThunk('salary/getMySalary', async() => {
    try {
        const {data} = await axios.get('/api/v1/salary/me')
        return data
    } catch (err) {
        return err.response.data
    }
})

const salarySlice = createSlice({
    name: 'salary',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(createSalary.pending, (state) => {
            state.loading = true
        })
        
        builder.addCase(createSalary.fulfilled, (state, action) => {
            state.loading = false
            state.salary = action.payload.salary
            state.error = ''
        })

        builder.addCase(createSalary.rejected, (state, action) => {
            state.error = action.payload
        })

        builder.addCase(getMySalary.pending, ( state, action) => {
            state.loading = true
        })

        builder.addCase(getMySalary.fulfilled, ( state, action) => {
            state.loading = false
            state.salary = action.payload.salary
            state.error = ''
        })
        builder.addCase(getMySalary.rejected, ( state, action) => {
            state.error = action.payload
        })
        
    }
})

export default salarySlice.reducer