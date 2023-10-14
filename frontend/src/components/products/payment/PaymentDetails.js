import React, { Fragment, useEffect, useState } from 'react'
import PayModal from './PayModal'


const PaymentDetails = () => {

  const [recommended, setRecommended] = useState(0)
  const [silver, setSilver] = useState(0)
  const [gold, setGold] = useState(0)
  const [diamond, setDiamond] = useState(0)
  const [platinum, setPlatinum] = useState(0)
  const [amount, setAmount] = useState(0)
  const [selectedButtonData, setSelectedButtonData] = useState('');

  const handleButtonClick = (buttonData) => {
    setSelectedButtonData(buttonData);
  };

  console.log('typeof:', typeof recommended)

  const updateData = (newData) => {
    if (selectedButtonData == 'recommended') setRecommended(newData)

    if (selectedButtonData == 'silver') setSilver(newData)

    if (selectedButtonData == 'gold') setGold(newData)

    if (selectedButtonData == 'diamond') setDiamond(newData)

    if (selectedButtonData == 'platinum') setPlatinum(newData)

  }

  useEffect(() => {
    const totalAmount = () => {
      const sum = recommended + silver + gold + diamond + platinum
      setAmount(sum)
    }
    totalAmount();
  }, [recommended, silver, gold, diamond, platinum])

  console.log('recommended: ' + recommended)

  return (
    <>
      <div className='container payment_details'>
        <div className='row'>
          <div className='col-xs-6 col-lg-6 col-md-6 col-sm-12 col-12'>
            <div className='mb-3'>
              <h4>Make your add standout</h4>
              <p>
                Get up to 20 times more responses by applying Ad Promotions. <br></br>
                Select one or more options(Optional)
              </p>

              <span className='font-italic'>Recommended</span>

              <div className='d-flex' style={{ border: '1px solid #d5d0d0', padding: '5px 10px' }}>
                <div style={{ width: '70%' }}>
                  Urgent Bundle! Sell faster for less!
                  <ul>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                  </ul>
                </div>
                <div className='w-30 d-flex align-items-center justify-content-end' style={{ width: '30%' }}>
                  <p>From Tk. 100</p>
                  <button type="button" className="btn btn-primary pay_option_button" data-toggle="modal" data-target="#paymentModalRecommended" >
                    <i className='fa fa-plus' onClick={() => handleButtonClick('recommended')}></i>
                  </button>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgb(232 235 235)' }}>
              <div className='d-flex' style={{ borderBottom: '1px solid #d5d0d0', padding: '5px 10px' }}>
                <div style={{ width: '70%' }}>
                  Silver Package! Sell faster for less!
                  <ul>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                  </ul>
                </div>
                <div className='w-30 d-flex align-items-center justify-content-end' style={{ width: '30%' }}>
                  <p>From Tk. 150</p>
                  <button type="button" className="btn btn-primary pay_option_button" data-toggle="modal" data-target="#paymentModalSilver" >
                    <i className='fa fa-plus' onClick={() => handleButtonClick('silver')}></i>
                  </button>
                </div>
              </div>
              <div className='d-flex' style={{ borderBottom: '1px solid #d5d0d0', padding: '5px 10px' }}>
                <div style={{ width: '70%' }}>
                  Gold Package! Sell faster for less!
                  <ul>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                  </ul>
                </div>
                <div className='w-30 d-flex align-items-center justify-content-end' style={{ width: '30%' }}>
                  <p>From Tk. 250</p>
                  <button type="button" className="btn btn-primary pay_option_button" data-toggle="modal" data-target="#paymentModalGold" >
                    <i className='fa fa-plus' onClick={() => handleButtonClick('gold')}></i>
                  </button>
                </div>
              </div>
              <div className='d-flex' style={{ borderBottom: '1px solid #d5d0d0', padding: '5px 10px' }}>
                <div style={{ width: '70%' }}>
                  Diamond Package! Sell faster for less!
                  <ul>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                  </ul>
                </div>
                <div className='w-30 d-flex align-items-center justify-content-end' style={{ width: '30%' }}>
                  <p>From Tk. 300</p>
                  <button type="button" className="btn btn-primary pay_option_button" data-toggle="modal" data-target="#paymentModalDiamond" >
                    <i className='fa fa-plus' onClick={() => handleButtonClick('diamond')}></i>
                  </button>
                </div>
              </div>
              <div className='d-flex' style={{ borderBottom: '1px solid #d5d0d0', padding: '5px 10px' }}>
                <div style={{ width: '70%' }}>
                  Platinum Package! Sell faster for less!
                  <ul>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                    <li>Ad will be promoted as Urgent for 3 days</li>
                  </ul>
                </div>
                <div className='w-30 d-flex align-items-center justify-content-end' style={{ width: '30%' }}>
                  <p>From Tk. 350</p>
                  <button type="button" className="btn btn-primary pay_option_button" data-toggle="modal" data-target="#paymentModalPlatinum" >
                    <i className='fa fa-plus' onClick={() => handleButtonClick('platinum')}></i>
                  </button>
                </div>
              </div>
            </div>

          </div>
          <div className='col-xs-6 col-lg-6 col-md-6 col-sm-6 col-12'>
            <div>
              <h4>Your ad is under review!</h4>
              <p>Please note that it can take up to 3 hours for your ad to be published. Keep track of your ad through My Ads.</p>
              <p>We will contact you shortly if payment is required to publish your ad.</p>
            </div>
            <div className='payment_summary' style={{ backgroundColor: 'rgb(232, 235, 235)', padding: '10px 20px' }}>
              <h4>Payment Summary</h4>
              {recommended > 0 &&
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Top Add</span>
                  <span>Tk. {recommended}</span>
                </div>
              }

              {silver > 0 &&
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Top Add</span>
                  <span>Tk. {silver}</span>
                </div>
              }
              {gold > 0 &&
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Top Add</span>
                  <span>Tk. {gold}</span>
                </div>
              }
              {diamond > 0 &&
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Top Add</span>
                  <span>Tk. {diamond}</span>
                </div>
                
              }
              {platinum > 0 &&
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Top Add</span>
                  <span>Tk. {platinum}</span>
                </div>
              }

              <hr></hr>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Amount</span>
                <span>Tk. {amount}</span>
              </div>
            </div>

            <div className='payment_online'>
              <p>Pay Online</p>
              <img className="gateway_image" src='/images/payment.png' />

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>Pay Bill</button>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Fragment>
        <div className="modal fade" id="paymentModalRecommended" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body" style={{ padding: 0 }}>
                <PayModal updateData={updateData} button={selectedButtonData} />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
      <Fragment>
        <div className="modal fade" id="paymentModalSilver" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body" style={{ padding: 0 }}>
                <PayModal updateData={updateData} button={selectedButtonData} />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
      <Fragment>
        <div className="modal fade" id="paymentModalGold" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body" style={{ padding: 0 }}>
                <PayModal updateData={updateData} button={selectedButtonData} />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
      <Fragment>
        <div className="modal fade" id="paymentModalDiamond" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body" style={{ padding: 0 }}>
                <PayModal updateData={updateData} button={selectedButtonData} />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
      <Fragment>
        <div className="modal fade" id="paymentModalPlatinum" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body" style={{ padding: 0 }}>
                <PayModal updateData={updateData} button={selectedButtonData}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  )
}

export default PaymentDetails