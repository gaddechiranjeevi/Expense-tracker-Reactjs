import classes from './NavBar.module.css';
import { useHistory } from 'react-router-dom';

const NavBar = ()=>{
    const history = useHistory();

     const LogOutHandler = (event) => {
        event.preventDefault();
        localStorage.setItem('JWTTOKEN','');
        localStorage.setItem('userID','');
        localStorage.setItem('Email','');
        history.replace('/auth');
     }
    return(<div className={classes.mainDivv}>
        <div className={classes.subDivvH} >Home</div>
        <div className={classes.subDivvP}>Products</div>
        <div className={classes.subDivvA}>About us</div>
        <div className={classes.logoutDiv}><button onClick={LogOutHandler} className={classes.logoutBtn}> LogOut </button></div>
        <hr className={classes.hrelement}></hr>
    </div>)
}

export default NavBar;