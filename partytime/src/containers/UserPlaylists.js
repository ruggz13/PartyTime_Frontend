import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import UserPlaylist from "../components/UserPlaylist";
import "../UserPlayLists.css";

class UserPlaylists extends React.Component {
  constructor() {
    super();
    this.state = {
      playlists: []
    };
  }

  componentDidMount() {
    Promise.all([
      this.fetchAllSpotifyPlaylists(),
      this.fetchPartyTimePlaylists()
    ]).then(
      data => {
        console.log(data);
        this.setState({ playlists: data[0].items });
      },
      function(err) {
        console.error(err);
      }
    );
  }

  //create fetch PartyTime(backend) playlists
  fetchPartyTimePlaylists = () => {
    return fetch("http://localhost:3001/playlists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());
  };

  //create fetch for Spotify playlists
  fetchAllSpotifyPlaylists = () => {
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(JSON.parse(localStorage.user).access_token);
    return spotifyApi.getUserPlaylists();
  };

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
