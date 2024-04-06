import React from 'react'
import MetaData from '../layout/MetaData'

const AboutUs = () => {
    
    return (
        <>
            <div className='about-us'>
                <div style={{ backgroundColor: '#fafafa' }}>
                    <div className="container" style={{ display: 'flex', alignItems: 'center', minHeight: '300px' }}>
                        <MetaData title={'about'} />
                        <div>
                            <h2>About Swapno24.com</h2>
                            <p>
                                Launched in 2024, swapno24.com is the leading platform for national Multi trade. We serve thousands of buyers and suppliers throughout the world.
                            </p>
                        </div>
                        <div>
                            <img src='/images/about.avif' alt='image' />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container" style={{ display: 'flex', alignItems: 'center', minHeight: '300px' }}>


                        <div style={{marginRight: '30px'}}>
                            <img src='/images/mission.avif' alt='image' />
                        </div>
                        <div style={{marginLeft: '30px'}}>
                            <h2> Our Mission</h2>
                            <p>
                                As part of the Swapno24 Group, our mission is to make it easy to do business anywhere.

                                We do this by giving suppliers the tools necessary to reach a global audience for their products, and by helping buyers find products and suppliers quickly and efficiently.
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#fafafa' }}>
                    <div className="container" style={{ display: 'flex', alignItems: 'center', minHeight: '300px' }}>

                        <div style={{paddingRight: '100px'}}>
                            <h2>About Swapno24.com</h2>
                            <p>
                                Launched in 2024, swapno24.com is the leading platform for national Multi trade. We serve thousands of buyers and suppliers throughout the world.
                            </p>
                        </div>
                        <div>
                            <img src='/images/web.avif' alt='image' />
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default AboutUs