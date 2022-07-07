import React, {useState, useEffect} from 'react';
import classes from "./Editor.module.css";
import FileManager from "./components/FileManager";
import Settings from "./components/Settings";
import Countdown from "react-countdown";
import axios, {post} from "axios";

const filesInPackLimit = 5;

function fileFromString(text) {
    const currentTime = Date.now();
    return new File([text],
        `${currentTime}.txt`,
        {type: 'text/plain', lastModified: currentTime}
    );
}

const Editor = () => {
    function distributeResponse({files, views, time, password}) {
        setFiles(files);
        setViews(views);
        setTime(time);
        setPassword(password);
    }

    useEffect(() => {
        const fetchData = async () => {
            // const result = await axios(
            //     'https://jsonplaceholder.typicode.com/todos/1'
            // );
            // setPackData(result.data);
            // const result = {
            //     user: 'aaaaa',
            //     packId: 'bbbbb',
            //     files: [fileFromString('clipboardText')],
            //     views: 15,
            //     time: 1657806540546,
            //     password: 'xx',
            // };
            // distributeResponse(result);
        };
        fetchData();
    }, []);

    const [files, setFiles] = useState([]);
    const [views, setViews] = useState(null);
    const [time, setTime] = useState(null);
    const [password, setPassword] = useState(null);

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

    const renderer = ({days, hours}) => {
        return (
            <span>
                {days} days {hours} hours
            </span>
        );
    };

    function submit() {
        post('/', {
            user: 'tt',
            packId: 'ff',
            files: files,
            views: views,
            time: time,
            password: password
        });
    }

    return (
        <div
            className={classes.editor}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onPaste={onPaste}
        >
            <h1>Filer</h1>
            <h1>
                Time left&nbsp;
                {time && <Countdown date={time} renderer={renderer} autoStart />}
            </h1>
            <h1>Views left {views < 0 ? "inf" : views}</h1>
            <FileManager files={files} setFiles={setFiles} addFiles={addFiles} />
            <Settings setViews={setViews} setTime={setTime} setPassword={setPassword} />
            <button onClick={submit}>Save</button>
        </div>
    );
};

export default Editor;