import classes from './NavBar.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { authActions } from '../../../Store/Auth'

const NavBar = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const isLogin = useSelector((state) => state.auth.isAuthenticated);
    const ispremium = useSelector((state)=>state.premium.preminumValue)

     const LogOutHandler = (event) => {
        event.preventDefault();
        localStorage.setItem('JWTTOKEN','');
        localStorage.setItem('userID','');
        localStorage.setItem('Email','');
        dispatch(authActions.logout());
        history.replace('/auth');
     };
     console.log(ispremium)
      const checkBoxHandler=(event)=>{
      event.preventDefault();
      
  }
    return ( 
        <div className={classes.mainDivv}>
        <div className={classes.subDivvH} >
        <NavLink to='/welcome' className={classes.nammeclass}>Home</NavLink>
        </div>
        <div className={classes.subDivvP}>
        <NavLink to='/expenses' className={classes.nammeclass}>Products</NavLink>
        </div>
        <div className={classes.subDivvA}>
        <NavLink to='/' className={classes.nammeclass}>About us</NavLink>
        </div>

        {ispremium && <div className={classes.container}>
            <button onClick={checkBoxHandler} className={classes.toggleBtn}>Toggle</button></div>}

        <div className={classes.logoutDiv}>
            <button onClick={LogOutHandler} className={classes.logoutBtn}>{isLogin? 'LogOut' : 'Login' }</button></div>
        <hr className={classes.hrelement}></hr>
    </div>)
}

export default NavBar;