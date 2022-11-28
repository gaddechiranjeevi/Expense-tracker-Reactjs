const ExpenseList = (props) => {
    console.log(props.data)
    return(
        <div className="listItemDiv">
            <ul className="list-container">
                <li>
                   {props.data.category}
                </li>
                <li>
                    {props.data.description}
                </li>
                <li>
                    {props.data.amount}
                </li>

            </ul>
        </div>
    )
}

export default ExpenseList;