import classes from './NavBar.module.css';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import Context from '../../../Context/Context'
import { NavLink, useHistory } from 'react-router-dom';
import { authActions } from '../../../Store/Auth'

const NavBar = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const CTX = useContext(Context);

     const LogOutHandler = (event) => {
        event.preventDefault();
        localStorage.setItem('JWTTOKEN','');
        localStorage.setItem('userID','');
        localStorage.setItem('Email','');
        dispatch(authActions.logout());
        history.replace('/auth');
     }
    return(<div className={classes.mainDivv}>
        <div className={classes.subDivvH} >
        <NavLink to='/welcome' className={classes.nammeclass}>Home</NavLink>
        </div>
        <div className={classes.subDivvP}>
        <NavLink to='/expenses' className={classes.nammeclass}>Products</NavLink>
        </div>
        <div className={classes.subDivvA}>
        <NavLink to='/' className={classes.nammeclass}>About us</NavLink>
        </div>
        <div className={classes.logoutDiv}><button onClick={LogOutHandler} className={classes.logoutBtn}>{CTX.isLogin? 'LogOut' : 'Login' }</button></div>
        <hr className={classes.hrelement}></hr>
    </div>)
}

export default NavBar;