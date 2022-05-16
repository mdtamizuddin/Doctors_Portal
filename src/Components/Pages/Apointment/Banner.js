import React from 'react'
import heroImg from '../../assets/images/chair.png'

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Banner = ({date , setDate}) => {
    return (
        <div>
            <div className="hero min-h-96 py-20 flex justify-center items-center">
                <div className="hero-content flex-col justify-between w-full lg:flex-row-reverse">
                    <img src={heroImg} alt='' className="w-full lg:max-w-lg md:max-w-lg  rounded-lg shadow-2xl" />
                    <div className='lg:mr-20 mt-10'>
                        <DayPicker
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                        />
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner