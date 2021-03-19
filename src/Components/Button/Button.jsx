import React from "react";

import './Button.scss'

const Button = ({
    uppercase = false,
    variant = "default",
    disabled = false,
    appearance = "primary",
    onClick,
    children
}) => {
    return (
        <button
            onClick={onClick}
            className={`btn btn-${appearance} ${disabled && "btn-disabled"} btn-${variant} ${uppercase && "btn-uppercase"}`}
        >
            {children}
        </button>
    );
}

export default Button;