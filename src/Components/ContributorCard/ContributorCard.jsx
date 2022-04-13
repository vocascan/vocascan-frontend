import React from "react";

import PersonIcon from "@material-ui/icons/Person";

const Card = ({ name, url, imageUrl, description }) => {
  return (
    <a href={url ? url : `/#/about`} target="_blank" rel="noreferrer noopener">
      <div className="group w-32 h-44 m-2 inline-block relative rounded-lg overflow-hidden">
        <div className="w-full absolute bottom-0 top-32 bg-background-inverse text-white flex flex-col justify-center items-center ease-in-out duration-150 group-hover:top-0 group-hover:bg-transparent group-hover:bg-gradient-to-t group-hover:from-background-inverse group-hover:via-background-inverse">
          <div className="text-sm">{name}</div>
          <p className="text-grey text-xs mt-1 whitespace-pre-wrap leading-none hidden group-hover:block">
            {description}
          </p>
        </div>
        {imageUrl ? (
          <img className="w-32" src={imageUrl} alt={name} />
        ) : (
          <div className="h-2/3 flex justify-center items-center">
            <PersonIcon style={{ fontSize: 70 }} />
          </div>
        )}
      </div>
    </a>
  );
};

export default Card;
