import PropTypes from 'prop-types';
import React from 'react';
import Chip from "../../../../components/data display/Chip";
import ChipList from "../../../../components/data display/ChipList";

Allergens.propTypes = {
    allergens: PropTypes.arrayOf(PropTypes.object).isRequired
};

function Allergens({allergens}) {
    return (
        <ChipList>
            {allergens.map(allergen => {
                    return <Chip key={allergen.name}>
                        <Chip.TextPart text={allergen.name}/>
                    </Chip>;
                }
            )}
        </ChipList>
    );
}

export default Allergens;