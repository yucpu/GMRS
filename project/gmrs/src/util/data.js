
import { createContext, useContext, useReducer, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const DataContext = createContext(null);
const {Provider} = DataContext;
const serverHost = "https://f0e1017f-cc79-416f-a80c-5c1fb7d4e267.mock.pstmn.io/";

// const serverHost = "https://my-json-server.typicode.com/yucpu/jsTPS/"

const firebaseConfig = {
    apiKey: "AIzaSyDC-E59movlz1LkBdPfyIhUqTYJCLlb2kA",
    authDomain: "gmrs-cd2d3.firebaseapp.com",
    projectId: "gmrs-cd2d3",
    storageBucket: "gmrs-cd2d3.appspot.com",
    messagingSenderId: "151220009462",
    appId: "1:151220009462:web:4543fd4009f323140eefd7",
    measurementId: "G-ZK9VVWQ4H2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


let reducer = (state, action) =>{
    switch(action.type){
        case "user":
            return {...state, user:action.value}
        case "gameList":
            return {...state, gameList:action.value}
        case "token":
            return {...state, token:action.value}
        default:
            return {...state}
    }
}


const initState ={
    token: localStorage.getItem('token'),
    gameList:[],
    user:localStorage.getItem('user'),
    friendlist:[],
}


export const DataProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [state, dispatch] = useReducer(reducer, initState)

    

    const userLogin = (account,password) =>{
        login({account,password}).then((auth)=>setUser(auth))
    }

    const userLogOut = ()=>{
        setUser(null);
    }

    return(
        <Provider value={{user,setUser, userLogin, userLogOut, state, dispatch}}>
            {children}
        </Provider>
    )
}

export const useData = ()=>{
    return useContext(DataContext);
}

export async function login(data){
    let url = serverHost+ 'login';
    let request = new Request(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers : {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(data)
    })
    const response = await fetch(request);
    return response.json();
}

/**
 * async Request data from the server. 
 * @param {string} getPath the path of getRequest. eg serverHost/pathName?param1=xxx&param2=xxxx......
 * @param {object} params an object which contains all needed parameters. eg.{param1:value, param2:value,...}
 * @returns return an Promise Object. get return value by using Promise.then((res)=>{your code})
 */
export async function getData(getPath,params){
    let objects = Object.keys(params)
    console.log(objects)
    let res = '';
    for (let key=0; key < objects.length; key ++){
        if (key != objects.length-1){
            res+= ''+objects[key]+'='+encodeURIComponent(params[objects[key]])+"&";
        }else{
            res+= ''+objects[key]+'='+encodeURIComponent(params[objects[key]]);
        }
    }
    console.log(res)
    let url = serverHost+ `${getPath}?` + res
    console.log(url);
    let request = new Request(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers : {'Content-Type': 'application/json; charset=utf-8'},
    })
    const respone = await fetch(request)
    return respone.json();
}

/**
 * async Post data to the server from user-end
 * @param {string} postPath the path of postRequest. eg serverHost/pathName
 * @param {object} params an object which contains all value needed . eg.{param1:value, param2:value,...}
 * @returns return an Promise object. get status code by using .then((code)=>{your code});
 */
export async function postData(postPath,params){
    let url = serverHost+ `${postPath}`;
    let request = new Request(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers : {'Content-Type': 'application/json; charset=utf-8'},
        body:JSON.stringify(params)
    })

    const respone = await fetch(request)
    return respone.json();
}


export function generateToken(length){
    let a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    let b = [];  
    for (let i=0; i<length; i++) {
        let j = (Math.random(Date.now) * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}