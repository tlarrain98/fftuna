import React, { useContext, useState } from 'react'

const UserContext = React.createContext()
const UserUpdateContext = React.createContext()

export function useUserData() {
    return useContext(UserContext)
}

export function useUserDataUpdate() {
    return useContext(UserUpdateContext)
}

export function UserContextProvider({ children }) {
    const [userData, setUserData] = useState({
        uid: '',
        username: '',
        email: ''
    })

    function updateUserData() {
        setUserData({
            uid: 'hello',
            username: 'hello',
            email: 'hello'
        })
    }

    return(
        <UserContext.Provider value={userData}>
            <UserUpdateContext.Provider value={updateUserData}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    )
}