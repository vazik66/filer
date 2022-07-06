import React, {useState} from 'react';
import classes from "./Editor.module.css";
import FileManager from "./components/FileManager";

const filesInPackLimit = 5;

function fileFromString(text) {
    const currentTime = Date.now();
    return new File([text],
        `${currentTime}.txt`,
        {type: 'text/plain', lastModified: currentTime}
    );
}

const Editor = () => {
    const [files, setFiles] = useState([]);

    function addFiles(newFiles) {
        const fileNames = files.map(file => file.name);
        const result = newFiles.filter(file => !fileNames.includes(file.name));
        setFiles(files.concat(result).slice(0, filesInPackLimit));
    }

    function onDrop(e) {
        e.preventDefault();
        addFiles([...e.dataTransfer.files]);
    }

    function onDragOver(e) {
        e.preventDefault();
    }

    function onPaste(e) {
        const clipboardText = e.clipboardData.getData('Text');
        if (clipboardText) {
            addFiles([fileFromString(clipboardText)]);
            return;
        }
        const clipboardItems = Object.values(e.clipboardData.items);
        const newFiles = clipboardItems
            .filter(item => item.kind === 'file')
            .map(item => item.getAsFile());
        addFiles(newFiles);
    }

    return (
        <div
            className={classes.editor}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onPaste={onPaste}
        >
            <h1>Filer</h1>
            <FileManager files={files} setFiles={setFiles} addFiles={addFiles} />
        </div>
    );
};

export default Editor;