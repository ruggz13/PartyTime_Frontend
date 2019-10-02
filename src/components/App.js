import React from "react";
import "../App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import UserProfile from "../containers/UserProfile";
import Login from "./Login";
import EventsContainer from "../containers/EventsContainer";
// import NotFound from "./NotFound";
import PlaylistInfo from "./PlaylistInfo";
import SpotifyPlayer from "react-spotify-web-playback";
import SpotifyWebApi from "spotify-web-api-js";

function getUrlParams(search) {
  let hashes = search.slice(search.indexOf("?") + 1).split("&");
  let params = {};
  hashes.map(hash => {
    let [key, val] = hash.split("=");
    return (params[key] = decodeURIComponent(val));
  });
  return params;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      selectedPlaylist: {},
      selectedSongUri: null,
      play: false,
      playlistSongs: [],
      offset: 0,
      events: []
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
    this.setState(() => ({ selectedPlaylist: playlistObj }));
    this.props.history.push(`/user/playlists/${playlistObj.id}`);
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(JSON.parse(localStorage.user).access_token);
    spotifyApi
      .getPlaylistTracks(playlistObj.id)
      .then(data =>
        this.setState({ playlistSongs: data.items, offset: 0, play: true })
      );
    // this.setState({ offset: 0, playlistSongs: });
  };

  handleSongClick = index => {
    this.setState({ offset: index });
  };

  getPlaylistSongUris() {
    let newPlaylistSongs = this.state.playlistSongs.filter(
      song => song.track.id !== null
    );
    let uris = newPlaylistSongs.map(song => song.track.uri);
    return uris;
  }

  getEvents = eventObj => {
    this.setState({ events: [...this.state.events, eventObj] });
  };

  render() {
    // console.log(this.state.selectedPlaylist.uri);
    return (
      <>
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route
                exact
                path="/login"
                component={!localStorage.user ? Login : null}
              />
              <Route
                exact
                path="/user/playlists/:id"
                render={() => {
                  let playlistObj = this.state.selectedPlaylist;
                  return (
                    <PlaylistInfo
                      playlist={playlistObj}
                      getPlaylistSongs={this.getPlaylistSongs}
                      handleSongClick={this.handleSongClick}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/user/events"
                render={() => <EventsContainer newEvents={this.state.events} />}
              />
              <Route
                exact
                path="/user/profile"
                render={() => (
                  <UserProfile
                    user={this.state.user}
                    handlePlaylistClick={this.handlePlaylistClick}
                    getEvents={this.getEvents}
                  />
                )}
              />
              {/* <Route component={NotFound} /> */}
            </Switch>
          </header>
        </div>
        <div className="musicPlayer">
          {localStorage.user ? (
            <SpotifyPlayer
              token={JSON.parse(localStorage.user).access_token}
              uris={this.getPlaylistSongUris()}
              autoPlay={true}
              play={this.state.play}
              magnifySliderOnHover={true}
              offset={this.state.offset}
              styles={{
                bgColor: "#333",
                color: "#61dafb",
                loaderColor: "#fff",
                sliderColor: "#61dafb",
                savedColor: "#fff",
                trackArtistColor: "#ccc",
                trackNameColor: "#fff"
              }}
            />
          ) : null}
        </div>
      </>
    );
  }
}

export default withRouter(App);
