import PropTypes from 'prop-types';
import React from 'react';
import Chip from "../../../../components/data display/Chip";
import ChipList from "../../../../components/data display/ChipList";
import {isEmpty} from "lodash";
import {ReactComponent as InfoIcon} from "../../../../assets/icons/information.svg";

Categories.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired
};

function Categories({categories}) {
    return (
        <ChipList>
            {categories.map(category => {
                return <Chip key={category.key}>
                        <Chip.TextPart text={category.name}/>
                    {!isEmpty(category.infos) && <Chip.IconPart Icon={InfoIcon} variant="secondary"/>}
                    </Chip>;
                }
            )}
        </ChipList>
    );
}

export default Categories;