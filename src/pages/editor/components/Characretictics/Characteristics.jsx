import React from 'react';
import classes from "./Characteristics.module.css";
import Block from "./Block";

import svgViews from '../../../../icons/views.svg';
import svgTime from '../../../../icons/time.svg';
import svgMemory from '../../../../icons/memory.svg';

const Characteristics = ({views, time, size}) => {
    return (
        <div className={classes.characteristics}>
            <Block text={views} image={svgViews} />
            <Block text={time} image={svgTime} />
            <Block text={size} image={svgMemory} />
        </div>
    );
};

export default Characteristics;