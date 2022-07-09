import React, {useState} from 'react';
import classes from "./File.module.css";

const FilenameInput = ({file, setFile}) => {
    const [width, setWidth] = useState(file.name.length);

    const changeFilename = e => {
        const value = e.target.value;
        const fileCopy = new File([file], value,
            {type: 'image/png'});
        setFile(fileCopy);
        setWidth(file.name.length);
    };

    return (
        <input
            className={classes.nameInput}
            style={{width: width + "ch"}}
            value={file.name}
            onChange={changeFilename}
        />
    );
};

export default FilenameInput;