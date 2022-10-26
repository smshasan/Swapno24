import {configureStore} from '@reduxjs/toolkit'

import productReducer from '../features/products/getProductSlice'
import authReducer  from '../features/users/authSlice'
import userReducer from '../features/users/userSlice'
import categoryReducer from '../features/category/categorySlice'
import newProductReducer from '../features/products/newProductSlice'

 export const store = configureStore({
    reducer: {

        products: productReducer,
        users: userReducer,
        auth: authReducer,
        category: categoryReducer,
        newProducts: newProductReducer
        
    }
})

