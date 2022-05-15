import React from 'react'
import loading from '../assets/loading.gif'
const Loading = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
        <img src={loading} alt="" />
    </div>
  )
}

export default Loading