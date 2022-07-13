import React from 'react';
import classes from "./PackList.module.css";
import {v4 as uuid} from "uuid";
import Pack from "./Pack";

const packs = [
    {name: '1', id: '51', files: []},
    // {name: '2', id: '52', files: []},
    // {name: '3', id: '53', files: []},
    // {name: '4', id: '54', files: []},
    // {name: '5', id: '55', files: []},
    {name: 'Create new pack', id: 'needToGenerateRandom', files: [], href: '/editor'},
];

const PackList = () => {
    return (
        <div className={classes.packs}>
            {packs.map(element => <Pack pack={element} key={uuid()} />)}
        </div>
    );
};

export default PackList;