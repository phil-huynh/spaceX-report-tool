import { useState, useContext, createContext } from 'react'

const ContextStore = createContext(null);

export default function ContextProvider ({ children }) {

  const [reports, setReports] = useState([])
  const [selectedNav, setSelectedNav] = useState('spaceX')

  const updateReports = (report) => {
    setReports([...reports, report])
  }


  const store = {
    message: "testing",
    reports: reports,
    selectedNav: selectedNav,
    setReports: setReports,
    setSelectedNav: setSelectedNav,
    updateReports: updateReports,
  }

  return (
    <ContextStore.Provider value={store}>
      {children}
    </ContextStore.Provider>
  )
}

export const useStore = () => useContext(ContextStore)


