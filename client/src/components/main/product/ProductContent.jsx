import propTypes from "prop-types";
import React from "react";

import "./ProductContent.scss";

export default function ProductContent({productData}) {
    const {nutriscore, nova, ecoscore, nutriments} = productData;

    return <div className="product-content">
        <div className="product-content__attributes">
            {/* Show more information on hover like exact score and the meaning of the score*/}
            <div className="product-content__attribute-box"><img className="product-content__nutriscore"
                                                                 src={`/static/images/nutriscore-${nutriscore}.svg`}
                                                                 alt=""/>
            </div>

            <div className="product-content__attribute-box"><img className="product-content__nova"
                                                                 src={`/static/images/nova-group-${nova}.svg`} alt=""/>
            </div>
            <div className="product-content__attribute-box"><img className="product-content__ecoscore"
                                                                 src={`/static/images/ecoscore-${ecoscore}.svg`}
                                                                 alt=""/></div>
        </div>


    </div>;
}

ProductContent.propTypes = {
    productData: propTypes.object.isRequired,

};
