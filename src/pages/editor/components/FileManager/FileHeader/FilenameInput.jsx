import React, {useState, useContext} from 'react';
import classes from './FilenameInput.module.css';
import {FilesContext} from "../../../../../context/context";

const maxInputWidth = 30;
const replaceableSymbols = /[`|<>'"?*:/\\ ]/gi;

const removeBadSymbols = string => string.replace(replaceableSymbols, '-');
const parseType = file => file.name.split('.').pop();
const parseName = file => file.name.split('.').slice(0, -1).join('.');

const FilenameInput = ({file}) => {
    const {changeName} = useContext(FilesContext);
    const [width, setWidth] = useState(parseName(file.value).length);

    const changeFilename = e => {
        const newName = removeBadSymbols(e.target.value) + '.' + parseType(file.value);
        changeName(file.id, newName);
        setWidth(Math.min(maxInputWidth, parseName(file.value).length + 3));
    };

    return (
        <input
            className={classes.nameInput}
            style={{width: width + "ch"}}
            value={parseName(file.value)}
            onChange={changeFilename}
        />
    );
};

export default FilenameInput;