import React, {useContext} from 'react';
import classes from "./ServiceButtons.module.css";
import IconButton from "./IconButton";
import svgStatus from "../../../../icons/status.svg";
import svgSaveAll from "../../../../icons/newSaveAll.svg";
import svgSettings from "../../../../icons/settings.svg";
import {FilesContext} from "../../../../context/context";

const ServiceButtons = ({settingsClosed, toggleSettings}) => {
    const {saveAll} = useContext(FilesContext);

    return (
        <div className={classes.serviceButtons}>
            <IconButton image={svgStatus} show />
            <IconButton
                image={svgSaveAll}
                show={settingsClosed}
                onClick={saveAll}
            />
            <IconButton
                image={svgSettings}
                iconFilter={{filter: settingsClosed ? null : "invert(100%) sepia(0%) saturate(7500%) hue-rotate(20deg) brightness(101%) contrast(96%)"}}
                onClick={toggleSettings}
                style={{backgroundColor: settingsClosed ? null : "#2F2F2F"}}
                show
            />
        </div>
    );
};

export default ServiceButtons;