import React from 'react';
import classes from "./ASButtonList.module.css";
import FilteredInput from "./FilteredInput";

const ASButtonList = ({amounts, buttonStyle, setValue, input}) => {
    return (
        <div className={classes.list}>
            {amounts.map(item =>
                <button
                    key={item}
                    style={buttonStyle}
                    className={classes.item}
                    onClick={() => setValue(item)}
                >
                    {item < 0 ? "∞" : item}
                </button>
            )}
            <FilteredInput setValue={setValue} pattern={/\D/g} show={input} />
        </div>
    );
};

export default ASButtonList;