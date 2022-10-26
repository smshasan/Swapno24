import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
// import { fetchProducts } from '../products/productSlice';

const initialState = {

    loading: false,
    users: [],
    error: ''
}

// export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
//     return axios
//         .get(`/api/v1/admin/users`)
//         .then(response => response.json())
//         .catch(err => err.response.data.message)
// })


export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {

   try {

    const {data} = await axios.get('/api/v1/admin/users')
    return data

   } catch (error) {
        return error.response.data.message
   }
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload.users
            state.error = ''
        })

        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.payload
        })
    }
})

export default userSlice.reducer