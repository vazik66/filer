import React from 'react';
import {Outlet} from 'react-router-dom';
import classes from "./Layout.module.css";

const Layout = () => {
    return (
        <div className={classes.layout}>
            <Outlet />
            <footer>
                <a
                    className={classes.link}
                    href="https://github.com/vazik66/filer"
                    target="_blank"
                    rel="noreferrer"
                >
                    github.com/vazik66/filer
                </a>
            </footer>
        </div>
    );
};

export default Layout;