import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import 'antd/dist/antd.css';

const App = () => {
  return (
    // @ts-ignore
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/index" component={Landing} />
      </Switch>
    </Router>
  );
}

export default App;
