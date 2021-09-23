import PropTypes from 'prop-types';
import React from 'react';
import Chip from "../../../../components/data display/Chip";
import ChipList from "../../../../components/data display/ChipList";
import useDynamicAssetImport from "../../../../hooks/useDynamicAssetImport";
import {isEmpty} from "lodash";
import {ReactComponent as InfoIcon} from "../../../../assets/icons/information.svg";

Origins.propTypes = {
    origins: PropTypes.arrayOf(PropTypes.object).isRequired
};

function Origins({origins}) {
    return (
        <ChipList>
            {origins.map(origin => <OriginChip key={origin.key} origin={origin}/>)}
        </ChipList>
    );
}

OriginChip.propTypes = {
    origin: PropTypes.object.isRequired
};

function OriginChip({origin}) {
    const {asset: image} = useDynamicAssetImport(`countries/${origin.country_code}.png`);


    return <Chip>
        {image && <Chip.IconPart Icon={() => <img alt={origin.name} src={image}/>} isFull/>}
        <Chip.TextPart text={origin.name}/>
        {!isEmpty(origin.infos) && <Chip.IconPart Icon={InfoIcon} variant="secondary"/>}
    </Chip>;
}

export default Origins;