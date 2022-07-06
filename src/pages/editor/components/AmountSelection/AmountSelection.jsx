import React, {useState} from 'react';
import classes from "./AmountSelection.module.css";
import AmountSelectionButton from "./AmountSelectionButton";
import AmountSelectionInput from "./AmountSelectionInput";

const AmountSelection = ({amounts, setChangedValue, input}) => {
    const minValue = Math.min(...Object.values(amounts));
    const [currentId, setCurrentId] = useState(0);

    function select(value, id) {
        if (value < minValue) return;
        setChangedValue(value);
        setCurrentId(id);
    }

    return (
        <div className={classes.amountSelection}>
            {Object.entries(amounts).map((item, i) =>
                <AmountSelectionButton
                    id={i}
                    item={item}
                    select={select}
                    selected={i === currentId}
                />)}
            {input && <AmountSelectionInput
                id={-1}
                select={select}
                selected={-1 === currentId}
            />}
        </div>
    );
};

export default AmountSelection;