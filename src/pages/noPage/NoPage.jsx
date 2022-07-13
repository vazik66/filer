import React from 'react';
import classes from "./NoPage.module.css";

const NoPage = () => {
    return (
        <div className={classes.noPage}>
            <a className={classes.h1} href="/">Filer</a>
            <h1 className={classes.h2} style={{fontWeight: 500}}>404 error</h1>
            <h1 className={classes.h2} style={{color: "#A0A0A0"}}>
                Thanks, your passwords were successfully stolen
            </h1>
        </div>
    );
};

export default NoPage;