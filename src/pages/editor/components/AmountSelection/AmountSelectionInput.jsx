import React from 'react';
import classes from "./AmountSelection.module.css";

const AmountSelectionInput = ({id, select, selected}) => {
    return (
        <input
            className={classes.item + ' ' + (selected ? classes.selected : '')}
            min="1"
            type="number"
            onChange={e => select(e.target.value, id)}
        />
    );
};

export default AmountSelectionInput;