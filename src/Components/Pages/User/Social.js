import React from 'react'
import auth from '../../Firebase/firebase.init'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Social = () => {
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider();
    const LoginGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
             
                const user = result.user;
                navigate('/')
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                
                const email = error.email;
               console.log(errorCode , email)
            });
    }
    return (
        <button onClick={LoginGoogle} className='btn btn-outline w-full max-w-lg'>Continue With Google</button>
    )
}

export default Social