import { Menu } from 'antd'
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout'
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import "./Application.css";

export default function Application() {

    const Links = [
        {
            label: (<NavLink to='store'>Store</NavLink>),
            key: 'store'
        },
        {
            label: (<NavLink to='library'>Library</NavLink>),
            key: 'library'
        },
        {
            label: (<NavLink to='community'>Community</NavLink>),
            key: 'community'
        },
        {
            label: (<NavLink to='friends'>Friends</NavLink>),
            key: 'friends'
        },

    ]

    return (
        <Layout>
            <Header style={{position:"sticky", top:0}}>
                <NavLink to='profile'><div className='logo'/></NavLink>
                <Menu theme='dark' mode='horizontal' items={Links}/>
                
            </Header>
            <Content >
                <Outlet></Outlet>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    width:"100%",
                    bottom:0,
                    backgroundColor: "rgba(199, 199, 204, 0.0)"
                }}>
                Game Mangement System ©2023 Created by Porter Odonnell and Day
            </Footer>
        </Layout>
    )
}
