import React from 'react'

const Carousel = () => {
  return (
    <>
        <div className='carousel-outer' style={{width: '100%', height: '400px',  marginBottom: '85px', display: 'flex', justifyContent: 'center',
        
      }}>
            <div className='carousel-inner' style={{ backgroundImage: "url('https://the7.io/elementor-main/wp-content/uploads/sites/77/2022/02/layered-waves-row-0.svg')",
          transition: 'background .3s,border-radius .3s,opacity .3s'
          }}>
            
            </div>
            {/* <h3 className='text-center' style={{color: 'white', marginTop: '30px'}}>Find your necessary products with affordable prices from us.</h3> */}
                

        </div>
    </>
  )
}

export default Carousel
// backgroundImage: linear-gradient(90deg, #00347D 0%, #0159D3 100%)