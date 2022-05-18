import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import auth from '../../Firebase/firebase.init'
import useUser from '../../Hook/useUser'
import Loading from '../../Loading/Loading'

const Message = () => {
    const [message, setMessage] = useState([])
    const { currentUser } = useUser()
    const [user] = useAuthState(auth)
    const [pathName, setPath] = useState('messages')
    useEffect(() => {
        if (currentUser?.role === "admin") {
            setPath('messages-all')
        }
        else {
            setPath('messages')
        }
    }, [currentUser])
    const URL = `http://localhost:5000/${pathName}?email=${user.email}`

    const { isLoading, refetch } = useQuery(['Messages', pathName, currentUser], () => {
        if (currentUser) {
            fetch(URL, {
                method: "get",
                headers: {
                    auth: localStorage.getItem('accessToken')
                }
            })
                .then(res => {
                    return res.json()
                })
                .then(json => setMessage(json))
        }
    }
    )
    const deletMessage = (id) => {
        axios(`http://localhost:5000/messages/${id}`, {
            method: "delete",
            headers: {
                auth: localStorage.getItem('accessToken')
            }
        })
            .then(res => {
                toast.success('Message Deleted')
                refetch()
            })

    }
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h1 className='text-bold text-3xl'>Messages History</h1>
            <div className='flex flex-col-reverse'>
                {
                    message?.length > 0 ? message?.map((mail, index) => {
                        return (
                            <div key={mail._id} className='mockup-window border bg-base-200 p-5 mt-7'>
                                <p className='pb-2 font-bold'>Message No : {index + 1}</p>
                                <p>Date : {mail.time}</p>
                                {
                                    currentUser?.role === "admin" &&
                                    <button onClick={() => deletMessage(mail._id)} className='btn bg-red-500 text-white btn-sm my-4'>Delet</button>
                                }
                                <p className='text-primary font-bold'>Email :- <span className='text-accent p-2 font-normal'>{mail.email}</span></p>
                                <p className='text-primary font-bold'>Subject :- <span className='text-accent p-2 font-normal'>{mail.subject}</span></p>
                                <p className=' text-primary font-bold'> Message :-
                                    <span className='text-accent ml-5 font-normal'>
                                        {mail.message}
                                    </span>
                                </p>

                            </div>
                        )
                    })
                        :
                        <h1 className='text-center mt-48 font-bold text-4xl'>No Message</h1>
                }

            </div>
        </div>
    )
}

export default Message