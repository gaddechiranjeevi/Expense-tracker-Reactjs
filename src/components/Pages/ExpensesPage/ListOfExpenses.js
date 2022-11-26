import classes from "./ListOfExpenses.module.css";

const ExpensesList = (props) => {
    console.log(props);
    return(<div className={classes.maindivitems}>
        <div className={classes.maindivitemsh3}>
            <h3>{props.category}</h3>
        </div>
        <div className={classes.maindivitemsdis}>
            <label> {props.description}</label>
        </div>
        <div className={classes.moneyItemsdiv}>
            <div className={classes.moneyItemslabels}><label>{props.money}</label> {props.money}</div>
        </div>
        <hr className={classes.hrelementss}></hr>
    </div>)
}

export default ExpensesList;