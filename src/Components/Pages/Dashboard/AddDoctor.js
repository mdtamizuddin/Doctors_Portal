import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../../Loading/Loading'

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [loading , setLoading] = useState(false)
    const { data: services, isLoading } = useQuery('services', () => fetch('https://mysterious-dusk-87796.herokuapp.com/services').then(res => res.json()))

    const imageStorageKey = '3c0561dfb179ef4d990d0826ae879956';

    const onSubmit = async data => {
        const image = data.image[0];
        setLoading(true)
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                if (result.success) {
                    const img = result.data.url;
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        img: img
                    }
                    // send to your database 
                    fetch('https://mysterious-dusk-87796.herokuapp.com/doctor', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success('Doctor added successfully')
                                reset();
                                setLoading(false)
                            }
                            else {
                                toast.error('Failed to add the doctor');
                            }
                        })
                }
            })
    }
    const style = {
        width: "100%",
        height: "80vh",
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center'
    }
    const formStyle = {
        width: "400px"
    }

    if (isLoading || loading) {
        return <Loading></Loading>
    }

    return (
        <div style={style}>
            <h2 className="text-3xl mt-5">Add a New Doctor</h2>
            <form className='mx-auto mt-10 w-full px-3  lg:w-4/12' style={formStyle} onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full mb-2 max-w-lg"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered w-full mb-2 max-w-lg"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide a valid Email'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register('specialty')} className="select input-bordered w-full ">
                        {
                            services.map(service => <option
                                key={service._id}
                                value={service.name}
                            >{service.name}</option>)
                        }
                    </select>
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input
                        type="file"
                        className="input input-bordered w-full mb-2 max-w-lg p-2"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is Required'
                            }
                        })}
                    />

                </div>

                <input className='btn mt-3 w-full btn-accent bg-accent text-white' type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddDoctor;