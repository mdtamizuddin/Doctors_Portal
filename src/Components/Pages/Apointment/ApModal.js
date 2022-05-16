import React, { useState } from 'react'
import PrimaryBtn from '../../Shared/PrimaryBtn'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/firebase.init'
import axios from 'axios'
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const ApModal = ({ treatMent , date , setService }) => {
    const [user] = useAuthState(auth);
    const [error , setError] = useState('')
   
    const addAppointment = (e) =>{
        e.preventDefault()
        const treatment = e.target.treatment.value 
        const name = e.target.name.value 
        const number = e.target.number.value 
        const email = e.target.email.value 
        const slot = e.target.slot.value 
        const date = e.target.date.value 

      

        axios.post('https://mysterious-dusk-87796.herokuapp.com/appointment', {
            treatment , slot , date , name , number , email
          })
          .then((response) => {
            // console.log(response.data);
            if(response.data.success){
                setService(response)
                toast.success(`Appointment Added On ${slot} in ${date}`)
            }
            else{
                setError('You Have Another Appointment On that Time And That Day Select Another Hourse')
            }
          }, (error) => {
            // console.log(error);
          });

    }

    return (
        <div>

            <input type="checkbox" id="apointment-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="apointment-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={addAppointment} className='mx-auto mt-10 w-full px-3 mt-5'>
                        <p className='text-red-600 py-5'>{error}</p>
                        <input name='treatment' defaultValue={treatMent?.name} readOnly type="text" placeholder="Name" className="input input-bordered mb-3 w-full font-bold" />
                        <select name='slot' className="select select-bordered w-full max-w-full mb-3">
                            {
                                treatMent?.slot.map((item, index) => <option key={index}>{item}</option>)
                            }
                           
                            
                        </select>
                        <input autoComplete='off' name='date' type="text" placeholder="Your Name" 
                        value={format(date , 'PP')}
                        readOnly
                        className="input input-bordered w-full mb-3" />

                        <input autoComplete='off' name='name' type="text" placeholder="Your Name" 
                        value={user.displayName}
                        readOnly
                        className="input input-bordered w-full mb-3" />

                        <input autoComplete='off' name='number' type="text" placeholder="Phone Number" className="input input-bordered w-full mb-3" 
                        

                        />

                        <input autoComplete='off' name='email' type="email" placeholder="Your Email" 
                        value={user.email}
                        readOnly
                        className="input input-bordered w-full mb-3" />

                        <div className='flex justify-center mt-5'>
                            <PrimaryBtn>Submit</PrimaryBtn>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default ApModal