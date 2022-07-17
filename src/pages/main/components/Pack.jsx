import React from 'react';
import {useNavigate} from 'react-router-dom';
import classes from "./Pack.module.css";

const Pack = ({packId}) => {
    const navigate = useNavigate();

    return (
        <button
            className={classes.pack}
            onClick={() => navigate("hello/" + packId)}
        >
            <p className={classes.text}>{packId}</p>
        </button>
    );
};

export default Pack;