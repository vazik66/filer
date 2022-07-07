import React from 'react';
import classes from "./Settings.module.css";
import AmountSelection from "./AmountSelection/AmountSelection";
import 'datejs';

const Settings = ({setViews, setTime, setPassword}) => {
    const views = [1, 5, 20, -1];
    const times = ['7 days', '14 days', '30 days'];

    function resetDate(duration) {
        const date = new Date();
        const amount = +(duration.split(' ')[0]);
        date.add(amount).day();
        setTime(date.getTime());
    }

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
                setValue={duration => resetDate(duration)}
                buttonStyle={{width: 'fit-content', padding: '0 15px'}}
            />
            Password
            <input
                className={classes.item}
                pattern="[0-9a-zA-Z\W+]"
                onChange={e => setPassword(e.target.value)}
                onFocus={e => e.target.value = ''}
            />
        </div>
    );
};

export default Settings;