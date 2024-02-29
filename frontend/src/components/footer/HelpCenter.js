import React from 'react'

const HelpCenter = () => {
  return (
    <>
      <div className='help-center text-center '>

        <div>
          <div style={{ backgroundColor: '#E0F8F6', height: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className='contact-top' style={{ paddingTop: '50px', maxWidth: '900px' }}>
                <h3>Get In Touch</h3>
                <p className='text-center'>We will create high-quality linkable content and build at least 40 high-authority links to each asset, paving the way for you to grow your rankings, improve the brand</p>
              </div>
            </div>
          </div>
          <div className='contactBody mx-auto' style={{ maxWidth: '1000px', backgroundColor: '#fff', borderRadius: '10px', marginTop: '-100px' }}>
            <div className='row' style={{ padding: '10px' }}>
              <div className='col-md-4 col-lg-4'>
                <div style={{ color: '#fff', backgroundColor: '#01B8B0', textAlign: 'left', padding: '10px', borderRadius: '10px', fontSize: '11px', overflow: 'hidden' }}>
                  <p style={{ fontSize: '15px', marginBottom: '5px' }}>Contact Information</p>
                  <p style={{ marginBottom: '30px', fontSize: '9px' }}>We'll create high-quality linkable content and build at least 40 high-authority</p>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <div><p><i className='fa fa-phone mr-3' style={{ fontSize: '18px' }}></i></p></div>
                    <div><p>+8801751698940 <br></br>{"   "}+8801309173276</p></div>
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <p><i className='fa fa-envelope mr-3' style={{ fontSize: '18px' }}></i>
                      swapnotv786@gmail.com</p>
                  </div>
                  <div>
                    <p><i className='fa fa-map-marker mr-4' style={{ fontSize: '18px' }}></i>
                      120 West Panthapath, Dhanmondi, Dhaka</p>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '0 !important', paddingRight: '0!important'}}>
                    <div style={{  width: '170px', height: '170px', borderRadius: '50%', color: 'red', marginRight: '-55px', marginBottom: '-55px', backgroundImage: 'linear-gradient(to left, rgba(255, 255, 160, 0), rgb(170 243 240))' }}></div>
                  </div>

                </div>
              </div>
              <div className='col-md-8 col-lg-8'>
                <input
                  type='text'
                  name='name'
                  value={'name'}
                  onChange={(e) => e.target.value}
                />

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default HelpCenter