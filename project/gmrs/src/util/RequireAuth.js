
import React, { Children, useEffect, useMemo } from 'react'
import { useData } from './data'
import { Navigate } from 'react-router-dom';
import App from '../App/App';
import { message } from 'antd';

export default function RequireAuth({children}) {
    const context = useData();      
    // return useMemo(()=>{
    //     if(!context.state.user){
    //         message.error("You need to login first")
    //         return <Navigate to='/auth'/>
    //     }else{
    //         return children
    //     }
    // },[context.state.user])
    useEffect(()=>{
        if(!context.state.token){
            message.error("You need to login first")
        }
    },[context.state.token])

    if (!context.state.token){
    
        return <Navigate to="/auth"/>
    }
    return children
}


