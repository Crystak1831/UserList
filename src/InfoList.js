import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./App.css";


function GetRequest() {
  var strs;
  var url = window.location.hash;
  var theRequest = new window.Object();
  if (url.indexOf("?") !== -1) {
    var str = url.split('?')
    str = str[1].substr(0);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

function InfoList() {

  const [repos, setRepos] = useState([]);

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetchRepos();
    fetchFollowers();
  }, []);

  function fetchRepos() {
    var states = GetRequest();
    
    var avatar = states && states.avatar;
    avatar &&
      fetch(`https://api.github.com/users/${avatar}/repos`)
        .then((resp) => resp.json())
        .then((data) => {
          const r = [...repos, ...data];
          setRepos(r);
        });
  }

  function fetchFollowers() {
    var states = GetRequest();
    var avatar = states && states.avatar;
    avatar &&
      fetch(`https://api.github.com/users/${avatar}/followers`)
        .then((resp) => resp.json())
        .then((data) => {
          const r = [...followers, ...data];
          setFollowers(r);
        });
  }

  return (
    <div className="search-users">
      <div className="search-users-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-users-info-wrapper">info list</div>
      </div>
      <div className="search-users-results">
        <h4>repositories</h4>
        {repos.map((repo, index) => (
          <div className="repo-list" key={index}>{repo.full_name}</div>
        ))}
        <h4>followers</h4>
        {followers.map((follower, index) => (
          <div className="repo-list" key={index}>{follower.login}</div>
        ))}
      </div>
    </div>
  );
}

export default InfoList;
