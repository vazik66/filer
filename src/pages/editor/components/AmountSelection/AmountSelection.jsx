import React, {useState} from 'react';
import classes from "./AmountSelection.module.css";
import AmountSelectionButton from "./AmountSelectionButton";
import AmountSelectionInput from "./AmountSelectionInput";

const AmountSelection = ({text, amounts, setValue, input, buttonStyle}) => {
    const minValue = Math.min(...Object.values(amounts));
    const [currentId, setCurrentId] = useState(0);

    function select(value, id) {
        if (value < minValue) return;
        setValue(value);
        setCurrentId(id);
    }

    return (
        <div className={classes.amountSelection}>
            {text}
            {Object.entries(amounts).map((item, i) =>
                <AmountSelectionButton
                    id={i}
                    item={item}
                    select={select}
                    selected={i === currentId}
                    buttonStyle={buttonStyle}
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