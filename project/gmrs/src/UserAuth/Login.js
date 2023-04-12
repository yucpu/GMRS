import {TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useMemo, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Spin, message } from 'antd'
import { useData,login} from '../util/data'



const reducer = (data, action)=>{
    switch(action.type){
        case "account":
            return {...data, account:action.value}
        case "password":
            return {...data, password:action.value}
        case "disabled":
            return {...data, disabled:action.value}
        case "loading":
            return {...data, loading:action.value}
        default:
            return {...data}
    }

}


export default function LoginPage() {
    const context = useData();
    const [data, dispatch] = useReducer(reducer,{account:"sdf", password:"", disabled:"", loading:false});
    const navigate = useNavigate();

    let handleInput = (event,type) =>{
        let value = event.target.value;
        dispatch({type:type, value:value});
        console.log(data.account);      
    }

    let handleSubmit = () =>{
        dispatch({type:"disabled", value:"disable"})
        dispatch({type:"loading", value:true})
        login(data).then((auth)=>{
            console.log(auth.token)
            if(auth){
                context.dispatch({type:"token", value:auth.token}); // get toten
                context.dispatch({type:"user",value:auth.user}); // get user
                localStorage.setItem("token", auth.token);
                localStorage.setItem("user",auth.user);
            }else{
                message.error("Please enter correct password")
            }
            dispatch({type:"disabled", value:""})
            dispatch({type:"loading", value:false})
        }).then(()=>navigate("/app/store"))
    }

    return useMemo( ()=>{
        return(
            
            <div id='login' className= {"auth-form " + data.disabled}>
                <Link to="/">
                        <Button type='text' style={{width:"50px"}}>Back</Button>
                </Link>
                <Typography variant='h5'>Log in</Typography>
                <TextField variant='standard' label="Account" placeholder='Email Address / User Name' value={data.account} onChange={(event)=>{handleInput(event,"account")}}/>
                <TextField variant='standard' label="Password" type='password' value={data.password} onChange={(event)=>handleInput(event,"password")}/>
                <div>

                    <Link to="../reset">
                        <Button type='primary' size='small'>
                            Forget Password
                        </Button>
                    </Link>
                    <Button type='primary' size='small' loading={data.loading} onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
            
            )

        },
        [data]
    )
}
