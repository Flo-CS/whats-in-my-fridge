import PropTypes from 'prop-types';
import React from 'react';
import Chip from "../../../../components/data display/Chip";
import ChipList from "../../../../components/data display/ChipList";
import {isEmpty} from "lodash";
import {ReactComponent as InfoIcon} from "../../../../assets/icons/information.svg";

Allergens.propTypes = {
    allergens: PropTypes.arrayOf(PropTypes.object).isRequired
};

function Allergens({allergens}) {
    return (
        <ChipList>
            {allergens.map(allergen => {
                return <Chip key={allergen.key}>
                        <Chip.TextPart text={allergen.name}/>
                    {!isEmpty(allergen.infos) && <Chip.IconPart Icon={InfoIcon} variant="secondary"/>}
                    </Chip>;
                }
            )}
        </ChipList>
    );
}

export default Allergens;