import React from 'react';
import classes from "./Characteristics.module.css";
import Block from "./Block";

const Characteristics = ({views, time, size}) => {
    return (
        <div className={classes.characteristics}>
            <Block text={views} />
            <Block text={time} />
            <Block text={size} />
        </div>
    );
};

export default Characteristics;