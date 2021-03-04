import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import ProfilePage from "./Components/ProfilePage";
import LoginPage from "./Components/LoginPage";
import AboutPage from "./Components/AboutPage";
import LandingPage from "./Components/LandingPage";
import CreateAccount from './Components/CreateAccount';
import ForgotPassword from './Components/ForgotPassword';
import ConfirmForgotPassword from './Components/ConfirmForgotPassword';
import ViewEvent from './Components/ViewEvent';
import CreateEvent from './Components/CreateEvent';
import LogoutPage from "./Components/LogoutPage";
import ChangePassword from "./Components/ChangePassword";
import { Provider } from 'react-redux'
import ReduxToastr, { reducer as toastrReducer } from 'react-redux-toastr'
import { createStore, combineReducers } from 'redux'
import Calendar from './Components/Calendar'
import { Helmet } from 'react-helmet'
import Roster from './Components/Roster';

const reducers = {
  toastr: toastrReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

function App() {
  return (

    <div className="App">
      <Helmet>
        <title>{'Recess'}</title>
      </Helmet>

      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/About" component={AboutPage} />
          <Route exact path="/Profile" component={ProfilePage} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/CreateAccount" component={CreateAccount} />
          <Route exact path="/ForgotPassword" component={ForgotPassword} />
          <Route exact path="/ConfirmForgotPassword" component={ConfirmForgotPassword} />
          <Route exact path="/ViewEvent" component={ViewEvent} />
          <Route exact path="/CreateEvent" component={CreateEvent} />
          <Route exact path="/Logout" component={LogoutPage} />
          <Route exact path="/Calendar" component={Calendar} />
          <Route exact path="/ChangePassword" component={ChangePassword} />
          <Route exact path="/CreateRoster" component={Roster} />
        </Switch>
      </BrowserRouter>
      <Provider store={store}>
        <div>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-center"
            getState={(state) => state.toastr} // This is the default
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            closeOnToastrClick />
        </div>
      </Provider>
    </div>
  );
}

export default App;
