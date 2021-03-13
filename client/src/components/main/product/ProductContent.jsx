import propTypes from "prop-types";
import React from "react";

import "./ProductContent.scss";
import ProductTagsField from "./ProductTagsField";

export default function ProductContent({productData}) {
    const {
        nutriscore_grade = "unknown",
        nova_group = "unknown",
        ecoscore_grade = "unknown",
        categories_tags,
        labels_tags,
        origins_tags,
        countries_tags,
        traces_tags,
        allergens_tags,
        ingredients_analysis_tags,
        additives_tags,
        nutrient_levels_tags,
        ingredients_tags,
    } = productData;

    // Use images from https://github.com/openfoodfacts/openfoodfacts-server/tree/master/html/images/attributes/src
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

        <ProductTagsField fieldName="Catégories" tags={categories_tags}/>
        <ProductTagsField fieldName="Labels" tags={labels_tags}/>
        <ProductTagsField fieldName="Origines des ingrédients" tags={origins_tags}/>
        <ProductTagsField fieldName="Pays de vente" tags={countries_tags}/>
        <ProductTagsField fieldName="Traces éventuelles" tags={traces_tags}/>
        <ProductTagsField fieldName="Substances ou produits provoquant des allergies ou intolérances"
                          tags={allergens_tags}/>
        <ProductTagsField fieldName="Analyse des ingrédients" tags={ingredients_analysis_tags}/>
        <ProductTagsField fieldName="Additifs" tags={additives_tags}/>
        <ProductTagsField fieldName="Ingrédients" tags={ingredients_tags}/>
        <ProductTagsField fieldName="Repères nutritonnels pour 100g" tags={nutrient_levels_tags}/>
    </div>

}

ProductContent.propTypes = {
    productData: propTypes.object.isRequired,

};
