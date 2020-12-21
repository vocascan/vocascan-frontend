import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  navButton: {
    width: "100%",
    height: "60px",
    color: "#ffffff"
  },
})

function NavButton(props) {
    const classes = useStyles();
    return (
        <Link to={props.link} style={{ outline: 0, textDecoration: 'none' }}>
            <Button className={classes.navButton} >{props.name}</Button>
        </Link>
    )
}

export default NavButton