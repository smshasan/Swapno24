import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 

import Header from './components/layout/Header';
import Home from './components/layout/Home';
import Products from './components/layout/Products';
// import DataFetch from './components/DataFetch';


function App() {
  return (

    <BrowserRouter>

      <div className="app">
        {/* <DataFetch /> */}
       
      <Routes>
          <Route path = "/header" element={<Header />} exact />
          <Route path = "/" element = {<Home />} exact />
          <Route path = "/products" element = {<Products />} exact />
      </Routes>

      </div>

       

    </BrowserRouter>
    
  );
}

export default App;
