import React, { useRef, useContext, useState } from "react";
import axios from 'axios';
import classes from "./ExpensesForm.module.css";
import Context from "../../../Context/Context";

const ExpensesForm = (props) =>{
    const [isLoading, setLoading] = useState(false);
    const CTX = useContext(Context);
    const moneyRef = useRef()
    const descriptionRef = useRef()
    const categoryRef = useRef()

    const buttonHandler = async(event) => {
        event.preventDefault();
     setLoading(true);
        const data ={
             enteredMoney : moneyRef.current.value,
             enteredDescription: descriptionRef.current.value,
             enteredCategory : categoryRef.current.value,
        }
        const userId = localStorage.getItem('userID');
        if(moneyRef.current.value !=='' && 
        descriptionRef.current.value !=='' 
        ){
            try{
                const res = axios.post(`https://expensetracker-userdata-default-rtdb.firebaseio.com/expenses/${userId}.json`,data);
                console.log(res);
                CTX.itemsSetup(data);
            }catch(err){
                console.log(`Some error ${err}`);
            }
        }else{
            alert('Input fields are empty!');
        }
        setLoading(false);
    }
    if(CTX.isEditOn){
        moneyRef.current.value=CTX.editValues.money;
        descriptionRef.current.value=CTX.editValues.description;
        categoryRef.current.value=CTX.editValues.category;

    }
    const editBTNHandler =async(event)=>{
        event.preventDefault();
        CTX.editStateFunction(false);


        if(CTX.isEditOn){
            let id = CTX.editValues.id;
            const userIdEdit = localStorage.getItem('userID');
            const data={
                enteredMoney: moneyRef.current.value,
                enteredDescription: descriptionRef.current.value,
                enteredCategory:categoryRef.current.value
            }
            setLoading(true);
            try{
                const res = await axios.put(`https://expensetracker-userdata-default-rtdb.firebaseio.com/expenses/${userIdEdit}/${id}.json`,data)
                console.log(res);
                console.log('delete success');
                moneyRef.current.value='';
                descriptionRef.current.value='';
                categoryRef.current.value='';
                CTX.forReload();
            }catch(err){
                console.log(`Some error ${err}`);
            }
            setLoading(false);
        }
        }

    return(
        <div className={classes.mainDivform}>
            <form className={classes.mainformele}>
                    <div>
                        <h2>Add Expenses</h2>
                    </div>
                    <div className={classes.moneyDiv}>
                        <label> Money Spent </label>
                    </div>
                    <div>
                        <input type='number' className={classes.moneyinput} ref={moneyRef} placeholder='Amount'/>
                    </div>
                    <div className={classes.disdiv}>
                        <label> Description  </label>
                    </div>
                    <div>
                        <input type='text' ref={descriptionRef} placeholde='Description' className={classes.Divinput}  />
                    </div>
                    <div className={classes.catadiv}>
                        <div >
                            <label>Category</label>
                    </div>
                    <div className={classes.selectdiv}>
                        <select ref={categoryRef} className={classes.select} >
                            <option value="Food">Food</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Salary">Salary</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    </div>
                    <div className={classes.submitdiv}>
                        {!CTX.isEditOn && <button onClick={buttonHandler} className={classes.submitdivbtn} >{isLoading? 'Loading...':'Submit'} </button>}
                        {CTX.isEditOn && <button onClick={editBTNHandler} className={classes.submitdivbtn} >{isLoading? 'Loading...':'Update'}</button>}
                    </div>
                </form>
            </div>
    )
}

export default ExpensesForm;