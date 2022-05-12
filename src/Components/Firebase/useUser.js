import {  onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "./firebase.init";

function useUser(params) {
    const [user , setUser] = useState({})
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                // User is signed out
                // ...
            }
        });
    }, [])
    return user
}
export default useUser