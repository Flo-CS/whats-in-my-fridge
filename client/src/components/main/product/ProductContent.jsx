import propTypes from "prop-types";
import React from "react";
import ProductFieldsCategory from "./ProductFieldsCategory";
import ProductNutritionTableField from "./ProductNutritionTableField";
import ProductTagsField from "./ProductTagsField";
import ProductQuantityControls from "../home/ProductQuantityControls";
import {deleteProduct, updateProductQuantity} from "../../../features/productSlice";
import {useDispatch} from "react-redux";
import "./ProductContent.scss";

export default function ProductContent({productData, quantity, barcode}) {

    const dispatch = useDispatch();

    function handleIncreaseQuantity() {
        dispatch(updateProductQuantity({barcode: barcode, quantity: quantity + 1}));
    }

    function handleDecreaseQuantity() {
        // Verify if the quantity don't go lower or equal than 1 and delete the product if it's the case
        if (quantity - 1 <= -1) {
            if (window.confirm("Voulez vous définitivement supprimer ce produit ?")) {
                dispatch(deleteProduct({barcode}));
            }
        } else {
            dispatch(updateProductQuantity({barcode: barcode, quantity: quantity - 1}));
        }
    }

    const {
        nutriscore_grade,
        nova_group,
        ecoscore_grade,
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
        serving_size = "?"
    } = productData;


    const validScoresGrades = ["a", "b", "c", "d", "e"]
    const validNovaGroups = [1, 2, 3, 4]

    let nutriscore = nutriscore_grade?.toLowerCase()
    nutriscore = validScoresGrades.includes(nutriscore) ? nutriscore : "unknown"
    let ecoscore = ecoscore_grade?.toLowerCase()
    ecoscore = validScoresGrades.includes(ecoscore) ? ecoscore : "unknown"
    let nova = validNovaGroups.includes(nova_group) ? nova_group : "unknown"


    return <div className="product-content">
        <div className="product-content__attributes">
            <div className="product-content__attribute-box"><img className="product-content__attribute"
                                                                 src={`/static/images/nutriscore-${nutriscore}.svg`}
                                                                 alt=""/>
            </div>


            <div className="product-content__attribute-box"><img className="product-content__attribute"
                                                                 src={`/static/images/ecoscore-${ecoscore}.svg`}
                                                                 alt=""/></div>
            <div className="product-content__attribute-box"><img className="product-content__attribute"
                                                                 src={`/static/images/nova-group-${nova}.svg`}
                                                                 alt=""/>
            </div>


        </div>
        <div className="product-content__quantity-controls">
            <ProductQuantityControls direction="horizontal" onIncreaseQuantity={handleIncreaseQuantity}
                                     onDecreaseQuantity={handleDecreaseQuantity} quantity={quantity}/>
        </div>

        <ProductFieldsCategory name="Ingrédients">
            <ProductTagsField fieldName="Additifs" tags={additives_tags}/>
            <ProductTagsField fieldName="Analyse des ingrédients" tags={ingredients_analysis_tags}/>
            <ProductTagsField fieldName="Substances ou produits provoquant des allergies ou intolérances"
                              tags={allergens_tags}/>
            <ProductTagsField fieldName="Traces éventuelles" tags={traces_tags}/>
            <ProductTagsField fieldName="Ingrédients" tags={ingredients_tags}/>
        </ProductFieldsCategory>
        <ProductFieldsCategory name="Nutrition">
            <ProductNutritionTableField fieldName="Informations nutritionnelles" nutriments={nutriments}
                                        nutrientLevels={nutrient_levels}
                                        servingSize={serving_size}/>
        </ProductFieldsCategory>
        <ProductFieldsCategory name="Caractéristiques">
            <ProductTagsField fieldName="Labels" tags={labels_tags}/>
            <ProductTagsField fieldName="Origines des ingrédients" tags={origins_tags}/>
            <ProductTagsField fieldName="Pays de vente" tags={countries_tags}/>
            <ProductTagsField fieldName="Catégories" tags={categories_tags}/>
        </ProductFieldsCategory>


    </div>;

}

ProductContent.propTypes = {
    productData: propTypes.object.isRequired,
    quantity: propTypes.number.isRequired,
    barcode: propTypes.string.isRequired
};
