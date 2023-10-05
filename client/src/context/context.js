import React, {useState, useContext} from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const [isLogin, setIslogin] = useState(false)
    const value = {isLogin, setIslogin}
    return(
        <AuthContext.Provider value={value}> {props.children} </AuthContext.Provider>
    )
}