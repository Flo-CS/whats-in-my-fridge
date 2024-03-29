import PropTypes from 'prop-types';
import React from 'react';

import "./ProductPageField.scss";

ProductPageField.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
};

function ProductPageField({title, children}) {
    return (
        <div className="product-page-field">
            <p className="product-page-field__title">{title}</p>
            <div className="product-page-field__content">
                {children}
            </div>
        </div>
    );
}

export default ProductPageField;