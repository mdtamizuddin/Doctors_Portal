import React from 'react'


const AppintMentCard = ({ service , setTereatMent}) => {
    
    const {slot , name , price} = service
    return (
        <div className="card lg:max-w-sm max-w-full mx-5 bg-base-100 shadow-xl">
            <div className="card-body flex flex-column justify-center items-center">
                <h2 className="card-title text-secondary">{name}</h2>
                <p>{slot.length > 0 ? slot[0] : <span className='text-red-500'>Try Another Day</span>}</p>
                <p>{slot.length} {slot.length > 1 ? "SPACES" :  "SPACE"} AVAILAVLE</p>
                <p>Payment : ${price}</p>
                <div className="card-actions justify-end">

                    <label onClick={()=> setTereatMent(service)}  disabled={slot.length===0} htmlFor='apointment-modal' className="btn mt-3 btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary">BOOK APPOINTMENT</label>
                </div>

            </div>
            
        </div>

    )
}

export default AppintMentCard