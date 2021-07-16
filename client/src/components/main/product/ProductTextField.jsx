import propTypes from "prop-types";
import React from "react";

import "./ProductTextField.scss";

export default function ProductTextField({title, text, seeMoreUrl}) {
    if (!text)
        return null;

    return <div className="product-text-field">
        <p className="product-text-field__paragraph-title">{title}</p>
        <p className="product-text-field__paragraph">
            {text}{" "}
            {seeMoreUrl &&
            <a className="product-text-field__link"
               href={seeMoreUrl}
               target="_blank" rel="noopener noreferrer">Voir plus</a>}
        </p>
    </div>;
}

ProductTextField.propTypes = {
    title: propTypes.string.isRequired,
    seeMoreUrl: propTypes.string,
    text: propTypes.string,
};