import React from "react";
import '../Navbar/Navbar.scss'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
  

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState()
    const loggedOut = () => {
        localStorage.removeItem('user');
        navigate('./');
        document.location.reload(true)
      }

    useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
    }, []);
     
    return(
    <>
        <div className="navbar">
            <div className="navbar-home-btn">
                <Link className="navbar-link" to="/">
                Home
                </Link>
            </div>
              <div className="navbar-write">Welcome : {user}</div>
            <div className="navbar-logout-btn">
              <button  type="button" onClick={() => loggedOut()} >Log Out</button>
            </div>
        </div>
    </>
    )
}

export default Navbar;