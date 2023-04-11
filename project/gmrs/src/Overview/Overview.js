import {React, useEffect, useMemo} from 'react'
import { useData } from '../util/data'
import './Overview.css';
import { Button, Radio, Space, Divider } from 'antd';
import { DownloadOutlined, ExportOutlined,DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function Overview(props) {
    const context = useData()
    const gameData = {
        name: "Game Title",
        publisher: "Publisher Name",
        releaseDate: "2022-01-01",
        genre: "Action",
        rating: 4.5,
        image: "https://cdn.cloudflare.steamstatic.com/steam/bundles/21056/sal6elrde3z2phvm/header_586x192.jpg?t=1621319910"
      };

    useEffect(()=>{
        console.log(props.message)

    },[props.message])
      

    return useMemo(()=>{
        return (
            <div id="Overview">
                <div className='overview-line1'>
                     {/* Implement Overview at here
                {props.message} */}
                <img src={gameData.image} />
                <div className='introduction'>
                    <p>name: {gameData.name}</p>
                    <p>publisher: {gameData.publisher}</p>
                    <p>releaseDate: {gameData.releaseDate}</p>
                    <p>genre: {gameData.genre}</p>
                    <p>rating: {gameData.rating}</p>
                    <Link to="../Community">Enter the community <ExportOutlined /></Link>
                </div> 
                </div>
                <div className='overview-line2'><Button className='Update' type="primary" icon={<DownloadOutlined />} size="large">
                Update
                </Button>
                <Button className='remove' type="primary" icon={<DeleteOutlined />} size="large">
                Remove
                </Button></div>
                
            </div>
        )
    },[context.user])
}
