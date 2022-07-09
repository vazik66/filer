import React, {useState} from 'react';
import classes from "./File.module.css";

const clearFileType = fileType => fileType.split('/')[1];
const clearFilename = fileName => fileName.split('.').slice(0, -1).join('.');

const FilenameInput = ({file, setFile}) => {
    const [width, setWidth] = useState(clearFilename(file.name).length);

    const changeFilename = e => {
        const name = e.target.value + '.' + clearFileType(file.type);
        const fileCopy = new File([file], name, {type: file.type});
        setFile(fileCopy);
        setWidth(clearFilename(name).length);
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