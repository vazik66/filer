import React from 'react';
import classes from "./Characteristics.module.css";
import Countdown from "react-countdown";
import Block from "./Block";

const Characteristics = ({texts}) => {
    return (
        <div className={classes.characteristics}>
            <Block>
                image={}
                text={texts.views}
            </Block>
            <Block>
                image={}
                text={texts.time}
            </Block>
            <Block>
                image={}
                text={texts.memory}
            </Block>
            {/*<h2 className={classes.h2}>Views: {views < 0 ? "∞" : views}</h2>*/}
            {/*<h2 className={classes.h2}>*/}
            {/*    Time left:&nbsp;*/}
            {/*    {time && <Countdown date={time} renderer={renderer} autoStart />}*/}
            {/*</h2>*/}
        </div>
    );
};

export default Characteristics;