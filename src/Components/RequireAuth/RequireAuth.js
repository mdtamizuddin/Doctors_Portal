import React from 'react'
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../Firebase/firebase.init';
import Loading from '../Loading/Loading';
import notVerify from '../assets/icons/not-verifyed.png'
import { toast } from 'react-toastify';
const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation()
    if (user) {
        if (user.emailVerified) {
            return (
                children
            )
        }
        else {
            return (
                <VerifyEmail />
            )
        }
    }

    else if (loading) {
        return (
            <Loading />
        )
    }
    else if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

}

export default RequireAuth

const VerifyEmail = () => {
    const [sendEmailVerification, sending] = useSendEmailVerification(
        auth
    );
    if (sending) {
        return (
            <Loading />
        )
    }
    return (
        <div style={{ height: "100vh" }} className='flex justify-center w-screen items-center'>
            <div className="card w-lg bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={notVerify} alt="Shoes" className="rounded-xl max-w-sm mx-auto" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-red-500 my-5">Your Email Is Not Verifyed !!</h2>

                    <div className="card-actions">
                        <a href='https://mail.google.com/mail/u/0/#inbox' target={'_blank'} rel="noreferrer" className="btn btn-success">Check Inbox</a>
                    </div>
                    <div className="divider">OR</div>
                    <div className="card-actions">
                        <button className="btn btn-primary"
                            onClick={async () => {
                                await sendEmailVerification();
                                toast('Sent email Again');
                            }}
                        >Resend</button>
                    </div>
                </div>
            </div>

        </div>
    )
}