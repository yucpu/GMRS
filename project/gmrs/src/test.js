import React from 'react'
import { List, Avatar } from 'antd'

const dataA = [
    {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
]
export default function Test() {
  return (
    <List
    itemLayout="horizontal"
    dataSource={dataA}
    renderItem={(item, index) => (
    <List.Item>
        <List.Item.Meta
        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
        title={"sdf"}
        description={"sdf"}
        />
    </List.Item>
    )}
/>
  )
}
