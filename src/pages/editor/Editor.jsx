import React, {useState} from 'react';
import classes from './Editor.module.css';
import FileManager from './components/FileManager/FileManager';
import Settings from './components/Settings';
import Countdown from 'react-countdown';
import axios, {post} from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import ServiceButtons from "./components/ServiceButtons";
import Characteristics from "./components/Characteristics";
import {useFiles} from "../../hooks/useFiles";

function fileFromString(text) {
    const currentTime = Date.now();
    return new File([text],
        `${currentTime}.txt`,
        {type: 'text/plain', lastModified: currentTime}
    );
}

const Editor = () => {
    const files = useFiles([], 1000000);
    const [password, setPassword] = useState(null);
    const [settingsClosed, setSettingsClosed] = useState(true);
    const [views, setViews] = useState(null);
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

    // // async function unzip(file) {
    // //     const zipper = new JSZip();
    // //     return await zipper.loadAsync(file);
    // // }
    // const renderer = ({days, hours}) => <span>{days} days {hours} hours</span>;

    return (
        <div
            className={classes.editor}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onPaste={onPaste}
        >
            <header>
                <h1
                    className={classes.editorH1}
                    onClick={() => navigate("/")}
                >
                    Filer
                </h1>
                <ServiceButtons
                    downloadAllFiles={files.downloadAll}
                    settingsClosed={settingsClosed}
                    toggleSettings={toggleSettings}
                />
            </header>
            {/*<h2 className={classes.h2}>Views: {views < 0 ? "∞" : views}</h2>*/}
            {/*<h2 className={classes.h2}>*/}
            {/*    Time left:&nbsp;*/}
            {/*    {time && <Countdown date={time} renderer={renderer} autoStart />}*/}
            {/*</h2>*/}
            <FileManager files={files} show={settingsClosed} />
            <Settings
                setViews={setViews}
                setTime={setTime}
                setPassword={setPassword}
                show={!settingsClosed}
            />
        </div>
    );
};

export default Editor;