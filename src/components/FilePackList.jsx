import React from 'react';
import classes from "./FilePackList.module.css";
import {v4 as uuid} from "uuid";
import FilePack from "./FilePack";

const packs = [
    {name: '1', id: '51', files: []},
    // {name: '2', id: '52', files: []},
    // {name: '3', id: '53', files: []},
    // {name: '4', id: '54', files: []},
    // {name: '5', id: '55', files: []},
    {name: 'Create new pack', id: 'needToGenerateRandom', files: []},
];

const FilePackList = () => {
    return (
        <div className={classes.packs}>
            {packs.map(pack => <FilePack pack={pack} key={uuid()} />)}
        </div>
    );
};

export default FilePackList;