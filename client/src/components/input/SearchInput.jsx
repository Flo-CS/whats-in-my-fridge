import React from "react";

import {ReactComponent as SearchIcon} from "./../../assets/icons/search.svg";
import "./SearchInput.scss";

export default function SearchInput({...rest}) {
    return <div className="search-input__wrapper">
        <SearchIcon className="search-input__search-icon"/>
        <input className="search-input" {...rest}/>
    </div>;
}

