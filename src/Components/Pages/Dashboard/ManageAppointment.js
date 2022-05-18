import axios from 'axios';
import React, { useState, Fragment, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query'
import auth from '../../Firebase/firebase.init';
import Loading from '../../Loading/Loading'

import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import PaymentModal from './PaymentModal';

const ManageAppointment = () => {
    const [user, loading] = useAuthState(auth);
    const [open, setOpen] = useState(false)
    const [openPay, setOpenPay] = useState(false)
    const [payAppointment, setPayAppointment] = useState({})
    const [delId, setDelld] = useState()
    const url = `https://mysterious-dusk-87796.herokuapp.com/appointment?email=${user.email}`;
    const { isLoading, data } = useQuery(['apointment', delId], () =>
        axios({
            method: 'get',
            url: url,
            headers : {
                'auth' : localStorage.getItem('accessToken')
            }
        })
        .then(res => res.data)
    )
    //
    const DeletAppointMent = () => {
        axios.delete(`https://mysterious-dusk-87796.herokuapp.com/appointment/${delId}`)
            .then(res => {
                // console.log(res.data)
                setDelld('')
            })

    }
    const openModal = (id) => {
        setOpen(true)
        setDelld(id)
    }
    if (isLoading || loading) {
        return (
            <Loading />
        )
    }

    return (
        <div>
            {
                openPay && <PaymentModal open={openPay} setOpen={setOpenPay} payAppointment={payAppointment}/>
            }
            <div className="overflow-x-auto w-full">
                {
                    data?.length > 0 ?
                    <table className="table-compact w-full">
                    {/* head */}
                    <thead >
                        <tr >
                            <th className='border' />
                            <th className='border'>Name</th>
                            <th className='border'>Date</th>
                            <th className='border'>Time</th>
                            <th className='border'>Treatment</th>
                            <th className='border'>Pay</th>
                            <th className='border'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            data?.map((appoint, index) => <tr className='w-full' key={appoint._id}>
                                <th className='border'>{index + 1}</th>
                                <td className='border'>{appoint.name}</td>
                                <td className='border'>{appoint.date}</td>
                                <td className='border'>{appoint.slot}</td>
                                <td className='border'>{appoint.treatment}</td>
                                <td className='border'>
                                    <button disabled={appoint.paid} onClick={() => {
                                        setPayAppointment(appoint) 
                                         setOpenPay(true)
                                         }} className='btn btn-secondary w-full  text-white'>{appoint.paid ? "Paid Done" : `Pay $${appoint.price}`}</button>
                                </td>
                                <td className='border'>
                                <button disabled={appoint.paid} onClick={() => openModal(appoint._id)} className='btn  bg-red-500  text-white w-full'>Delete</button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
                :
                <h1 className='text-center text-4xl mt-20 font-bold text-secondary'>No Apointment</h1>
                }
            </div>
            <Modal open={open} setOpen={setOpen} DeletAppointMent={DeletAppointMent} />
        </div>
    )
}

export default ManageAppointment


const Modal = ({ open, setOpen, DeletAppointMent }) => {


    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Delete Appointment
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to Delete This Appointment
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            DeletAppointMent()
                                            setOpen(false)
                                        }
                                        }
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}