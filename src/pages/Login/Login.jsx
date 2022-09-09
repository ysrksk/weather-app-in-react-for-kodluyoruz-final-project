import React, {useState, useContext} from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WeatherContext from "../../context/WeatherContext";

import '../Login/Login.scss'

const Login = (props) => {
    const context = useContext(WeatherContext);
    const [user, setUser] = useState ('');
    const [pass, setPass] = useState ('');
    
    const diffToast = () => toast.warn("Username or Password is incorrect", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const handleUser = (e) => {
        setUser(e.target.value)
    }
    
    console.log(context.getUser)
    const handlePass = (e) => {
        setPass(e.target.value)
    }

    const loginControl = (e) => {
        if(user.toLocaleLowerCase() === 'admin' && pass.toLocaleLowerCase() === 'admin'){
         localStorage.setItem('user', JSON.stringify(user)) 
        }else{
            e.preventDefault();
            diffToast()
        }   
    } 

    return(
        <>
        <form className="login-form">
            <h2>Login Form</h2>
            <div>           
                <label ><b>Username</b></label>
                <input className="login-input" value={user} onChange={handleUser} type="text" placeholder="Enter Username" />

                <label ><b>Password</b></label>
                <input className="login-input" value={pass} onChange={handlePass} type="password" placeholder="Enter Password"/>
                    
                <button className="login-btn" onClick={loginControl} >Login</button>             
            </div>
        </form>
         <ToastContainer />
        </>
    )
};

export default Login;