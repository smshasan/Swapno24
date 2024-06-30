import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Routes, Route, Navigate } from "react-router-dom";

import Topbar from './components/layout/Topbar';

import Header from './components/layout/Header';
import Home from './components/layout/Home';

//User
import Login from './components/user/Login';
import UserProfile from './components/user/userProfile/UserProfile';
import MyMembership from './components/user/MyMembership';

import UsersList from './components/admin/UsersList';
import Register from './components/user/Register';
import Dashboard from './components/admin/Dashboard';

//Category
import Category from './components/admin/category/Category';
import CategoryHome from './components/layout/CategoryHome';


import Footer from './components/layout/Footer';


//Products
import ProductsList from './components/admin/ProductsList';
import UnaaprovedProducts from './components/admin/UnaaprovedProducts';
import NewProduct from './components/admin/NewProduct';
import ProductsByCategory from './components/products/ProductsByCategory';
import ProductsBySubCategory from './components/products/ProductsBySubCategory';
import NewProductsByCategory from './components/products/NewProductsByCategory';
import NewProductsBySubCategory from './components/products/newProductsBySubCategory'
import ProductsByCondition from './components/products/ProductsByCondition';




// Ticket
import Ticket from './components/ticket/Ticket';
import TicketRequest from './components/ticket/TicketRequest';

//Stuff
import NewStuff from './components/admin/stuff/NewStuff';
import StuffList from './components/admin/stuff/StuffList';


import InformationCreate from './components/information/InformationCreate';
import GetInformation from './components/information/GetInformation';


//Messenger
import Messenger from './components/messenger/Messenger'
import SidebarMenu from './components/sidebarMenu/SidebarMenu';
import ProductDetails from './components/products/ProductDetails';


//Salary Dashboard
import NewSalary from './components/admin/salary/NewSalary';


import StuffProfile from './components/stuff/StuffProfile';
import StuffLogin from './components/stuff/StuffLogin';

//Salary stuff
import WithdrawSalary from './components/stuff/WithdrawSalary';
import WithDrawRequests from './components/admin/salary/WithDrawRequests';
import NewCommission from './components/admin/salary/NewCommission';
import SearchPage from './components/layout/SearchPage';
import UpdateStuff from './components/admin/stuff/UpdateStuff';
import ProductsByShopCategory from './components/products/ProductsByShopCategory';
import ProductMessenger from './components/messenger/ProductMessenger';
import UserDashboard from './components/user/UserDashboard';
import EditProduct from './components/user/userProfile/EditProduct';
import EditProfile from './components/user/userProfile/EditProfile';
import CreateMembership from './components/user/CreateMembership';
import PaymentDetails from './components/products/payment/PaymentDetails';


import {useTranslation} from "react-i18next";
import GoogleLoginButton from './components/user/GoogleLoginButton';
import axios from 'axios';
import GoogleAuth from './components/user/GoogleLogin';
import AboutUs from './components/footer/AboutUs';
import Career from './components/footer/Career';
import Missions from './components/footer/Missions';
import Faq from './components/footer/Faq';
import HelpCenter from './components/footer/HelpCenter';
import ProductsByLocation from './components/products/ProductsByLocation';
import LocationSelect from './components/layout/LocationSelect';




