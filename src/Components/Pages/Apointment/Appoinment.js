import { format } from 'date-fns';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Footer from '../../Footer/Footer';
import Loading from '../../Loading/Loading';
import ApModal from './ApModal';
import AppintMentCard from './AppintMentCard';
import Banner from './Banner'

const Appoinment = () => {
    const [date, setDate] = useState(new Date());
    const [services, setService] = useState([])
    const [treatMent, setTereatMent] = useState(null)
    const fromatedDate = format(date, 'PP')

    // useEffect(() => {
    //    fetch()
    //    .then(res => res.json())
    //    .then(json => setService(json))
    // }, [fromatedDate])

    const url = `https://mysterious-dusk-87796.herokuapp.com/available?date=${fromatedDate}`

    const { isLoading, data } = useQuery(['Available', fromatedDate, services], () =>
        fetch(url).then(res =>
            res.json()
        )
    )

    if (isLoading) {
        return (
            <Loading />
        )
    }
    return (
        <div >
            <Banner date={date} setDate={setDate} />
            <section className='my-20 container mx-auto'>
                <h1 className='text-secondary text-center text-2xl' >Available Appointments on {format(date, 'PP')}</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center  gap-10 mt-20'>

                    {
                        data.map(service => <AppintMentCard
                            key={service._id}
                            setTereatMent={setTereatMent}
                            service={service}
                        />)
                    }

                </div>
                {/* {
               treatMent ? <ApModal treatMent={treatMent}/>  : console.log('nai') 
            } */}

                <ApModal setService={setService} date={date} treatMent={treatMent} />


            </section>
            <Footer />
        </div>
    )
}

export default Appoinment