import PropTypes from 'prop-types';
import React from 'react';
import Chip from "../../../../components/data display/Chip";
import ChipList from "../../../../components/data display/ChipList";

Categories.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired
};

function Categories({categories}) {
    return (
        <ChipList>
            {categories.map(category => {
                    return <Chip key={category.key}>
                        <Chip.TextPart text={category.name}/>
                    </Chip>;
                }
            )}
        </ChipList>
    );
}

export default Categories;