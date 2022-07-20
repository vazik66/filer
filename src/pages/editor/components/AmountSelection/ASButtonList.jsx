import React from 'react';
import classes from "./ASButtonList.module.css";

const ASButtonList = ({amounts, buttonStyle, setValue, input}) => {
    const select = value => {
        console.log(value)
        if (value) setValue(value);
    };

    return (
        <div className={classes.list}>
            {amounts.map((item) =>
                <button
                    key={item}
                    style={buttonStyle}
                    className={classes.item}
                    onClick={() => select(item)}
                >
                    {item < 0 ? "∞" : item}
                </button>)}
            {input && <input
                style={{paddingLeft: "12px", width: "180px"}}
                className={classes.item}
                type="number"
                onChange={e => select(e.target.value)}
                placeholder="Your value"
            />}
        </div>
    );
};

export default ASButtonList;