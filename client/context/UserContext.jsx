import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
import { animals } from '../src/assets/assets';
import { auth, db } from '../src/firebase/config'
import {getDoc,doc} from 'firebase/firestore'
import toast from 'react-hot-toast'

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

    const [userDetails,setUserDetails] = useState(null);

    const fetchUserData = async ()=> {
      auth.onAuthStateChanged(async (user)=> {
        console.log(user);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            setUserDetails(docSnap.data());
            console.log(docSnap.data());
        }
        else {
          console.log("User is not Logged In");
        }
      })
    }
  
    const handleLogout = async ()=> {
      try {
          await auth.signOut();
          window.location.href = "/login";
          toast.success("User Logged out Successfully");
      }
      catch(error) {
          toast.success("Error Logging out : ",error.message);
      }
    }
  
    useEffect(()=>{
      fetchUserData();
    },[])

    return (
        <UserContext.Provider value={{user, setUser, animals, handleLogout, userDetails}}>
            {children}
        </UserContext.Provider>
    )
}