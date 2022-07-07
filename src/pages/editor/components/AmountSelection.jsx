import React, {useEffect} from 'react';
import classes from "./AmountSelection.module.css";

const AmountSelection = ({text, amounts, setValue, input, buttonStyle}) => {
    useEffect(() => setValue(amounts[0]), []);

    function select(value) {
        if (value) setValue(value);
    }

    return (
        <div className={classes.amountSelection}>
            {text}
            {amounts.map((item) =>
                <button
                    key={item}
                    style={buttonStyle}
                    className={classes.item}
                    onClick={() => select(item)}
                >
                    {item < 0 ? "inf" : item}
                </button>)}
            {input && <input
                className={classes.item}
                min="1"
                type="number"
                onChange={e => select(e.target.value)}
            />}
        </div>
    );
};

export default AmountSelection;