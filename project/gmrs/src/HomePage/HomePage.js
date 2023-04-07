import {React, useMemo} from 'react'
import { useData } from '../util/data'
import { Navigate } from 'react-router-dom'

export default function HomePage() {
    const context = useData()


    return useMemo(()=>{
        if(context.user){
            return <Navigate to="app/library" />
        }else{
            return <Navigate to= "auth/"/>
        }
    },[context.user])
}
