import React from "react";

import axios from "axios";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
function AccountFriends() {
  const [friendsData, setFriendsData] = useState("");
  const [inputFollowValue, setInputFollowValue] = useState("");

  const getFriendsList = async () => {
    try {
      const res = await axios({
        url: `https://watchvaultapi.netlify.app/.netlify/functions/api/services/all-friends-user/${localStorage.getItem(
          "UserId"
        )}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTtoken")}`,
        },
      });

      console.log(res.data);
      setFriendsData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="account-friends">
      <h1>Friend List</h1>
      <img
        src="https://cdn3d.iconscout.com/3d/premium/thumb/profile-6073860-4996977.png"
        alt=""
      />
      <div className="account-friends-input">
        <input
          type="text"
          value={inputFollowValue}
          onChange={(e) => setInputFollowValue(e.target.value)}
        ></input>
        <button>
          {inputFollowValue ? (
            <Link to={`/user/${inputFollowValue}`}>Search User</Link>
          ) : (
            <Link to="/error404">Search User</Link>
          )}
        </button>
      </div>
      <button onClick={getFriendsList}>Show friends list</button>
      <div className="friends-link">
        {" "}
        {friendsData &&
          friendsData.map((friend, index) => {
            return (
              <Link key={index} to={`/user/${friend}`}>
                <div key={index} className="friend-card">
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/profile-6073860-4996977.png"
                    alt="profile-image"
                  />
                  <p>{friend}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default AccountFriends;
