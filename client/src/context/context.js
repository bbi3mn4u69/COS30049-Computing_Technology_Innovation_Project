import React, {useState, useContext} from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const [isLogin, setIslogin] = useState(true)
    const [username, setUserName] = useState('')
    const value = {
        isLogin, setIslogin,
        username, setUserName
    }
    return(
        <AuthContext.Provider value={value}> {props.children} </AuthContext.Provider>
    )
}