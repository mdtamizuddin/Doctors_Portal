import React from 'react'

const Card1 = ({ img, title, desc, bg }) => {
    return (

        <div className={`card card-side ${bg} shadow-xl `}>
            <figure>
                <img className='ml-5' src={img} alt="to" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-left text-white">{title}</h2>
                <p className='text-left text-white'> {desc}</p>

            </div>
        </div>
    )
}

export default Card1