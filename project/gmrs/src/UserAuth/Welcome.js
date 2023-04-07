import React from 'react'
import { Typography, Button} from 'antd'
import { Link, useNavigate } from 'react-router-dom';
const {Title} = Typography;

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div id='welcome'>
            <Title style={{color:"#2f54eb"}}>Your Next Game Collection System</Title>
            <div id='arrow'>
                <div id='line'/>
                <div id='circle'/>
            </div>
            <div>
                <Link to="login">
                    <Button type='primary' style={{margin:"50px", width:"100px"}}>
                        Login
                    </Button>
                </Link>
                
                <Link to="register">No account? Click Here</Link>
            </div>
        </div>

    )
}
