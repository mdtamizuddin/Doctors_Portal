
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'


const AllUsers = () => {

    return (
        <div>
            <div className="btn-group">
                <NavLink to='all-user' className="btn btn-active">All Users</NavLink>
                <NavLink to='admins' className="btn">Admins</NavLink>
            </div>
            <Outlet />

        </div>
    )
}

export default AllUsers