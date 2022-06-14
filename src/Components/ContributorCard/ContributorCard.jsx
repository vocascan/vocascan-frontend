import React from "react";

import PersonIcon from "@material-ui/icons/Person";

import "./ContributorCard.scss";

const Card = ({ name, url, imageUrl, description }) => {
  return (
    <a href={url || `/#/about`} target="_blank" rel="noreferrer noopener">
      <div className="card outline">
        <div className="backdrop">
          <div className="name">{name}</div>
          <div className="description">{description}</div>
        </div>
        {imageUrl ? (
          <img className="card-image" src={imageUrl} alt={name} />
        ) : (
          <div className="card-image-bp">
            <PersonIcon className="card-image-bp-icon" />
          </div>
        )}
      </div>
    </a>
  );
};

export default Card;
