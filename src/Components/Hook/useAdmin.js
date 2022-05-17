import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'

const useAdmin = () => {

    const { isLoading, data , refetch  } = useQuery('admins' , () =>
        axios('https://mysterious-dusk-87796.herokuapp.com/admins', {
            method: "get",
            headers: {
                auth: localStorage.getItem('accessToken')
            }
        })
            .then(res => res.data)

    )
    if(isLoading){
        return <Loading />
    }
    const admin = data
    
    return {isLoading , admin , refetch}
}

export default useAdmin