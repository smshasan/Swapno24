import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newTicket } from '../../features/ticket/ticketSlice'

const Ticket = () => {

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  
  const [departDate, setDepartDate] = useState('')
  const [returnDate, setReturnDate] = useState('')

  const [carName, setCarName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')


  const dispatch = useDispatch()

  const {loading, ticket, success, error} = useSelector(state => state.ticket);

useEffect(() => {

  if (error) {
    alert(error)
  }

if (success) {
      alert('Product created successfully')
}

}, [error, success])
  
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.set('from', from)
    formData.set('to', to)
    formData.set('departDate', departDate)
    formData.set('returnDate', returnDate)
    formData.set('carName', carName)

    formData.set('phone', phone)
    formData.set('email', email)
    formData.set('name', name)
   

    dispatch(newTicket(formData))
}




  return (

    <Fragment> 
      <div  className='row wrapper'>
        
        <div className='col-10 col-lg-5'>
        <h2 className='text-center text-secondary mb-50'>Buy Ticket from here </h2>
        <form className='shadow-lg' onSubmit={submitHandler} encType='multipart/form-data'>
          <div className="form-group">
            <label htmlFor="from_field">From</label>
            <input
                type="text"
                id="from_field"
                className="form-control"
                placeholder='Enter City'
                value={from}
                onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="to-field">To</label>
            <input
                type="text"
                id="to-field"
                className="form-control"
                placeholder='Enter City'
                value={to}
                onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="depart_field">Date of Journey</label>
            <input
                type="date"
                id="depart_field"
                className="form-control"
                placeholder='Pick a Date'
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="return_field">Date of Return (optional)</label>
            <input
                type="date"
                id="return_field"
                className="form-control"
                placeholder='Pick a Date'
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="car_field">Car Name</label>
            <input
                type="text"
                id="car_field"
                className="form-control"
                placeholder='Car Name'
                value={carName} 
                onChange={(e) => setCarName(e.target.value)}
            />
          </div> */}

          <div className='form-group'>

          <label htmlFor="car_field" style={{marginRight: '10px', display: 'block'}}>Car Name</label>
            <select 
                id="car_field"
                onChange={(event) => setCarName(event.target.value)}
                value={carName}
              >
                <option value="shymoli">Shaymoli</option>
                <option value="Hanif">Hanif</option>
                <option value="Dipjol">Dipjol</option>
                <option value="SR">SR</option>
                <option value="TR">TR</option>
            </select>

          </div>


          
      {/* const changeFruit = (newFruit) => {
          setCurrentFruit(newFruit)
        }
        
        return (
          <form>
            <select 
              onChange={(event) => changeFruit(event.target.value)}
              value={currentFruit}
            >
              <option value="apples">Red Apples</option>
              <option value="oranges">Outrageous Oranges</option>
              <option value="tomatoes">Technically a Fruit Tomatoes</option>
              <option value="bananas">Bodacious Bananas</option>
            </select>
          </form>
        ) */}
                



          <div className="form-group">
            <label htmlFor="name_field">Name</label>
            <input
                type="text"
                id="name_field"
                className="form-control"
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact_field">Contact Number</label>
            <input
                type="text"
                id="contact_field"
                className="form-control"
                placeholder='Phone number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
                type="email"
                id="email_field"
                className="form-control"
                placeholder='E-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
              >
                Buy Ticket
          </button>
        </form>
        </div>
      </div>      
    </Fragment>

  )

}

export default Ticket