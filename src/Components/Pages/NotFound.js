import React from 'react'
import { Link } from 'react-router-dom'
import notFound  from '../assets/images/not-found.gif'
const NotFound = () => {
    const style = {
        width : "100%",
        height: "80vh"

    }
  return (
    <div  className='flex justify-center items-center '>
        <Link to={'#'} >
        <img style={style} className='' src={notFound} alt="" />
        </Link>
    </div>
  )
}

export default NotFound