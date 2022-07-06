import React from 'react';
import classes from "./Settings.module.css";
import AmountSelection from "./AmountSelection/AmountSelection";

const Settings = ({setViews}) => {
    const views = {1: 1, 5: 5, 20: 20, inf: Number.MAX_SAFE_INTEGER};

    return (
        <div className={classes.settings}>
            <h2>Settings</h2>
            <AmountSelection
                amounts={views}
                setChangedValue={setViews}
                input
            />
            <AmountSelection
                amounts={views}
                setChangedValue={setViews}
            />
        </div>
    );
};

export default Settings;