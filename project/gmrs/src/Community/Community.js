import {React, useEffect, useMemo, useState,} from 'react'
import { getData, useData } from '../util/data'
import { AudioOutlined, ExportOutlined } from '@ant-design/icons';
import { Input,Avatar, List,Button } from 'antd';
import './Community.css';
import { Routes, Route, Link} from "react-router-dom";


export default function Community() {const context = useData()
    const { Search } = Input;  
    const onSearch = (value) => console.log(value);
    const [games, setGames] = useState([]); 
    const [suggest, setSuggest] = useState([]);

    useEffect(()=>{
      getData("get_all_game",{}).then((res)=>{setGames(res)} );
    },[])

    useEffect(()=>{
      getData("get_random_game",{}).then((sug)=>{setSuggest(sug)} );
    },[])
    

      //游戏列表
  

    const position = 'bottom';
    const align = 'center';

  
    function sendData(title) {
    // 在这里可以执行将数据发送到服务器或其他操作的代码
    //     const game_list = getData1("get_all_game")
    //     console.log("输出：", game_list); // 在控制台中输出数据
    //     console.log("游戏名字： ", title)
        getData("getGame",{}).then((res)=>{console.log(res)});

    }

    function getRandomInt(max){
      return Math.floor(Math.random() * max)
    }



    return useMemo(()=>{
      return (
        <div id='Community'>
            <div className='search-part'>
                <Search id='search' className='search' placeholder="Search for a community" enterButton="Search" size="large" onSearch={onSearch}/>
            
                <div className='gameList'>
                <List pagination={{ position, align, pageSize: 10 }}
                dataSource={games} renderItem={(item) => (
                    <List.Item
                      actions={[<Link className='linktoCom' to="../Reviews"><Button style={{position:'relative', right:10, top:5}}>Enter  <ExportOutlined /></Button></Link>]}
                    >
                    <List.Item.Meta
                    avatar={<Avatar src={item.url} shape='square' style={{width:"100px", height:"60px"}} />}
                    title={<a>{item.game_name}</a >}
                    description={"Number of "+item.number_of_people+" People in this community"}/>
                    </List.Item> 
                )}/>
                </div>
            </div>
            <div className='Suggested'>
                <div className='line21'>Recommended Communities</div>
                <div className='line22'>Based on your rating, friends and so on</div>
                <List
                  itemLayout="horizontal"
                  dataSource={suggest}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item.url} shape="square" style={{width:"100px", height:"50px"}} />}
                        title={<a style={{ marginRight: '90px' }}>{item.game_name}</a >}
                        description={"There are " + item.number_of_people + " in the community."}
                      />
                    </List.Item>
                  )}
                />
            </div>
        </div>
    )
    },[context.user, games,suggest])
}