import React, { useRef } from "react";
import axios from 'axios';
import classes from "./ExpensesForm.module.css"

const ExpensesForm = (props) =>{
    const moneyRef = useRef()
    const descriptionRef = useRef()
    const categoryRef = useRef()

    const buttonHandler = async(event) => {
        event.preventDefault();

        const data ={
             enteredMoney : moneyRef.current.value,
             enteredDescription: descriptionRef.current.value,
             enteredCategory : categoryRef.current.value,
        }
        const userId = localStorage.getItem('userID');
        props.onClick(data);

        try{
            const res = axios.post(`https://expensetracker-userdata-default-rtdb.firebaseio.com/expenses/${userId}.json`,data);
            console.log(res);
        }catch(err){
            console.log(`Some error ${err}`);
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
                        <button onClick={buttonHandler} className={classes.submitdivbtn} >Add</button>
                    </div>
                </form>
            </div>
    )
}

export default ExpensesForm;