import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import UserPlaylist from "../components/UserPlaylist";

class UserPlaylists extends React.Component {
  constructor() {
    super();
    this.state = {
      playlists: []
    };
  }

  componentDidMount() {
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(JSON.parse(localStorage.user).access_token);
    spotifyApi
      .getUserPlaylists()
      .then(data => this.setState({ playlists: data.items }), function(err) {
        console.error(err);
      });
  }

  render() {
    // var Spotify = require("spotify-web-api-js");
    // var s = new Spotify();

    return (
      <div>
        <h1>DJ's Playlists:</h1>
        <br></br>
        <div className="ui grid">
          {this.state.playlists.map(playlist => {
            return (
              <UserPlaylist
                playlist={playlist}
                key={playlist.id}
                access_token={this.props.user.access_token}
                handlePlaylistClick={this.props.handlePlaylistClick}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default UserPlaylists;
