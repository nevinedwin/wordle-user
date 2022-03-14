import React, {createContext } from 'react'
import { useNavigate } from 'react-router'

export const ContextData = createContext()

const StateProvider = ({children}) => {

    const navigate = useNavigate()

  return (
      <ContextData.Provider value={{navigate : navigate}}>
          {children}
      </ContextData.Provider>
    
  )
}

export default StateProvider