import React, { useContext } from "react";
import { useHistory } from "react-router-dom";


import UserContext from "./../useContext/UserContext";


//styling 
import './navbar.css';
import Logo from "./images/logo3.png";
import { Navbar, Nav } from "react-bootstrap";



export default function MyNavbar() {
  // isLoggedIn = JSON.parse(localStorage.getItem('isLogin'));

  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  
  
  
  const logout = () => {

    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/Login");
  };
  

  return (
      <div>
        <Navbar
          className="navbar"
          collapseOnSelect
          expand="lg"
          variant="dark"
          fixed="top"
        >
          <Navbar.Brand onClick={() => history.push("/")} className="navbar-brand">
            <img src={Logo} alt="Logo"></img>
        </Navbar.Brand>
        
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            
              <Nav.Link onClick={() => history.push("/")} class="nav-link">
                Home
              </Nav.Link>
            <Nav.Link onClick={() => history.push("/servicePage")}>Our Services</Nav.Link>
              </Nav>
              
              {(!(userData.user)) ?
                (<Nav>
                
              <Nav.Link onClick={() => history.push("/RegisterForm")}> Register</Nav.Link>
              
                <Nav.Link onClick={() => history.push("/Login")}> Login</Nav.Link>
                </Nav>)
                :
                (<Nav>
                <Nav.Link onClick={logout
                }> Logout</Nav.Link>
                <Nav.Link href="/AppOne">
                  <i className="fas fa-user"></i> Profile
                </Nav.Link>
                 </Nav>)
                
              }
           
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
}

// export default MyNavbar;
