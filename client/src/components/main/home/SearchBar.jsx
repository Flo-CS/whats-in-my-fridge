import classNames from "classnames";
import React, {createRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSortParameters, setTextFilter} from "../../../features/filtersSlice";
import {ReactComponent as ArrowDownIcon} from "./../../../assets/icons/arrow-down.svg";
import {ReactComponent as ArrowUpIcon} from "./../../../assets/icons/arrow-up.svg";
import {ReactComponent as SortIcon} from "./../../../assets/icons/sort.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {SORT_OPTIONS} from "../../../helpers/constants";

import "./SearchBar.scss";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [sortMenuOpen, setIsSortMenuOpen] = useState(false);
    const [sortOptionBeforeInput, setSortOptionBeforeInput] = useState(SORT_OPTIONS.MODIFICATION_DATE)

    const {text: textFilter, sortParameters} = useSelector(state => state.filters);

    const sortRef = createRef()
    useOnClickOutside(sortRef, () => setIsSortMenuOpen(false));


    function handleTextFilterInputChange(e) {
        const inputText = e.target.value

        if (inputText.length === 1 && inputText.length > textFilter) {
            dispatch(setSortParameters(SORT_OPTIONS.RELEVANCE));
            setSortOptionBeforeInput(sortParameters)
        }
        if (inputText.length === 0) {
            dispatch(setSortParameters(sortOptionBeforeInput))
        }
        dispatch(setTextFilter(inputText));
    }

    function handleSwapSortDirectionButtonClick() {
        dispatch(setSortParameters({
            ...sortParameters,
            direction: sortParameters.direction === "asc" ? "desc" : "asc"
        }));

    }

    function handleSortOptionItemClick(selectedSortOption) {
        dispatch(setSortParameters({name: selectedSortOption.name, direction: selectedSortOption.direction}));

        if (textFilter.length > 0) {
            setSortOptionBeforeInput(selectedSortOption)
        }
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
                {Object.values(SORT_OPTIONS).map(sortOption => {
                    const sortItemClass = classNames("search-bar__sort-item", {"search-bar__sort-item--selected": sortOption.name === sortParameters.name});
                    return <button className={sortItemClass} key={sortOption.name}
                                   onClick={() => handleSortOptionItemClick(sortOption)}
                                   disabled={sortOption.name === SORT_OPTIONS.RELEVANCE.name}>
                        {sortOption.label}
                    </button>;
                })}
            </div>
            }

        </div>
        <button className="search-bar__swap-button" onClick={handleSwapSortDirectionButtonClick}>
            {sortParameters.direction === "asc" ? <ArrowDownIcon/> : <ArrowUpIcon/>}
        </button>
    </div>;
}