import React, {useState} from 'react';
import classes from './FilteredInput.module.css';

const FilteredInput = ({setValue, pattern, hidden}) => {
    const [inputValue, setInputValue] = useState('');

    const tryChangeValue = e => {
        const newInputValue = e.target.value.replace(pattern,'');
        setInputValue(newInputValue);
        if (newInputValue) setValue(newInputValue);
    };

    return (
        <input
            style={{display: hidden ? "none" : null}}
            className={classes.input}
            value={inputValue}
            onChange={tryChangeValue}
            placeholder="Your value"
        />
    );
};

export default FilteredInput;