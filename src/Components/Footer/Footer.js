import React from 'react'
import { Link } from 'react-router-dom'
import footer from '../assets/images/footer.png'
const Footer = () => {
    return (
        <footer className='pt-28 ' style={{backgroundImage: `url(${footer})`,
        backgroundPosition : 'center'
        }}>
            <main className='container mx-auto'>
                <section className='lg:flex justify-between px-5'>
                    <div className='flex flex-col '>
                        <h5 className='text-neutral font-bold text-1xl text-accent pb-2'>SERVICES</h5>
                        <Link className='link link-hover text-accent mb-2' to='/'>Emergency Checkup</Link>
                        <Link className='link link-hover text-accent mb-2' to='/'>Monthly Checkup</Link>
                        <Link className='link link-hover text-accent mb-2' to='/'>Weekly Checkup</Link>
                        <Link className='link link-hover text-accent mb-2' to='/'>Deep Checkup</Link>
                    </div>
                    <div className='flex flex-col  my-7 lg:my-0'>
                        <h5 className='font-bold text-1xl text-accent pb-2 text-neutral'>ORAL HEALTH</h5>
                        <Link className='link link-hover text-accent mb-2' to='/'>Fluride Treatment</Link>
                        <Link className='link link-hover text-accent mb-2' to='/'>Cavity Filling</Link>
                        <Link className='link link-hover text-accent mb-2' to='/'>Teath Whitening</Link>
                    </div>
                    <div className='flex flex-col '>
                        <h5 className='text-neutral font-bold text-1xl text-accent pb-2'>SERVICES</h5>
                        <Link className='link link-hover' to='/'>New Work - 101010 Hudson</Link>
                        
                    </div>
                </section>
            </main>
            <p className="text-center mt-10 ">
            Copyright 2022 All Rights Reserved
            </p>
        </footer>
    )
}

export default Footer