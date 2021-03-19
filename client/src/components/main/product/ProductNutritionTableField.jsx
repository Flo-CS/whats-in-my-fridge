import propTypes from "prop-types";
import React from "react";

import "./ProductNutritionTableField.scss";

export default function ProductNutritionTableField({fieldName, nutritionData}) {
    return <div className="product-nutrition-table-field">
        <h4 className="product-nutrition-table-field__name">{fieldName}</h4>
        <table className="product-nutrition-table-field__table">
            <thead>
            <tr>
                <th>Information</th>
                <th>Pour 100g / 100ml</th>
                <th>Par portion</th>
            </tr>
            </thead>
            <tbody>
            <tr>

                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>

        </table>
    </div>;
}

ProductNutritionTableField.propTypes = {
    fieldName: propTypes.string.isRequired,
    nutritionData: propTypes.object
};