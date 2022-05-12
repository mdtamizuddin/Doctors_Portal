import React from 'react'
import PrimaryBtn from '../Shared/PrimaryBtn'
import appointment from '../assets/images/appointment.png'
const Contact = () => {
    const contactStyle = {
        // width:"500px"
    }
    return (
        <div className='py-14 w-full  mx-auto'
        style={{backgroundImage: `url(${appointment})`}}
        >
            <h3 className='text-primary font-bold text-center text-2xl'>Contact Us</h3>
            <h1 className='text-4xl text-center mt-2 text-white'>Stay connected with us</h1>

            <form className='mx-auto mt-10 w-full px-3  lg:w-4/12' style={contactStyle}>
                <input  type="text" placeholder="Email Adress" className="input w-full max-w-full block" />
                <input  type="text" placeholder="Subject" className="mt-5 input w-full block max-w-full" />
                <textarea style={{width:'100%'}} className="textarea mt-5 flex max-w-full" placeholder="Bio"></textarea>
                <div className='flex justify-center mt-5'>
                <PrimaryBtn>Submit</PrimaryBtn>
                </div>
            </form>
        </div>
    )
}

export default Contact