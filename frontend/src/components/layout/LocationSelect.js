import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { thanas } from '../Location';

const LocationSelect = () => {


  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedThana, setSelectedThana] = useState(null);

  const navigate = useNavigate()

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    setSelectedThana(null); // Reset selected thana
  };

  const handleThanaClick = (thana) => {
    setSelectedThana(thana);
    // Perform some action when a thana is clicked
    // navigate(`/products/${address}/${location}`);

    navigate(`/products/thana/${thana}`);
    console.log(`Thana clicked: ${thana}`);
  };


  // console.log(thanas)

  return (
    <>
      <div className='container'>

        <div style={{ display: 'flex' }}>
          {/* District List */}
          <div className="col-4 col-sm-4 col-md-4">
            <h4>Districts</h4>
            <ul className='location-selec-ul'>
              {thanas.map((item, index) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <li key={index} onClick={() => handleDistrictClick(item.name)}>
                    {item.name}
                  </li>
                  <i className="fa fa-angle-right" style={{ fontSize: '12px', color: 'red' }}></i>
                </div>

              ))}
            </ul>
          </div>

          {/* Thana List */}
          {selectedDistrict && (
            <div className="col-4 col-sm-4 col-md-4" style={{ marginLeft: '20px' }}>
              <h4>Thanas in {selectedDistrict}</h4>
              <ul className='location-selec-ul'>
                {thanas.find(d => d.name === selectedDistrict).thana.map((ps, index) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <li key={index} onClick={() => handleThanaClick(ps)}>
                      {ps}
                    </li>
                    <i className="fa fa-angle-right" style={{ fontSize: '12px', color: 'red' }}></i>
                  </div>

                ))}
              </ul>
              {/* <i className="fa fa-plus" style={{fontSize:'12px', color:'red'}}></i> */}
            </div>
          )}

          {/* Selected Thana Action */}
          {/* {selectedThana && (
          <div style={{ marginLeft: '20px' }}>
            <h3>Selected Thana: {selectedThana}</h3>
            
          </div>
        )} */}

        </div>
      </div>

    </>
  )

}




export default LocationSelect;