import React, { useRef, useContext, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import classes from "./ExpensesForm.module.css";
import Context from "../../../Context/Context";
import { itemsAction } from "../../../Store/FetchData";
import { useSnackbar } from "notistack";
import { authActions } from "../../../Store/Auth";
import { useHistory } from "react-router-dom";

const ExpensesForm = (props) =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const CTX = useContext(Context);
    const moneyRef = useRef()
    const descriptionRef = useRef()
    const categoryRef = useRef()
    const { enqueueSnackbar } = useSnackbar();

    const setAlert = (response) => {

        enqueueSnackbar(response.message, {
          variant: response.type === 1 ? "success" : "error",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
      };    

    const buttonHandler = async(event) => {
        event.preventDefault();
     setLoading(true);
        const data ={
             amount : moneyRef.current.value,
             description: descriptionRef.current.value,
             category : categoryRef.current.value,
        };

        const token = localStorage.getItem('JWTTOKEN');

        if(moneyRef.current.value !=='' && 
        descriptionRef.current.value !=='' 
        ){
            try{
                const res = await axios.post(`http://localhost:3000/auth/api/addexpense`,data,{ headers: { "Authorization" : token}});
                console.log(res);

                setAlert(res.data);
                if (
                    res.data.response.name &&
                    res.data.response.name === "TokenExpiredError"
                  ) {
                    localStorage.setItem("JWTTOKEN", "");
                    localStorage.setItem("userID", "");
                    localStorage.setItem("Email", "");
          
                    dispatch(authActions.logout());
                    history.replace("/auth");
        }else{
           dispatch(itemsAction.newExpenses(data));
        }
    } catch (err) {
        console.log(`Some error ${err}`);
      }
    } else {
      alert("Input fields are empty!");
    }
      setLoading(false);
};
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
                amount: moneyRef.current.value,
                description: descriptionRef.current.value,
                category:categoryRef.current.value
            };
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
        };

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