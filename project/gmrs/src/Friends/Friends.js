import { Divider } from 'antd'
import React, { useReducer } from 'react'
import './Friends.css'
import { IconButton, InputBase, Paper} from '@mui/material'
import  SearchIcon from '@mui/icons-material/Search';
import { Space, Tag } from 'antd';
const {CheckableTag} = Tag
let prototype = {'All':false,'id':false,'region':false,'game':false}
let tags = {'All':true,'id':false,'region':false,'game':false}

const reducer = (data, action)=>{
    switch(action.type){
        case "query":
            return {...data, query:action.value}
        case "filter":
            return {...data, query:action.value}
        case "friendList":
            return {...data, query:action.value}
        case "tags":
            return {...data, tags:action.value}
        default:
            return {...data}
    }
}

export default function Friends() {
    const [data, dispatch] = useReducer(reducer, {query:"", filter:0, friendList:[],tags:tags})
    

    let handleChange=(event, type, value) =>{
        if(type == "tags"){
            let selected = {...prototype, [value]:true}
            console.log(selected)
            console.log(value)
            return dispatch({type:type,value:selected})
        }
        dispatch({type:type, value:value? value:event.target.value})
    }

    let handleSearch = () =>{
        console.log(data.query,data.filter)
    }

    return (
        <div className='profile_firend_layout'>
            <div id='friendList'>
                <div>
                    <Paper  component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", height:38 }}>
                        <InputBase 
                            sx={{ ml: 1, flex: 1,}}
                            placeholder="Search Friends"
                            value={data.query}
                            onChange={(event)=>handleChange(event,"query")}
                            
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <div style={{display:"flex"}}>
                        <span
                            style={{
                            marginRight: 8,
                            }}
                        >
                            Filter:
                        </span>
                        <Space size={[10, 10]} wrap>
                            {Object.keys(data.tags).map((item)=>(
                                <CheckableTag
                                    key={item}
                                    checked={data.tags[item]}
                                    onChange={()=>{handleChange(null,'tags',item)}}
                                >
                                    {item}
                                </CheckableTag>
                            ))}
                        </Space>
                    </div>
                </div>
                <div>
                    List
                </div>
            </div>
            <Divider type='vertical'/>
            <div id='friendInfo'>
                info
            </div>
        </div>
    )
}
