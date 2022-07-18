import React, {useState} from 'react';
import classes from './FilenameInput.module.css';

const maxInputWidth = 30;
const replaceableSymbols = /[`|<>'"?*:/\\ ]/gi;

const clearFilename = fileName => fileName.split('.').slice(0, -1).join('.');
const getFileType = fileName => fileName.split('.').pop();
const removeBadSymbols = string => string.replace(replaceableSymbols, '-');

const FilenameInput = ({file, replace}) => {
    const [width, setWidth] = useState(clearFilename(file.name).length);

    const changeFilename = e => {
        const name = removeBadSymbols(e.target.value) + '.' + getFileType(file.name);
        replace(file, new File([file], name, {type: file.type}));
        setWidth(Math.min(maxInputWidth, clearFilename(name).length));
    };

    return (
        <input
            className={classes.nameInput}
            style={{width: width + "ch"}}
            value={clearFilename(file.name)}
            onChange={changeFilename}
        />
    );
};

export default FilenameInput;