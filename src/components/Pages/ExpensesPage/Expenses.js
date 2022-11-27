import ExpensesForm from "../ExpensesPage/ExpensesForm";
import Card from "../../../UI/Card";
import { useContext, useEffect } from "react";
import axios from 'axios';
import ExpensesList from "../ExpensesPage/ListOfExpenses";
import classes from "./Expenses.module.css";
import TotalExpense from "../ExpensesPage/TotalExpenses";
import Context from "../../../Context/Context";

const Expenses = () => {
   const CTX = useContext(Context);
   const auto = () => {
    CTX.forReload()
   }
   useEffect(auto,[]);

   const itemsli = CTX.items;

  const itemsList = itemsli.map((element) => {
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
        <TotalExpense total={CTX.total}/>
      </Card>

      <Card>
        <ExpensesForm onClick={''} />
      </Card>
      <Card>{itemsList}</Card>
    </div>
  );
};

export default Expenses;