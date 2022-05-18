import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import Loading from '../../Loading/Loading'

const Doctors = () => {
    const { isLoading, data, refetch } = useQuery(['get-Doctor'], () =>
        axios('https://mysterious-dusk-87796.herokuapp.com/doctors', {
            method: "get",
            headers: {
                auth: localStorage.getItem('accessToken')
            }
        })
            .then(res => {
                return res.data
            })
    )
    function deletDoctor(id, name) {
        axios(`https://mysterious-dusk-87796.herokuapp.com/doctor/${id}`, {
            method: "delete",
            headers: {
                auth: localStorage.getItem('accessToken')
            }
        })
            .then(res => {
                toast.success(`Deleted Doctor : ${name}`)
                refetch()
                console.log(res)
            })
    }
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((doctor , index) => <tr key={doctor._id}>
                                <th className='border'>{index + 1}</th>
                                <td className='border'>
                                    <div className="avatar">
                                        <div className="w-24 rounded-xl">
                                            <img alt='doctor' src={doctor.img} />
                                        </div>
                                    </div>
                                </td>
                                <td className='border'>{doctor.name}</td>
                                <td className='border'>{doctor.email}</td>
                                <td className='border'>{doctor.specialty}</td>
                                <td className='border'>
                                    <button onClick={() => deletDoctor(doctor._id, doctor.name)} className='btn btn-sm bg-red-500 text-white'>Remove</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Doctors