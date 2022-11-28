import React, { useEffect, useState } from "react";
import Card from "../../../UI/Card";
import "./Report.css";
import TableComp from "./TableComp";
import moment from "moment";
import axios from "axios";

const Report = () => { 
    const [expenseList, setExpenseList] = useState([]);
    const date = moment().format('DD-MM-YYYY');
    const [ReportList, setReportList] = useState([]);
    const [TotaltList, setTotalList] = useState([]);
    const token = localStorage.getItem("JWTTOKEN");

    const expenseTableValues = ["Date", "Description", "Category", "Expense"] 
    const yealyTableValues = ["Month", "Income", "Expenses", "Savings"] 
    const ReportTableValues = ["Date", "FileName", "DownloadLink"];

    const fetchReport = async() => {
      try{
        const response = await axios.post("http://localhost:3000/auth/api/report/all",'',  
        { headers: { Authorization: token } 
    });
    console.log(response.data.response);
    setExpenseList(response.data.response.ExpensesList);
    setReportList(response.data.response.ReportFileUrl)
      } catch (err){
        console.log(err)
      }
    }
useEffect(()=>{
  fetchReport();
},[]);

const downloadHandler = async (e) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/api/report/download",
        { headers: { Authorization: token } }
      );
      console.log(response.data.response);
      if (response.data.type === 1) {
        var a = document.createElement("a");
        a.href = response.data.response;
        a.download = "myexpenses.csv";
        a.click();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="image-container">
      <div className="heading-container">
        <h1>Day to Day Expenses</h1>
      </div>
      <div className="dateinfo">
      <label>{date}</label>
        <button className="reportDownloadBTn" onClick={downloadHandler}>
          {" "}
          🡇 Download file
        </button>
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
            <TableComp expenseList={TotaltList} TableValues={yealyTableValues} />
        </div>
      </Card>
      <Card>
        <div className="year-container">
          <h3>Downloaded Reports</h3>
        </div>
        <div className="table-container">
          <TableComp expenseList={ReportList} TableValues={ReportTableValues} />
        </div>
      </Card>
    </div>
  );
};

export default Report;