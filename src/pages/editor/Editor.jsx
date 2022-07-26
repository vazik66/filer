import React, {useContext, useState} from 'react';
import classes from './Editor.module.css';
import ServiceButtons from './components/Service/ServiceButtons';
import Characteristics from './components/Characretictics/Characteristics';
import FileManager from './components/FileManager/FileManager';
import Settings from './components/Settings/Settings';
import {useNavigate} from 'react-router-dom';
import {FilesContext} from '../../context/context';

const fileFromString = text => {
    const currentTime = Date.now();
    return new File([text],
        `${currentTime}.txt`,
        {type: 'text/plain', lastModified: currentTime}
    );
};

const Editor = () => {
    const {add, collectData} = useContext(FilesContext);
    const [settingsClosed, setSettingsClosed] = useState(true);
    const navigate = useNavigate();

    const toggleSettings = () => setSettingsClosed(!settingsClosed);

    const addFiles = files => files.forEach(file => add(file));

    const onDragOver = e => e.preventDefault();

    const onDrop = e => {
        e.preventDefault();
        addFiles([...e.dataTransfer.files]);
    };

    const onPaste = e => {
        const clipboardText = e.clipboardData.getData('Text');
        if (clipboardText) addFiles([fileFromString(clipboardText)]);
        else {
            const clipboardItems = Object.values(e.clipboardData.items);
            const newFiles = clipboardItems
                .filter(item => item.kind === 'file')
                .map(item => item.getAsFile());
            addFiles(newFiles);
        }
    };

    // async function unzip(file) {
    //     const zipper = new JSZip();
    //     return await zipper.loadAsync(file);
    // }

    const postData = async () => {
        const formData = new FormData();
        for (const [k, v] of Object.entries(await collectData()))
            formData.append(k, v);
        const request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:3000/');
        request.send(formData);
    };

    return (
        <div
            className={classes.editor}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onPaste={onPaste}
        >
            <header>
                <h1 className={classes.editorH1} onClick={() => navigate("/")}>
                    Filer
                </h1>
                <ServiceButtons
                    settingsClosed={settingsClosed}
                    toggleSettings={toggleSettings}
                />
            </header>
            <Characteristics />
            <FileManager hidden={!settingsClosed} />
            <Settings show={!settingsClosed} />
            <button onClick={postData}>Send</button>
        </div>
    );
};

export default Editor;