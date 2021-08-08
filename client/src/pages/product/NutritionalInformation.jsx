import PropTypes from 'prop-types';
import React from 'react';

import "./NutritionalInformation.scss";
import PercentageBar from "./PercentageBar";

NutritionalInformation.propTypes = {
    nutriments: PropTypes.object,
    servingSize: PropTypes.string,
    nutrientLevels: PropTypes.object
};

function NutritionalInformation({nutriments, servingSize, nutrientLevels}) {
    return (
        <div className="nutritional-information">
            <div className="nutritional-information__portion">
                <p className="nutritional-information__portion-label">Par portion de</p>
                <div className="nutritional-information__portion-switch">
                    <input name="portion-radio"
                           id="portion-radio-100g"
                           type="radio"
                           className="nutritional-information__portion-radio"
                           value="100g"
                           defaultChecked/>
                    <label className="nutritional-information__portion-radio-label"
                           htmlFor="portion-radio-100g">100g</label>
                    <input name="portion-radio"
                           id="portion-radio-serving"
                           type="radio"
                           className="nutritional-information__portion-radio"
                           value="serving"/>
                    <label className="nutritional-information__portion-radio-label"
                           htmlFor="portion-radio-serving">{servingSize}</label>

                </div>
            </div>
            <p className="nutritional-information__calories">{nutriments["energy-kcal_100g"]}</p>
            <PercentageBar items={[
                {
                    name: "Matières grasses",
                    value: nutriments["fat_100g"],
                    unit: "g",
                    color: "#FF0000"
                },
                {
                    name: "Acides gras saturés",
                    value: nutriments["saturated-fat_100g"],
                    unit: "g",
                    color: "#FF7A00"
                },
                {
                    name: "Sucres",
                    value: nutriments["sugars_100g"],
                    unit: "g",
                    color: "#FFB800"
                },
                {
                    name: "Sel",
                    value: nutriments["salt_100g"],
                    unit: "g",
                    color: "#FFD600"
                }
            ]} maxValue={100} otherUnit="g"/>
        </div>
    );
}

export default NutritionalInformation;