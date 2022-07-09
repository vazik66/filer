import React from 'react';
import classes from './Settings.module.css';
import AmountSelection from './AmountSelection';
import 'datejs';

const Settings = ({setViews, setTime, setPassword, show}) => {
    const views = [1, 5, 20, -1];
    const times = ['7 days', '14 days', '30 days'];

    function resetDate(duration) {
        const date = new Date();
        const amount = +(duration.split(' ')[0]);
        date.add(amount).day();
        setTime(date.getTime());
    }

    return (
        <div
            className={classes.settings}
            style={{display: show ? "flex" : "none"}}
        >
            <AmountSelection
                text="Set views amount"
                amounts={views}
                setValue={setViews}
                input
            />
            <AmountSelection
                text="Set time duration"
                amounts={times}
                setValue={duration => resetDate(duration)}
                buttonStyle={{width: 'fit-content', padding: '0 20px'}}
            />
            <h3 className={classes.h3}>Password</h3>
            <input
                className={classes.password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Not required"
            />
        </div>
    );
};

export default Settings;