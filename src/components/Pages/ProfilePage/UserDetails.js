import React, {useEffect, useRef } from "react";
import classes from "./UserDetails.module.css";

const UserDetails = () => {
    const nameRef = useRef();
    const photoUrlRef = useRef();

    const AutoUpdateData = async() => {
        const token = localStorage.getItem('JWTTOKEN');
        try{
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNKcwJ85YxV00sJT8V4pSH2dMBTCWv77k",
            {
                method: "POST",
                body: JSON.stringify({
                    idToken : token,
                    returnSecureToken : true,
                }),
                headers : {
                    "Content-Type": "application/json",
                },
            }
        )
        if(res.ok){
            const data = await res.json();
            data.users.forEach(element => {
                console.log(data.users);
                nameRef.current.value=element.displayName;
                photoUrlRef.current.value=element.photoUrl;
            });
        }else{
            const data = await res.json();
            console.log(data)
        }

    }catch(err){
        console.log('Auto fetch error!');
    }
}

useEffect(AutoUpdateData,[]);
        
    const updateButtonHandler = async(event) =>{
        event.preventDefault();
        console.log('Updating...')
        const entertedName= nameRef.current.value;
        const entertedPhotoUrl = photoUrlRef.current.value;
        const token = localStorage.getItem('JWTTOKEN');

        try{
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBNKcwJ85YxV00sJT8V4pSH2dMBTCWv77k',
            {
                method: "POST",
                body: JSON.stringify({
                    idToken: token,
                    displayName: entertedName,
                    photoUrl: entertedPhotoUrl,
                  returnSecureToken: true,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            if(res.ok){
                const data = await res.json();
                console.log(data);
                nameRef.current.value='';
                photoUrlRef.current.value='';
            }else{
                const data = await res.json();
                console.log(data)
                alert(data.error.message)
            }
        }catch(err){
            console('Updating went wrong!')
        }
    }

  return (
  <div className={classes.userDetailsUpdateDiv}>
    <div className={classes.userDetailsdiv}>
        <form className={classes.userDetailsForm}>
            <div className={classes.userDetailsFormdiv}>
                <div className={classes.headingdiv}>
                          Contact details
                </div>
                <div className={classes.contantdiv}>
                    <div className = {classes.contantdivfield}>
                        <label>Full Name:</label>
                    </div>
                    <div className = {classes.contantdivfield}>
                        <input type = 'text' className={classes.contantinputfield} ref={nameRef} />
                    </div>
                    <div className={classes.contantdivfield}>
                        <label>Profile Photo Url</label>  
                    </div>
                    <div className = {classes.contantdivfield}>
                        <input type = 'text' className={classes.contantinputfield} ref={photoUrlRef} />
                    </div>
                    <div className={classes.contantdivfield}>
                    <button onClick={updateButtonHandler} className={classes.contantBTNfield}> Update</button>
                </div>
            </div>
        </div> 
    </form>    
  </div>
  </div>
  );
};

export default UserDetails;