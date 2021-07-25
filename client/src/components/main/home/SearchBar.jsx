import classNames from "classnames";
import React, {createRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSortOptions, setTextFilter} from "../../../features/filtersSlice";
import {ReactComponent as ArrowDownIcon} from "./../../../assets/icons/arrow-down.svg";
import {ReactComponent as ArrowUpIcon} from "./../../../assets/icons/arrow-up.svg";
import {ReactComponent as SortIcon} from "./../../../assets/icons/sort.svg";

import "./SearchBar.scss";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const sortItems = [
    {label: "Nom", name: "NAME", direction: "asc"},
    {label: "Quantité", name: "QUANTITY", direction: "desc"},
    {label: "Date de modification", name: "MODIFICATION_DATE", direction: "desc"},
    {label: "Nutriscore", name: "NUTRISCORE", direction: "asc"},
    {label: "Ecoscore", name: "ECOSCORE", direction: "asc"},
    {label: "Nova", name: "NOVA", direction: "asc"},
    {label: "Pertinence", name: "RELEVANCE", direction: "desc"},
];

export default function SearchBar() {
    const dispatch = useDispatch();
    const [sortMenuOpen, setIsSortMenuOpen] = useState(false);
    const [sortOptionNameBeforeInput, setSortOptionNameBeforeInput] = useState(null)

    const {text: textFilter, sortOptions} = useSelector(state => state.filters);

    const sortRef = createRef()
    useOnClickOutside(sortRef, () => setIsSortMenuOpen(false));


    function handleTextFilterInputChange(e) {
        const inputText = e.target.value

        if (inputText.length === 1 && inputText.length > textFilter) {
            dispatch(setSortOptions({...sortOptions, name: "RELEVANCE"}));
            setSortOptionNameBeforeInput(sortOptions.name)
        }
        if (inputText.length === 0) {
            dispatch(setSortOptions({...sortOptions, name: sortOptionNameBeforeInput}))
        }
        dispatch(setTextFilter(inputText));
    }

    function handleSwapButtonClick() {
        dispatch(setSortOptions({
            ...sortOptions,
            direction: sortOptions.direction === "asc" ? "desc" : "asc"
        }));
    }

    function handleSortOptionItemClick(sortOptionItem) {
        dispatch(setSortOptions({direction: sortOptionItem.direction, name: sortOptionItem.name}));
        setIsSortMenuOpen(false);
    }


    return <div className="search-bar">
        <input type="textFilter" className="search-bar__text-filter-input" placeholder="Rechercher des produits"
               onChange={handleTextFilterInputChange} value={textFilter}/>
        <div className="search-bar__sort" ref={sortRef}>
            <button className="search-bar__sort-button"
                    onClick={() => setIsSortMenuOpen(isOpen => !isOpen)}
            >
                <SortIcon/>Trier par
            </button>
            {sortMenuOpen &&
            <div className="search-bar__sort-items">
                {sortItems.map(item => {
                    const sortItemClass = classNames("search-bar__sort-item", {"search-bar__sort-item--selected": item.name === sortOptions.name});
                    return <button className={sortItemClass} key={item.name}
                                   onClick={() => handleSortOptionItemClick(item)}>
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