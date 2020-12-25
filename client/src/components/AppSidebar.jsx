import React from "react"
import propTypes from "prop-types"
import classNames from "classnames"

import "./AppSidebar.scss"

// Components / assets
import { ReactComponent as HomeIcon } from "./../assets/icons/home.svg"
import { ReactComponent as PersonCircleIcon } from "./../assets/icons/person-circle.svg"
import { ReactComponent as ReturnIcon } from "./../assets/icons/return-up-back.svg"
import { ReactComponent as StatsChartIcon } from "./../assets/icons/stats-chart.svg"

// Misc
import { VIEWS } from "../constants/views"

export default function AppSidebar({ currentView, onSetCurrentView }) {

    function setCurrentView(e) {
        onSetCurrentView(e.currentTarget.dataset.view)
    }
    const profileClass = classNames("app-sidebar__profile", {"app-sidebar__profile--active": currentView === VIEWS.PROFILE})
    const homeClass = classNames("app-sidebar__menu-item", {"app-sidebar__menu-item--active": currentView === VIEWS.HOME})
    const statsClass = classNames("app-sidebar__menu-item", {"app-sidebar__menu-item--active": currentView === VIEWS.STATS})


    return <div className="app-sidebar">
        <div className={profileClass}>
            <button className="app-sidebar__button" data-view={VIEWS.PROFILE} onClick={setCurrentView}>
                <PersonCircleIcon className="app-sidebar__button-icon" />
            </button>
        </div>
        <div className="app-sidebar__menu">
            <div className={homeClass}>
                <button className="app-sidebar__button" data-view={VIEWS.HOME} onClick={setCurrentView}>
                    <HomeIcon className="app-sidebar__button-icon" />
                </button>
            </div>
            <div className={statsClass}>
                <button className="app-sidebar__button" data-view={VIEWS.STATS} onClick={setCurrentView}>
                    <StatsChartIcon className="app-sidebar__button-icon" />
                </button>
            </div>
            <div className="app-sidebar__menu-item">
                <button className="app-sidebar__button">
                    <ReturnIcon className="app-sidebar__button-icon" />
                </button>
            </div>
        </div>
    </div>
}

AppSidebar.propTypes = {
    currentView: propTypes.string.isRequired,
    onSetCurrentView: propTypes.func.isRequired
}