import {React, useMemo, useState} from 'react'
import {TextField, Typography } from '@mui/material'
import { useData } from '../util/data'
import { MinusOutlined,PlusOutlined} from '@ant-design/icons';
import { Menu, Button } from 'antd';
import { Routes, Route, Link} from "react-router-dom";
import Store from "../Overview/Overview";
import './Library.css';
import Overview from '../Overview/Overview';



export default function Library() {
    const context = useData()
    const allGames = ["Disco", "VR Chat","Tanz Biltz","Path of Exile"];
    const Myfavourites = ["Disco", "Tanz Biltz"]
    const [selectedGame, setSelectedOption] = useState(allGames[0]);

    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
      // console.log(selectedGame);


      let getInnerItem = (label,key, click)=>{
        return{
          key,
          label,
          onClick: ()=> {setSelectedOption(label)}
        }
      }
      
      const items = [
        getItem('All Games', 'sub1', <MinusOutlined />, allGames.map((option, index) =>
        getInnerItem(option,index)))
       ,
        {
          type: 'divider',
        },
        getItem('My Favourites', 'sub2', <MinusOutlined />, Myfavourites.map((option, index) =>
        getInnerItem(option, `option-${index}`))),
        
      ];


    return useMemo(()=>{
        return (
            <div id='library'>
                <div className='gameList2'>
                <Menu className='leftMenu' style={{ width: 256,}} mode="inline" items={items} />
                <div className='toStore'><PlusOutlined /> <Link className='linktoStore' to="../Store">Add Games</Link></div>
                </div>
                <div className='Overview'>
                    
                    <Overview message={selectedGame}/>
                </div>
            </div>
        )
    },[context.user, selectedGame])
}
