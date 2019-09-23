import React from "react";
import "../App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import UserProfile from "../containers/UserProfile";
import Login from "./Login";

function getUrlParams(search) {
  let hashes = search.slice(search.indexOf("?") + 1).split("&");
  let params = {};
  hashes.map(hash => {
    let [key, val] = hash.split("=");
    params[key] = decodeURIComponent(val);
  });
  return params;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    let params = getUrlParams(window.location.hash.slice(1));
    // If user has spotify id AND localStorage doesn't have spotify id
    // then set localStorage to have spotify id
    // then continue on to user profile
    if (!!params.spotify_id && !localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify(params));
      this.setState({ user: JSON.parse(localStorage.user) });
      this.props.history.push("/user/profile");
    }
    // If user doesn't have spotify id AND localStorage doesn't have spotify id
    // then redirect to login page
    else if (!params.spotify_id && !localStorage.getItem("user")) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <Switch>
        <div className="App">
          <header className="App-header">
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/user/profile"
              render={() => <UserProfile user={this.state.user} />}
            />
          </header>
        </div>
      </Switch>
    );
  }
}

export default withRouter(App);
