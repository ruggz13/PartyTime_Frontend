import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button } from "reactstrap";

const button = () => {
  return (
    <Button as="a" href="http://localhost:3001/api/v1/login">
      Log in
    </Button>
  );
};
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Route exact path="/login" component={button} />
        </header>
      </div>
    </Router>
  );
}

export default App;
