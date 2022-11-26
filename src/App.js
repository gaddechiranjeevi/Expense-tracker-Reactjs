import './App.css';
import { Route, Switch} from "react-router-dom";
import UserDetails from './components/Pages/ProfilePage/UserDetails'
import LoginPage from './components/Pages/LoginPage/LoginPage';
import Welcome from "./components/Pages/WelcomePage/Welcome";
import NavBar from './components/Pages/NavBar/NavBar';
import PasswordReset from './components/Pages/LoginPage/PasswordReset';
import { useContext } from 'react';
import Expenses from './components/Pages/ExpensesPage/Expenses';
import Context from './Context/Context';
import Footer from "./components/Pages/Footer/Footer";

function App() {
  const CTX = useContext(Context);
  return (
    <div >
      <NavBar />
      <Switch>      
      {!CTX.isLogin && <Route path="/auth" exact>
      <LoginPage />
      </Route>}
       
      {CTX.isLogin && <Route path="/welcome" exact>
        <Welcome />
      </Route>}

      {CTX.isLogin && <Route path={'/user'} exact>
        <UserDetails />
      </Route>}

      {!CTX.isLogin && <Route path="/reset" exact>
        <PasswordReset />
      </Route>}

      {CTX.isLogin && <Route path="/expenses" exact>
        <Expenses />
      </Route>}

      </Switch>
      <Footer />
    </div>
  );
}

export default App;
