import React from 'react'
import PrimaryBtn from '../../Shared/PrimaryBtn'

const ApModal = ({ treatMent }) => {

    return (
        <div>

            <input type="checkbox" id="apointment-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="apointment-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form className='mx-auto mt-10 w-full px-3 mt-5'>
                        <input name='treat' defaultValue={treatMent?.name} readOnly type="text" placeholder="Name" className="input input-bordered mb-3 w-full" />
                        <select className="select select-bordered w-full max-w-full mb-3">
                            {
                                treatMent?.slot.map(item => <option key={item}>{item}</option>)
                            }
                           
                            
                        </select>
                        <input autoComplete='off' name='name' type="text" placeholder="Your Name" className="input input-bordered w-full mb-3" />

                        <input autoComplete='off' name='number' type="text" placeholder="Phone Number" className="input input-bordered w-full mb-3" />

                        <input autoComplete='off' name='email' type="email" placeholder="Your Email" className="input input-bordered w-full mb-3" />

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