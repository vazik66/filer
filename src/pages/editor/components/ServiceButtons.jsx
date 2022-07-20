import React from 'react';
import classes from "./ServiceButtons.module.css";
import IconButton from "./IconButton";
import svgStatus from "../../../icons/status.svg";
import svgSaveAll from "../../../icons/newSaveAll.svg";
import svgSettings from "../../../icons/settings.svg";
import svgSettingsActive from "../../../icons/settingsActive.svg";

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
                image={settingsClosed ? svgSettings : svgSettingsActive}
                onClick={toggleSettings}
                style={{backgroundColor: settingsClosed ? "" : "#2F2F2F"}}
                show
            />
        </div>
    );
};

export default ServiceButtons;