import ExpensesForm from "../ExpensesPage/ExpensesForm";
import Card from "../../../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import ExpensesList from "../ExpensesPage/ListOfExpenses";
import classes from "./Expenses.module.css";
import TotalExpense from "../ExpensesPage/TotalExpenses";
import { itemAction } from "../../../Store/FetchData";

const Expenses = () => {
  
  const dispatch = useDispatch();
  const itemsX = useSelector(state=> state.itemsData.itemList);

   console.log(itemsX);

  const itemsList = itemsX.map((element) => {
    return (

      <ExpensesList
        money={element.enteredMoney}
        description={element.enteredDescription}
        category={element.enteredCategory}
        id={element.id}
        key={element.id}
      />

    );
  });

  return (
    <div className={classes.expensesMaindiv}>
      <div className={classes.expensesheading}>
        <h1>Expense Tracker</h1>
      </div>
      <Card>
        <TotalExpense />
      </Card>

      <Card>
        <ExpensesForm onClick={''} />
      </Card>
      <Card>{itemsList}</Card>
    </div>
  );
};

export default Expenses;