import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType{
    isAuthenticated:boolean;
    login: (token:string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}:{children:ReactNode})=>{
   const [ isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(()=>{
       //get the token from localstorage
       const token = localStorage.getItem("lostfound");
       if(token){
        setIsAuthenticated(!!token)
       }
   },[])

    const login = (token:string) =>{
       localStorage.setItem("lostfound",token)
       setIsAuthenticated(true)
    }

    const logout = () =>{
        localStorage.removeItem("lostfound")
        setIsAuthenticated(false)
    }
    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout}}>
             {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("Should use useAuth witin the AuthProvider")
    
    }
    return context;
}