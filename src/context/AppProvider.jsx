import React,{createContext,useState} from 'react'

const AppContext = createContext();

const AppProvider = ({children}) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    

    const values = {
        isSidebarOpen,
        setIsSidebarOpen,
        
    };
  return (
    <>
    <AppContext.Provider value={values}>
        {children}
    </AppContext.Provider>
    </>
  )
}

export {AppContext};
export default AppProvider
