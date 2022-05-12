import React from 'react'
import './Home.css'
import heroImg from '../../assets/images/chair.png'
import PrimaryBtn from '../../Shared/PrimaryBtn'
const Header = () => {
    return (
        <header className=''>
            <div className="hero min-h-screen flex justify-center items-center">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={heroImg} alt='' className="w-md  rounded-lg shadow-2xl" />
                    <div className='lg:mr-20 mt-10'>
                        <h1 className="text-5xl text-left font-bold">Your New Smile Starts Here</h1>
                        <p className="py-6 text-left">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <div className='flex'>
                        <PrimaryBtn >
                            Get Started
                        </PrimaryBtn>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header