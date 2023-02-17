import React, { Fragment, useState } from 'react'

import Modal from 'react-modal';

const Location = () => {
  
  const [division, setDivision] = useState('')
  const [district, setDistrict] = useState('')
  const [thana, setThana] = useState('')
  const [union, setUnion] = useState('')
  const [ward, setWard] = useState('')
  const [village, setVillage] = useState('')


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  // Modal.setAppElement('#yourAppElement');



  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <Fragment>
      <h3 style={{ textAlign: 'center' }}>Location</h3>


      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <button onClick={closeModal}>close</button>

          <form>
            <div className="form-group">
              <label htmlFor="district_field">Division: </label>
              <input
                type="text"
                id="division_field"
                className="form-control"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="district_field">District: </label>
              <input
                type="text"
                id="district_field"
                className="form-control"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="thana_field">Thana: </label>
              <input
                type="text"
                id="thana_field"
                className="form-control"
                value={thana}
                onChange={(e) => setThana(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="union_field">Union: </label>
              <input
                type="text"
                id="union_field"
                className="form-control"
                value={union}
                onChange={(e) => setUnion(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="ward_field">Ward: </label>
              <input
                type="text"
                id="ward_field"
                className="form-control"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="village_field">Village: </label>
              <input
                type="text"
                id="village_field"
                className="form-control"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
              />
            </div>

          </form>
        </Modal>
      </div>
    </Fragment>
  )
}

export default Location