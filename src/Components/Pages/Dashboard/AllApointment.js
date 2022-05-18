import axios from 'axios'
import React, { useState, Fragment, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../Firebase/firebase.init'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify'
import Loading from '../../Loading/Loading'
import { useQuery } from 'react-query'


const AllApointment = () => {
    const [user] = useAuthState(auth)
    const [open, setOpen] = useState(false)
    const [delId, setDelld] = useState()
    const [apointment, setApointment] = useState([])
    const DeletAppointMent = () => {
        axios.delete(`https://mysterious-dusk-87796.herokuapp.com/appointment/${delId}`)
            .then(res => {
                refetch()
                toast.success('Apointment Deleted success')
               
            })
    }
    const openModal = (id) => {
        setOpen(true)
        setDelld(id)
    }
    const url = `https://mysterious-dusk-87796.herokuapp.com/all-appointment?email=${user.email}`;

    const { isLoading, data, refetch } = useQuery(['get-all-appointment'], () =>
        axios(url, {
            method: "get",
            headers: {
                auth: localStorage.getItem('accessToken')
            }
        })
            .then(res => {

                return res.data
            })
    )
    // Url For Get A sIngle user appoinement



    const getApoinement = (e) => {
        const URL = `https://mysterious-dusk-87796.herokuapp.com/appointment-one?email=${e.target.value}`;

        axios(URL, {
            method: "get",
            headers: {
                auth: localStorage.getItem('accessToken')
            }
        })
            .then(res => {
                setApointment(res.data)
        })
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
           
            
            <h1 className='text-center text-2xl font-bold text-secondary my-5'>Total Apoinemtnt : {data?.length}</h1>
            <div className='flex justify-center my-5'>
                <input onBlur={getApoinement} type="email" placeholder="Search here" className="input rounded-none input-bordered  w-full max-w-xs" />
                <button className='btn rounded-none text-white btn-secondary'>Search</button>
            </div>
            {
            apointment.length > 0 &&
                <div>
                    <button className='btn btn-sm text-white bg-red-400 mx-auto block my-3' onClick={()=> setApointment([])}>Clear Result</button>
                    <h1 className='text-center text-2xl mb-2'>Result : {apointment.length}</h1>
                    <table className="table-compact w-full bg-black">
                {/* head */}
                <thead>
                    <tr>
                        <th className='border text-white' />
                        <th className='border text-white'>Email</th>
                        <th className='border text-white'>Date</th>
                        <th className='border text-white'>Time</th>
                        <th className='border text-white'>Treatment</th>
                        <th className='border text-white'>Delet</th>
                        <th className='border text-white'>Mark Appointed</th>
                    </tr>
                </thead>
                <tbody>
                   
                    {
                        apointment.map((appoint, index) => <tr key={appoint._id}>
                            <th className='text-white'>{index + 1}</th>
                            <td className='text-white'>{appoint.email}</td>
                            <td className='text-white'>{appoint.date}</td>
                            <td className='text-white'>{appoint.slot}</td>
                            <td className='text-white'>{appoint.treatment}</td>
                            <td className='text-white'><button onClick={() => openModal(appoint._id)} className='btn btn-secondary w-full text-accent'>Delet</button></td>
                            <td>
                                <button className='btn btn-primary w-full bg-primary'>
                                    Mark Appointed
                                </button>
                            </td>
                        </tr>)
                    }


                </tbody>
            </table>
                </div>
            }
            <h1 className='text-center text-4xl font-bold text-secondary my-5'>All Apoinemtnt</h1>
            <table className="table-compact w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th className='border' />
                        <th className='border'>Email</th>
                        <th className='border'>Date</th>
                        <th className='border'>Time</th>
                        <th className='border'>Treatment</th>
                        <th className='border'>Delet</th>
                        <th className='border'>Mark Appointed</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        data.map((appoint, index) => <tr key={appoint._id}>
                            <th>{index + 1}</th>
                            <td>{appoint.email}</td>
                            <td>{appoint.date}</td>
                            <td>{appoint.slot}</td>
                            <td>{appoint.treatment}</td>
                            <td><button onClick={() => openModal(appoint._id)} className='btn btn-secondary w-full text-accent'>Delet</button></td>
                            <td>
                                <button className='btn btn-primary w-full bg-green-500'>
                                    Mark Appointed
                                </button>
                            </td>
                        </tr>)
                    }


                </tbody>
            </table>
            <Modal open={open} setOpen={setOpen} DeletAppointMent={DeletAppointMent} />
        </div>
    )
}

export default AllApointment


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