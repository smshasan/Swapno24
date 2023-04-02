import {configureStore} from '@reduxjs/toolkit'


//Product
import productReducer from '../features/products/getProductSlice'
import productsByCategoryReducer  from '../features/products/productsByCategorySlice'
import productsBySubCategoryReducer from '../features/products/productsBySubCategorySlice'
import newProductReducer from '../features/products/newProductSlice'
import singleProductReducer from '../features/products/singleProductSlice'
import searchProuductsReducer from '../features/products/searchProuductsSlice'

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

//Commssion
import commssionReducer from '../features/commission/commissionSlice'

//Bank
import bankReducer from '../features/bank/bankSlice'
import withdrawReducer from '../features/bank/withdrawSlice'

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
        searchProducts: searchProuductsReducer,
        singleProduct: singleProductReducer,
        users: userReducer,
        auth: authReducer,
        category: categoryReducer,
        newProducts: newProductReducer,
        getProductsByCategory: productsByCategoryReducer,
        getProductsBySubCategory: productsBySubCategoryReducer,
        salary: salaryReducer,
        commission: commssionReducer,
        bank: bankReducer,
        withdraw: withdrawReducer,
        newStuff: newStuffReducer,
        stuff: stuffReducer,
        unapprovedProducts: unaaprovedProductsReducer,
        approvedProduct: approvedProductReducer,
        ticket: ticketReducer,
        info: infoReducer,
        conversation: conversationSlice

        
    }
})

