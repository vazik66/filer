import React, {useEffect, useRef, useState} from 'react';
import classes from "./File.module.css";

const getClearFileName = rawName => rawName.split('.').slice(0, -1).join('.');

function getClearFileType(rawType) {
    return rawType.split('/')[1];
}

const FilenameInput = ({file, setFile, fileType, setFileType}) => {
    const [width, setWidth] = useState(10);

    const changeFilename = e => {
        const value = e.target.value;
        const fileCopy = new File([file],
            value + '.png', {type: 'image/png'});
        setFile(fileCopy);
        setFileType(file.type);
        console.log(fileType);
        setWidth(value.length);
    };

    return (
        <input
            className={classes.nameInput}
            style={{width: width + "ch"}}
            value={getClearFileName(file.name)}
            onChange={changeFilename}
        />
    );
};

export default FilenameInput;