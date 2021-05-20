import React , { useState ,useContext} from "react";
import { useEffect } from "react";

//Form Validation Library
import { useForm} from "react-hook-form";
import isEmail from "validator/lib/isEmail";

//Import the history route 
import { useHistory } from "react-router-dom";

// import the backend axios
import UserContext from "../../useContext/UserContext";
import Axios from "axios";
import ErrorNotice from "../../errorNotes/ErrorNotice"


//css
import styles from './RegisterLogin.module.css'

// Icons form React-icons
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';

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
// var dataListObj = {};

export default function RegisterForm() {

  document.title ="DAMSA | Register Page"; 
  document.getElementsByTagName("META")[2].content = "Damsa is a website for booking photography sessions anywhere and anytime, we have an esast and smooth registering process";
  
  
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onBlur",
  });

  const { setUserData } = useContext(UserContext);
    const [error, setError] = useState();

    const history = useHistory();


  

  const onSubmit = async (data) =>{
    // e.preventDefault();
    try {
      const temp = {};
      const newUser = Object.assign(temp, data);

      await Axios.post("http://localhost:5000/users/register", newUser);
      const email = newUser.email;
      const password = newUser.password;
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password
      });
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
            <h1>Sign Up </h1>
             {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            <AiOutlineUser/>
            <input
                name="username"
                type="text"
            ref={register({
              required: true,
              minLength: 3,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
              
            })}
            style={{ ...stylesNode.input, borderColor: errors.username && "red" }}
            placeholder="Username"
            />
            </div>
            
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
            <div style={{ fontSize: '12px',paddingLeft:"12%",paddingRight:"12%",}}>
              The password must contain at least one uppercase and lowercase letters, numbers, and symbols within 8 digits.
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
            <div>
            <RiLockPasswordLine/>
            <input
                name="passwordCheck"
                type="password"
            ref={register({
              required: true,
              minLength: 6,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
              
            })}
            style={{ ...stylesNode.input, borderColor: errors.password && "red" }}
            placeholder="Confirm password"
            />
            </div>
            <div>
            <FiPhone/>
            <input
                name="phone"
                type='tel'
            ref={register({
              required: true,
              minLength: 10,
              pattern: /^([0][7|8|9][0-9]{8})$/g
            })}
            style={{ ...stylesNode.input, borderColor: errors.phone && "red" }}
            placeholder="Phone"
              />
              <p style={{fontSize:'10px'}}>07X-X
                XX-XXX</p>
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
      
// <div>
//           {JSON.parse(localStorage.getItem('0771234567'))}
//         </div>

 // if (!(userList.map(obj => obj.phone).includes(data.phone))) {
        
        //   // setUserList([...userList, data]);
        //   // setUserListObj(userList);
          
        //   // useEffect((userListObj) => {
        //   //   console.log(userList);
        //   // },[]);
          
        //   // console.log(userListObj);
        //   // console.log(userList);
        //   console.log(data);
        // }
        // else {
        //   console.log('error repeat');
          
        // }

         // useEffect(() => {
      //   setUserList([...userList, data]);
      //   console.log(userList);
      // });
      
      // setUserList([...userList, data]);