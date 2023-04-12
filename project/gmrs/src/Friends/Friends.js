import { Divider } from 'antd'
import React, { useMemo, useReducer } from 'react'
import './Friends.css'
import { IconButton, InputBase, Paper} from '@mui/material'
import  SearchIcon from '@mui/icons-material/Search';
import { Space, Tag, List, Avatar} from 'antd';
const {CheckableTag} = Tag
let prototype = {'Friends':false,'id':false,'region':false,'game':false}
let tags = {'Friends':true,'id':false,'region':false,'game':false}

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
            return dispatch({type:type,value:selected})
        }
        dispatch({type:type, value:value? value:event.target.value})
    }

    let handleSearch = () =>{
        console.log(data.query,data.filter)
    }

    return useMemo(()=>{
        return (
            <div className='profile_friend_layout'>
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
                    <Divider></Divider>
                    <div>
                        <List
                            itemLayout="horizontal"
                            dataSource={[]}
                            renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                            )}
                        />
                    </div>
                </div>
                <Divider type='vertical' style={{height:'100%'}}/>
                <div id='friendInfo'>
                    info
                </div>
            </div>
        )
        },
        [data]
    )

}
