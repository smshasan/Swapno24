import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    loading: false,
    success: false,
    conversation: [],
    error: ''
}


export const createConversation = createAsyncThunk('conversation/createConversation', async (conversationData) => {
    try {
        const {data} = await axios.post(`/api/v1/conversations`, conversationData)
        return data

    } catch (err) {
        return err.response.data
        
    }
})


const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(createConversation.pending, (state) => {
            state.loading = true
        })

        builder.addCase(createConversation.fulfilled, (state, action) => {
            state.success = action.payload.success 
            state.conversation = action.payload.savedConversation
        })

        builder.addCase(createConversation.rejected, (state, action) => {
         
            state.error = action.payload
        })
    }
})

export default conversationSlice.reducer