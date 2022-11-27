import './App.css';
import { Route, Switch} from "react-router-dom";
import UserDetails from './components/Pages/ProfilePage/UserDetails'
import LoginPage from './components/Pages/LoginPage/LoginPage';
import Welcome from "./components/Pages/WelcomePage/Welcome";
import NavBar from './components/Pages/NavBar/NavBar';
import PasswordReset from './components/Pages/LoginPage/PasswordReset';
import { useEffect } from 'react';
import Expenses from './components/Pages/ExpensesPage/Expenses';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './Store/Auth';
import Footer from "./components/Pages/Footer/Footer";

function App() {
  const dispatch = useDispatch();
  const login = useSelector(state=> state.auth.isAuthenticated)

  useEffect(()=>{
    dispatch(authActions.checker());
  },[])
  return (
    <div >
      <NavBar />
      <Switch>      
      {!login && <Route path="/auth" exact>
      <LoginPage />
      </Route>}
       
      {login && <Route path="/welcome" exact>
        <Welcome />
      </Route>}

      {login && <Route path={'/user'} exact>
        <UserDetails />
      </Route>}

      {!login && <Route path="/reset" exact>
        <PasswordReset />
      </Route>}

      {login && <Route path="/expenses" exact>
        <Expenses />
      </Route>}

      </Switch>
      <Footer />
    </div>
  );
}

export default App;
