import convert from "convert-units";
import {omit, round} from "lodash";
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {ReactComponent as FlameIcon} from "../../../../assets/icons/flame.svg";
import Chip from "../../../../components/data display/Chip";
import ChipList from "../../../../components/data display/ChipList";

import PercentageBar from "../../../../components/data display/PercentageBar";
import Switch from "../../../../components/input/Switch";
import {KJ_TO_KCAL_FACTOR} from "../../../../helpers/constants";

import "./NutritionalInformation.scss";

NutritionalInformation.propTypes = {
    nutriments: PropTypes.object,
    servingSize: PropTypes.object,
    nutrientLevels: PropTypes.object
};

const MAIN_NUTRIMENTS_KEYS = ["energy-kcal", "energy-kj", "fat", "saturated-fat", "sugars", "salt"];

// TODO : HANDLE DIFFERENT UNITS
function NutritionalInformation({nutriments, servingSize, nutrientLevels}) {

    const [sizeKey, setSizeKey] = useState("100g");

    function getNutrimentField(key, field) {
        return nutriments?.[key]?.[field];
    }

    const sizeKeyToValue = {
        "100g": 100,
        "serving": servingSize?.value
    };

    const switchOptions = [
        {key: "100g", name: `100 g/ml`},
        {
            key: "serving",
            name: `Portion ${servingSize?.value || "?"} ${servingSize?.unit || ""}`,
            disabled: !servingSize?.value
        }
    ];

    // TODO: Change color and use nutrient levels to give a point of reference to the user
    const percentageBarItems = [
        {
            name: getNutrimentField("fat", "name"),
            value: getNutrimentField("fat", sizeKey),
            color: "#FF0000"
        },
        {
            name: getNutrimentField("saturated-fat", "name"),
            value: getNutrimentField("saturated-fat", sizeKey),
            color: "#FF7A00"
        },
        {
            name: getNutrimentField("sugars", "name"),
            value: getNutrimentField("sugars", sizeKey),
            color: "#FFB800"
        },
        {
            name: getNutrimentField("salt", "name"),
            value: getNutrimentField("salt", sizeKey),
            color: "#FFD600"
        }
    ];

    let energyKj = getNutrimentField("energy-kj", sizeKey) || "?";
    let energyKcal = getNutrimentField("energy-kcal", sizeKey) || round(energyKj * KJ_TO_KCAL_FACTOR, 1) || "?";

    const othersNutriments = omit(nutriments, MAIN_NUTRIMENTS_KEYS);

    return (
        <div className="nutritional-information">
            <Switch label="Par quantité de"
                    options={switchOptions}
                    selectedOption={sizeKey}
                    onOptionChange={(sizeKey) => setSizeKey(sizeKey)}
            />
            <p className="nutritional-information__energy">
                <FlameIcon className="nutritional-information__energy-icon"/>
                <span className="nutritional-information__energy--strong">{energyKcal}</span> kcal
            </p>
            <PercentageBar items={percentageBarItems} max={sizeKeyToValue[sizeKey]} unit="g"/>
            <ChipList>
                {Object.values(othersNutriments).map(nutriment => {
                    let val, unit

                    try {
                        ({val, unit} = convert(nutriment[sizeKey]).from(nutriment.unit).toBest())
                        val = round(val, 3)
                    } catch {
                        val = nutriment[sizeKey]
                        unit = nutriment.unit
                    }

                    return <Chip key={nutriment.name || nutriment.key}>
                        <Chip.TextPart text={`${val} ${unit}`} variant="primary"/>
                        <Chip.TextPart text={nutriment.name || nutriment.key}/>
                    </Chip>;
                })
                }
            </ChipList>
        </div>
    );
}

export default NutritionalInformation;