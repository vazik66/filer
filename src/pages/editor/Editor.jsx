import React from 'react';
import classes from "./Editor.module.css";
import FileManager from "./components/FileManager";

const Editor = () => {
    return (
        <div className={classes.editor}>
            <h1>Filer</h1>
            <FileManager />
        </div>
    );
};

export default Editor;