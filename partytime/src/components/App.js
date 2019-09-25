import React from "react";
import "../App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import UserProfile from "../containers/UserProfile";
import Login from "./Login";
import NotFound from "./NotFound";
import PlaylistInfo from "./PlaylistInfo";
import SpotifyPlayer from "react-spotify-web-playback";

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
      user: {},
      selectedPlaylist: {}
    };
  }

  componentDidMount() {
    let params = getUrlParams(window.location.hash.slice(1));
    // If user has spotify id AND localStorage doesn't have user
    // then set localStorage to have user
    // then continue on to user profile
    if (!!params.spotify_id && !localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify(params));
      this.setState({ user: JSON.parse(localStorage.user) });
      this.props.history.push("/user/profile");
    }
    //If user doesn't have spotify id AND localStorage does have user
    else if (!params.spotify_id && localStorage.getItem("user")) {
      this.setState({ user: JSON.parse(localStorage.user) });
      // this.props.history.push("/user/profile");
    }
    // If user doesn't have spotify id AND localStorage doesn't have user
    // then redirect to login page
    else if (!params.spotify_id && !localStorage.getItem("user")) {
      this.props.history.push("/login");
    }
  }

  handlePlaylistClick = playlistObj => {
    this.setState({ selectedPlaylist: playlistObj });
    this.props.history.push(`/user/playlists/${playlistObj.id}`);
    localStorage.setItem("selectedPlaylist", playlistObj.uri);
  };

  render() {
    return (
      <Switch>
        <div className="App">
          <header className="App-header">
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/user/playlists/:id"
              render={() => {
                let playlistObj = this.state.selectedPlaylist;
                return <PlaylistInfo playlist={playlistObj} />;
              }}
            />
            <Route
              exact
              path="/user/profile"
              render={() => (
                <UserProfile
                  user={this.state.user}
                  handlePlaylistClick={this.handlePlaylistClick}
                />
              )}
            />
            {/* <Route component={NotFound} /> */}
          </header>
        </div>
      </Switch>
    );
  }
}

export default withRouter(App);
