import React from 'react';
import classes from './File.module.css';
import {saveAs} from 'file-saver';
import svgSave from '../../../icons/save.svg';
import svgDelete from '../../../icons/delete.svg';

const File = ({file, files, setFiles}) => {
    function deleteFile() {
        setFiles(files.filter(element => element !== file));
    }

    function downloadFile() {
        saveAs(file, file.name);
    }

    return (
        <div className={classes.file}>
            <button className={classes.save} onClick={downloadFile}>
                <img className={classes.img} src={svgSave} alt="" />
            </button>
            <p className={classes.text}>{file.name}</p>
            <button className={classes.delete} onClick={deleteFile}>
                <img className={classes.img} src={svgDelete} alt="" />
            </button>
        </div>
    );
};

export default File;