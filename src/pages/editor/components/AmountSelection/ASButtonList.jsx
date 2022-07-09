import React from 'react';
import classes from "./ASButtonList.module.css";

function select(value, setValue) {
    if (value) setValue(value);
}

const ASButtonList = ({amounts, buttonStyle, setValue, input}) => {
    return (
        <div className={classes.list}>
            {amounts.map((item) =>
                <button
                    key={item}
                    style={buttonStyle}
                    className={classes.item}
                    onClick={() => select(item, setValue)}
                >
                    {item < 0 ? "∞" : item}
                </button>)}
            {input && <input
                style={{paddingLeft: "12px"}}
                className={classes.item}
                min="1"
                type="number"
                onChange={e => select(e.target.value, setValue)}
            />}
        </div>
    );
};

export default ASButtonList;