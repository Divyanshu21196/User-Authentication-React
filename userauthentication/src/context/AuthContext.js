import { createContext ,useMemo,useState } from "react";


const AuthContext = createContext();


function Provider({children}){

    const [userState,setUserData] = useState({});
    const [isUserLoggedIn,setLoginStatus] = useState(false);

    const valueToShare ={
        userState,
        isUserLoggedIn,
        }
        
        return(
            <AuthContext.Provider value={valueToShare}>
                {children}
            </AuthContext.Provider>
        )
}


export {Provider}
export default AuthContext