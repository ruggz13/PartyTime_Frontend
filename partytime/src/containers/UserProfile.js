import React from "react";
import { withRouter } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";
import UserPlaylists from "../containers/UserPlaylists";

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      selected_playlist: null
    };
  }

  handleLogOut = () => {
    localStorage.removeItem("user");
    this.props.history.push("/login");
  };

  componentDidMount() {}

  render() {
    return (
      <>
        <Card>
          <Card.Content>
            <Card.Header>
              {this.props.user.first_name} {this.props.user.last_name}
            </Card.Header>
            <Card.Meta>Email: {this.props.user.email}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Icon name="user" />
            {this.props.user.followers} Followers
          </Card.Content>
          <button className="ui button" onClick={this.handleLogOut}>
            Log Out
          </button>
        </Card>
        <UserPlaylists
          user={this.props.user}
          handlePlaylistClick={this.props.handlePlaylistClick}
        />
      </>
    );
  }
}

export default withRouter(UserProfile);
