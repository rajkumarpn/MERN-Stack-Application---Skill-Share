import React, { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import LandingPage from "./components/layout/LandingPage";
import "./components/layout/component.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "./reducer";
import Alert from "./components/Alert";
import setAuth from "./utils/setAuth";
import { loadUser } from "./action/register";
import Privateroute from './components/route/Privateroute';
import dashboard from './components/dashboard/dashboard';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddExperience from './components/profile/AddExperience';
import AddEducation from './components/profile/AddEducation';
import Profiles from './components/profile/Profiles';
import SingleProfile from './components/profile/SingleProfile';
import Posts from './components/post/posts'
import SinglePost from './components/post/singlepost/post'
const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
if (localStorage.token) {
  setAuth(localStorage.token);
}
const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuth(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <section>
          <div className="myalert">
            <Alert />
          </div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Privateroute exact path="/dashboard" component={dashboard} />
            <Privateroute exact path="/create-profile" component={CreateProfile} />
            <Privateroute exact path="/edit-profile" component={EditProfile}/>
            <Privateroute exact path="/add-experience" component={AddExperience}/>
            <Privateroute exact path="/add-education" component={AddEducation}/>
            <Route exact path="/developers" component={Profiles} />
            <Route exact path="/profile/:id" component={SingleProfile} />
            <Privateroute exact path="/posts" component={Posts}/>
            <Privateroute exact path="/posts/:id" component={SinglePost}/>
          </Switch>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
