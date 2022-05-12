import React from 'react'
import Card1 from '../../Shared/Card1'
import Header from './Header'

import image1 from '../../assets/icons/clock.svg'
import image2 from '../../assets/icons/marker.svg'
import image3 from '../../assets/icons/phone.svg'
import Card2 from '../../Shared/Card2'

//service section image Importing
import fluoride from '../../assets/images/fluoride.png'
import cavity from '../../assets/images/cavity.png'
import whitening from '../../assets/images/whitening.png'
//service section image Importing

import treatment from '../../assets/images/treatment.png'
import PrimaryBtn from '../../Shared/PrimaryBtn'

import doctor from '../../assets/images/doctor-small.png'
import appointment from '../../assets/images/appointment.png'
import quote from '../../assets/icons/quote.svg'
import TestCard from '../../Shared/TestCard'
import Contact from '../../Contact/Contact'
import Footer from '../../Footer/Footer'

const Home = () => {
    return (
        <main className='mb-40'>
            <Header   />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Testimonial />
            <Contact />
            <Footer />
        </main>
    )
}

export default Home

function Section2() {
    return (
        <section className=' grid lg:grid-cols-3 mt-40 container mx-auto gap-6'>
            <Card1
                img={image1}
                bg='bg-gradient-to-r from-secondary to-primary'
                title="Opening Hours"
                desc={'Lorem Ipsum is simply dummy text of the pri'}
            />
            <Card1
                img={image2}
                bg='bg-accent'
                title="Visit our location"
                desc={'Brooklyn, NY 10036, United States'}
            />
            <Card1
                img={image3}
                bg='bg-gradient-to-r from-secondary to-primary'
                title="Contact us now"
                desc={'+000 123 456789'}
            />
        </section>
    )
}

// End Section 2
function Section3() {
    return (
        <section className=''>
            <h1 className='mt-40 text-2xl text-center font-bold primary text-primary'>Our Services</h1>
            <h1 className="text-4xl lg:text-5xl text-left font-bold text-center mt-5">Services We Provide</h1>
            <div className='grid  justify-center lg:grid-cols-3 mt-20 container mx-auto gap-10'>
                <Card2
                    img={fluoride}
                    title={'Fluoride Treatment'}
                    desc={'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'}
                />
                <Card2
                    img={cavity}
                    title={'Cavity Filling'}
                    desc={'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'}
                />
                <Card2
                    img={whitening}
                    title={'Teeth Whitening'}
                    desc={'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'}
                />

            </div>


        </section>
    )
}

// section3 End Here 

function Section4() {
    return (
        <div className="hero  mt-40 flex justify-center items-center">
                <div className="hero-content flex-col lg:flex-row">
                    <img  src={treatment} alt='' className="lg:max-w-md
                    mx-w-sm rounded-lg shadow-2xl" />
                    <div className='lg:ml-20 mt-10'>
                        <h1 className="text-5xl text-left font-bold">Exceptional Dental Care, on Your Terms</h1>
                        <p className="py-6 text-left">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <div className='flex'>
                        <PrimaryBtn >
                            Get Started
                        </PrimaryBtn>
                        </div>
                    </div>
                </div>
            </div>
    )
}
// Section4 End Here 
// Section4 End Here 
// Section4 End Here 

function Section5() {
    const styles={
        backgroundImage : `url(${appointment})`,
        backgroundPosition: 'center',
        height: '530px'
    }
    const imageStyle ={
            height: "600px",
            marginTop:'-70px',
   
    }
    return(
        <section style={styles} className="hero mt-40 hero-doctor  flex justify-center items-center">
        <div className="hero-content flex-col lg:flex-row">
            <img className='lg:block hidden-image' style={imageStyle}  src={doctor} alt='34df' />
            <div className='mt-10'>
                <h1 className=" text-5xl text-white text-left font-bold">Exceptional Dental Care, on Your Terms</h1>
                <p className="py-6 text-left text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <div className='flex'>
                <PrimaryBtn >
                    Get Started
                </PrimaryBtn>
                </div>
            </div>
        </div>
    </section>
    )
}

function Testimonial() {
    return(
        <section className='container lg:mx-auto my-32 px-5'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl text-left text-primary '>Testimonial</h1>
                    <h1 className='text-3xl text-left text-accent mt-5 '>What Our Patients Says</h1>
                </div>
                <div>
                    <img className='lg:w-48 w-24' src={quote} alt="" />
                </div>
            </div>

            <div className='lg:grid-cols-3 grid  gap-8 mt-20'>
                <TestCard />
                <TestCard />
                <TestCard />
            </div>
        </section>
    )
}