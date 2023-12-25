import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
    loading: false,
    categories : [],
    error: ''
}


/**
 * Fetching API
 */

//Create new category
export const createCategory = createAsyncThunk('category/createCategory', async (form) => {

    try {
        const {data} = await axios.post('/api/v1/category/create', form)
        return data

    } catch (error) {
        return error.response.data.message
    }
    
})

// Get category
export const getCategory = createAsyncThunk('category/getCategory', async () => {

  try {
    const {data} = await axios.get('/api/v1/category/getCategory')
    return data

  } catch (error) {
    return error.response.data.message
  }

})

/**
 * 
 * Building category list
 */
const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];
  
    if (parentId === undefined) {
      return [
      ...categories,
      {
        _id: category._id,
          name: category.name,
          slug: category.slug,
          type: category.type,
          children: []
        },
      ];
    }
  
    for (let cat of categories) {
      if (cat._id === parentId) {
        const newCategory = {
          _id: category._id,
          name: category.name,
          slug: category.slug,
          parentId: category.parentId,
          type: category.type,
          children: []
        };
        myCategories.push({
          ...cat,
          children:
            cat.children 
              ? [...cat.children, newCategory]
              : [newCategory]
        });
      } else {
        myCategories.push({
          ...cat,
          children: cat.children
            ? buildNewCategories(parentId, cat.children, category)
            : [],
        });
      }
    }
  
    return myCategories;
  }

const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(createCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createCategory.fulfilled, (state, action) => {
            const updateCategory= buildNewCategories(state.categories, action.payload.category)
            state.loading = false
            state.categories = updateCategory
        })
        builder.addCase(createCategory.rejected, (state, action) => {
            state.error = action.payload

        })
        builder.addCase(getCategory.pending, (state, action) => {
          state.loading = true
        })
         builder.addCase(getCategory.fulfilled, (state, action) => { 
          state.loading = false
          state.categories = action.payload?.categoryList
         })
        builder.addCase(getCategory.rejected, (state, action) => {
          state.loading = false
          state.categories = action.payload
        })

    }
})

export default categorySlice.reducer