import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import Footer from '../../Footer/Footer';
import ApModal from './ApModal';
import AppintMentCard from './AppintMentCard';
import Banner from './Banner'

const Appoinment = () => {
    const [date, setDate] = useState(new Date());
    const [services , setService] = useState([])
    const [treatMent , setTereatMent] = useState(null)
    useEffect(() => {
       fetch('http://localhost:5000/services')
       .then(res => res.json())
       .then(json => setService(json))
    }, [])

  return (
    <div >
        <Banner date={date} setDate={setDate}/>
        <section className='my-20 container mx-auto'>
            <h1 className='text-secondary text-center text-2xl' >Available Appointments on {format(date , 'PP')}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center  gap-10 mt-20'>
                
                {
                    services.map(service => <AppintMentCard 
                    key={service._id}
                    setTereatMent={setTereatMent}
                    service={service}
                    />)
                }
               
            </div>
            {/* {
               treatMent ? <ApModal treatMent={treatMent}/>  : console.log('nai') 
            } */}

            <ApModal treatMent={treatMent}/> 
            
            
        </section>
        <Footer />
    </div>
  )
}

export default Appoinment