import React, { useEffect, useState } from "react";
import axios from "axios";
import Context from "./Context";
import { useDispatch, useSelector } from "react-redux";
import { itemsAction } from "../Store/FetchData";

const ContextProvider = (props) =>{

    const dispatch = useDispatch();
    const [isEditOn, setEdit] = useState(false);
    const [values , setValues] = useState('');

    const login = useSelector((state) => state.auth.isAuthenticated);
    const token = localStorage.getItem("JWTTOKEN");

    const setEditingState = (value) =>{
        setEdit(value);
    }

    const editHandler = (values)=>{

        setValues(values);
        setEditingState(true);
    }

    const autoreloadExpenses = async() =>{
        const userId = localStorage.getItem('userID');
        try{
          const res =await axios.get(`http://localhost:7777/auth/api/userexpenses`,  { headers: { Authorization: token } })
          const data =res.data.response;
          console.log(data);
          let arr=[];
          let index=0;
          for(const key in data){

            arr[index]={
              category:data[key].category,
              description:data[key].description,
              amount:data[key].amount,
              id:key,

            }
            index++;
          }

        dispatch(itemsAction.fetchExpenses(arr))
        }catch(err){
          console.log(`Some error ${err}`);
        }
      }
    useEffect(()=>{
      autoreloadExpenses();
    },[token, login]);

    const contextData={
        editable: editHandler,
        editValues:values,
        isEditOn:isEditOn,
        editStateFunction:setEditingState,
        forReload:autoreloadExpenses,
    }

    return(<Context.Provider value={contextData}>
        {props.children}
    </Context.Provider>
    )
}

export default ContextProvider;