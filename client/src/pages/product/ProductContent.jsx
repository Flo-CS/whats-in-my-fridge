import propTypes from "prop-types";
import React from "react";
import "./ProductContent.scss";
import ProductNutritionTableField from "./ProductNutritionTableField";
import ProductTagsField from "./ProductTagsField";

export default function ProductContent({productData}) {

    const {
        categories_tags = [],
        labels_tags = [],
        origins_tags = [],
        countries_tags = [],
        traces_tags = [],
        allergens_tags = [],
        ingredients_analysis_tags = [],
        additives_tags = [],
        nutrient_levels = {},
        ingredients_tags = [],
        nutriments = {},
        serving_size
    } = productData;


    return <div className="product-content">

        <ProductNutritionTableField fieldName="Informations nutritionnelles" nutriments={nutriments}
                                    nutrientLevels={nutrient_levels}
                                    servingSize={serving_size}/>
        <ProductTagsField fieldName="Additifs" tags={additives_tags}/>
        <ProductTagsField fieldName="Labels" tags={labels_tags}/>
        <ProductTagsField fieldName="Ingrédients" tags={ingredients_tags}/>
        <ProductTagsField fieldName="Analyse des ingrédients" tags={ingredients_analysis_tags}/>
        <ProductTagsField fieldName="Substances ou produits provoquant des allergies ou intolérances"
                          tags={allergens_tags}/>

        <ProductTagsField fieldName="Traces éventuelles" tags={traces_tags}/>
        <ProductTagsField fieldName="Origines des ingrédients" tags={origins_tags}/>
        <ProductTagsField fieldName="Pays de vente" tags={countries_tags}/>
        <ProductTagsField fieldName="Catégories" tags={categories_tags}/>
    </div>;
}

ProductContent.propTypes = {
    productData: propTypes.object.isRequired,
    quantity: propTypes.number.isRequired,
    barcode: propTypes.string.isRequired
};
