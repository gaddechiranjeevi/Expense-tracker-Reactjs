import React, { useEffect, useState } from "react";
import axios from "axios";
import Context from "./Context";
import { useDispatch } from "react-redux";
import { itemsAction } from "../Store/FetchData";

const ContextProvider = (props) =>{

    const dispatch = useDispatch();
    const [isEditOn, setEdit] = useState(false);
    const [values , setValues] = useState('');

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
          const res =await axios.get(`https://expensetracker-userdata-default-rtdb.firebaseio.com/expenses/${userId}.json`)
          const data =res.data;
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
    },[]);

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