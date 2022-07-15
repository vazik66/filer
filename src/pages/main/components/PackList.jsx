import React from 'react';
import classes from "./PackList.module.css";
import Pack from "./Pack";
import {getPacksIdsByUserId} from '../../../TestData/TestDataProvider';

const packs = [
    {name: '1', id: '51', files: []},
    // {name: '2', id: '52', files: []},
    // {name: '3', id: '53', files: []},
    // {name: '4', id: '54', files: []},
    // {name: '5', id: '55', files: []},
    {name: 'Create new pack', id: 'needToGenerateRandom', files: [], href: '/editor'},
];

const PackList = ({userId}) => {
    return (
        <div className={classes.packs}>
            {getPacksIdsByUserId(userId).map(packId => (
                <Pack packId={packId} key={packId} />
            ))}
        </div>
    );
};

export default PackList;