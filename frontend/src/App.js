import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 

import Topbar from './components/layout/Topbar';

import Header from './components/layout/Header';
import Home from './components/layout/Home';

//User
import Login from './components/user/Login';
import UserProfile from './components/user/userProfile.js/UserProfile';

import UsersList from './components/admin/UsersList';
import Register from './components/user/Register';
import Dashboard from './components/admin/Dashboard';

//Category
import Category from './components/admin/category/Category';
import CategoryHome from './components/layout/CategoryHome';


import Footer from './components/layout/Footer';


//Products
import UnaaprovedProducts from './components/admin/UnaaprovedProducts';
import NewProduct from './components/admin/NewProduct';
import ProductsByCategory from './components/products/ProductsByCategory';
import ProductsBySubCategory from './components/products/ProductsBySubCategory';
import NewProductsByCategory from './components/products/NewProductsByCategory';
import NewProductsBySubCategory from './components/products/newProductsBySubCategory'
import ProductsByCondition from './components/products/ProductsByCondition';

import MenuSidebar from './components/layout/menuSidebar/MenuSidebar';



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
import EditProduct from './components/user/userProfile.js/EditProduct';


function App() {

  return (

    <BrowserRouter>

      <div className="app">
        <Topbar />
        <Header />
        
        <Routes>
            
            <Route path = "/" element = {<Home />} exact />
        
            //User
            <Route path ="/login" element = {<Login />} exact />
            <Route path ="/dashboard/users" element = {<UsersList />} exact />
            <Route path = "/register" element = {<Register />} exact />
            <Route path ="/user/dashboard" element = {<UserDashboard />} exact />
            <Route path = "/user/profile" element = {<UserProfile />} exact />
            <Route path = "/product/edit/:id" element = {<EditProduct />} exact />

          
            <Route path = "/dashboard" element = {<Dashboard />} exact />
            <Route path = "/dashboard/category" element = {<Category />} exact />
           
           
            <Route path = "/products/create" element = {<NewProduct />} exact />


            <Route path = "/categories" element = {<CategoryHome />} exact />

            <Route path="/search/:keyword" element = {<SearchPage />} exact />
            
            <Route path = "/products/:status" element = {<ProductsByCondition />} exact />
            <Route path="/shop/:shop/products" element = {<ProductsByShopCategory />} exact />

            <Route path = "/product/messenger/:conId/:receiverId/:productId" element = {<ProductMessenger />} exact />

            <Route path = "/products/category/:id" element = {<ProductsByCategory />} exact />
            <Route path = "/products/sub_category/:id" element = {<ProductsBySubCategory />} exact />

            <Route path = "/products/category/:new/:id" element = {<NewProductsByCategory />} exact />
            <Route path = "/products/sub_category/:new/:id" element = {<NewProductsBySubCategory />} exact />

            <Route path="/product/:id" element = {<ProductDetails />} exact />

            <Route path = "/menuSideBar" element = {<MenuSidebar />} exact />

            


            //Stuff Admin Panel
            <Route path = "/stuff/list" element = {<StuffList />} exact />
            <Route path = "/stuff/create" element = {<NewStuff />} exact />
            <Route path = "/stuff/:id" element = {<UpdateStuff />} exact />


            //Proucts Dashboard
            <Route path = "/admin/products/unapproved" element = {<UnaaprovedProducts />} exact />


            //Ticket
            <Route path = "/ticket" element = {<Ticket />} exact />
            <Route path = "/ticket/request" element = {<TicketRequest />} exact />


            //Information
            <Route path = "/information/create" element = {<InformationCreate />} exact />
            <Route path = "/information/get" element = {<GetInformation />} exact />

            <Route path = "/messenger" element={<Messenger />} exact />
            <Route path = "/sidebarMenu" element = {<SidebarMenu />} exact />

            //Stuff Profile
            <Route path="/stuff/login" element={<StuffLogin />} exact />
            <Route path="/stuff/dashboard" element = {<StuffProfile />} exact />

            //Salary dashboard
            <Route path = "/salary/create" element = {<NewSalary />} exact />
            <Route path="/commission/create" element = {<NewCommission />} exact />
            <Route path = "/salary/withdraw/requests" element = {<WithDrawRequests />} exact />

            //Salary stuff
            <Route path="/salary/withdraw" element={<WithdrawSalary />} exact />

        </Routes>
        <Footer />

      </div>

    </BrowserRouter>
    
  );
}


export default App;
