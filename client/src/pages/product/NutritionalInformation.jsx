import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {ReactComponent as FlameIcon} from "../../assets/icons/flame.svg";
import ChipList from "../../components/data display/ChipList";
import {KJ_TO_KCAL_FACTOR} from "../../helpers/constants";
import Chip from "./../../components/data display/Chip";

import "./NutritionalInformation.scss";

import PercentageBar from "./PercentageBar";

NutritionalInformation.propTypes = {
    nutriments: PropTypes.object,
    servingSize: PropTypes.string,
    nutrientLevels: PropTypes.object
};

// TODO : HANDLE DIFFERENT UNITS
function NutritionalInformation({nutriments, servingSize, nutrientLevels}) {

    const [selectedSize, setSelectedSize] = useState("100g");

    const sizeToValue = {
        "100g": 100,
        "serving": parseFloat(servingSize)
    };

    function getNutrimentValue(nutrimentName) {
        return nutriments[`${nutrimentName}_${selectedSize}`];
    }

    const energy = getNutrimentValue("energy-kcal") || Math.round(getNutrimentValue("energy-kj") * KJ_TO_KCAL_FACTOR);

    // TODO: CHANGE COLOR AND USE NUTRIENT LEVELS TO GIVE A POINT OF REFERENCE TO THE USER
    const percentageBarItems = [
        {
            name: "Matières grasses",
            value: getNutrimentValue("fat"),
            color: "#FF0000"
        },
        {
            name: "Acides gras saturés",
            value: getNutrimentValue("saturated-fat"),
            color: "#FF7A00"
        },
        {
            name: "Sucres",
            value: getNutrimentValue("sugars"),
            color: "#FFB800"
        },
        {
            name: "Sel",
            value: getNutrimentValue("salt"),
            color: "#FFD600"
        }
    ];


    function handleSizeChange(e) {
        setSelectedSize(e.target.value);
    }


    return (
        <div className="nutritional-information">
            <div className="nutritional-information__size">
                <p className="nutritional-information__size-label">Par quantité de</p>
                <div className="nutritional-information__size-switch">
                    <input name="size-radio"
                           id="size-radio-100g"
                           type="radio"
                           className="nutritional-information__size-radio"
                           value="100g"
                           onChange={handleSizeChange}
                           checked={selectedSize === "100g"}/>
                    <label className="nutritional-information__size-radio-label"
                           htmlFor="size-radio-100g">100g</label>
                    <input name="size-radio"
                           id="size-radio-serving"
                           type="radio"
                           className="nutritional-information__size-radio"
                           onChange={handleSizeChange}
                           value="serving"
                           checked={selectedSize === "serving"}/>
                    <label className="nutritional-information__size-radio-label"
                           htmlFor="size-radio-serving">Portion {servingSize || "?"}</label>

                </div>
            </div>
            <p className="nutritional-information__energy"><FlameIcon
                className="nutritional-information__energy-icon"/><span
                className="nutritional-information__energy--strong">
                {energy}
            </span> kcal
            </p>
            <PercentageBar items={percentageBarItems} max={sizeToValue[selectedSize]} unit="g"/>
            <ChipList>
                <Chip>
                    <Chip.TextPart text={getNutrimentValue("proteins")} variant="primary"/>
                    <Chip.TextPart text="Protéines"/>
                </Chip>
                <Chip>
                    <Chip.TextPart text={getNutrimentValue("fiber")} variant="primary"/>
                    <Chip.TextPart text="Fibres"/>
                </Chip>
            </ChipList>
        </div>
    );
}

export default NutritionalInformation;