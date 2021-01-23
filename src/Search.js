import React from "react";
import { Link } from "react-router-dom";


import UserCard from "./User";
import "./App.css";

class Search extends React.Component {
  state = {
    query: "",
    userNew: [],
    error: false
  };

  retrieve = (event) => {
    const query = event.target.value;
    this.setState({ query: query });
    if (query) {
      fetch(`https://api.github.com/search/users?q=${query}`)
        .then((resp) => resp.json())
        .then((users) => {
          users.items.length > 0
            ? this.setState({ userNew: users.items, error: false })
            : this.setState({ userNew: [], error: true });
        });
    } else this.setState({ userNew: [], error: false });
  };

  render() {
    const { query, userNew, error } = this.state;
    return (
      <div className="search-users">
        <div className="search-users-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-users-input-wrapper">
            <input
              type="text"
              placeholder="Please search by username."
              value={query}
              onChange={this.retrieve}
            />
          </div>
        </div>
        <div className="search-users-results">
          {userNew.length > 0 && (
            <div>
              <div className="">
                <h3>Search returned {userNew.length} users </h3>
              </div>
              <ol className="users-grid">
                {userNew.map((user, index) => (
                  <Link to={`/list?avatar=${user.login}`} key={index}>
                    <UserCard
                      avatar_url={user.avatar_url}
                      login={user.login}
                    />
                  </Link>
                ))}
              </ol>
            </div>
          )}
          {error && (
            <div>
              <div className="">
                <h3>
                  Your search didn't find this user. Try again with a different
                  keyword.
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
