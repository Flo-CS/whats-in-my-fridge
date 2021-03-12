import propTypes from "prop-types";
import React from "react";

import "./ProductContent.scss";

export default function ProductContent({productData}) {
    const {
        nutriscore_grade = "unknown",
        nova_group = "unknown",
        ecoscore_grade = "unknown",
        categories_tags = [],
        labels_tags = [],
        origins_tags = [],
        countries_tags = [],
        traces_tags = [],
        allergens_tags = [],
        ingredients_analysis_tags = [],
        additives_tags = [],
        nova_groups_tags = [],
        nutrient_levels_tags = [],
        ingredients_tags = [],
    } = productData;


    return <div className="product-content">
        <div className="product-content__attributes">
            {/* Show more information on hover like exact score and the meaning of the score*/}
            <div className="product-content__attribute-box"><img className="product-content__attribute"
                                                                 src={`/static/images/nutriscore-${nutriscore_grade}.svg`}
                                                                 alt=""/>
            </div>

            <div className="product-content__attribute-box"><img className="product-content__attribute"
                                                                 src={`/static/images/nova-group-${nova_group}.svg`}
                                                                 alt=""/>
            </div>
            <div className="product-content__attribute-box"><img className="product-content__attribute"
                                                                 src={`/static/images/ecoscore-${ecoscore_grade}.svg`}
                                                                 alt=""/></div>
        </div>

        <div className="product-content__tags-fields">
            <p className="product-content__tags-field">
                <span className="product-content__tags-field-name">Catégories:</span>
                {categories_tags.map((tag) => {
                    return <span className="product-content__tags-fields-value"
                                 key={tag.name}>{tag.name}<br/></span>;
                })}
            </p>
        </div>


    </div>;
}

ProductContent.propTypes = {
    productData: propTypes.object.isRequired,

};
