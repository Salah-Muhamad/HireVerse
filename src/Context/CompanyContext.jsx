import { createContext , useState} from "react";

export let CompanyContext = createContext();
export default function CompanyContextProvider({children}){
    const [companyData, setCompanyData] = useState(null)
    
    return <CompanyContext.Provider value={{companyData , setCompanyData}}>
        {children}
    </CompanyContext.Provider>
}