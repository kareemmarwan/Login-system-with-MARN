import React from "react";

export const Card = ({ profile }) => {
    
  return (
    <div className="card">
      <img
        src={profile.albumArt}
        alt=""
      />
      <div className="content">
        <h2>{profile.name}</h2>
        <span>BY: {profile.artist}</span>
      </div>
    </div>
  );
};

export default Card;