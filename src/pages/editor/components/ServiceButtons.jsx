import React from 'react';
import classes from "./ServiceButtons.module.css";
import IconButton from "./IconButton";
import svgStatus from "../../../icons/status.svg";
import svgSaveAll from "../../../icons/saveAll.svg";
import svgSettings from "../../../icons/settings.svg";

const ServiceButtons = ({downloadAllFiles, settingsClosed, toggleSettings}) => {
    return (
        <div className={classes.serviceButtons}>
            <IconButton image={svgStatus} show />
            <IconButton
                image={svgSaveAll}
                show={settingsClosed}
                onClick={downloadAllFiles}
            />
            <IconButton
                image={svgSettings}
                onClick={toggleSettings}
                style={{backgroundColor: settingsClosed ? "" : "#999"}}
                show
            />
        </div>
    );
};

export default ServiceButtons;