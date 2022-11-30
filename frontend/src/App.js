import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 

import Header from './components/layout/Header';
import Home from './components/layout/Home';

import Login from './components/user/Login';
// import DataFetch from './components/DataFetch';

import UsersList from './components/admin/UsersList';
import Register from './components/user/Register';
import Dashboard from './components/admin/Dashboard';
import Category from './components/admin/category/Category';

import NewProduct from './components/admin/NewProduct';
import Footer from './components/layout/Footer';

import CategoryHome from './components/layout/CategoryHome';
import ProductsByCategory from './components/products/ProductsByCategory';
import ProductsBySubCategory from './components/products/ProductsBySubCategory';
import MenuSidebar from './components/layout/menuSidebar/MenuSidebar';


import Location from './components/Location';


function App() {

  return (

    <BrowserRouter>

      <div className="app">
        <Header />
        
        <Routes>
            
            <Route path = "/" element = {<Home />} exact />
        
            <Route path ="/login" element = {<Login />} exact />
            <Route path ="/dashboard/users" element = {<UsersList />} exact />
            <Route path = "/register" element = {<Register />} exact />

          
            <Route path = "/dashboard" element = {<Dashboard />} exact />
            <Route path = "/dashboard/category" element = {<Category />} exact />
           
           
            <Route path = "/products/create" element = {<NewProduct />} exact />


            <Route path = "/categories" element = {<CategoryHome />} exact />

            <Route path = "/products/category/:id" element = {<ProductsByCategory />} exact />
            <Route path = "/products/sub_category/:id" element = {<ProductsBySubCategory />} exact />

            <Route path = "/menuSideBar" element = {<MenuSidebar />} exact />

            <Route path = "/location" element = {<Location />} exact />
        </Routes>
        <Footer />

      </div>

    </BrowserRouter>
    
  );
}


export default App;
