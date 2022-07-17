import React from 'react';
import classes from "./Main.module.css";
import PackList from "./components/PackList";

const Main = () => {
    return (
        <div className={classes.main}>
            <header>
                <h1 className={classes.mainH1}>Filer</h1>
            </header>
            <PackList />
        </div>
    );
};

export default Main;