import {configureStore} from '@reduxjs/toolkit'


//Product
import productReducer from '../features/products/getProductSlice'
import productsByCategoryReducer  from '../features/products/productsByCategorySlice'
import newProductReducer from '../features/products/newProductSlice'

//UnApproved/Approved Product
import unaaprovedProductsReducer from '../features/products/unapprovedProductSlice'
import approvedProductReducer from '../features/products/approveProductSlice'

//Auth
import authReducer  from '../features/users/authSlice'
import userReducer from '../features/users/userSlice'

//Category
import categoryReducer from '../features/category/categorySlice'


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
        users: userReducer,
        auth: authReducer,
        category: categoryReducer,
        newProducts: newProductReducer,
        getProductsByCategory: productsByCategoryReducer,
        newStuff: newStuffReducer,
        stuff: stuffReducer,
        unapprovedProducts: unaaprovedProductsReducer,
        approvedProduct: approvedProductReducer,
        ticket: ticketReducer,
        info: infoReducer,
        conversation: conversationSlice

        
    }
})

