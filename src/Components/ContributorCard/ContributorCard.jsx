import React from "react";

import PersonIcon from "@material-ui/icons/Person";

import "./ContributorCard.scss";

const Card = ({ name, url, imageUrl, description }) => {
  return (
    <a href={url ? url : `/#/about`} target="_blank" rel="noreferrer noopener">
      <div className="card outline">
        <div className="backdrop">
          <div className="name">{name}</div>
          <p className="description">{description}</p>
        </div>
        {imageUrl ? (
          <img src={imageUrl} alt={name} />
        ) : (
          <div className="placeholderimage">
            <PersonIcon style={{ fontSize: 70 }} />
          </div>
        )}
      </div>
    </a>
  );
};

export default Card;
