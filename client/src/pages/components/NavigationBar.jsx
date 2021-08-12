import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import {useHistory, useLocation} from "react-router-dom";
import "./NavigationBar.scss";

NavigationBar.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
        Icon: PropTypes.elementType.isRequired,
        name: PropTypes.string.isRequired
    }))
};

export default function NavigationBar({items}) {
    const location = useLocation();
    const history = useHistory();

    function changePage(path) {
        history.push(path);
    }

    return (
        <div className="navigation-bar">
            <div className="navigation-bar__buttons">
                {items.map(item => {
                    const Icon = item.Icon;
                    const buttonClass = classNames("navigation-bar__button",
                        {"navigation-bar__button--selected": item.path === location.pathname});

                    return <button className={buttonClass} key={item.path}

                                   onClick={() => changePage(item.path)}>
                        {Icon && <Icon className="navigation-bar__button-icon"/>}{item.name}
                    </button>;
                })}
            </div>
        </div>
    );
}




