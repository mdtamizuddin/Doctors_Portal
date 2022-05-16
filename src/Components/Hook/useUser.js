import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useQuery } from 'react-query'
import auth from '../Firebase/firebase.init'
import Loading from '../Loading/Loading'

const useUser = () => {


    const [user, loading] = useAuthState(auth)

    // console.log(user?.email)
    const { isLoading, data } = useQuery(['repoData' , user], () =>
        axios(`https://mysterious-dusk-87796.herokuapp.com/currentuser?email=${user?.email}`, {
            method: "get",
            headers: {
                auth: localStorage.getItem('accessToken')
            }
        })
            .then(res => res.data)

    )

    if (isLoading || loading) {
        return (
            <Loading />
        )
    }

    let currentUser = data[0]
    // console.log(currentUser)
    return { currentUser }
}

export default useUser