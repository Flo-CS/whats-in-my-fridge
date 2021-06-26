import classNames from "classnames";
import React from "react";
import {useDispatch} from "react-redux";

import {useHistory, useLocation} from "react-router-dom";

// Components / assets
import {ReactComponent as HomeIcon} from "../../assets/icons/home.svg";
import {ReactComponent as PersonCircleIcon} from "../../assets/icons/person-circle.svg";
import {ReactComponent as StatsChartIcon} from "../../assets/icons/stats-chart.svg";
import {logoutUser} from "../../features/authSlice";


import "./MainSidebar.scss";


export default function MainSidebar() {

    const history = useHistory();
    const location = useLocation();

    const dispatch = useDispatch();

    function changePath(path) {
        history.push(path);
    }


    const paths = {
        home: "/",
        profile: "/profile",
        stats: "/stats",
        products: "/products"
    }

    const profileClass = classNames("main-sidebar__profile", {
        "main-sidebar__profile--active": location.pathname === paths.profile,
    });
    const homeClass = classNames("main-sidebar__menu-item", {
        "main-sidebar__menu-item--active": location.pathname === paths.home || location.pathname.startsWith(paths.products),
    });
    const statsClass = classNames("main-sidebar__menu-item", {
        "main-sidebar__menu-item--active": location.pathname === paths.stats,
    });

    return (
        <div className="main-sidebar">
            <div className={profileClass}>
                <button onClick={() => {
                    /*changePath(paths.profile)*/
                    // TEMPORARY
                    dispatch(logoutUser());
                }}
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