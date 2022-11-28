import ExpensesForm from "../ExpensesPage/ExpensesForm";
import Card from "../../../UI/Card";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpensesList from "../ExpensesPage/ListOfExpenses";
import classes from "./Expenses.module.css";
import TotalExpense from "../ExpensesPage/TotalExpenses";
import { itemAction } from "../../../Store/FetchData";
import Context from "../../../Context/Context";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Expenses = () => {
  
  const dispatch = useDispatch();
  const paginationFetch = useContext(Context);
  const { forReload } = paginationFetch;
  const [rows, setRows] = useState(10);
  const itemsX = useSelector((state) => state.itemsData.itemList);
  const pagination = useSelector((state) => state.pagination.expensePagination);


  useEffect(() => {
    const fetchedRows = localStorage.getItem("rowsPerPage");
    if (fetchedRows) {
      setRows(fetchedRows);
    }
  }, []);

  const nextProducts = () => {
    forReload(pagination.nextPage, rows);
  };
  const previousProducts = () => {
    forReload(pagination.previousPage, rows);
  };
  const handleChange = (event) => {
    setRows(event.target.value);
    localStorage.setItem("rowsPerPage", event.target.value);
    forReload(1, event.target.value);
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
      <>
          {itemsX.map((element) => {
            return (
              <ExpensesList
                money={element.amount}
                description={element.description}
                category={element.category}
                id={element.id}
                key={element.id}
              />
            );
          })}
        </>
        <div></div>
        <div className={classes.paginationcontainer}>
        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-simple-select-autowidth-label">
              Rows per page
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={rows}
              onChange={handleChange}
              autoWidth
              label="Rows per page"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        {pagination?.previousPage ? (
            <button className={classes.paginationBtn} onClick={previousProducts}>
              {"<"}
            </button>
          ) : null}
          <button className={classes.paginationBtn}>
            {pagination?.currentPage ? pagination.currentPage : 0}
          </button>
          {pagination?.nextPage ? (
            <button className={classes.paginationBtn} onClick={nextProducts}>
              {">"}
            </button>
          ) : null}
        </div>
        </Card>
    </div>
  );
};

export default Expenses;