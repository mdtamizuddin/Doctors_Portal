import React from 'react'

const TestCard = () => {
    return (
        <div className="card w-full bg-base-100 shadow-2xl">
            <div className="card-body">

                <p className='text-left'>It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content</p>
                <div className="card-actions mt-5 flex items-center">
                    <div className="avatar">
                        <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img alt='dfdf' src="https://api.lorem.space/image/face?hash=3174" />
                        </div>
                    </div>
                    <div className='ml-5'>
                        <h1 className='text-accent text-2xl'>Winson Herry</h1>
                        <p className='text-left'>
                        California
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TestCard