import {React, useMemo, useEffect, useState} from 'react'
import { getData, useData } from '../util/data'
import { AudioOutlined, DownOutlined } from '@ant-design/icons';
import { Input, Space, Menu, Dropdown, Avatar, List, Radio, Button } from 'antd';
import './Store.css';
import { FormControl } from '@mui/material';

export default function Store() {
    const context = useData()
    const { Search } = Input;
    const [games, setGames] = useState([]);
    const [suggest, setSuggest] = useState([]);
    
    useEffect(()=>{
      getData("get_all_game",{}).then((res)=>{setGames(res)} );
    },[])
    useEffect(()=>{
      getData("get_random_game",{}).then((sug)=>{setSuggest(sug)} );
    },[])
      
      const onSearch = (value) => console.log(value);


          //下拉菜单的子菜单
      const items1 = [
        {
          label: 'Board',
          key: '0',
        },
        {
          label: 'Card',
          key: '1',
        },
        {
          label: 'War',
          key: '2',
        },
      ];

      const items2 = [
        {
          label: 'Europe',
          key: '0',
        },
        {
          label: 'Asia',
          key: '1',
        },
        {
          label: 'America',
          key: '2',
        },
      ];
      
      const items3 = [
        {
          label: '2023',
          key: '0',
        },
        {
          label: 'In five years',
          key: '1',
        },
        {
          label: 'In ten years',
          key: '2',
        },
      ];

      const items4 = [
        {
          label: 'Default',
          key: '0',
        },
        {
          label: 'Popularity',
          key: '1',
        },
        {
          label: 'Latest',
          key: '2',
        },
      ];


      // {
      //   "Gamelist":[{title:"sf",},{},{},{}]
      // }

      
      //游戏列表
      const data = [
        {
          title: 'Ant Design Title 1',
          avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg?t=1650554420'
        },
        {
          title: 'Ant Design Title 2',
          avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1948280/header.jpg?t=1657626123'
        },
        {
          title: 'Ant Design Title 3',
          avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/648800/header.jpg?t=1655744208'
        },
        {
          title: 'Ant Design Title 4',
          avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/632470/header_alt_assets_10_schinese.jpg?t=1678977873'
        },
        {
            title: 'Ant Design Title 5',
            avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1985690/header.jpg?t=1663378276'
          },
          {
            title: 'Ant Design Title 6',
            avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.playstation.com%2Fen-us%2Fgod-of-war%2F&psig=AOvVaw3Na9cot7xxAjxRPLiOBwqH&ust=1681055853421000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNDh2pnTmv4CFQAAAAAdAAAAABAE'
          },
      ];

      const position = 'bottom';
      const align = 'center';

      const suggested = [
        {
          title: 'Ant Design Title 1',
          avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/648800/header.jpg?t=1655744208'
        },
        {
          title: 'Ant Design Title 2',
          avatar: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1985690/header.jpg?t=1663378276'
        },
      ];


    return useMemo(()=>{
        return (
            <div id='store'>
                <div className='search-part'>
                    <Search id='search' className='search' 
                    placeholder="Input names, phblishers and so on" 
                    enterButton="Search" 
                    size="large" 
                    onSearch={onSearch}/>
                    <div className='downList'>
                      {/* <FormControl variant='standard' sx={{m:1, maxWidth:120}}>

                      </FormControl> */}
                    
                    </div>
                    
                    <div className='gameList'>
                      <List 
                        
                        pagination={{ position, align, pageSize: 10 }}
                        dataSource={games} renderItem={(item) => (
                          <List.Item
                            actions={[<Button onClick={()=>console.log("Add Game")}>Add</Button>]}
                          >
                          <List.Item.Meta
                          avatar={<Avatar src={item.url} shape='square' style={{width:"100px", height:"60px"}}/>}
                          title={<a>{item.game_name}</a>}
                          description="Ant Design, a design language for background applications, is refined by Ant UED Team"/>
                          
                          </List.Item>
                      )}/>
                    </div>

                </div>

                <div className='Suggested'>
                    <div className='line1'>Games Suggested</div>
                    <div className='line2'>Based on your rating, friends and so on</div>
                    <List
                        itemLayout="horizontal"
                        dataSource={suggest}
                        renderItem={(item) => (
                          <List.Item
                           
                          >
                            <List.Item.Meta
                              avatar={<Avatar src={item.url} shape='square' style={{width:"100px", height:"50px"}}/>}
                              title={<a style={{ marginRight: '90px' }}>{item.game_name}</a>}
                              description={"There are " + item.number_of_people + " in the community."}
                            />
                          </List.Item>
                        )}
                      />
                </div>
            </div>
        )
    },[context.user, games, suggest])
}
