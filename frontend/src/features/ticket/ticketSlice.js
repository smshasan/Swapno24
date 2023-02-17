import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    success: false,
    ticket: [],
    error: ''
}

export const newTicket = createAsyncThunk('ticket/newTicket', async (ticketData) => {

    try {
        const {data} = await axios.post('/api/v1/ticket', ticketData)
        return data
    } catch (error) {
        return error.response.data.messages
    }
    
})

export const getAllTicket = createAsyncThunk('ticket/getAllTicket', async () => {
    try {
        const {data} = await axios.get(`/api/v1/ticket/get`)
        return data
    } catch (error) {
        return error.response.data.messages
    }
})


const newTicketSlice = createSlice({
    name: 'newTicket',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(newTicket.pending, (state) => {
            state.loading = true
        })

        builder.addCase(newTicket.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.ticket = action.payload.ticket
        })

        builder.addCase(newTicket.rejected, (state, action) => {
            state.loading = false
            state.ticket = []
            state.error = action.payload
        })

        builder.addCase(getAllTicket.pending, (state, action) => {
            state.loading = true
        })
        
        builder.addCase(getAllTicket.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.ticket = action.payload.tickets
    
        })

        builder.addCase(getAllTicket.rejected, (state, action) => {
            state.loading = false
            state.ticket = []
            state.error = action.payload
        })


    }
})

export default newTicketSlice.reducer