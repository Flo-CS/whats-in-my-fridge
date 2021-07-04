import classNames from "classnames";
import {map} from "lodash";
import propTypes from "prop-types";
import React from "react";

import "./ProductNutritionTableField.scss";

function ProductNutritionTableFieldRow({name, value_100g, value_serving, value_unit, isWith}) {

    const rowClass = classNames("product-nutrition-table-field__row", {"product-nutrition-table-field__row--is-indented": isWith});

    return <tr className={rowClass}>
        <td> {name}</td>
        <td>{value_100g ? `${value_100g} ${value_unit}` : ":("}</td>
        <td>{value_serving ? `${value_serving} ${value_unit}` : ":("}</td>
    </tr>
}

ProductNutritionTableFieldRow.propTypes = {
    name: propTypes.string.isRequired,
    value_100g: propTypes.number,
    value_serving: propTypes.number,
    value_unit: propTypes.string,
    isWith: propTypes.bool
}
export default function ProductNutritionTableField({fieldName, nutritionData, servingSize}) {

    const necessaryFields = {
        "energy-kj": {name: "Energie (kJ)"},
        "energy-kcal": {name: "Energie (kCal)"},
        "fat": {name: "Matières grasses"},
        "saturated-fat": {name: "dont Acides gras saturés", isWith: true},
        "carbohydrates": {name: "Glucides"},
        "sugars": {name: "dont Sucres", isWith: true},
        "salt": {name: "Sel"},
        "sodium": {name: "dont Sodium", isWith: true},
        "fiber": {name: "Fibres"},
        "proteins": {name: "Proteines"},
    }

    return <div className="product-nutrition-table-field">
        <h4 className="product-nutrition-table-field__name">{fieldName}</h4>
        <table className="product-nutrition-table-field__table">
            <thead>
            <tr>
                <th>Information</th>
                <th>Pour 100g / 100ml</th>
                <th>Par portion de {servingSize}</th>
            </tr>
            </thead>
            <tbody>
            {map(necessaryFields, (fieldInfos, fieldKey) => {
                return <ProductNutritionTableFieldRow name={fieldInfos.name}
                                                      value_100g={nutritionData[`${fieldKey}_100g`]}
                                                      value_serving={nutritionData[`${fieldKey}_serving`]}
                                                      value_unit={nutritionData[`${fieldKey}_unit`]}
                                                      isWith={fieldInfos.isWith}
                                                      key={fieldInfos.name}/>
            })
            }


            </tbody>

        </table>
    </div>;
}

ProductNutritionTableField.propTypes = {
    fieldName: propTypes.string.isRequired,
    nutritionData: propTypes.object.isRequired,
    servingSize: propTypes.string
};