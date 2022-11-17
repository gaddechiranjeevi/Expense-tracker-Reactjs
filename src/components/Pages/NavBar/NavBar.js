import classes from './NavBar.module.css';

const NavBar = ()=>{
    return(<div className={classes.mainDivv}>
        <div className={classes.subDivvH} >Home</div>
        <div className={classes.subDivvP}>Products</div>
        <div className={classes.subDivvA}>About us</div>
        <hr className={classes.hrelement}></hr>
    </div>)
}

export default NavBar;