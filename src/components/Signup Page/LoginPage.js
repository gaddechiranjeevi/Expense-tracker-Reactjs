import React, {useRef} from 'react';
import classes from './LoginPage.module.css';

const LoginPage = () =>{
    const emailRef= useRef();
    const passwordOneRef =useRef();
    const passwordTwoRef = useRef();

    const SignupBtnHandler = async(event)=>{
        event.preventDefault();
        if(passwordOneRef.current.value === passwordTwoRef.current.value &&
             passwordOneRef.current.value.trim().length > 5 &&
             emailRef.current.value.includes("@") &&
             emailRef.current.value.includes(".com")
              ){
            const enteredEmail = emailRef.current.value;
            const enteredPassword = passwordOneRef.current.value;

        try{
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNKcwJ85YxV00sJT8V4pSH2dMBTCWv77k",
                {
                  method: "POST",
                  body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
           )
           if(response.ok){
                const data = await response.json();
               console.log('User has successfully signed up.');
               localStorage.setItem('JWTTOKEN',data.idToken);
               localStorage.setItem('userID',data.localId);
               emailRef.current.value='';
               passwordOneRef.current.value='';
               passwordTwoRef.current.value='';
           }else{
            const data = await response.json();
            alert(data.error.message);
           }
        }catch(err){
            console.log('Something went wrong')
            console.log(err);

        }
    }else{
        alert('Please enter field properly');
    }
    }

    return(
        <div className={classes.maindiv}>
            <form className={classes.mainform} >
                <div>
                    <div>
                        <h1>SignUp</h1>
                    </div>
                    <div>
                        <div>
                            <input type="email" htmlFor="email" placeholder="Email" ref={emailRef}  required/>
                        </div>
                        <div>
                            <input type='password'  minLength="6" ref={passwordOneRef} maxLength="16" placeholder="PassWord" required/>
                        </div>
                        <div>
                            <input type='password'   ref={passwordTwoRef} maxLength="16" placeholder="Confirm PassWord" minLength="6"  required/>
                        </div>
                        <div>
                            <button onClick={SignupBtnHandler} > SignUp </button>
                        </div>
                    </div>
                </div>
                <div>
                    <button>Have an account? Login</button>
                </div>
            </form>
        </div>
    )
};

export default LoginPage;