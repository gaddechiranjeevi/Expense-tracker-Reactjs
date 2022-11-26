import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from './Welcome.module.css';

const Welcome = () =>{
    const [checkVerified , setverified] = useState(false)


    const autoVerifyEmailCheck = async() =>{
        const jwttoken = localStorage.getItem('JWTTOKEN');

        const token = localStorage.getItem('JWTTOKEN');

        try{
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBNKcwJ85YxV00sJT8V4pSH2dMBTCWv77k',
            {
                method: "POST",
                body: JSON.stringify({
                    idToken: token,
                    oobCode: 'User Verified. Thank you!!',
                    returnSecureToken: true,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            if(res.ok){
                const data = await res.json();
                console.log(data.emailVerified);
                console.log('Send success');
                if(data.emailVerified){
                    setverified(true);
                }
            }

        }catch(err){
            console.log(`Error = ${err}`);
        }
    }

useEffect(autoVerifyEmailCheck,[])


    const verifyHandler = async() =>{
        const token = localStorage.getItem('JWTTOKEN');

        try{
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBNKcwJ85YxV00sJT8V4pSH2dMBTCWv77k',
            {
                method: "POST",
                body: JSON.stringify({
                    idToken: token,
                    requestType: 'VERIFY_EMAIL',
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
                console.log('Send success');
            }

        }catch(err){
            console.log(`Error = ${err}`);
        }
    } 
    return(
    <div className={classes.WelcomebackgroundDiv} >
        <div className={classes.headingh1}>
            <div>
                <h1>Welcome to Expense Tracker</h1>
            </div>
            <div className={classes.message}>
                <label className={classes.labelText}> Your Profile is Incomplete. <Link to='/user' className={classes.ComleteNow} >Complete Now</Link></label>
            </div>
            <di>
                {!checkVerified && <button onClick={verifyHandler} > verify Email</button>}
            </di>
        </div>
    </div>
    );
}

export default Welcome;