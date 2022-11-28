import React, { useEffect, useState } from "react";
import Card from "../../../UI/Card";
import "./Report.css";
import TableComp from "./TableComp";
import moment from "moment";
import axios from "axios";

const Report = () => { 
    const [expenseList, setExpenseList] = useState([]);
    const date = moment().format('DD-MM-YYYY')
    const token = localStorage.getItem("JWTTOKEN");

    const expenseTableValues = {
      one: "Date",
      two: "Description",
      three: "Category",
      four: "Expense"
    }
    const yealyTableValues = {
      one: "Month",
      two: "Income",
      three: "Expenses",
      four: "Savings"
    }

    const fetchReport = async() => {
      try{
        const response = await axios.post("http://localhost:3000/auth/api/report/expense",'',  { headers: { Authorization: token } });
        console.log(response.data.response)
        setExpenseList(response.data.response)
      } catch (err){
        console.log(err)
      }
    }
useEffect(()=>{
  fetchReport();
},[])
  return (
    <div className="image-container">
      <div className="heading-container">
        <h1>Day to Day Expenses</h1>
      </div>
      <div className="dateinfo">
      <label>{date}</label>
      <label>{}</label>
      </div>
      <Card>
        <div className="year-container">
           <h3>2022</h3>
           <lable>July 2022</lable> 
        </div>
        <div className={classes.tablecontainer}>

            <TableComp expenseList={expenseList} TableValues={expenseTableValues} />
        </div>
      </Card>
      <Card>
      <div className="year-container">
           <h3>Yearly Report</h3>
        </div>
        <div className={classes.tablecontainer}>
            <TableComp expenseList={expenseList} TableValues={expenseTableValues} />
        </div>
    
      </Card>
    </div>
  );
};

export default Report;