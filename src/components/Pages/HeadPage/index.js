import React, { useEffect, useState } from "react";
import classes from "./leadership.module.css";
import UserList from "./UserList";
import axios from "axios";
import ExpenseList from "./ExpenseList";

const Leadership = () => {
    const [ userArray, setUserArray] = useState([]);
    const [ expenseArray, setExpenseArray] = useState([]);
    const token = localStorage.getItem("JWTTOKEN");

const fetchUsers = async() => {
    const response = await axios.get("http://localhost:3000/auth/api/getallusers", { headers: { Authorization: token } })
    console.log(response);
    setUserArray(response.data.response)
}

useEffect(()=>{
    fetchUsers()
},[token])

const fetchExpenseHandler = (data) => {
    setExpenseArray(data);
}
  return (
    <div className={classes.imagecontainer}>
      <div className={classes.headingcontainer}>
        <h1>Leadership Board</h1>
      </div>
      <div className={classes.leadershipmaincontainer}>
        <div className={classes.subcontainer}>
          <div className={classes.itemheading}>
            <h3>All Users</h3>
          </div>
          {userArray.map((ele)=>{
            return  <UserList user={ele} key={ele.id} fetchExpenseHandler={fetchExpenseHandler}/>
          })}
        </div>
        <div className={classes.subcontainer}>
          <div className={classes.itemheading}>
            <h3>User Expenses</h3>
          </div>
          {expenseArray.map((ele)=>{
            return  <ExpenseList data={ele}/>
          })}
        </div>
      </div>
    </div>
  );
};

export default Leadership;