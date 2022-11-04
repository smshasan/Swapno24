import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 

import Header from './components/layout/Header';
import Home from './components/layout/Home';

import Login from './components/user/Login';
// import DataFetch from './components/DataFetch';
import MetaData from './components/layout/MetaData';
import UsersList from './components/admin/UsersList';
import Register from './components/user/Register';
import Dashboard from './components/admin/Dashboard';
import Category from './components/admin/category/Category';

import NewProduct from './components/admin/NewProduct';
import Footer from './components/layout/Footer';

import CategoryHome from './components/layout/CategoryHome';


function App() {

  return (

    <BrowserRouter>

      <div className="app">
        <Header />
        
        <Routes>
            {/* <Route path = "/header" element={<Header />} exact /> */}
            <Route path = "/" element = {<Home />} exact />
            
            //Auth
            <Route path ="/login" element = {<Login />} exact />
            <Route path ="/dashboard/users" element = {<UsersList />} exact />
            <Route path = "/register" element = {<Register />} exact />

            //Dashboard
            <Route path = "/dashboard" element = {<Dashboard />} exact />
            <Route path = "/dashboard/category" element = {<Category />} exact />
            
            //Products
            <Route path = "/products/create" element = {<NewProduct />} exact />


            <Route path = "/categories" element = {<CategoryHome />} exact />
        </Routes>
        <Footer />

      </div>

    </BrowserRouter>
    
  );
}


export default App;
