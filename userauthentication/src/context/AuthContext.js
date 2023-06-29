import { createContext ,useState } from "react";


const AuthContext = createContext();


function Provider({children}){

    const [user_state,setUserData] = useState({
        auth:{},
        isLoggedIn:false
    });

    const setAuthenticatedUser = (user_data) =>{
        console.log(user_data)
        setUserData((prevstate)=>{
            return {...prevstate,
            auth:user_data,
            isLoggedIn:true}});

    }

    const valueToShare ={
        user_state,
        setAuthenticatedUser,
        }
        
        return(
            <AuthContext.Provider value={valueToShare}>
                {children}
            </AuthContext.Provider>
        )
}


export {Provider};
export default AuthContext;