import React, { Component } from "react";
import axios from "axios";

class Jokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3300/api/jokes", {
        headers: {
          Authorization: localStorage.jwt
        }
      })
      .then(res => {
        this.setState({ jokes: res.data });
      });
  }

  render() {
    return (
      <div>
        <h1>Dad Jokes</h1>
        {!localStorage.jwt ? (
          <p>You must be logged in to view the dad jokes</p>
        ) : (
          <ul>
            {this.state.jokes.map(joke => (
              <li style={{ listStyleType: "none" }} key={joke.id}>
                {joke.joke}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Jokes;
