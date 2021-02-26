import propTypes from "prop-types";
import React from "react";

import "./ProductContent.scss";

export default function ProductContent({productData}) {
    const {nutriscore, nova, ecoscore, nutriments} = productData;

    return <div className="product-content">
        <div className="product-content__attributes">
            <div className="product-content__attribute-box"><img className="product-content__nutriscore"
                                                                 src={`/images/nutriscore-${nutriscore}.svg`} alt=""/>
            </div>

            <div className="product-content__attribute-box"><img className="product-content__nova"
                                                                 src={`/images/nova-group-${nova}.svg`} alt=""/></div>
            <div className="product-content__attribute-box"><img className="product-content__ecoscore"
                                                                 src={`/images/ecoscore-${ecoscore}.svg`} alt=""/></div>
        </div>


    </div>;
}

ProductContent.propTypes = {
    productData: propTypes.object.isRequired,

};
