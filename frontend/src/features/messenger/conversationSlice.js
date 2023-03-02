import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    loading: false,
    conversation: [],
    error: ''
}


export const fetchConversation = createAsyncThunk('conversation/fetchConversation', async (userId) => {
    try {
        const {data} = await axios.get(`/api/v1/conversations/${userId}`)
        
        return data
    } catch (err) {
        return err.response.data.messages
        
    }
})


const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchConversation.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchConversation.fulfilled, (state, action) => {
            state.loading = false
            state.conversation = action.payload.conversation
            state.error = ''
        })
        builder.addCase(fetchConversation.rejected, (state, action) => {
            state.loading = false
            state.conversation = []
            state.error = action.payload
        })
    }
})

export default conversationSlice.reducer