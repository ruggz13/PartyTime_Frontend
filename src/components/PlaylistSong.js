import React from "react";
import { Card, Image } from "semantic-ui-react";
import "../PlaylistSong.css";

class PlaylistSong extends React.Component {
  constructor() {
    super();
    this.state = {
      vote_count: 0
    };
  }

  increaseVote = () => {
    this.setState({ vote_count: this.state.vote_count + 1 });
  };
  render() {
    let image =
      this.props.song.track.album.images[0] === undefined
        ? "data:image/png;base64,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"
        : this.props.song.track.album.images[0].url;

    // debugger;
    // console.log(this.props.song.track.album.images[0].url);
    return (
      <div className="song_card">
        <Card>
          <Card.Content>
            <Card.Header>{this.props.song.track.name}</Card.Header>
            <Image
              src={image}
              onClick={() => this.props.handleSongClick(this.props.index)}
            />
            <Card.Meta>
              By:{" "}
              {this.props.song.track.artists.map(artist =>
                artist.name.concat(" ")
              )}
            </Card.Meta>
            <Card.Description>Votes: {this.state.vote_count}</Card.Description>
          </Card.Content>
          <button className="ui button" onClick={this.increaseVote}>
            Vote!
          </button>
        </Card>
      </div>
    );
  }
}

export default PlaylistSong;
