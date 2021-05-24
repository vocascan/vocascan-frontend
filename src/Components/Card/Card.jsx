import React from "react";

import "./Card.scss";

const Card = ({ name, url, imageUrl = null, date }) => {
  return (
    <a
      href={url ? url : `https://github.com/${name}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="card outline">
        <div className="backdrop">
          <div>{name}</div>
          <div className="description">{date}</div>
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
