import './App.css';
import { Redirect, Route, Switch} from "react-router-dom";
import NavBar from './components/Pages/NavBar/NavBar';
import React,{ useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './Store/Auth';
import Footer from "./components/Pages/Footer/Footer";
import Loading from "./components/Pages/Loading/Loading";

const Welcome = React.lazy(()=>import('./components/Pages/WelcomePage/Welcome'));
const PasswordReset =React.lazy(()=>import( "./components/Pages/LoginPage/PasswordReset"));
const UserDetails = React.lazy(()=>import("./components/Pages/ProfilePage/UserDetails"));
const Expenses = React.lazy(()=>import("./components/Pages/ExpensesPage/Expenses"));
const LoginPage = React.lazy(()=>import("./components/Pages/LoginPage/LoginPage"));

function App() {
  const dispatch = useDispatch();
  const login = useSelector(state=> state.auth.isAuthenticated)

  useEffect(()=>{
    dispatch(authActions.checker());
  },[])
  return (
    <Suspense fallback={<Loading />}>
          <div className='bgColorApp'>
      <NavBar />
      <Switch>      
      {!login && <Route path="/auth" exact>
      <LoginPage />
      </Route>}
       
      {login && <Route path="/welcome" exact>
        <Welcome />
      </Route>}
      <Route path='/about' exact>
        <Loading />
      </Route>

      {login && <Route path={'/user'} exact>
        <UserDetails />
      </Route>}

      {!login && <Route path="/reset" exact>
        <PasswordReset />
      </Route>}

      {login && <Route path="/expenses" exact>
        <Expenses />
      </Route>}
       <Route path='*' exact>
        {login && <Redirect to='./expenses'></Redirect>}
        {!login && <Redirect to='./auth'></Redirect>}
        </Route>

      </Switch>
      <Footer />
    </div>
    </Suspense>
  );
}

export default App;
