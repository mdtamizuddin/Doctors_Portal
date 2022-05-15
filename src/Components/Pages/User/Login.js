import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Social from './Social'
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from '../../Firebase/firebase.init';

const Login = () => {
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

    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const location = useLocation()
    const fromLoca = location.state?.from?.pathname

    // console.log(fromLoca)
    console.log(fromLoca)
    const loginWithGmailPassword = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setSuccess(user.email + " " + "Loged In")
                navigate(fromLoca || '/')
            })
            .catch((error) => {
                const errorCode = error.code;

                if (errorCode === "auth/user-not-found") {
                    setError("User Not Found Try With Right Email Password")
                }
                else if (errorCode === "auth/wrong-password") {
                    setError("Wrong Password or Email")
                }

            });
    }

    return (
        <div style={style}>
            <div style={formStyle}>
                <h1 className='text-4xl text-center mb-14'>Login</h1>
                <form onSubmit={loginWithGmailPassword} style={formStyle} className='mx-auto mt-10 w-full px-3  lg:w-4/12'>

                    <input autoComplete='off' type="email" name='email' placeholder="Email Adress" className="input input-bordered w-full max-w-lg" />

                    <input autoComplete='off' type="password" name='password' placeholder="Password" className="input input-bordered w-full max-w-lg mt-5" />

                    <p className='text-red-500 mt-5'>{error}</p>
                     <p className='text-green-500 mt-5'>{success}</p>
                    <input type="submit" value='Login' className='btn btn-accent mt-5 w-full' />
                </form>
                <button className='ml-5  mt-5 text-primary'>Forget Password ?</button>
                <p className='text-center mt-5'>New to Doctore Portal ?

                    <Link to='/register' className='ml-5 mt-5 text-primary'>Create New Account</Link>
                </p>

                <div className="divider mt-5 w-full max-w-lg">OR</div>
                <Social />
            </div>
        </div>
    )
}

export default Login