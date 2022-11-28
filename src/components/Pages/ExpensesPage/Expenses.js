import ExpensesForm from "../ExpensesPage/ExpensesForm";
import Card from "../../../UI/Card";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpensesList from "../ExpensesPage/ListOfExpenses";
import classes from "./Expenses.module.css";
import TotalExpense from "../ExpensesPage/TotalExpenses";
import { itemAction } from "../../../Store/FetchData";
import Context from "../../../Context/Context";

const Expenses = () => {
  
  const dispatch = useDispatch();
  const paginationFetch = useContext(Context);
  const { forReload } = paginationFetch;
  const itemsX = useSelector((state) => state.itemsData.itemList);
  const pagination = useSelector((state) => state.pagination.expensePagination);


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

  const nextProducts = () => {
    forReload(pagination.nextPage);
  };
  const previousProducts = () => {
    forReload(pagination.previousPage);
  };

  return (
    <div className={classes.expensesMaindiv}>
      <div className={classes.expensesheading}>
        <h1>Expense Tracker</h1>
      </div>
      <Card>
        <TotalExpense />
      </Card>

      <Card>
        <ExpensesForm onClick={""} />
      </Card>
      <Card>
        <>{itemsList}</>
        <div className="pagination-container">
        {pagination?.previousPage ? (
            <button className="paginationBtn" onClick={previousProducts}>
              {"<"}
            </button>
          ) : null}
          <button className="paginationBtn">
            {pagination?.currentPage ? pagination.currentPage : 0}
          </button>
          {pagination?.nextPage ? (
            <button className="paginationBtn" onClick={nextProducts}>
              {">"}
            </button>
          ) : null}
        </div>
        </Card>
    </div>
  );
};

export default Expenses;