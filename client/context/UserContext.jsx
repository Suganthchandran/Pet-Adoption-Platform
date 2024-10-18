import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
import { animals } from '../src/assets/assets';

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user,setUser] = useState(null);

    useEffect(()=>{
        if(!user) {
            axios.get('/api/auth/profile').then(({data})=>{
                setUser(data);
                console.log(data);
            })
        }
    },[])

    return (
        <UserContext.Provider value={{user, setUser, animals}}>
            {children}
        </UserContext.Provider>
    )
}