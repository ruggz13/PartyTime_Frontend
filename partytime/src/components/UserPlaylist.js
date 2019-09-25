import React from "react";
import { Card, Image } from "semantic-ui-react";
import SpotifyWebApi from "spotify-web-api-js";
import "../UserPlaylist.css";

class UserPlaylist extends React.Component {
  render() {
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(`${this.props.access_token}`);

    return (
      <div
        className="playlist_card"
        onClick={() => this.props.handlePlaylistClick(this.props.playlist)}
      >
        <Card>
          <Card.Content>
            <Card.Header>{this.props.playlist.name}</Card.Header>
            <Image src={this.props.playlist.images[0].url} />
            <Card.Meta></Card.Meta>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default UserPlaylist;
