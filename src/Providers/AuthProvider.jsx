import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({children}) => {
   const [user,setUser]=useState(null);
   const [loading,setLoading]=useState(true);

   const createUser =(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
   }
    
   const signIn = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
   }

   const logOut = ()=>{
    setLoading(true)
    return signOut(auth);
   }



   useEffect(()=>{
    const UnSubscribe=onAuthStateChanged(auth,currentUser=>{
        const userEmail = currentUser?.email || user?.email;
        const loggedUser = {email: userEmail}

        setUser(currentUser)
        setLoading(false)
        if(currentUser){
          axios.post('https://car-doctor-server-4.vercel.app/jwt', loggedUser,{withCredentials:true}) 
          .then(res=>{
            // console.log('axios post ',res.data)
          }) 
        }else{
            axios.post('https://car-doctor-server-4.vercel.app/logout',loggedUser,{withCredentials:true})
            .then(res=>{
                // console.log('Logged Out: ',res.data)
            })
        }
    })
    return ()=> {
        UnSubscribe()
    }
   },[])

    const authInfo ={
          user,loading,createUser,signIn,logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;