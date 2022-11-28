import classes from "./ListOfExpenses.module.css";
import axios from 'axios';
import { useContext } from "react";
import Context from "../../../Context/Context";

const ExpensesList = (props) => {
    const CTX = useContext(Context);

    const deleteBtnHandler = async(event) =>{
        
        const userId = localStorage.getItem('userID');
        try{
            const res = await axios.delete(`https://expensetracker-userdata-default-rtdb.firebaseio.com/expenses/${userId}/${props.id}.json`)
            console.log(res);
            console.log('Expense successfuly deleted');
            CTX.forReload();
        }catch(err){
            console.log(`Some error ${err}`);
        }
    }

    const editBtnHandler = (event)=>{
        event.preventDefault();

        CTX.editable(props);
    }
    return (
    <div className={classes.maindivitems}>
        <div className={classes.maindivitemsh3}>
            <h3>{props.description}</h3>
        </div>
        <div className={classes.maindivitemsdis}>
            <label> {props.category}</label>
        </div>
        <div className={classes.moneyItemsdiv}>
            <div className={classes.moneyItemslabels}>
                <label>{props.money}</label>
                </div>
            <div className={classes.DeletebtnDiv}>
                <button className={classes.Deletebtn}onClick={deleteBtnHandler}>X</button>
                </div>
            <div className={classes.EditbtnDiv}>
                <button className={classes.Editbtn}onCLick={editBtnHandler}>✎</button></div>
        </div>
        <hr className={classes.hrelementss}></hr>
    </div>)
}

export default ExpensesList;