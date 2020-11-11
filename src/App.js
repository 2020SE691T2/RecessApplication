import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import ProfilePage from "./Components/ProfilePage"
import LoginPage from "./Components/LoginPage"
import LandingPage from "./Components/LandingPage"
import CreateAccount from './Components/CreateAccount';
import ViewEvent from './Components/ViewEvent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/Profile" component={ProfilePage} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/CreateAccount" component={CreateAccount} />
          <Route exact path="/ViewEvent" component={ViewEvent} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
