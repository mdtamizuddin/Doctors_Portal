import React from 'react'

const Card2 = ({img , title , desc}) => {
    return (
        <div className="card w-96 bg-base-100 shadow-2xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{title}</h2>
                <p>{desc}</p>
            </div>
        </div>

    )
}

export default Card2