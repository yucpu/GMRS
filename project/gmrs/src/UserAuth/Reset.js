import React, {useMemo, useReducer}from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { Typography, TextField } from '@mui/material'


const reducer = (data, action)=>{
    switch(action.type){
        case "username":
            return {...data, username:action.value}
        case "newPassword":
            return {...data, newPassword:action.value}
        case "security":
            return {...data, security:action.value}
        default:
            return {...data}
    }

}

export default function Reset() {
    const [data, dispatch] = useReducer(reducer,{username:"", security:"", newPassword:""})
    let handleInput = (event,type) =>{
        let value = event.target.value;
        dispatch({type:type, value:value});        
    }

    let handleSubmit = ()=>{
        
    }

    return useMemo(
        ()=>{
            return(
                <div id='reset' className='auth-form'>
                    <Typography variant='h5'>Reset</Typography>
                    <TextField variant='standard' label="Username/Email" placeholder='Input username/Email' focused value={data.username} onChange={(event)=>{handleInput(event,"username")}}/>
                    <TextField variant='standard' label="Security Number" placeholder='Input unique security number' focused value={data.security} onChange={(event)=>handleInput(event,"security")}/>
                    <TextField variant='standard' label="New Password" placeholder='Input new password' focused value={data.newPassword} type='password' onChange={(event)=>{handleInput(event,"newPassword")}}/>
                    <div>
                        <Link to="/">
                            <Button type='primary' size='small'>
                                Cancel
                            </Button>
                        </Link>
                        <Button size='small' type='primary'>Submit</Button>
                    </div>
                </div>                
            )
        },
        [data]
    )

}
