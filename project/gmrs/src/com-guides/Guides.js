import {React, useMemo, useState} from 'react'
import { useData } from '../util/data'
import './Guides.css';
import { Routes, Route, Link} from "react-router-dom";
import { Menu ,Rate,Button, Form, Input, InputNumber,Avatar, List,Popover} from 'antd';
import { LeftOutlined ,LikeOutlined,DislikeOutlined, MessageOutlined,BookOutlined} from '@ant-design/icons';
import { fontSize } from '@mui/system';


export default function Guides() {
  const context = useData()

  const items = [
    {
      title: 'DISCO ELYSIUM',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/bundles/21056/sal6elrde3z2phvm/header_586x192.jpg?t=1621319910',
      date:"02/23/2023",
      method:"You can update directly in the game or go to the official website to update",
      content:"After the version update, the Display leaderboard information switch (default is off) has been added in Settings - Privacy Settings. After closing, your game nickname will not be displayed in the Friends List and Social-Leaderboard, and will be replaced by Unknown Soul Master. At the same time, other friends will not be able to view it by clicking on the avatar your personal information. "
    },
  ];

  /* eslint-enable no-template-curly-in-string */
  
  const onFinish = (values) => {
    console.log(values);
  };

  const data = [
    {
      title: 'The way to pass level 1',
      content: 'rule'
    },
    {
      title: 'The way to pass level  2',
      content: 'rule'
    },
    {
      title: 'The way to pass level  3',
      content: 'rule'
    },
    {
      title: 'The way to pass level 4',
      content: 'rule'
    },
    {
        title: 'The way to pass level 5',
        content: 'rule'
      },
      {
        title: 'The way to pass level 6',
        content: 'rule'
      },
  ];
  const position = 'bottom';
  const align = 'center';

  
  return useMemo(()=>{
      return (
        <div id="Reviews">
        <div className='navigate-bar'> 
       <Menu mode="horizontal" >
       <Menu.Item key="1" >
      <Link className='linktoReview' to="../Community"><LeftOutlined />Return</Link>
      </Menu.Item>
      <Menu.Item key="2" >
      <Link className='linktoReview' to="../Reviews">Reviews</Link>
      </Menu.Item>
      <Menu.Item key="3" >
      <Link className='linktoReview' to="../Reviews">Discussions</Link>
      </Menu.Item>
      <Menu.Item key="4">
      <Link className='linktoReview' to="../Reviews">Guides</Link>
      </Menu.Item>
    </Menu>
      </div>
      <div className='houseRule'>
      <div className='leftOne'>
        <p className='rate'><BookOutlined />&nbsp;&nbsp;&nbsp;Basic House Rules</p>
       <p><b>Update date:</b>&nbsp;&nbsp; {items[0].date}</p>
       <p><b>Update method:</b>&nbsp;&nbsp; {items[0].method}</p>
       <p><b>Update content:</b>&nbsp;&nbsp; {items[0].content}</p>
        <div className='box_bottom'>
            <img src={items[0].image}></img> 
            <div className='gameName'>{items[0].title}</div>
            <div className='comment'><LikeOutlined/> <DislikeOutlined /> <MessageOutlined /> </div>
        </div>
      </div>
      <div className='rightOne'>
      <>
      
      <List pagination={{ position, align, pageSize: 4 }}
      dataSource={data} renderItem={(item) => (
          <List.Item>
          <List.Item.Meta
           avatar={
            <BookOutlined style={{ fontSize: 'large' }} />
          }
          title={<a href="https://ant.design">{item.title}</a>}/>
           <Popover content={item.content} title="Rule"><Button style={{position:'relative', right:10, top:5}}>More details</Button></Popover>
          
          </List.Item>
      )}/>
      </>
      </div>
      </div>
     
      <Form  name="nest-messages" onFinish={onFinish} > 
        <Form.Item className='discussion_input' name={['user', 'introduction']} label="Your Rule">
        <Input.TextArea />
        </Form.Item>
        <Form.Item >
        <Button className='discussion_button' type="primary" htmlType="submit">
         Submit
        </Button>
        </Form.Item>
        </Form>
    </div>
      )
  },[context.user])
}

