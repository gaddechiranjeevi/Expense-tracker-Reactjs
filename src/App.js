import './App.css';
import { Redirect, Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import LoginPage from './components/Pages/LoginPage/LoginPage';
import Welcome from "./components/Pages/WelcomePage/Welcome";
import NavBar from './components/Pages/NavBar/NavBar';

function App() {
  return (
    <div >
      <NavBar />
      <Switch>      

      <LoginPage path='/auth' />

      <Route path='/welcome'>
        <Welcome />
      </Route>

      <Route path='*'>
        <Redirect to='/auth' />
      </Route>
      </Switch>
    </div>
  );
}

export default App;
