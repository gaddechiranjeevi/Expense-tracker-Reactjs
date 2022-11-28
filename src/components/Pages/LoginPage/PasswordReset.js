import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import classes from './PasswordReset.module.css'

const PasswordReset = () => {
    const [isLoading,setLoading] = useState(false);
    const emailRef = useRef();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const setAlert = (response) => {
        enqueueSnackbar(response.message, {
          variant: response.type === 1 ? "success" : "error",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
          preventDuplicate: true,
        });
      };

    const ResetButtonhandler= async(event) => {
        event.preventDefault();
        const enteredEmail=emailRef.current.value;

        setLoading(true);
        try{
            const response = await axios.post('http://localhost:3000/auth/user/forgotpassword', { email: enteredEmail})
           setAlert(response.data);
          if (response.data.url) {
            window.open(response.data.url, '_blank', 'noopener,noreferrer');   
            }
          setLoading(false);
        }catch(err){
            setAlert( {message: "Something went wrong!" , type: 0})
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