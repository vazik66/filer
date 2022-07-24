import React from 'react';
import {Outlet} from 'react-router-dom';
import classes from "./Layout.module.css";
import {Provider} from "../context/context";

const Layout = () => {
    return (
        <div className={classes.layout}>
            <Provider>
                <Outlet />
            </Provider>
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