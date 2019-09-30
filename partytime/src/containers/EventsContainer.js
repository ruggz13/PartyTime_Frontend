import React from "react";
import { withRouter } from "react-router-dom";

class EventsContainer extends React.Component {
  handleClick = () => {
    this.props.history.push("/user/profile");
  };
  render() {
    return (
      <>
        <button className="ui button" onClick={this.handleClick}>
          Home
        </button>
        <h1>Events</h1>
      </>
    );
  }
}

export default withRouter(EventsContainer);
