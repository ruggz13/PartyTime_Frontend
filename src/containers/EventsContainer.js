import React from "react";
import { withRouter } from "react-router-dom";
import Event from "../components/Event";
import "../EventContainer.css";

class EventsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }

  handleClick = () => {
    this.props.history.push("/user/profile");
  };

  componentDidMount() {
    let data = {
      user_id: parseInt(JSON.parse(localStorage.user).id)
    };
    fetch("http://localhost:3001/events/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => this.setState({ events: data }));
  }
  render() {
    return (
      <>
        <button className="ui button" onClick={this.handleClick}>
          Home
        </button>
        <h1 className="eventTitle">Events</h1>
        <div className="ui grid">
          {this.state.events.map(event => {
            return <Event event={event} key={event.id} />;
          })}
        </div>
      </>
    );
  }
}

export default withRouter(EventsContainer);
