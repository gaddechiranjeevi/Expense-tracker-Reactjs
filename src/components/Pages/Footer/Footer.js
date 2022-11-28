import classes from "./Footer.module.css";
import { NavLink } from "react-router-dom";

const Footer =() => {
    return (
        <div className={classes.footerdiv}>
            <h2>Expense Tracker</h2>
            <div className="footer-AboutDiv">
        <NavLink to="/about" className={classes.aboutLink}>
          About us
        </NavLink>
      </div>
        </div>
    )
}

export default Footer;