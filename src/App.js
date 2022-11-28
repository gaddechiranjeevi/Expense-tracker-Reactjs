import './App.css';
import { Redirect, Route, Switch, useHistory} from "react-router-dom";
import NavBar from './components/Pages/NavBar/NavBar';
import React,{ useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './Store/Auth';
import axios from "axios";
import Footer from "./components/Pages/Footer/Footer";
import { premiumActions } from './Store/PremiumBtn';
import Loading from "./components/Pages/Loading/Loading";
import { SnackbarProvider} from "notistack";
import Report from "./components/Pages/Report";
import Leadership from "./components/Pages/HeadPage/";

const dotenv = require('dotenv');
dotenv.config();

const Welcome = React.lazy(()=>import('./components/Pages/WelcomePage/Welcome'));
const PasswordReset =React.lazy(()=>import( "./components/Pages/LoginPage/PasswordReset"));
const UserDetails = React.lazy(()=>import("./components/Pages/ProfilePage/UserDetails"));
const Expenses = React.lazy(()=>import("./components/Pages/ExpensesPage/Expenses"));
const LoginPage = React.lazy(()=>import("./components/Pages/LoginPage/LoginPage"));

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const login = useSelector(state=> state.auth.isAuthenticated)

  const token = localStorage.getItem("JWTTOKEN");

  const userFetch = async () => {
    if (login) {
      const res = await axios.get(
        "http://localhost:7777/auth/user/api/verify",

        { headers: { Authorization: token } }
      );
      console.log(res);
      if(res.data.response.isPreminum){
        console.log("inside")
        dispatch(premiumActions.activatePremium()); 
      }
      if (
        res.data.response.name &&
        res.data.response.name === "TokenExpiredError" ||
        res.data.response.name === "JsonWebTokenError"
      ) {
        localStorage.setItem("JWTTOKEN", "");
        localStorage.setItem("userID", "");
        localStorage.setItem("Email", "");

        dispatch(authActions.logout());
        history.replace("/auth");
      }
    }
  };
  useEffect(() => {
    userFetch();
  }, [token,login]);
  
  useEffect(()=>{
    dispatch(authActions.checker());
  }, [])
  return (
    <Suspense fallback={<Loading />}>
          <div className='bgColorApp'>
            <SnackbarProvider maxSnack={3}>
      <NavBar />
      <Switch>      
      {!login && (<Route path="/auth" exact>
      <LoginPage />
      </Route>
      )}
       
      {login && (<Route path="/welcome" exact>
        <Welcome />
      </Route>
      )}

      <Route path='/about' exact>
        <Loading />
      </Route>

      {login && (<Route path={'/user'} exact>
        <UserDetails />
      </Route>
      )}
       {login && (
        <Route path="/leadership" exact>
        <Leadership />
        </Route>
        )}

        {login && (
        <Route path="/Report" exact>
      <Report />
      </Route>
      )}

      {!login && (<Route path="/reset" exact>
        <PasswordReset />
      </Route>
      )}

      {login && (<Route path="/expenses" exact>
        <Expenses />
      </Route>
      )}
       <Route path='*' exact>
        {login && <Redirect to='./expenses'></Redirect>}
        {!login && <Redirect to='./auth'></Redirect>}
        </Route>
      </Switch>
      <Footer />
      </SnackbarProvider>
      </div>
    </Suspense>
  );
}

export default App;
