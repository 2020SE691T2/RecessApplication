import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProfilePage from "./components/ProfilePage"
import LoginPage from "./components/recess"

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
