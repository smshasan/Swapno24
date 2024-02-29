import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Footer = ({ t }) => {
  return (
    <Fragment>
      <div className='footer' >

        <div className='container' style={{ padding: '20px' }}>
          <div className='row'>
            <div className='col-lg-3 col-md-3 col-sm-3 col-6'>
              <p className='footer-head'> Sell Categories</p>
              <div className='footer-body'>
                <Link to={`/shop/retail/products`}><p>{t('footer.sellCategories.retail')}</p></Link>
                <Link to={`/shop/wholesale/products`}><p>{t('footer.sellCategories.wholeSale')}</p></Link>
                <Link to={`/shop/manufacturer/products`}><p>{t('footer.sellCategories.manufacturer')}</p></Link>
              </div>

            </div>
            <div className='col-lg-3 col-md-3 col-sm-3 col-6'>
              <p className='footer-head'>About Swapno24</p>
              <div className='footer-body'>
                <Link to='/about'><p>{t('footer.aboutSwapno24.as')}</p></Link>
                <p>{t('footer.aboutSwapno24.tc')}</p>
                <Link to='/career'><p>{t('footer.aboutSwapno24.ca')}</p></Link>
                <Link to='/missions'><p>{t('footer.aboutSwapno24.miss')}</p></Link>
              </div>
            </div>

            <div className='col-lg-3 col-md-3 col-sm-3 col-6'>
              <p className='footer-head'>Customer Supports</p>
              <div className='footer-body'>
                <Link to='/faq'><p>{t('footer.customerSupports.f')}</p></Link>
                <Link to='/help-center' ><p>{t('footer.customerSupports.h')}</p></Link>
                <p>{t('footer.customerSupports.r')}</p>
                <Link to={"/information/create"}><p style={{ color: 'white' }}>{t('footer.customerSupports.c')}</p></Link>
              </div>
            </div>

            <div className='col-lg-3 col-md-3 col-sm-3 col-6'>
              <p className='footer-head'>Social Contacts</p>
              <div className='footer-body'>
                <p>{t('footer.socialContacts.f')}</p>
                <p>{t('footer.socialContacts.t')}</p>
                <p>{t('footer.socialContacts.y')}</p>
                <p>{t('footer.socialContacts.i')}</p>
                <p>{t('footer.socialContacts.l')}</p>
                <Link to="/stuff/login" className="btn" id="login_btn" style={{ color: 'rgba(33, 37, 41, 0.79)' }}>Login</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div style={{ background: 'rgb(62 64 67)', fontSize: '13px' }}>
        <div className='container text-center'>
          <p style={{ color: '#fff' }}>Copyright © Swapno24</p>
        </div>
      </div>

    </Fragment>
  )
}

export default Footer