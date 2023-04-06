import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Fragment>
      <div className='footer' >

        <div className='container' style={{ padding: '20px' }}>
          <div className='row'>
            <div className='col-lg-3'>
              <p className='footer-head'> Sell Categories</p>
              <div className='footer-body'>
                <p>Retails</p>
                <p>Wholesales</p>
                <p>Manufactures</p>
              </div>

            </div>
            <div className='col-lg-3'>
              <p className='footer-head'>About Swapno24</p>
              <div className='footer-body'>
                <p>About Us</p>
                <p>Terms & Conditions</p>
                <p>Careers</p>
                <p>Missions</p>
              </div>
            </div>

            <div className='col-lg-3'>
              <p className='footer-head'>Customer Supports</p>
              <div className='footer-body'>
                <p>FAQ</p>
                <p>Help Center</p>
                <p>Report illegalism</p>
                <p>Sitemap</p>
              </div>
            </div>

            <div className='col-lg-3'>
              <p className='footer-head'>Social Contacts</p>
              <div className='footer-body'>
                <p>Facebook</p>
                <p>Twitter</p>
                <p>Youtube</p>
                <p>Instagram</p>
                <p>LinkedIn</p>
                <Link to="/stuff/login" className="btn" id="login_btn" style={{color: 'white'}}>Login</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div style={{background: '#afb3b9', fontSize: '14px'}}>
        <div className='container'>
        <p style={{color: 'rgb(18 18 18)'}}>Copyright © Swapno24</p>
        </div>
      </div>

    </Fragment>
  )
}

export default Footer