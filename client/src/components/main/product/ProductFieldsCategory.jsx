import propTypes from "prop-types";
import React from "react";

import "./ProductFieldsCategory.scss";

export default function ProductFieldsCategory({name, children}) {
    return <div className="product-fields-category">
        <h3 className="product-fields-category__name">{name}</h3>
        <div className="product-fields-category__content">
            {children}
        </div>

    </div>;
}

ProductFieldsCategory.propTypes = {
    name: propTypes.string,
    children: propTypes.oneOfType([propTypes.arrayOf(propTypes.element), propTypes.element])
};
