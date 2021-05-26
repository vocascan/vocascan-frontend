import React from "react";

import "./ContributorCard.scss";

const Card = ({ name, url, imageUrl, description }) => {
  return (
    <a
      href={url ? url : `https://github.com/${name}`}
      target="_blank"
      rel="noreferrer noopener"
    >
      <div className="card outline">
        <div className="backdrop">
          <div className="name">{name}</div>
          <div className="description">{description}</div>
        </div>
        <img
          src={imageUrl ? imageUrl : `https://github.com/${name}.png`}
          alt={name}
        />
      </div>
    </a>
  );
};

export default Card;
