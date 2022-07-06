import React from 'react';
import classes from "./Settings.module.css";
import AmountSelection from "./AmountSelection/AmountSelection";
import 'datejs';

const Settings = ({setViews, setTime, setPassword}) => {
    const views = {1: 1, 5: 5, 20: 20, inf: Number.MAX_SAFE_INTEGER};
    const times = {'1 week': '1 week', '2 weeks': '2 weeks', '1 month': '1 month'};

    function resetDate(duration) {
        const today = new Date();
        if (duration === '1 week') setTime(today.add(7).day().toString());
        else if (duration === '2 weeks') setTime(today.add(14).day().toString());
        else if (duration === '1 month') setTime(today.add(1).month().toString());
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
                type="password"
                pattern="[0-9a-zA-Z\W+]{8,16}"
                onChange={e => setPassword(e.target.value)}
                onFocus={e => e.target.value = ''}
            />
        </div>
    );
};

export default Settings;