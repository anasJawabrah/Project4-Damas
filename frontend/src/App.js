
import React, { useState, useEffect } from "react";

import MyNavbar from './component/navbar'
import LandingPage from './component/Landing page/landingPage'
import RegisterForm from './component/RegisterLogin page/RegisterLogin'
import Login from './component/RegisterLogin page/Login'
import AppOne from './component/Profile page/AppOne'
import Booking from './component/Booking page/Booking'
import Footer from './component/footer'

import Axios from "axios";

import {BrowserRouter,Route ,Switch} from 'react-router-dom'
import ServicPage from './component/Services page/servicePage'

import UserContext from "./useContext/UserContext";
  
function App() {
   const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
   });
  
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);
  return (
<BrowserRouter>    
<UserContext.Provider value={{ userData, setUserData }}>
    <div className="App">
        <MyNavbar />
        <Switch>
          <Route  path="/" exact component={LandingPage} />
          <Route  path="/RegisterForm"  component={RegisterForm} />
          <Route  path="/Login"  component={Login} />
          <Route  path="/servicePage"  component={ServicPage} /> 
          <Route  path="/Booking"  component={Booking} /> 
          <Route  path="/AppOne"  component={AppOne} />
          {/* <Route  path="/"  component={} /> */}
        </Switch>
      <Footer/>
    </div>
</UserContext.Provider>
</BrowserRouter>

  );
}

export default App;
