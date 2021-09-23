import PropTypes from 'prop-types';
import React from 'react';
import Chip from "../../../../components/data display/Chip";
import ChipList from "../../../../components/data display/ChipList";
import {isEmpty} from "lodash";
import {ReactComponent as InfoIcon} from "../../../../assets/icons/information.svg";

Labels.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.object).isRequired
};

function Labels({labels}) {
    return (
        <ChipList>
            {labels.map(label => {
                return <Chip key={label.key}>
                        <Chip.TextPart text={label.name}/>
                    {!isEmpty(label.infos) && <Chip.IconPart Icon={InfoIcon} variant="secondary"/>}
                    </Chip>;
                }
            )}
        </ChipList>
    );
}

export default Labels;