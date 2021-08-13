import PropTypes from 'prop-types';
import React from 'react';
import Chip from "../../../../components/data display/Chip";
import ChipList from "../../../../components/data display/ChipList";
import useDynamicAssetImport from "../../../../hooks/useDynamicImport";

Origins.propTypes = {
    origins: PropTypes.arrayOf(PropTypes.object).isRequired
};

function Origins({origins}) {
    return (
        <ChipList>
            {origins.map(origin => <OriginChip key={origin.name} origin={origin}/>)}
        </ChipList>
    );
}

OriginChip.propTypes = {
    origin: PropTypes.object.isRequired
};

function OriginChip({origin}) {
    const {asset: image} = useDynamicAssetImport(`countries/${origin.country_code}.png`);


    return <Chip>
        {Image && <Chip.IconPart Icon={() => <img alt={origin.name} src={image}/>} isFull/>}
        <Chip.TextPart text={origin.name}/>
    </Chip>;
}

export default Origins;