import React from "react";

/* This component builds the user */

const UserCard = (props) => {
  const { avatar_url, login } = props;

  /* Checking to see if cover, title and author is present, provide alternative if not.*/
  const userCover = avatar_url;
  const userTitle = login;

  return (
    <li>
      <div className="user">
        <div className="user-top">
          <div
            className="user-cover"
            style={{
              backgroundImage: `url(${userCover})`
            }}
          />
        </div>
        <div className="user-title">{userTitle}</div>
      </div>
    </li>
  );
};

export default UserCard;
