import React from "react";
import "../App.css";
// import { Button } from "reactstrap";
import { Button, Image } from "semantic-ui-react";
import "../login.css";

class Login extends React.Component {
  render() {
    return (
      <div>
        <Image src="partytime_logo.png" />
        <h1>Welcome to PartyTime! Please log in below.</h1>
        <Button as="a" href="http://localhost:3001/api/v1/login">
          Log in
        </Button>
      </div>
    );
  }
}

export default Login;
