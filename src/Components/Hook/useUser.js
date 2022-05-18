
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import auth from '../Firebase/firebase.init'
import Loading from '../Loading/Loading'

const useUser = () => {


    const [user, loading] = useAuthState(auth)
    const [currentUser, setCurrent] = useState([])
    const [refetch , setRefetch] = useState('')
    const [dataLoading, setDataLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setDataLoading(true)
            fetch(`https://mysterious-dusk-87796.herokuapp.com/currentUser?email=${user?.email}`, {
                method: "get",
                headers: {
                    auth: localStorage.getItem('accessToken')
                }
            })
                .then(res => {
                    // console.log(res.status)
                    if (res.status === 200) {
                        return res.json()
                    }
                    else if( res.status === 401){
                        setRefetch(res) 
                    }
                    else{
                        setRefetch(res)
                    }
                })
                .then( json => {
                    setDataLoading(false)
                    setCurrent(json[0])
                    
                })
        }
    }, [user , refetch])

   

    if (loading) {
        return <Loading />
    }

    return { currentUser, dataLoading, loading }
}

export default useUser