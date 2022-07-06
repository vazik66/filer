import React from 'react';
import classes from "./AmountSelection.module.css";

const AmountSelectionButton = ({id, item, select, selected, buttonStyle}) => {
    return (
        <button
            style={buttonStyle}
            className={classes.item + ' ' + (selected ? classes.selected : '')}
            onClick={() => select(item[1], id)}
        >
            {item[0]}
        </button>
    );
};

export default AmountSelectionButton;