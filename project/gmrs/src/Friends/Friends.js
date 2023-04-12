import { Button, Divider } from 'antd'
import React, { useEffect, useMemo, useReducer } from 'react'
import './Friends.css'
import { IconButton, InputBase, Paper} from '@mui/material'
import  SearchIcon from '@mui/icons-material/Search';
import { Space, Tag, List, Avatar} from 'antd';
import { getData, useData } from '../util/data';
const {CheckableTag} = Tag
let prototype = {'friends':false,'id':false,'region':false,'game':false}
let tags = {'friends':true,'id':false,'region':false,'game':false}
let info = ['nickname', 'age', 'region', 'email', 'Games'];
const reducer = (data, action)=>{
    switch(action.type){
        case "query":
            return {...data, query:action.value}
        case "filter":
            return {...data, filter:action.value}
        case "friendList":
            return {...data, friendList:action.value}
        case "tags":
            return {...data, tags:action.value}
        case "selected":
            return {...data, selected:action.value}
        default:
            return {...data}
    }
}

export default function Friends() {
    let context = useData();
    const [data, dispatch] = useReducer(reducer, {query:"", filter:"friends", friendList:[],tags:tags, selected:null})
    
    useEffect(()=>{
        getData("friends",{id:124,filter:data.filter,query:data.query}).then((res)=>dispatch({type:"friendList",value:res.friendList}))
    },[])


    let handleChange=(event, type, value) =>{
        if(type == "tags"){
            let selected = {...prototype, [value]:true}
            dispatch({type:"filter", value: value})
            return dispatch({type:type,value:selected})
        }
        dispatch({type:type, value:value? value:event.target.value})
    }

    let handleSearch = () =>{
        getData("friends",{id:124,filter:data.filter,query:data.query}).then((res)=>dispatch({type:"friendList",value:res.friendList}))
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
                            dataSource={data.friendList}
                            renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                title={<a onClick={()=>dispatch({type:"selected",value:item.user})}>{item.user.nickname}</a>}
                                description={item.user.userID}
                                />
                            </List.Item>
                            )}
                        />
                    </div>
                </div>
                <Divider type='vertical' style={{height:'100%'}}/>
                {
                    data.selected ? 
                        <div id='friendInfo'>
                            <img src={require("../resources/gamer_1.png")} width="20%"/>
                            {info.map((itme)=>(
                                <div key={`option-${itme}`} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'80%'}}>
                                    <div>
                                        {itme}
                                    </div>
                                    <div>
                                        {
                                            data.selected[itme]
                                        }
                                    </div>
                                </div>
                            ))}
                            <Button>Remove </Button>
                        </div>
                        :
                        <div>
                        </div>
                }
                
            </div>
        )
        },
        [data]
    )

}
