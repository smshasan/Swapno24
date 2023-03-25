import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Fragment>
      <div className='footer' >
      
        <div className='container' style={{padding: '20px'}}>
          <div className='row'>
            <div className='col-lg-3'>
              <p>footer 1</p>
              <p>footer 1</p>
              <p>footer 1</p>
              <p>footer 1</p>
              <p>footer 1</p>
              <p>footer 1</p>
              <p>footer 1</p>
              <p>footer 1</p>
              <p>footer 1</p>
              <p>footer 1</p>
          
            </div>
            <div className='col-lg-3'>
              <p>footer 2</p>
              <p>footer 2</p>
              <p>footer 2</p>
              <p>footer 2</p>
              <p>footer 2</p>
              <p>footer 2</p>
              <p>footer 2</p>
              <p>footer 2</p>
              <p>footer 2</p>
              <p>footer 2</p>
            
            </div>
            <div className='col-lg-3'>
              <p>footer 3</p>
              <p>footer 3</p>
              <p>footer 3</p>
              <p>footer 3</p>
              <p>footer 3</p>
              <p>footer 3</p>
              <p>footer 3</p>
              <p>footer 3</p>
              <p>footer 3</p>
              <p>footer 3</p>
             
            </div>
            <div className='col-lg-3'>
             <p>Footer 4</p>
             <p>Footer 4</p>
             <p>Footer 4</p>
             <p>Footer 4</p>
             <p>Footer 4</p>
             <p>Footer 4</p>
             <p>Footer 4</p>
             <p>Footer 4</p>
             <p>Footer 4</p>
             <Link to="/stuff/login" className="btn ml-4" id="login_btn">Login</Link>
            </div>
          </div>
        </div>
        <div style={{background: '#fff'}}>
          <div className='container'>
            <p className='float-right'>Copyright © Swapno24</p>
          </div>

        </div>
      </div>
    </Fragment>
  )
}

export default Footer