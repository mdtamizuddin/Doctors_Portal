import React, { useState } from 'react'

import appointment from '../assets/images/appointment.png'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../Firebase/firebase.init'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../Loading/Loading'
import { format } from 'date-fns'
const Contact = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const [date] = useState(new Date());
    const fromatedDate = format(date, 'PP')
    const [loading , setLoading] = useState(false)
    const contactStyle = {
        // width:"500px"
    }
    const time = fromatedDate + " " + "Time" + " " +  date.getHours() + ' h '  + date.getMinutes() + " m " +  date.getSeconds() + " s "

    function sendMessage(e) {
        e.preventDefault()
        setLoading(true)
        const email = e.target.email.value;
        const subject = e.target.subject.value;
        const message = e.target.message.value ;
        if (user) {
            fetch('https://mysterious-dusk-87796.herokuapp.com/send-contact-message', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    auth: localStorage.getItem('accessToken')
                },
                body: JSON.stringify({ email: email, subject: subject, message: message , fromEmail: user.email , time : time})
            })
                .then(res => res.json())
                .then(json => {
                    e.target.reset()
                    setLoading(false)
                   toast.success(`Message Send Success From ${user.email}`)
                })
        }
        else{
            navigate('/login')
        }
    }
    if(loading){
        return <Loading />
    }
    return (
        <>
            <div className='py-14 w-full  mx-auto'
                style={{ backgroundImage: `url(${appointment})` }}
            >
                <h3 className='text-primary font-bold text-center text-2xl'>Contact Us</h3>
                <h1 className='text-4xl text-center mt-2 text-white'>Stay connected with us</h1>

                <form onSubmit={sendMessage} className='mx-auto mt-10 w-full px-3  lg:w-4/12' style={contactStyle}>
                    <input type="text" defaultValue={user?.email} name='email' placeholder="Email Adress" className="input w-full max-w-full block" required />
                    <input type="text" name='subject' placeholder="Subject" className="mt-5 input w-full block max-w-full" required />
                    <textarea name='message' style={{ width: '100%' }} className="textarea mt-5 flex max-w-full" placeholder="Bio" required></textarea>
                    <div className='flex justify-center mt-5'>
                        <button type='submit' className='btn btn-secondary text-white'>Send Message</button>
                    </div>
                </form>

            </div>


        </>
    )
}

export default Contact