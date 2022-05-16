import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

import Loading from '../../Loading/Loading'


const Admins = () => {
    const [delOpt, setDel] = useState()

    const { isLoading, data } = useQuery(['repoData', delOpt], () =>
        axios('https://mysterious-dusk-87796.herokuapp.com/user', {
            method: "get",
            headers: {
                auth: localStorage.getItem('accessToken')
            }
        })
            .then(res => res.data)

    )

    const removeAdmin = (email) => {
        // console.log(email)
        fetch(`https://mysterious-dusk-87796.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                auth: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: "am-public" })
        })
            .then(res => {

                if (res.status === 403) {
                    toast.error('Failed to Make an admin');
                }
                return res.json()
            })
            .then(data => {
                setDel(data)
                if (data.modifiedCount > 0) {

                    toast.success(`Successfully made an admin`);
                }

            })
    }
    if (isLoading) {
        return <Loading />
    }
    return (

        <div>
            <h1 className='text-center my-5 text-3xl font-bold text-secondary'>Admins</h1>

            <table className="table-compact mt-10 w-full">
                {/* head */}
                <thead>
                    <tr>

                        <th className='border'>Name</th>

                        <th className='border'>Email</th>
                        <th></th>
                        
                        <th className='border'>Delete</th>
                    </tr>
                </thead>


                <tbody>
                    {/* row 1 */}
                    {
                        data.map((users, index) => {
                            if (users.role === "admin") {
                                return (
                                    <tr key={users._id}>

                                        <td>{users?.user?.displayName}</td>
                                        <td className='flex justify-center mt-3'>{users.email}</td>

                                        <td>

                                        </td>
                                        
                                        <td> <button disabled={users.email === "mdtomiz.official@gmail.com"} onClick={() => {
                                            removeAdmin(users.email)
                                        }} className='btn btn-secondary w-full'>Remove</button></td>


                                    </tr>
                                )
                            }
                        }

                        )
                    }


                </tbody>
            </table>
        </div>
    )
}

export default Admins