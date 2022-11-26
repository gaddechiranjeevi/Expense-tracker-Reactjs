import classes from './TotalExpenses.module.css';

const TotalExpenses =(props) => {
    return (
            <div className={classes.maindiv}>
                <div>
                <h2>Total Expenses</h2>
            </div>
            <div className={classes.amountdiv}>
                <label>{props.total}.00</label>
            </div>
        </div>
    );
};

export default TotalExpenses;