import ExpensesForm from "../ExpensesPage/ExpensesForm";
import Card from "../../../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import ExpensesList from "../ExpensesPage/ListOfExpenses";
import classes from "./Expenses.module.css";
import TotalExpense from "../ExpensesPage/TotalExpenses";
import { itemAction } from "../../../Store/FetchData";

const Expenses = () => {
  
  const dispatch = useDispatch();
  const itemsX = useSelector(state=> state.itemsData.itemList);


  const itemsList = itemsX.map((element) => {
    return (

      <ExpensesList
        money={element.amount}
        description={element.description}
        category={element.category}
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