function App() {

  const [t, i18n] = useTranslation('common');

  const [user, setUser] = useState(null);
 
  

  return (

    <Suspense fallback="loading">
      <BrowserRouter>

        <div className="app">
          {/* <Topbar /> */}
          <Topbar t={t} i18n={i18n} />
          <Header t={t} i18n={i18n} />

          <Routes>

            <Route path="/" element={<Home t={t} i18n={i18n}/>} exact />

            {/* <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />}/> */}

            //Header
            {/* <Route path="/location" element={<ProuductsByLocation />} exact /> */}
            <Route path="/products/:address/:location" element={<ProductsByLocation />} exact />
            <Route path='/products/category/:address/:location/:id' element={<NewProductsByCategory />} exact />
            <Route path='/products/sub_category/:address/:location/:id' element={<NewProductsBySubCategory />} exact />
            <Route path='/location/select' element={<LocationSelect />} exact />

            //User
            <Route path="/login" element={<Login />} exact />
            <Route path='/google/login' element={<GoogleAuth />} exact />
            <Route path="/dashboard/users" element={<UsersList />} exact />
            <Route path="/register" element={<Register />} exact />
            <Route path="/user/dashboard" element={<UserDashboard />} exact />
            <Route path="/user/profile" element={<UserProfile />} exact />
            <Route path="/product/edit/:id" element={<EditProduct />} exact />
            <Route path="/user/profile/edit/:id" element={<EditProfile />} exact />
            <Route path="/user/membership" element={<MyMembership />} exact />
            <Route path="/user/membership/create" element={<CreateMembership />} exact />


            <Route path="/dashboard" element={<Dashboard />} exact />
            <Route path="/dashboard/category" element={<Category />} exact />


            <Route path="/categories" element={<CategoryHome />} exact />

            <Route path="/search/:keyword" element={<SearchPage />} exact />
            {/* <Route path="/search/:category" element = {<SearchPage />} exact /> */}
            
            <Route path="/admin/products/list" element={<ProductsList />} exact />
            <Route path="/products/create" element={<NewProduct />} exact />
            <Route path="/products/:status" element={<ProductsByCondition />} exact />
            <Route path="/shop/:shop/products" element={<ProductsByShopCategory />} exact />
            <Route path="/product/messenger/:conId/:receiverId/:productId" element={<ProductMessenger />} exact />
            <Route path="/products/category/:id" element={<ProductsByCategory />} exact />
            <Route path="/products/sub_category/:id" element={<ProductsBySubCategory />} exact />
            <Route path="/products/category/:new/:id" element={<NewProductsByCategory />} exact />
            <Route path="/products/sub_category/:new/:id" element={<NewProductsBySubCategory />} exact />
            <Route path="/product/:id" element={<ProductDetails />} exact />

            <Route path="/payment/details" element={<PaymentDetails />} exact />


            //Stuff Admin Panel
            <Route path="/stuff/list" element={<StuffList />} exact />
            <Route path="/stuff/create" element={<NewStuff />} exact />
            <Route path="/stuff/:id" element={<UpdateStuff />} exact />


            //Proucts Dashboard
            <Route path="/admin/products/unapproved" element={<UnaaprovedProducts />} exact />


            //Ticket
            <Route path="/ticket" element={<Ticket />} exact />
            <Route path="/ticket/request" element={<TicketRequest />} exact />


            //Information
            <Route path="/information/create" element={<InformationCreate />} exact />
            <Route path="/information/get" element={<GetInformation />} exact />

            <Route path="/messenger" element={<Messenger />} exact />
            <Route path="/sidebarMenu" element={<SidebarMenu />} exact />

            //Stuff Profile
            <Route path="/stuff/login" element={<StuffLogin />} exact />
            <Route path="/stuff/dashboard" element={<StuffProfile />} exact />

            //Salary dashboard
            <Route path="/salary/create" element={<NewSalary />} exact />
            <Route path="/commission/create" element={<NewCommission />} exact />
            <Route path="/salary/withdraw/requests" element={<WithDrawRequests />} exact />

            //Salary stuff
            <Route path="/salary/withdraw" element={<WithdrawSalary />} exact />
            <Route path='/googleLogin' element={<GoogleLoginButton />} exact />

            //Footer
            <Route path="/about" element={<AboutUs />} exact />
            <Route path='/career' element={<Career />} exact />
            <Route path='/missions' element={<Missions />} exact />
            <Route path='/faq' element={<Faq />} exact />
            <Route path='/help-center' element={<HelpCenter />} exact />

          </Routes>
          <Footer t={t}/>

        </div>

      </BrowserRouter>
    </Suspense>

  );
}


export default App;
