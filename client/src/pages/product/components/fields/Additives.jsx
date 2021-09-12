import PropTypes from 'prop-types';
import React from 'react';
import Chip from "../../../../components/data display/Chip";
import ChipList from "../../../../components/data display/ChipList";

Additives.propTypes = {
    additives: PropTypes.arrayOf(PropTypes.object).isRequired
};

function Additives({additives}) {
    return (
        <ChipList>
            {additives.map(additive => {
                    const split = additive.name.split(" - ");
                    const code = split[0];
                    const label = split[1];
                    return <Chip key={additive.key}>
                        <Chip.TextPart text={code} variant="primary"/>
                        <Chip.TextPart text={label}/>
                    </Chip>;
                }
            )}
        </ChipList>
    );
}

export default Additives;