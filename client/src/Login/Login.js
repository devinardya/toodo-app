import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../todo/Header';
import './login.scss';

const Login = () => {

    const [username, updateUsername] = useState("");
    const [status, updateStatus] = useState(false);
    const [name, updateName] = useState(""); 

    const onChange = (e) => {
        let value = e.target.value.trim();
        updateUsername(value);
    }

   const onSubmit = (e) => {
        e.preventDefault();

        updateName(username);
        updateStatus(true);
        updateUsername("");
        
    }  

    const notSubmit = (e) => {
        e.preventDefault();
    }

    if(status) {
        return <Redirect to={{
                pathname: "/board",
                state: { user: name}
             }}
                /> 
   } 

   let warncolor;
    let warncolor2;
    let getSubmit;
    let newcolor;
    let validateIcon1;
    let validateIcon2;

    // validate input box for error input from user =========================================
    let regex = /[!"#€%&/()=?£$∞§≈±©~™…+^¨*':;.,$°§@[\]{}]/g;
    let notValidInput = regex.test(username);

    // if user enter a character that is not alphabet, numbers, empty space,  - or _ and left the input box empty or more than 12 characters
    // then the input is not valid. 
    if (username.length === 0 ) {
        warncolor = {color: "#ffa84e"};
        warncolor2 = {color: "#ffa84e"};
        newcolor = {color: "#ffa84e"};
        getSubmit = notSubmit;
        validateIcon1 = <MdCancel className ="icons" size="12px" color="#ffa84e" />
        validateIcon2 = <MdCancel className ="icons" size="12px" color="#ffa84e" />
    } else if (username.length > 12 ) {
        warncolor = {color: "#ffa84e"};
        warncolor2 = {color: "#ffffff"};
        getSubmit = notSubmit;
        newcolor = {color: "#ffa84e"};
        validateIcon1 = <MdCancel className ="icons" size="12px" color="#ffa84e" />
        validateIcon2 = <MdCancel className ="icons" size="12px" color="#ffffff" />
        //console.log("this is false")
    } else if (notValidInput){
        warncolor = {color: "#ffffff"};
        warncolor2 = {color: "#ffa84e"};
        getSubmit = notSubmit;
        newcolor = {color: "#ffa84e"};
        validateIcon1 = <MdCancel className ="icons" size="12px" color="#ffffff" />
        validateIcon2 = <MdCancel className ="icons" size="12px" color="#ffa84e" />
        //console.log("notvalidinput")
    } else {
        warncolor = {color: "#ffffff"};
        warncolor2 = {color: "#ffffff"};
        getSubmit = onSubmit;
        newcolor = {color: "#ffffff"};
        validateIcon1 = <MdCheckCircle className ="icons" size="12px" color="#ffffff" />
        validateIcon2 = <MdCheckCircle className ="icons" size="12px" color="#ffffff" />
        //console.log("this is trueeee")
    }

    return <HelmetProvider>
                <Helmet>
                    <title>Welcome to Toodo | Login</title>
                </Helmet>
                <div className="login-block">
                    <Header 
                        initialPage = "login"
                     />
                    <div className="login-block--box">
                    <div className="login-block--form">
                        <h2>LOGIN</h2>
                        <form onSubmit={getSubmit}>
                            <input onChange={onChange} style={newcolor} placeholder="username" value={username} type="text"/>
                            <div className = "block__loginPage--form--authorization">
                                <p className="block__loginPage--form--authorization__warning" style={warncolor} > {validateIcon1} username have to be between 1 to 12 characters without empty space.</p>
                                <p className="block__loginPage--form--authorization__warning" style={warncolor2} > {validateIcon2} username can only contains uppercase, lowercase, hypen (-), underscore (_), and numbers.</p>
                            </div>
                            <button>Log in</button>
                        </form>
                     </div>
                    </div>
                </div>
           </HelmetProvider>
}

export default Login;