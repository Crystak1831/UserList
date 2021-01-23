import React from "react";
import { Route, Link } from "react-router-dom";

import UserList from "./UserList";
import Search from "./Search";
import InfoList from "./InfoList";

import "./App.css";

/* Main Application */
class usersApp extends React.Component {
  state = { users: [] };

  /* Component handler to get library data */
  componentDidMount() {}
  render() {
    const { users } = this.state;
    return (
      <div className="app">
        {/* user Shelf Page */}
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-users">
              <div className="list-users-title">
                <h1>Github User List</h1>
              </div>
              <UserList />
              <div className="open-search">
                <Link to="/search">Search</Link>
              </div>
            </div>
          )}
        />

        {/* Search Page */}
        <Route
          path="/search"
          render={({ history }) => (
            <Search users={users} userMove={this.userMove} />
          )}
        />

        <Route path="/list" render={({ history }) => <InfoList />} />
      </div>
    );
  }
}

export default usersApp;
