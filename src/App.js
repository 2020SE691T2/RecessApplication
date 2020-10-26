import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProfilePage from "./Components/ProfilePage"
import LoginPage from "./Components/recess"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <Redirect to="/login" />
                )
              }}
            />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/Profile" component={ProfilePage} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
