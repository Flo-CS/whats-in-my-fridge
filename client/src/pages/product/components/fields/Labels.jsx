import PropTypes from 'prop-types';
import React from 'react';
import Chip from "../../../../components/data display/Chip";
import ChipList from "../../../../components/data display/ChipList";

Labels.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.object).isRequired
};

function Labels({labels}) {
    return (
        <ChipList>
            {labels.map(label => {
                    return <Chip key={label.name}>
                        <Chip.TextPart text={label.name}/>
                    </Chip>;
                }
            )}
        </ChipList>
    );
}

export default Labels;