import React, { createContext, useState } from 'react'



export const HeaderLocationTextContext = createContext();

const LocationContextProvider = ({children}) => {
    
  const [buttonText, setButtonText] = useState('')

  return (
    
    <HeaderLocationTextContext.Provider  value={{ buttonText, setButtonText}}>
        {children}
    </HeaderLocationTextContext.Provider>
  )

}

export default LocationContextProvider