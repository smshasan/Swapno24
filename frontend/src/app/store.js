import {configureStore} from '@reduxjs/toolkit'

import productReducer from '../features/products/getProductSlice'
import authReducer  from '../features/users/authSlice'
import userReducer from '../features/users/userSlice'
import categoryReducer from '../features/category/categorySlice'
import newProductReducer from '../features/products/newProductSlice'
import  productsByCategoryReducer  from '../features/products/productsByCategorySlice'

// import { logoutReducer } from '../features/users/authSlice'

 export const store = configureStore({
    reducer: {

        products: productReducer,
        users: userReducer,
        auth: authReducer,
        category: categoryReducer,
        newProducts: newProductReducer,
        getProductsByCategory: productsByCategoryReducer
        // logout: logoutReducer
        
    }
})

