import React, {useState} from 'react';
import classes from "./Editor.module.css";
import FileManager from "./components/FileManager";

const filesInPackLimit = 5;

const Editor = () => {
    const [files, setFiles] = useState([]);

    function addFiles(newFiles) {
        const fileNames = files.map(file => file.name);
        const result = newFiles.filter(file => !fileNames.includes(file.name));
        setFiles(files.concat(result).slice(0, filesInPackLimit));
    }

    return (
        <div
            className={classes.editor}
            onDrop={e => {
                e.preventDefault();
                addFiles([...e.dataTransfer.files]);
            }}
            onDragOver={e => e.preventDefault()}
        >
            <h1>Filer</h1>
            <FileManager files={files} setFiles={setFiles}/>
        </div>
    );
};

export default Editor;