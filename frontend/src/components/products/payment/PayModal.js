import React, { useEffect, useRef, useState } from 'react'


const PayModal = ({updateData, button}) => {

  const [selectedOption, setSelectedOption] = useState('');
  const [silver, setSilver] = useState({day: '7', bill: '150'})
  const [gold, setGold] = useState(0)
  const [diamond, setDiamond] = useState(0)
  const [platinum, setPlatinum] = useState(0)
  const[pressed, setPressed] = useState([])


  console.log('button: ' + button)

  useEffect(() => {

    if (button ==='recommended'){
      setPressed(recommendedData)
    }
    if (button ==='silver'){
      setPressed(silverData)
    }
    if (button ==='gold'){
      setPressed(goldData)
    }
    if (button ==='diamond'){
      setPressed(diamondData)
    }
    if (button ==='platinum'){
      setPressed(platinumData)
    }
    
  }, [button])

  console.log('pressed:' + typeof pressed)
  



const  recommendedData = [
    {
      id: 1,
      day: 7,
      price : 100
    },
    {
      id: 2,
      day: 10,
      price : 150
    },
    {
      id: 3,
      day: 15,
      price : 200
    },

  ]
  var  silverData = [
    {
      id: 1,
      day: 7,
      price : 150
    },
    {
      id: 2,
      day: 10,
      price : 200
    },
    {
      id: 3,
      day: 15,
      price : 250
    },

  ]
  var  goldData = [
    {
      id: 1,
      day: 7,
      price : 150
    },
    {
      id: 2,
      day: 10,
      price : 200
    },
    {
      id: 3,
      day: 15,
      price : 250
    },

  ]
  var  diamondData = [
    {
      id: 1,
      day: 7,
      price : 150
    },
    {
      id: 2,
      day: 10,
      price : 200
    },
    {
      id: 3,
      day: 15,
      price : 250
    },

  ]
  var  platinumData = [
    {
      id: 1,
      day: 7,
      price : 150
    },
    {
      id: 2,
      day: 10,
      price : 200
    },
    {
      id: 3,
      day: 15,
      price : 250
    },

  ]

  console.log('typeOf: ' + typeof recommendedData)


const handleOptionChange =  (event) => {
    setSelectedOption(event.target.value)
    updateData(Number(event.target.value))
    }

    
    // console.log('value', result)


  return (

    <div>
      <div style={{ padding: '10px 20px' }}>

        <input
          // className='pay_modal_input'
          type="radio"
          value={pressed[0]?.price}
          checked={selectedOption == pressed[0]?.price}
          onChange={handleOptionChange}
        />
        <label style={{ width: '90%', marginLeft: '10px' }}>
          <div id="option1" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>{pressed[0]?.day} days</p>
            <p>{pressed[0]?.price}</p>
          </div>
        </label>

      </div>

      <div style={{ padding: '10px 20px' }}>
        <input
          // className='pay_modal_input'
          type="radio"
          value={pressed[1]?.price}
          checked={selectedOption == pressed[1]?.price}
          onChange={handleOptionChange}
        />
        <label style={{ width: '90%', marginLeft: '10px' }}>
          <div id="option2" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>{pressed[1]?.day} days</p>
            <p>{pressed[1]?.price}</p>
          </div>
        </label>

      </div>

      <div style={{ padding: '10px 20px' }}>
        <input
          // className='pay_modal_input'
          type="radio"
          value={pressed[2]?.price}
          checked={selectedOption == pressed[2]?.price}
          onChange={handleOptionChange}
        />
        <label style={{ width: '90%', marginLeft: '10px' }}>
          <div id="option3" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>{pressed[2]?.day} days</p>
            <p>{pressed[2]?.price}</p>
          </div>
        </label>
      </div>

      <p>Selected option: {selectedOption}</p>
    </div>
  
  );
}


export default PayModal