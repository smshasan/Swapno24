import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 

import Topbar from './components/layout/Topbar';

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

import NewProductsByCategory from './components/products/NewProductsByCategory';

import Location from './components/Location';
import ProductsByCondition from './components/products/ProductsByCondition';

// Ticket
import Ticket from './components/ticket/Ticket';

//Stuff
import NewStuff from './components/admin/stuff/NewStuff';
import StuffList from './components/admin/stuff/StuffList';
import UnaaprovedProducts from './components/admin/UnaaprovedProducts';
import TicketRequest from './components/ticket/TicketRequest';
import InformationCreate from './components/information/InformationCreate';


function App() {

  return (

    <BrowserRouter>

      <div className="app">
        <Topbar />
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

            <Route path = "/products/:status" element = {<ProductsByCondition />} exact />

            <Route path = "/products/category/:id" element = {<ProductsByCategory />} exact />
            <Route path = "/products/sub_category/:id" element = {<ProductsBySubCategory />} exact />

            <Route path = "/new/products/category/1" element = {<NewProductsByCategory />} exact />

            <Route path = "/menuSideBar" element = {<MenuSidebar />} exact />

            <Route path = "/location" element = {<Location />} exact />

            //Stuff

            
            <Route path = "/stuff/list" element = {<StuffList />} exact />
            <Route path = "/stuff/create" element = {<NewStuff />} exact />


            //Proucts Dashboard
            <Route path = "/admin/products/unapproved" element = {<UnaaprovedProducts />} exact />


            //Ticket
            <Route path = "/ticket" element = {<Ticket />} exact />
            <Route path = "/ticket/request" element = {<TicketRequest />} exact />


            //Information
            <Route path = "/information/create" element = {<InformationCreate />} exact />
        </Routes>
        <Footer />

      </div>

    </BrowserRouter>
    
  );
}


export default App;
