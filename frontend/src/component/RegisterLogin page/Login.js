import React, { useState,useContext } from 'react';
// import {useEffect } from 'react';
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

// import isEmail from "validator/lib/isEmail";
//Import the history route 
import { useHistory } from "react-router-dom";
 


// Backend side 
import Axios from "axios";
import ErrorNotice from "../../errorNotes/ErrorNotice";
import UserContext from "../../useContext/UserContext";


//css
import styles from './RegisterLogin.module.css'


// Icons form React-icons
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
// import { FiPhone } from 'react-icons/fi';


const stylesNode = {
  container: {
    width: "100%",
    margin: "0 auto",
  },
  input: {
    width: "30vw",
    height: "2rem",
    padding:"1rem"
  },
}; 

const LogIn = () => {
  
  document.title ="DAMSA | Login Page"; 
  document.getElementsByTagName("META")[2].content="Damsa is a website for booking photography sessions anywhere and anytime, we have an esast and smooth login process";
    const { register, handleSubmit, errors, formState } = useForm({
    mode: "onBlur",
  }); 
  
  const { setUserData } = useContext(UserContext);
    const [error, setError] = useState();

    const history = useHistory();
 
  
  const onSubmitLogIn = async (data) => {
    // data.preventDefault();
    try {
      
      const temp = {};
    const newUser = Object.assign(temp, data);
    const loginRes = await Axios.post(
        "http://localhost:5000/users/login",
        newUser
    );
    setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    }
    catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }


  }
    
    return (
      <div className={styles.formContainer} style={stylesNode.container}>
      <div className={styles.formContainerItems} >
      <div className={styles.sps}>
      <div>          
      <h1>Login </h1>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      </div>
      <form  onSubmit={handleSubmit(onSubmitLogIn)}>
    <div>
            <HiOutlineMail/>
            <input
                name="email"
                type="email"
            ref={register({
              required: true,
              validate: (input) => isEmail(input),
              
            })}
            style={{ ...stylesNode.input, borderColor: errors.email && "red" }}
            placeholder="Email"
            />
            </div>
      
      <div>
            <RiLockPasswordLine/>
            <input
                  name="password"
                  type="password"
            ref={register({
              required: true,
              minLength: 6,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
              
            })}
            style={{ ...stylesNode.input, borderColor: errors.password && "red" }}
            placeholder="Password"
            />
            </div>
            <div >
            <button className={styles.formBtn} type="submit" disabled={formState.isSubmitting}>
            Submit
            </button>
            </div>
            </form>
            </div>
            </div>
      </div>
      );
    }
    
export default LogIn;

 // if (!(localStorage.getItem(data.username))) {
    //   alert('Invalid Login User Name')
    // }
    // else {
    //   let tempUser = JSON.parse(localStorage.getItem("userN",data.username));
    //   if (!(data.password === tempUser.password)) {
        
    //     alert('the password is not match')
    //   }
    //   else {
    //     sessionStorage.setItem('user', JSON.stringify(tempUser))

    //     let userN=JSON.parse(localStorage.getItem(data.username))

    //     localStorage.setItem('userN', JSON.stringify(userN))
        
    //     localStorage.setItem('isLogin',true )
    //      { window.location.href = '/servicePage' }
    //   }

    // }
    