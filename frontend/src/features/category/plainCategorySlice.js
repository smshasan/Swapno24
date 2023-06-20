import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
    loading: false,
    plainCategories : [],
    error: ''
}


export const getPlainCategory = createAsyncThunk('category/getPlainCategory', async () => {

    try {
      const {data} = await axios.get('/api/v1/category/plainCategory')
      return data
  
    } catch (error) {
      return error.response.data.message
    }
  
  })


  const plainCategorySlice = createSlice({
    name: 'plainCategory',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getPlainCategory.pending, (state, action) => {
          state.loading = true
        })
         builder.addCase(getPlainCategory.fulfilled, (state, action) => { 
          state.plainCategories = action.payload.categories
         })
        builder.addCase(getPlainCategory.rejected, (state, action) => {
         
          state.error = action.payload
        })

    }
})

export default plainCategorySlice.reducer