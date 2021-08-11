import {omit, round} from "lodash";
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

const MAIN_NUTRIMENTS_KEYS = ["energy-kcal", "energy-kj", "fat", "saturated-fat", "sugars", "salt"];

// TODO : HANDLE DIFFERENT UNITS
function NutritionalInformation({nutriments, servingSize, nutrientLevels}) {

    const [selectedSize, setSelectedSize] = useState("100g");

    const sizeToValue = {
        "100g": 100,
        "serving": parseFloat(servingSize)
    };

    function getNutrimentField(key, field) {
        return nutriments?.[key]?.[field];
    }

    // TODO: CHANGE COLOR AND USE NUTRIENT LEVELS TO GIVE A POINT OF REFERENCE TO THE USER
    const nutrimentsItems = [
        {key: "fat", color: "#FF0000"},
        {key: "saturated-fat", color: "#FF7A00"},
        {key: "sugars", color: "#FFB800"},
        {key: "salt", color: "#FFD600"}
    ];

    const percentageBarItems = nutrimentsItems.map(({key, color}) => {
        return {
            name: getNutrimentField(key, "name"),
            value: getNutrimentField(key, selectedSize),
            color: color
        };
    });

    function handleSizeChange(e) {
        setSelectedSize(e.target.value);
    }

    const energy = getNutrimentField("energy-kcal", selectedSize) || round(getNutrimentField("energy-kj", selectedSize) * KJ_TO_KCAL_FACTOR, 1);

    const othersNutriments = omit(nutriments, MAIN_NUTRIMENTS_KEYS);

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
                {Object.values(othersNutriments).map(nutriment => {
                    return <Chip key={nutriment.name}>
                        <Chip.TextPart text={`${nutriment[selectedSize]} ${nutriment.unit}`} variant="primary"/>
                        <Chip.TextPart text={nutriment.name}/>
                    </Chip>;
                })
                }
            </ChipList>
        </div>
    );
}

export default NutritionalInformation;