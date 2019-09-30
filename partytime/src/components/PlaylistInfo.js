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
    let playlist_data = {
      user_id: JSON.parse(localStorage.user).id,
      title: this.props.playlist.name,
      spotify_id: this.props.playlist.id
    };
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(JSON.parse(localStorage.user).access_token);
    spotifyApi
      .getPlaylistTracks(this.props.playlist.id)
      .then(data => this.setState({ songs: data.items }));
    fetch("http://localhost:3001/playlists", {
      method: "POST",
      body: JSON.stringify(playlist_data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(data => console.log(data));
  }

  //   componentDidUpdate(){
  //       this.props.getPlaylistSongs(this.state.songs);
  //   }

  handleClick = () => {
    this.props.history.push("/user/profile");
  };

  getSongUris = () => {
    let songs = this.state.songs.map(song => song.track.uri);
    this.props.getPlaylistSongs(songs);
  };

  checkIfIdIsValid = () => {
    let validSongs = this.state.songs.filter(song => song.track.id !== null);
    return validSongs;
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
          {this.checkIfIdIsValid().map((song, index) => {
            return (
              <PlaylistSong
                song={song}
                key={song.track.id}
                index={index}
                handleSongClick={this.props.handleSongClick}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(PlaylistInfo);
