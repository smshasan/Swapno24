import React from 'react'

// import { useTranslation } from "react-i18next";

const LanguageDropdown = (props) => {
  console.log(props)
  const {i18n} = {props}

  // const [t, i18n] = useTranslation('common');

  return (

    <>
      <button onClick={() => i18n.changeLanguage('en')}>en</button>
      <button onClick={() => i18n.changeLanguage('bd')}>bd</button>
    </>


    // <select>
    //     <option>Select Laguage</option>
    //     <option value={'en'}>English</option>
    //     <option value={'bd'}>Bangla</option>
    // </select>
  )
}

export default LanguageDropdown