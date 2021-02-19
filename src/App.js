import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {inject, observer} from "mobx-react";
import Home from "./pages/Home";
import {library} from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon]);

library.add(...iconList);



@inject('userStore')
@observer
class App extends React.Component {

  render() {

    return (
      <Router>
        <Switch>
          <React.StrictMode>
            <Route exact path={"/login"} component={Login}/>
            <Route exact path={"/signup"} component={Signup}/>
            <Route exact path={"/"} component={Home} />
          </React.StrictMode>
        </Switch>
      </Router>
    );
  }
}

export default App;
