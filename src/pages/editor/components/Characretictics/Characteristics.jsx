import React, {useContext} from 'react';
import classes from "./Characteristics.module.css";
import Block from "./Block";

import svgViews from '../../../../icons/views.svg';
import svgTime from '../../../../icons/time.svg';
import svgMemory from '../../../../icons/memory.svg';
import {FilesContext} from "../../../../context/context";
import Countdown from "react-countdown";

const Characteristics = () => {
    const {getViewsString, time, getSizeString} = useContext(FilesContext);

    return (
        <div className={classes.characteristics}>
            <Block text={getViewsString()} image={svgViews} />
            {time && <Block text={<Countdown
                date={time}
                renderer={({days, hours}) => `${days}d ${hours}h`}
                autoStart
            />} image={svgTime} />}
            <Block text={getSizeString()} image={svgMemory} />
        </div>
    );
};

export default Characteristics;