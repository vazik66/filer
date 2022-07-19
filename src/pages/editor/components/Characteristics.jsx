import React from 'react';
import classes from "./Characteristics.module.css";
import Block from "./Block";

const Characteristics = ({texts}) => {
    return (
        <div className={classes.characteristics}>
            <Block text={texts[0]} />
            <Block text={texts[1]} />
            <Block text={texts[2]} />
        </div>
    );
};

export default Characteristics;