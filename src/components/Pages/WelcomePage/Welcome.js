import { Link } from 'react-router-dom';
import classes from './Welcome.module.css';

const Welcome = () =>{
    return(
    <div className={classes.WelcomebackgroundDiv} >
        <div className={classes.headingh1}>
            <div>
                <h1>Welcome to Expense Tracker</h1>
            </div>
            <div className={classes.message}>
                <label className={classes.labelText}> Your Profile is Incomplete. <Link to='/user' className={classes.ComleteNow} >Complete Now</Link></label>
            </div>
        </div>
    </div>
    );
}

export default Welcome;