import {React, useMemo, useState} from 'react'
import { useData } from '../util/data'
import './Discussions.css';
import { Routes, Route, Link} from "react-router-dom";
import { Menu ,Rate,Button, Form, Input, InputNumber} from 'antd';
import { LeftOutlined ,LikeOutlined,DislikeOutlined, MessageOutlined,CommentOutlined} from '@ant-design/icons';


export default function Discussions() {
  const context = useData()

  const items = [
    {
      title: 'DISCO ELYSIUM',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/bundles/21056/sal6elrde3z2phvm/header_586x192.jpg?t=1621319910',
      Comment: "How to pass the first level",
      content:"In this level, you'll need to keep the dance floor packed by hitting the beats in time with the music. Use the arrow keys to move your character and the space bar to hit the beat. Watch the beat indicator at the top of the screen to time your moves correctly.Start by getting into the rhythm of the music. Listen for the beat and try to hit it consistently. As you get more comfortable, start adding in some fancy footwork to keep the crowd entertained."
    },
    {
        title: 'DISCO ELYSIUM',
        image: 'https://cdn.cloudflare.steamstatic.com/steam/bundles/21056/sal6elrde3z2phvm/header_586x192.jpg?t=1621319910',
        Comment: "How to pass the second level",
        content: "In this level, you'll need to step up your dance game by incorporating some funky fresh moves. Use the arrow keys to move your character and the space bar to hit the beat. Watch the beat indicator at the top of the screen to time your moves correctly. To impress the crowd, try adding in some spins, jumps, and other flashy moves. But be careful not to overdo it or you'll lose your rhythm and the crowd will start to thin out. As you progress through the level, the beat will speed up and the moves will become more complex. Stay focused and keep the dance floor packed to move on to the next level. Good luck!"
      }
  ];

  /* eslint-enable no-template-curly-in-string */
  
  const onFinish = (values) => {
    console.log(values);
  };
  
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
      <div className='twoBoxes'>
      <div className='leftOne'>
        <p className='rate'><CommentOutlined />&nbsp;&nbsp;Discussion: &nbsp; {items[0].Comment}</p>
        <p> {items[0].content}</p>
        <div className='box_bottom'>
            <img src={items[0].image}></img> 
            <div className='gameName'>{items[0].title}</div>
            <div className='comment'><LikeOutlined/> <DislikeOutlined /> <MessageOutlined /> </div>
        </div>
      </div>
      <div className='rightOne'>
      <p className='rate'><CommentOutlined />&nbsp;&nbsp;Discussion: &nbsp;{items[1].Comment}</p>
        <p> {items[1].content}</p>
        <div className='box_bottom'>
            <img src={items[1].image}></img> 
            <div className='gameName'>{items[1].title}</div>
            <div className='comment'><LikeOutlined /> <DislikeOutlined /> <MessageOutlined /> </div>
        </div>
      </div>
      </div>
        <Form  name="nest-messages" onFinish={onFinish} > 
        <Form.Item className='discussion_input' name={['user', 'introduction']} label="Your Discussion">
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

