import classNames from "classnames";
import propTypes from "prop-types";
import React from "react";

import "./ProductNutritionTableField.scss";

function ProductNutritionTableFieldRow({name, nutriments, fieldKey, isWith, nutrientLevel, addServingCell}) {

    const rowClass = classNames("product-nutrition-table-field__row", {"product-nutrition-table-field__row--is-indented": isWith});

    const nutrientLevelsConversions = {
        "low": {name: "(faible)", color: "#00bf00"},
        "moderate": {name: "(modéré)", color: "#ffcc00"},
        "high": {name: "(élevé)", color: "#ff1900"}
    };

    const value100g = nutriments[`${fieldKey}_100g`];
    const valueServing = nutriments[`${fieldKey}_serving`];
    const valueUnit = nutriments[`${fieldKey}_unit`];

    const nutrientLevelsInfos = nutrientLevelsConversions[nutrientLevel];
    const nutrientLevelName = nutrientLevelsInfos ? nutrientLevelsInfos.name : "";
    const nutrientLevelColor = nutrientLevelsInfos ? nutrientLevelsInfos.color : "";

    const cell100g = valueUnit ? (value100g || 0) : (value100g || "?");
    const cellServing = valueUnit ? (valueServing || 0) : (valueServing || "?");

    return <tr className={rowClass}>
        <td>{name}</td>
        <td>{cell100g} {valueUnit} <span style={{color: nutrientLevelColor}}>{nutrientLevelName}</span></td>
        {addServingCell && <td>{cellServing} {valueUnit}</td>}
    </tr>;
}

ProductNutritionTableFieldRow.propTypes = {
    name: propTypes.string.isRequired,
    fieldKey: propTypes.string.isRequired,
    nutriments: propTypes.object,
    nutrientLevel: propTypes.string,
    isWith: propTypes.bool,
    addServingCell: propTypes.bool
};
export default function ProductNutritionTableField({fieldName, nutriments, servingSize, nutrientLevels}) {

    const necessaryFields = [
        {key: "energy-kj", name: "Energie (kJ)"},
        {key: "energy-kcal", name: "Energie (kCal)"},
        {
            key: "fat",
            name: "Matières grasses",
            nutrientLevel: nutrientLevels["fat"]
        },
        {
            key: "saturated-fat",
            name: "dont Acides gras saturés",
            isWith: true,
            nutrientLevel: nutrientLevels["saturated-fat"]
        },
        {key: "carbohydrates", name: "Glucides"},
        {
            key: "sugars",
            name: "dont Sucres",
            isWith: true,
            nutrientLevel: nutrientLevels["sugars"]
        },
        {
            key: "salt",
            name: "Sel",
            nutrientLevel: nutrientLevels["salt"]
        },
        {
            key: "sodium",
            name: "dont Sodium",
            isWith: true
        },
        {key: "fiber", name: "Fibres"},
        {key: "proteins", name: "Proteines"},
    ];

    return <div className="product-nutrition-table-field">
        <h4 className="product-nutrition-table-field__name">{fieldName}</h4>
        <table className="product-nutrition-table-field__table">
            <thead>
            <tr>
                <th>Information</th>
                <th>Pour 100g / 100ml</th>
                {servingSize && <th>Par portion de {servingSize || "?"}</th>}
            </tr>
            </thead>
            <tbody>
            {necessaryFields.map((infos) => {
                const {key, name, nutrientLevel, isWith} = infos;
                return <ProductNutritionTableFieldRow name={name}
                                                      nutriments={nutriments}
                                                      fieldKey={key}
                                                      isWith={isWith}
                                                      nutrientLevel={nutrientLevel}
                                                      addServingCell={!!servingSize}
                                                      key={key}/>;
            })
            }
            </tbody>

        </table>
    </div>;
}

ProductNutritionTableField.propTypes = {
    fieldName: propTypes.string.isRequired,
    nutriments: propTypes.object.isRequired,
    servingSize: propTypes.string,
    nutrientLevels: propTypes.object.isRequired
};