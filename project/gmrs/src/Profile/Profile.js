import {React, useMemo} from 'react'
import { useData } from '../util/data'
import './Profile.css'
import { Button, Divider, Typography } from 'antd'
import { FormControl, Input, InputBase, InputLabel, OutlinedInput, TextField } from '@mui/material'

export default function Profile() {
    const context = useData()

    return useMemo(()=>{
        return (
            <div className='profile_friend_layout'>
                <div id='avatar'>
                    <h1>Profile</h1>
                    <img src={require('../resources/gamer_1.png')} width='50%'/>
                </div>
                <Divider type='vertical'/>
                <div id='playerInfo'>
                    <div> 
                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Nickname
                            </InputLabel>
                            <InputBase className='customized'/>
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Username
                            </InputLabel>
                            <InputBase className='customized'/>
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Email
                            </InputLabel>
                            <InputBase className='customized'/>
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Eegion
                            </InputLabel>
                            <InputBase className='customized'/>
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Age
                            </InputLabel>
                            <InputBase className='customized'/>
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Gender
                            </InputLabel>
                            <InputBase className='customized'/>
                        </FormControl>
                    </div>
                    <Button type='primary' disabled={true}>Save Changes</Button>
                </div>
            </div>
        )
    },[context.user])
}
