import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './PasswordReset.module.css'

const PasswordReset = () => {
    const [isLoading,setLoading] = useState(false);
    const emailRef = useRef();
    const history = useHistory();

    const ResetButtonhandler= async(event) => {
        event.preventDefault();
        const enteredEmail=emailRef.current.value;

        setLoading(true);
        try{
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNKcwJ85YxV00sJT8V4pSH2dMBTCWv77k",
                {
                  method: "POST",
                  body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: enteredEmail,
                    returnSecureToken: true,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
           )
           if(response.ok){
            const data = await response.json();
            console.log(data);
            alert(`Link successfully send to ${enteredEmail}`)
            history.replace('/auth');

           }
           else{
            const data = await response.json();
            alert(data.error.message);
           }
           setLoading(false);
        }catch(err){
            console.log('Something went wrong')
            console.log(err);
            setLoading(false);
        }

    }
    const gotoHandler =(event) => {
        event.preventDefault();
        history.replace("/auth");
    }

    return(
        <div className={classes.MainDiv} >
            <div className={classes.subDiv}>
            <form className={classes.MainForm}>
                <div className={classes.Mainh1}>
                    <h1>Reset Password</h1>
                </div>
                <div className={classes.Mainh1}>
                    <label className={classes.Mainlabel}>Enter the email with you have registered.</label>
                </div >
                <div className={classes.inputfielddiv}>
                    <input  className={classes.inputfield} type='email' placeholder='Email' ref={emailRef} />
                </div>
                <div>
                    <button className={classes.Mainbtn} onClick={ResetButtonhandler} > {isLoading? 'Sending...' : 'Send Link'}</button>
                </div>
                <div className={classes.downlabeldiv} >
                    <label className={classes.downlabel} >Know your Password?<span className={classes.downspan} onClick={gotoHandler} >Login </span> </label>
                </div>
            </form>
            </div>
        </div>
    )
}

export default PasswordReset;