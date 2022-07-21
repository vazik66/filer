import React, {useState} from 'react';
import classes from './FilenameInput.module.css';

const maxInputWidth = 30;
const replaceableSymbols = /[`|<>'"?*:/\\ ]/gi;

const removeBadSymbols = string => string.replace(replaceableSymbols, '-');

const FilenameInput = ({file}) => {
    const [width, setWidth] = useState(file.parseName().length);

    const changeFilename = e => {
        const newName = removeBadSymbols(e.target.value);
        file.changeName(newName);
        setWidth(Math.min(maxInputWidth, file.parseName().length + 3));
    };

    return (
        <input
            className={classes.nameInput}
            style={{width: width + "ch"}}
            value={file.parseName()}
            onChange={changeFilename}
        />
    );
};

export default FilenameInput;