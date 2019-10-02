import React from "react";
import { Card, Image, Header, Modal, Form, Button } from "semantic-ui-react";
import SpotifyWebApi from "spotify-web-api-js";
import "../UserPlaylist.css";

class UserPlaylist extends React.Component {
  handleFormSubmit = event => {
    console.log("trying to submit form");
    const target = event.target;
    const event_name = target.event.value;
    const venue_name = target.venue.value;
    const host_name = target.host.value;
    let playlist = this.props.playlist;
    let data = {
      name: event_name,
      venue: venue_name,
      host: host_name,
      spotify_id: playlist.id,
      user_id: JSON.parse(localStorage.user).id,
      title: playlist.name
    };
    debugger;
    fetch("http://localhost:3001/events", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => this.props.getEvents(data));
  };

  render() {
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(`${this.props.access_token}`);

    return (
      <div className="playlist_card">
        <Card>
          <Card.Content>
            <Card.Header>{this.props.playlist.name}</Card.Header>
            <Image
              src={this.props.playlist.images[0].url}
              onClick={() =>
                this.props.handlePlaylistClick(this.props.playlist)
              }
            />
            <Card.Meta></Card.Meta>
          </Card.Content>
        </Card>
        <Modal
          trigger={
            <button className="ui button">
              <i className="calendar alternate outline icon"></i>Add Event
            </button>
          }
        >
          <Modal.Content>
            <Modal.Description>
              <Header>Create a New Event</Header>
              <Form onSubmit={event => this.handleFormSubmit(event)}>
                <Form.Field>
                  <label>Event</label>
                  <input placeholder="Event Name" name="event" required />
                </Form.Field>
                <Form.Field>
                  <label>Venue</label>
                  <input placeholder="Venue Name" name="venue" required />
                </Form.Field>
                <Form.Field>
                  <label>Host</label>
                  <input placeholder="Host Name" name="host" required />
                </Form.Field>
                <Button type="submit">Submit</Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default UserPlaylist;
