import React,{useEffect} from "react";
import "./App.css";
import { DataProvider } from "../util/data";
import { Routes, Route} from "react-router-dom";
import Profile from "../Profile/Profile";
import Store from "../Store/Store";
import Community from "../Community/Community";
import Library from "../Library/Library";
import RequireAuth from "../util/RequireAuth";
import NotFound from "../util/NotFound";
import HomePage from "../HomePage/HomePage";
import Welcome from "../UserAuth/Welcome";
import UserAuth from "../UserAuth/UserAuth";
import LoginPage from "../UserAuth/Login"
import Reset from "../UserAuth/Reset";
import Register from "../UserAuth/Register";
import Application from "../System/Application";
import Friends from "../Friends/Friends";
import Reviews from "../com-reviews/Reviews";
import Discussions from "../com-discussions/Discussions";
import Guides from "../com-guides/Guides";


export default function App() {

    useEffect(()=>{
        
    },[])


    return(
        <DataProvider>
            <div className="App">
                <div id="circleOne" className="green background-circle">1</div>
                <div id="circleTwo" className="blue background-circle">2</div>
                <div id="circleThree" className="green background-circle">3</div>
                <div className="background">
                    <Routes>
                        <Route index element={<HomePage/>} />
                        <Route path="app/" element={<RequireAuth><Application/></RequireAuth>}>
                            <Route path="store/" element={ <Store/>} />
                            <Route path="library/"  element={<Library/>}/>
                            <Route path="community/" element={<Community/>}/>
                            <Route path="Reviews/" element={ <Reviews/>} />
                            <Route path="Discussions/" element={ <Discussions/>} />
                            <Route path="Guides/" element={ <Guides/>} />
                            <Route path="friends/" element={<Friends/>} />
                            <Route path="profile/" element={<Profile/>} />
                            <Route path="*" element={<NotFound/>}></Route>
                        </Route>
                        <Route path="auth/" element={<UserAuth/>}>
                            <Route index element={<Welcome/>}/>
                            <Route path="login/" element={<LoginPage/>}/>
                            <Route path="reset/" element={<Reset/>}/>
                            <Route path="register/" element={<Register/>}/>
                            <Route path="*" element={<LoginPage/>}/>
                        </Route>
                            
                        <Route path="/*" element={<NotFound/>}/>
                    </Routes>
                </div> 
            </div>
        </DataProvider>
    )

}




