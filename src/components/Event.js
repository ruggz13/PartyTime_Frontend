import React from "react";
import { Card, Image, Header, Button } from "semantic-ui-react";

class Event extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="event_card">
        <Card>
          <Card.Content>
            <Card.Header>Event: {this.props.event.name}</Card.Header>
            <Card.Header>DJ: {this.props.event.host}</Card.Header>
            <Card.Header>
              Playlist: {this.props.event.playlist.title}
            </Card.Header>
            <Card.Meta>Location: {this.props.event.venue}</Card.Meta>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default Event;
