import {configureStore} from '@reduxjs/toolkit'


//Product
import productReducer from '../features/products/getProductSlice'
import productsByCategoryReducer  from '../features/products/productsByCategorySlice'
import productsBySubCategoryReducer from '../features/products/productsBySubCategorySlice'
import newProductReducer from '../features/products/newProductSlice'
import singleProductReducer from '../features/products/singleProductSlice'

//UnApproved/Approved Product
import unaaprovedProductsReducer from '../features/products/unapprovedProductSlice'
import approvedProductReducer from '../features/products/approveProductSlice'

//Auth
import authReducer  from '../features/users/authSlice'
import userReducer from '../features/users/userSlice'

//Category
import categoryReducer from '../features/category/categorySlice'

//Salary
import salaryReducer from '../features/salary/salarySlice'

//Stuff
import newStuffReducer from '../features/stuff/newStuffSlice'
import stuffReducer from '../features/stuff/stuffSlice'


//Ticket
import ticketReducer from '../features/ticket/ticketSlice'


//Information
import infoReducer from '../features/information/informationSlice'

// import { logoutReducer } from '../features/users/authSlice'


//Conversation
import conversationSlice from '../features/messenger/conversationSlice'

 export const store = configureStore({
    
    reducer: {

        products: productReducer,
        singleProduct: singleProductReducer,
        users: userReducer,
        auth: authReducer,
        category: categoryReducer,
        newProducts: newProductReducer,
        getProductsByCategory: productsByCategoryReducer,
        getProductsBySubCategory: productsBySubCategoryReducer,
        salary: salaryReducer,
        newStuff: newStuffReducer,
        stuff: stuffReducer,
        unapprovedProducts: unaaprovedProductsReducer,
        approvedProduct: approvedProductReducer,
        ticket: ticketReducer,
        info: infoReducer,
        conversation: conversationSlice

        
    }
})

