import propTypes from "prop-types";
import React from "react";

import "./ProductContent.scss";

export default function ProductContent({productData}) {
    const {
        nutriscore_grade: nutriscore = "unknown",
        nova_group: nova = "unknown",
        ecoscore_grade: ecoscore = "unknown",
        categories_tags = []
    } = productData;


    return <div className="product-content">
        <div className="product-content__attributes">
            {/* Show more information on hover like exact score and the meaning of the score*/}
            <div className="product-content__attribute-box"><img className="product-content__attribute"
                                                                 src={`/static/images/nutriscore-${nutriscore}.svg`}
                                                                 alt=""/>
            </div>

            <div className="product-content__attribute-box"><img className="product-content__attribute"
                                                                 src={`/static/images/nova-group-${nova}.svg`} alt=""/>
            </div>
            <div className="product-content__attribute-box"><img className="product-content__attribute"
                                                                 src={`/static/images/ecoscore-${ecoscore}.svg`}
                                                                 alt=""/></div>
        </div>

        <div className="product-content__common-data">
            <p className="product-content__data">
                <span className="product-content__data-name">Categories:</span>
                {categories_tags.map((category_tag, index) => {
                    return <span className="product-content__data-value" key={index}>{category_tag}<br/></span>;
                })}

            </p>
        </div>


    </div>;
}

ProductContent.propTypes = {
    productData: propTypes.object.isRequired,

};
