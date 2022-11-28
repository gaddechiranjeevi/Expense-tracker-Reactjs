import React from "react";
import axios from "axios";

const UserList = (props) => {
const { fetchExpenseHandler } = props
    const token = localStorage.getItem("JWTTOKEN");

    const fetchHandler =async (e) => {
        e.stopPropagation();
        console.log(props.user.id )
        const data = { id: props.user.id}
    const response = await axios.post("http://localhost:3000/auth/api/alluser/expenses",data, { headers: { Authorization: token } })
       console.log(response);
       fetchExpenseHandler(response.data.response)
    }

    return(
        <div className="listItemDiv" onClick={fetchHandler}>
            <ul className="list-container" >
                <li>
                    {props.user.name}
                </li>
                <li>
                    {props.user.email}
                </li>

            </ul>
        </div>
    )
}

export default UserList;