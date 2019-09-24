import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import PlaylistSong from "./PlaylistSong";
import { withRouter } from "react-router-dom";

class PlaylistInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: []
    };
  }

  componentDidMount() {
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(JSON.parse(localStorage.user).access_token);
    spotifyApi
      .getPlaylistTracks(this.props.playlist.id)
      .then(data => this.setState({ songs: data.items }), function(err) {
        console.error(err);
      });
  }

  handleClick = () => {
    this.props.history.push("/user/profile");
  };

  render() {
    return (
      <div>
        <h1>{this.props.playlist.name}</h1>
        <button className="ui button" onClick={this.handleClick}>
          Home
        </button>
        <br></br>
        <br></br>
        <div className="ui grid">
          {this.state.songs.map(song => {
            return <PlaylistSong song={song} key={song.track.id} />;
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(PlaylistInfo);
