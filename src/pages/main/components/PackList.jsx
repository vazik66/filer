import React from 'react';
import classes from "./PackList.module.css";
import Pack from "./Pack";

const PackList = () => {
    return (
        <div className={classes.packs}>
            <Pack packId={"1"} />
            <Pack packId={"2"} />
            <Pack packId={"3"} />
            <Pack packId={"4"} />
            <Pack packId={"5"} />
            <Pack packId={"create-new-pack"} />
        </div>
    );
};

export default PackList;