import {React, useEffect, useMemo, useReducer, useState} from 'react'
import { getData, postData, useData } from '../util/data'
import './Profile.css'
import { Button, Divider, Spin} from 'antd'
import { FormControl, Input, InputBase, InputLabel} from '@mui/material'

const reducer = (data, action)=>{
    switch(action.type){
        case "nickname":
            return {...data, account:action.value}
        case "email":
            return {...data, password:action.value}
        case "disabled":
            return {...data, disabled:action.value}
        case "loading":
            return {...data, loading:action.value}
        default:
            return {...data}
    }

}

const components = ["nickname","username","email","region","age","gender"]



export default function Profile() {
    const context = useData()
    let [btnState,setBtn] = useState(true);
    let [btnLoading,setBtnLoading] = useState(false);
    let basicInfo = context.state.user;

    useEffect(()=>{
        getData('user',{'id':124}).then((res) =>context.dispatch({type:"user",value:res.user}));
    },[])

    let handleClick=()=>{
        setBtn(true);
        setBtnLoading(true);
        postData("updateInfo",basicInfo).then(()=>setBtnLoading(false)).finally(()=>setBtnLoading(false));
    }

    
    return useMemo(()=>{
        
        return context.state.user ? (
            
            <div className='profile_friend_layout'>
                <div id='avatar'>
                    <h1>Profile</h1>
                    <img src={require('../resources/gamer_1.png')} width='50%'/>
                </div>
                <Divider type='vertical' style={{height:'100%'}} />
                <div id='playerInfo'>
                    <div> 
                        {components.map((item)=>(
                            <FormControl variant="standard" key={item}>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    {item} 
                                </InputLabel>
                                <InputBase className='customized' 
                                    value={basicInfo[item]} 
                                    onChange={(event)=>{context.dispatch({type:"user", value:{...basicInfo, [item]:event.target.value}})
                                            setBtn(false)
                                    }}
                                />
                            </FormControl>
                        ))}
                    </div>
                    <Button type='primary' disabled={btnState} loading={btnLoading} onClick={handleClick}>Save Changes</Button>
                </div>
            </div>
        ):(
            <div className="spin-div">
                <Spin tip="Loading...." size='large'/>
            </div>
        )
    },[context.state.user,btnState])
}
