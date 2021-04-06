import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login/login/Login";
import ResetPassword from "./components/login/reset/ResetPassword";
import ForgotPassword from "./components/login/reset/ForgotPassword";
import SignUp from "./components/login/signUp/SignUp";
import User from "./components/users/User.jsx";
import UserConfirm from "./components/users/UserConfirm.jsx";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/autentication/authState";
import TurnState from "./context/turn/turnState";
import UserState from "./context/user/userState";
import Home from "./components/home/Home";
import Landing from "./components/landing/Landing";
import AdminTurns from "./components/users/adminUsers/AdminTuns";
import AdminUsers from "./components/users/adminUsers/AdminUsers";
import Admin from "./components/users/adminUsers/Admin/Admin";
import authToken from "./config/tokenAuth";
import PrivateRourte from "./components/protectRoutes/PrivateRoute";
import Layout from "./components/general/layout";

//check if we have token
const token = localStorage.getItem("token");
if (token) {
  authToken(token);
}

function App() {
  return (
    <BrowserRouter>
      <AlertState>
        <AuthState>
          <UserState>
            <TurnState>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/forgot" component={ForgotPassword} />
                <Route exact path="/reset/:id" component={ResetPassword} />
                <Layout>
                  <PrivateRourte exact path="/user" component={User} />
                  <PrivateRourte path="/confirm" component={UserConfirm} />{" "}
                  <PrivateRourte exact path="/admin" component={Admin} />
                  <PrivateRourte path="/admin/users" component={AdminUsers} />
                  <PrivateRourte path="/admin/turns" component={AdminTurns} />
                </Layout>
              </Switch>
            </TurnState>
          </UserState>
        </AuthState>
      </AlertState>
    </BrowserRouter>
  );
}

export default App;
