import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Social from './Social'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from '../../Firebase/firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Register = () => {
    const style = {
        width: "100%",
        height: "80vh",
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center'
    }
    const formStyle = {
        width: "400px"
    }
    // Create User With Email Password 
    // Create User With Email Password 
    const [error, setError] = useState()
    const [success, setSuccess] = useState()


    const register = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                emailVarify()
                // navigate('/')
                updateName(name)
                setSuccess(`${user.email} Registerd`)
                setError('')
                createUserDb(user.email)
                e.target.reset()
            })
            .catch((error) => {
                const errorCode = error.code;
                // console.log(errorCode)
                setSuccess("")
                if (errorCode === "auth/email-already-in-use") {
                    setError("Email Alrady In Use Plz Login")
                }
                else if (errorCode === "auth/weak-password") {
                    setError("Password Last 6 character !!")
                }
            });
    }
    function emailVarify() {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                const notify = () => toast("Mail Sent Check Inbox & Verify");
                notify()
            });

    }
    function updateName(name) {
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
        }).then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }
    const createUserDb = (user) =>{
        const url = `https://mysterious-dusk-87796.herokuapp.com/user/${user}`
        axios.put(url, {
           user
        })
        .then(res => console.log(res))
    }
    return (
        <div style={style}>
            <div style={formStyle}>
                <h1 className='text-4xl text-center mb-14'>Register</h1>
                <form onSubmit={register} style={formStyle} className='mx-auto mt-10 w-full px-3  lg:w-4/12'>

                    <input autoComplete='off' type="text" name='name' placeholder="Your Name" className="input input-bordered w-full mb-5 max-w-lg" required/>

                    <input autoComplete='off' type="email" name='email' placeholder="Email Adress" className="input input-bordered w-full max-w-lg" required/>

                    <input autoComplete='off' type="password" name='password' placeholder="Password" className="input input-bordered w-full max-w-lg mt-5" required/>

                    <p className='text-red-500 mt-5'>{error}</p>
                    <p className='text-green-500 mt-5'>{success}</p>

                    <input type="submit" value='Sign Up' className='btn btn-accent mt-5 w-full' />
                </form>

                <p className='text-center mt-5'>Alrady Have Account ?

                    <Link to='/login' className='ml-5 mt-5 text-primary'>Login</Link>
                </p>

                <div className="divider mt-5 w-full max-w-lg">OR</div>
                <Social />
            </div>
            <ToastContainer
            />
        </div>
    )
}

export default Register