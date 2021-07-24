import classNames from "classnames";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSortOptions, setTextFilter} from "../../../features/filtersSlice";
import {ReactComponent as ArrowDownIcon} from "./../../../assets/icons/arrow-down.svg";
import {ReactComponent as ArrowUpIcon} from "./../../../assets/icons/arrow-up.svg";
import {ReactComponent as SortIcon} from "./../../../assets/icons/sort.svg";

import "./SearchBar.scss";

const sortItems = [
    {label: "Quantité", value: "QUANTITY"},
    {label: "Nom", value: "NAME"},
    {label: "Barcode", value: "BARCODE"},
    {label: "Pertinence", value: "RELEVANCE"},
];

export default function SearchBar() {
    const dispatch = useDispatch();
    const [sortButtonOpen, setIsSortButtonOpen] = useState(false);

    const {text, sortOptions} = useSelector(state => state.filters);

    function handleTextFilterInputChange(e) {
        if (sortOptions.name !== "RELEVANCE") {
            dispatch(setSortOptions({...sortOptions, name: "RELEVANCE"}));
        }
        dispatch(setTextFilter(e.target.value));
    }

    function handleSwapButtonClick() {
        dispatch(setSortOptions({
            ...sortOptions,
            direction: sortOptions.direction === "asc" ? "desc" : "asc"
        }));
    }

    function handleSortOptionItemClick(value) {
        dispatch(setSortOptions({...sortOptions, name: value}));
        setIsSortButtonOpen(false);
    }


    return <div className="search-bar">
        <input type="text" className="search-bar__text-filter-input" placeholder="Rechercher des produits"
               onChange={handleTextFilterInputChange} value={text}/>
        <div className="search-bar__sort">
            <button className="search-bar__sort-button"
                    onClick={() => setIsSortButtonOpen(isOpen => !isOpen)}>
                <SortIcon/>Trier par
            </button>
            {sortButtonOpen &&
            <div className="search-bar__sort-items">
                {sortItems.map(item => {
                    const sortItemClass = classNames("search-bar__sort-item", {"search-bar__sort-item--selected": item.value === sortOptions.name});
                    return <button className={sortItemClass} key={item.value}
                                   onClick={() => handleSortOptionItemClick(item.value)}>
                        {item.label}
                    </button>;
                })}
            </div>
            }

        </div>
        <button className="search-bar__swap-button" onClick={handleSwapButtonClick}>
            {sortOptions.direction === "asc" ? <ArrowDownIcon/> : <ArrowUpIcon/>}
        </button>
    </div>;
}