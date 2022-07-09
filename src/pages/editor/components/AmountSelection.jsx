import React, {useEffect} from 'react';
import classes from './AmountSelection.module.css';
import ASButtonList from "./ASButtonList";

const AmountSelection = ({text, amounts, setValue, input, buttonStyle}) => {
    useEffect(() => setValue(amounts[0]), []);

    return (
        <div className={classes.amountSelection}>
            <h3 className={classes.h3}>{text}</h3>
            <ASButtonList amounts={amounts} buttonStyle={buttonStyle} setValue={setValue} input={input}/>
        </div>
    );
};

export default AmountSelection;