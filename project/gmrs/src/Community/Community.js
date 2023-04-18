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
    
    useEffect(()=>{
      getData("get_all_game",{}).then((res)=>{setGames(res)});
    },[])
    

      //游戏列表
    let data = [
    {
      title: 'God of War Community',
      avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg?t=1650554420',
      description: "Number of People in Community: 1,300"
    },
    {
      title: 'Ant Design Title 2',
      avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1948280/header.jpg?t=1657626123',
      description: "Number of People in Community: 2,300"
    },
    {
      title: 'Ant Design Title 3',
      avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/648800/header.jpg?t=1655744208',
      description: "Number of People in Community: 1,300"
    },
    {
      title: 'Ant Design Title 4',
      avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/632470/header_alt_assets_10_schinese.jpg?t=1678977873',
      description: "Number of People in Community: 1,300"
    },
    {
        title: 'Ant Design Title 5',
        avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1985690/header.jpg?t=1663378276',
        description: "Number of People in Community: 1,300"
      },
      {
        title: 'Ant Design Title 6',
        avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.playstation.com%2Fen-us%2Fgod-of-war%2F&psig=AOvVaw3Na9cot7xxAjxRPLiOBwqH&ust=1681055853421000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNDh2pnTmv4CFQAAAAAdAAAAABAE',
        description: "Number of People in Community: 1,300"
      },
    ];

    const position = 'bottom';
    const align = 'center';

    let suggested = [
    {
      title: 'Ant Design Title 1',
      avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/648800/header.jpg?t=1655744208'
    },
    {
      title: 'Ant Design Title 2',
      avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1985690/header.jpg?t=1663378276'
    },
    ];

    function sendData(title) {
    // 在这里可以执行将数据发送到服务器或其他操作的代码
    //     const game_list = getData1("get_all_game")
    //     console.log("输出：", game_list); // 在控制台中输出数据
    //     console.log("游戏名字： ", title)
        getData("getGame",{}).then((res)=>{console.log(res)});

    }



    return useMemo(()=>{
        return (
            <div id='Community'>
                <div className='search-part2'>
                    <Search id='search' className='search' placeholder="Search for a community" enterButton="Search" size="large" onSearch={onSearch}/>


                    <div className='gameList3'>
                    <>

                    <List 
                    pagination={{ position, align, pageSize: 5 }}
                    dataSource={games} 
                    renderItem={(item) => (
                        <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src={item.url} />}
                        title={<a href=" ">{item.game_name}</a >}
                        description={"Number of "+item.number_of_people+" user in the community"}/>
                        <Link className='linktoCom' to="../Reviews">
                        <Button onClick={() => sendData(item.title)} style={{position:'relative', right:10, top:5}}>Enter  <ExportOutlined /></Button>
                        </Link>
                        </List.Item>

                    )}/>
                    </>
                    </div>

                </div>
                <div className='Suggested2'>
                    <div className='line21'>Recommended Communities</div>
                    <div className='line22'>Based on your rating, friends and so on</div>
                    <List
        itemLayout="horizontal"
        dataSource={suggested}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href="#" style={{ marginRight: '90px' }}>{item.title}</a >}
              description={<div style={{ marginRight: '90px' }}>This is the description</div>}
            />
          </List.Item>
        )}
      />
                </div>
            </div>
        )
    },[context.user, games])
}