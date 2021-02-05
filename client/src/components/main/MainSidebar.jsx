import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";

import "./MainSidebar.scss";

// Components / assets
import {ReactComponent as HomeIcon} from "../../assets/icons/home.svg";
import {ReactComponent as PersonCircleIcon} from "../../assets/icons/person-circle.svg";
import {ReactComponent as ReturnIcon} from "../../assets/icons/return-up-back.svg";
import {ReactComponent as StatsChartIcon} from "../../assets/icons/stats-chart.svg";

// Misc
import {VIEWS} from "../../utils/constants";

export default function MainSidebar({currentView, setCurrentView}) {
    function handleSetCurrentViewButtonsClick(e) {
        setCurrentView(e.currentTarget.dataset.view);
    }

    const profileClass = classNames("main-sidebar__profile", {
        "main-sidebar__profile--active": currentView === VIEWS.PROFILE,
    });
    const homeClass = classNames("main-sidebar__menu-item", {
        "main-sidebar__menu-item--active": currentView === VIEWS.HOME,
    });
    const statsClass = classNames("main-sidebar__menu-item", {
        "main-sidebar__menu-item--active": currentView === VIEWS.STATS,
    });

    return (
        <div className="main-sidebar">
            <div className={profileClass}>
                <button
                    className="main-sidebar__button"
                    data-view={VIEWS.PROFILE}
                    onClick={handleSetCurrentViewButtonsClick}
                >
                    <PersonCircleIcon className="main-sidebar__button-icon"/>
                </button>
            </div>
            <div className="main-sidebar__menu">
                <div className={homeClass}>
                    <button
                        className="main-sidebar__button"
                        data-view={VIEWS.HOME}
                        onClick={handleSetCurrentViewButtonsClick}
                    >
                        <HomeIcon className="main-sidebar__button-icon"/>
                    </button>
                </div>
                <div className={statsClass}>
                    <button
                        className="main-sidebar__button"
                        data-view={VIEWS.STATS}
                        onClick={handleSetCurrentViewButtonsClick}
                    >
                        <StatsChartIcon className="main-sidebar__button-icon"/>
                    </button>
                </div>
                <div className="main-sidebar__menu-item">
                    <button className="main-sidebar__button">
                        <ReturnIcon className="main-sidebar__button-icon"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

MainSidebar.propTypes = {
    currentView: propTypes.string.isRequired,
    setCurrentView: propTypes.func.isRequired,
};
