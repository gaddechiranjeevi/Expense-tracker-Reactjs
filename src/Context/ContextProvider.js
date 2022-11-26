import React, { useEffect, useState } from "react";
import Context from "./Context";

const ContextProvider = (props) =>{

    const [isLogin ,setLogin ]= useState(false);

    const loginHandler = (value) =>{
        setLogin(value);
    }

    useEffect(()=>{
        const localIsLogin = localStorage.getItem('JWTTOKEN');
        if(localIsLogin ===null){
            setLogin(false);
        }else if(localIsLogin === ''){
            setLogin(false);
        }else if(localIsLogin.trim().length > 0){
            setLogin(true);
        }
    },[])


    const contextData={
        isLogin: isLogin,
        login: loginHandler,
    }

    return(<Context.Provider value={contextData}>
        {props.children}
    </Context.Provider>
    )
}

export default ContextProvider;