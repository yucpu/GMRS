import {React, useMemo, useState} from 'react'
import { useData } from '../util/data'
import './Reviews.css';
import { Routes, Route, Link} from "react-router-dom";
import { Menu ,Rate,Button, Form, Input, InputNumber} from 'antd';
import { LeftOutlined ,LikeOutlined,DislikeOutlined, MessageOutlined} from '@ant-design/icons';


export default function Reviews() {
  const context = useData()
  const [score, setScore] = useState(null);

  function handleRateChange(value) {
    setScore(value);
    // 在这里可以将评分记录到后端或者其他地方
  }
  console.log(score);
  const items = [
    {
      title: 'DISCO ELYSIUM',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/bundles/21056/sal6elrde3z2phvm/header_586x192.jpg?t=1621319910',
      rate: 5,
      Comment: "Highly Recommend",
      content:"I am a 50 year old father, probably one of the oldest people playing this game. I am a single father for my son who is now 14 years old. My son has recently started playing Destiny 2. In less than a week, he has already played more than 20 hours.It was terrible for me, because it was already hard enough for me to spend time with my son.because he was always with his friends or watching YouTube videos."
    },
    {
        title: 'DISCO ELYSIUM',
        image: 'https://cdn.cloudflare.steamstatic.com/steam/bundles/21056/sal6elrde3z2phvm/header_586x192.jpg?t=1621319910',
        rate: 2,
        Comment: "Not Recommend",
        content: "Disco had a lot of potential, but unfortunately, it fell short in many areas. While the concept of the game was interesting, the execution was lacking. The gameplay quickly became repetitive and tedious, with little variation or excitement. I found myself losing interest after just a few levels. In addition, the graphics were subpar and failed to create a truly immersive experience. The environments lacked detail and depth, and the character models were stiff and unappealing. It was difficult to feel invested in the game when the visuals were so lackluster"
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
      <Link className='linktoReview' to="../Discussions">Discussions</Link>
      </Menu.Item>
      <Menu.Item key="4">
      <Link className='linktoReview' to="../Guides">Guides</Link>
      </Menu.Item>
    </Menu>
      </div>
      <div className='twoBoxes'>
      <div className='leftOne'>
        <p className='rate'><Rate disabled value={items[0].rate} /> &nbsp;&nbsp; &nbsp; {items[0].Comment}</p>
        <p> {items[0].content}</p>
        <div className='box_bottom'>
            <img src={items[0].image}></img> 
            <div className='gameName'>{items[0].title}</div>
            <div className='comment'><LikeOutlined /> <DislikeOutlined /> <MessageOutlined /> </div>
        </div>
      </div>
      <div className='rightOne'>
      <p className='rate'><Rate disabled value={items[1].rate} /> &nbsp;&nbsp; &nbsp; {items[1].Comment}</p>
        <p> {items[1].content}</p>
        <div className='box_bottom'>
            <img src={items[1].image}></img> 
            <div className='gameName'>{items[1].title}</div>
            <div className='comment'><LikeOutlined /> <DislikeOutlined /> <MessageOutlined /> </div>
        </div>
      </div>
      </div>
        <div className='RateGame'>
        Rate Here: <Rate onChange={handleRateChange} />
        </div>
        <Form  name="nest-messages" onFinish={onFinish} > 
        <Form.Item className='reviews_input' name={['user', 'introduction']} label="Your review">
        <Input.TextArea />
        </Form.Item>
        <Form.Item >
        <Button className='reviews_button' type="primary" htmlType="submit">
         Submit
        </Button>
        </Form.Item>
        </Form>
    </div>
      )
  },[context.user])
}

