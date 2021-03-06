import React from 'react'

import { Link, Outlet } from 'react-router-dom'
import useUser from '../../Hook/useUser'

const Dashboard = () => {

    const { currentUser } = useUser()

    return (
        <>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <div className="flex-start">
                        <label htmlFor="my-drawer-2" className="btn bg-accent text-white lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    </div>
                    <Outlet />

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay" />
                    <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
                        {/* Sidebar content here */}
                        {
                            currentUser?.role === 'admin' ?
                                <li><Link to='appointments'>All Appointment</Link></li>
                                :
                                <li><Link to='appointments'>Appointment</Link></li>
                        }
                        {/* 
                        <li><Link to='reviews'>Reviews</Link></li> */}
                        {
                            currentUser?.role === 'admin' &&
                            <>
                            <li><Link to='users'>Users</Link></li>
                            
                            <li><Link to='add-doctor'>Add Doctor</Link></li>
                            <li><Link to='doctors'>Doctors</Link></li>
                            </>
                        }
                        <li><Link to='message'>Messages</Link></li>
                    </ul>
                </div>
            </div>


        </>
    )
}

export default Dashboard