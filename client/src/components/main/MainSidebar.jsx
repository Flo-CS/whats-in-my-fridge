import React from "react";
import classNames from "classnames";

import {useHistory, useLocation} from "react-router-dom";


import "./MainSidebar.scss";

// Components / assets
import {ReactComponent as HomeIcon} from "../../assets/icons/home.svg";
import {ReactComponent as PersonCircleIcon} from "../../assets/icons/person-circle.svg";
import {ReactComponent as StatsChartIcon} from "../../assets/icons/stats-chart.svg";


export default function MainSidebar() {

    const history = useHistory()
    const location = useLocation()

    function changePath(path) {
        history.push(path)
    }


    const paths = {
        home: "/",
        profile: "/profile",
        stats: "/stats"
    }

    const profileClass = classNames("main-sidebar__profile", {
        "main-sidebar__profile--active": location.pathname === paths.profile,
    });
    const homeClass = classNames("main-sidebar__menu-item", {
        "main-sidebar__menu-item--active": location.pathname === paths.home,
    });
    const statsClass = classNames("main-sidebar__menu-item", {
        "main-sidebar__menu-item--active": location.pathname === paths.stats,
    });

    return (
        <div className="main-sidebar">
            <div className={profileClass}>
                <button onClick={() => changePath(paths.profile)}
                        className="main-sidebar__button"
                >
                    <PersonCircleIcon className="main-sidebar__button-icon"/>
                </button>
            </div>
            <div className="main-sidebar__menu">
                <div className={homeClass}>
                    <button onClick={() => changePath(paths.home)}
                            className="main-sidebar__button"

                    >
                        <HomeIcon className="main-sidebar__button-icon"/>
                    </button>
                </div>
                <div className={statsClass}>
                    <button onClick={() => changePath(paths.stats)}
                            className="main-sidebar__button"

                    >
                        <StatsChartIcon className="main-sidebar__button-icon"/>
                    </button>
                </div>
            </div>
        </div>
    );
}