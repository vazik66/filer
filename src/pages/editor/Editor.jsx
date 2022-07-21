import React, {useState} from 'react';
import classes from './Editor.module.css';
import FileManager from './components/FileManager/FileManager';
import Settings from './components/Settings/Settings';
import Countdown from 'react-countdown';
import axios, {post} from 'axios';
import {useNavigate} from 'react-router-dom';
import ServiceButtons from "./components/Service/ServiceButtons";
import Characteristics from "./components/Characretictics/Characteristics";
import {useFiles} from "../../hooks/useFiles";
import {useViews} from "../../hooks/useViews";

const fileFromString = text => {
    const currentTime = Date.now();
    return new File([text],
        `${currentTime}.txt`,
        {type: 'text/plain', lastModified: currentTime}
    );
};

const Editor = () => {
    const files = useFiles([], 5242880);
    const views = useViews(-1);

    const [password, setPassword] = useState(null);
    const [settingsClosed, setSettingsClosed] = useState(true);
    const [time, setTime] = useState(null);

    const navigate = useNavigate();

    const onDrop = e => {
        e.preventDefault();
        files.add([...e.dataTransfer.files]);
    };

    const onDragOver = e => e.preventDefault();

    const onPaste = e => {
        const clipboardText = e.clipboardData.getData('Text');
        if (clipboardText) files.add([fileFromString(clipboardText)]);
        else {
            const clipboardItems = Object.values(e.clipboardData.items);
            const newFiles = clipboardItems
                .filter(item => item.kind === 'file')
                .map(item => item.getAsFile());
            files.add(newFiles);
        }
    };

    const toggleSettings = () => setSettingsClosed(!settingsClosed);

    // async function unzip(file) {
    //     const zipper = new JSZip();
    //     return await zipper.loadAsync(file);
    // }

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
                    downloadAllFiles={files.downloadAll}
                    settingsClosed={settingsClosed}
                    toggleSettings={toggleSettings}
                />
            </header>
            {time && <Characteristics
                views={views.format()}
                time={<Countdown
                    date={time}
                    renderer={({days, hours}) => `${days}d ${hours}h`}
                    autoStart
                />}
                size={files.size.format()}
            />}
            <FileManager files={files} show={settingsClosed} />
            <Settings
                setViews={views.changeMax}
                setTime={setTime}
                setPassword={setPassword}
                show={!settingsClosed}
            />
        </div>
    );
};

export default Editor;