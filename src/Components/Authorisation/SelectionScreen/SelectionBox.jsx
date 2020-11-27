import React, {useState} from 'react';
import './SelectionBox.scss'



function SelectionBox(props) {

    const [isShown, setIsShown] = useState(false);

    return (
        <button className={isShown ? "box__hovered" : "box__notHovered"}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)} onClick={() => {console.log("clicked")}}>
            <img className="box-img" src={props.image} alt="logo"></img>
            <h1 className="box-heading">{props.heading}</h1>
            <hr/>
            <p className="description">{props.description}</p>
        </button>
    );
}

export default SelectionBox;