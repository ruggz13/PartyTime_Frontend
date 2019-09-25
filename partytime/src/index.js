import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import SpotifyPlayer from "react-spotify-web-playback";

ReactDOM.render(
  <Router>
    {localStorage.user ? (
      <>
        <App />
        <SpotifyPlayer
          token={JSON.parse(localStorage.user).access_token}
          uris={JSON.parse(localStorage.user).selectedPlaylist}
          styles={{
            bgColor: "#333",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            savedColor: "#fff",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff"
          }}
        />
      </>
    ) : (
      <App />
    )}
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
