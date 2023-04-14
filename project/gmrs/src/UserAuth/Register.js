import {TextField, Typography } from '@mui/material'
import {Button} from 'antd';
import { Tag } from 'antd'
import React, {useMemo, useReducer, useState} from 'react'
import {generateToken, postData} from "../util/data"
import { Link } from 'react-router-dom';

const reducer = (data, action)=>{
    switch(action.type){
        case "username":
            return {...data, username:action.value}
        case "password":
            return {...data, password:action.value}
        case "region":
            return {...data, region:action.value}
        case "email":
            return {...data, email:action.value, security:generateToken(10)}
        default:
            return {...data}
    }

}

export default function Register() {
    const [data, dispatch] = useReducer(reducer,{username:"", password:"", region:"", email:"", security:generateToken(10)})
    const [loading, setLoading] = useState(false);
    let handleInput = (event,type) =>{
        let value = event.target.value;
        dispatch({type:type, value:value});        
    }

    let handleSubmit= () =>{
        setLoading("disable");
        postData("register", data).then((res)=>{
            console.log(res);
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
            setLoading(false);
        }).finally(()=>{
            setLoading(false);
        });
    }

    return useMemo(
        ()=>{
            return(
                <div id='register' className={'auth-form ' + loading}>
                    <Typography variant='h5'>Sign Up</Typography>
                    <TextField variant='standard' label="Username" placeholder='Input username' focused value={data.username} onChange={(event)=>{handleInput(event,"username")}}/>
                    <TextField variant='standard' label="Password" placeholder='Input password' focused value={data.password} type='password' onChange={(event)=>handleInput(event,"password")}/>
                    <TextField variant='standard' label="Region" placeholder='Input region' focused value={data.region} onChange={(event)=>{handleInput(event,"region")}}/>
                    <TextField variant='standard' label="Email" placeholder='Input Email'  focused type="email" value={data.email} onChange={(event)=>handleInput(event,"email")}/>
                    <div>
                        <div>Security Number:</div>
                        <Tag>{data.security}</Tag>
                    </div>
                    <div>
                        <Link to="/">
                            <Button type='primary' size='small'>
                                Cancel
                            </Button>
                        </Link>
                        <Button size='small' type='primary' onClick={handleSubmit} loading={loading}>Submit</Button>
                    </div>
                </div>
            )  
        },
        [data,loading]
    )

}
