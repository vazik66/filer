import React from 'react';
import classes from "./Settings.module.css";
import AmountSelection from "./AmountSelection/AmountSelection";

const Settings = ({setViews, setTime, setPassword}) => {
    const views = {1: 1, 5: 5, 20: 20, inf: Number.MAX_SAFE_INTEGER};
    const times = {'1 week': 1, '2 weeks': 5, '1 month': 20};

    return (
        <div className={classes.settings}>
            <h2>Settings</h2>
            <AmountSelection
                text="Views amount"
                amounts={views}
                setValue={setViews}
                input
            />
            <AmountSelection
                text="Time duration"
                amounts={times}
                setValue={setTime}
                buttonStyle={{width: 'fit-content', padding: '0 15px'}}
            />
            Password
            <input
                className={classes.item}
                type="password"
                pattern="[0-9a-zA-Z\W+]{8,16}"
                onChange={e => setPassword(e.target.value)}
                onFocus={e => e.target.value = ''}
            />
        </div>
    );
};

export default Settings;