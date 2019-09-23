import React from "react";
import { Card, Image } from "semantic-ui-react";

class UserPlaylist extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <Card.Content>
            <Card.Header>{this.props.playlist.name}</Card.Header>
            <Image src={this.props.playlist.images[1].url} />
            <Card.Meta></Card.Meta>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default UserPlaylist;
