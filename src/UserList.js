import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import UserCard from "./User";

function UserList() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => fetchImages(page), []);

  function fetchImages(page, take = 30) {
    setPage(page + 1);
    fetch(`https://api.github.com/users?since={page}`)
      .then((resp) => resp.json())
      .then((data) => {
        const newImages = [...images, ...data];

        setImages(newImages);
      });
  }

  return (
    <div className="hero is-fullheight is-info is-bold has-text-centered">
      <div className="hero-body">
        {images.length > 0 && (
          <InfiniteScroll
            next={() => fetchImages(page, 5)}
            hasMore={true}
            dataLength={images.length}
          >
            <div className="list-users-content">
              <div className="usershelf-users">
                
                  <ol className="users-grid" >
                  {images.map((image, index) => (
                    <Link to={`/list?avatar=${image.login}`} key={index}>
                      <UserCard
                        avatar_url={image.avatar_url}
                        login={image.login}
                      />
                    </Link>
                    ))}
                  </ol>
                
              </div>
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default UserList;
