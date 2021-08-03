import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as ArrowDownIcon} from "../../assets/icons/arrow-down.svg";
import {ReactComponent as ArrowUpIcon} from "../../assets/icons/arrow-up.svg";
import Button from "../../components/button/Button";
import Dropdown from "../../components/dropdown/Dropdown";
import SearchInput from "../../components/input/SearchInput";
import InputGroup from "../../components/layout/InputGroup";
import {setSortParameters, setTextFilter} from "../../features/filtersSlice";
import {SORT_OPTIONS} from "../../helpers/constants";

import "./SearchBar.scss";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [backupSortOption, setBackupSortOption] = useState(SORT_OPTIONS.MODIFICATION_DATE);

    const {text: textFilter, sortParameters} = useSelector(state => state.filters);


    function handleSearchInputChange(e) {
        const inputText = e.target.value;

        if (inputText.length === 1 && inputText.length > textFilter) {
            dispatch(setSortParameters({
                key: SORT_OPTIONS.RELEVANCE.key,
                direction: SORT_OPTIONS.RELEVANCE.defaultDirection
            }));
            setBackupSortOption(sortParameters);
        }

        if (inputText.length === 0) {
            dispatch(setSortParameters(backupSortOption));
        }

        dispatch(setTextFilter(inputText));
    }

    function handleSwapSortDirectionButtonClick() {
        dispatch(setSortParameters({
            ...sortParameters,
            direction: sortParameters.direction === "asc" ? "desc" : "asc"
        }));
    }

    function handleDropdownOptionChange(selectedOption) {
        const sortOption = SORT_OPTIONS[selectedOption];
        dispatch(setSortParameters({
            direction: sortOption.defaultDirection,
            key: sortOption.key
        }));

        if (textFilter.length > 0) {
            setBackupSortOption(sortOption);
        }
    }


    return <div className="search-bar">
        <InputGroup>
            <SearchInput placeholder="Rechercher des produits"
                         onChange={handleSearchInputChange}
                         value={textFilter}/>
            <InputGroup isCollapsed>
                <Dropdown onOptionChange={handleDropdownOptionChange}
                          options={Object.values(SORT_OPTIONS)}
                          selectedOption={sortParameters.key}
                          title="Trier par"/>
                <Button onClick={handleSwapSortDirectionButtonClick} size="big" variant="primary" shape="square">
                    {sortParameters.direction === "asc" ? <ArrowDownIcon/> : <ArrowUpIcon/>}
                </Button>
            </InputGroup>
        </InputGroup>
    </div>;
}