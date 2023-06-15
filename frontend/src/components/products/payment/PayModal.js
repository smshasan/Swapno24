import React, { useEffect, useRef, useState } from 'react'

const PayModal = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const radioRefs = useRef([]);
  
    // Your object options
    const options = [
      { id: 1, label: 'Option 1' },
      { id: 2, label: 'Option 2' },
      { id: 3, label: 'Option 3' }
    ];
  
    // Function to handle the selection
    const handleOptionChange = (option) => {
      setSelectedOption(option);
    };
  
    useEffect(() => {
      if (selectedOption) {
        const radioRef = radioRefs.current[selectedOption.id - 1];
        radioRef.focus();
      }
    }, [selectedOption]);
  


  // const [selectedOption, setSelectedOption] = useState('');
  // const [silver, setSilver] = useState({day: '7', bill: '150'})
  // const [gold, setGold] = useState(0)
  // const [diamond, setDiamond] = useState(0)
  // const [platinum, setPlatinum] = useState(0)

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  // const something =() => {
  //    const myElement=document.getElementById("option1")
  //    console.log(myElement)
  // }

  return (
    <div>
      {options.map((option) => (
        <label key={option.id}>
          <input
            type="radio"
            name="options"
            value={option.id}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
            ref={(ref) => (radioRefs.current[option.id - 1] = ref)}
          />
          {option.label}
        </label>
      ))}
      <p>Selected option: {selectedOption ? selectedOption.label : 'None'}</p>
    </div>

    // <div>
    //   <div style={{ padding: '10px 20px' }}>

    //     <input
    //       // className='pay_modal_input'
    //       type="radio"
    //       value={something}
    //       checked={selectedOption === silver}
    //       onChange={handleOptionChange}
    //     />
    //     <label style={{ width: '90%', marginLeft: '10px' }}>
    //       <div id="option1" style={{ display: 'flex', justifyContent: 'space-between' }}>
    //         <p>7 days</p>
    //         <p>150</p>
    //       </div>
    //     </label>

    //   </div>

    //   <div style={{ padding: '10px 20px' }}>
    //     <input
    //       // className='pay_modal_input'
    //       type="radio"
    //       value="option2"
    //       checked={selectedOption === 'option2'}
    //       onChange={handleOptionChange}
    //     />
    //     <label style={{ width: '90%', marginLeft: '10px' }}>
    //       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    //         <p>7 days</p>
    //         <p>150</p>
    //       </div>
    //     </label>

    //   </div>

    //   <div style={{ padding: '10px 20px' }}>
    //     <input
    //       // className='pay_modal_input'
    //       type="radio"
    //       value="option3"
    //       checked={selectedOption === 'option3'}
    //       onChange={handleOptionChange}
    //     />
    //     <label style={{ width: '90%', marginLeft: '10px' }}>
    //       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    //         <p>10 days</p>
    //         <p>200</p>
    //       </div>
    //     </label>
    //   </div>

    //   <p>Selected option: {selectedOption}</p>
    // </div>
  );
}

export default PayModal