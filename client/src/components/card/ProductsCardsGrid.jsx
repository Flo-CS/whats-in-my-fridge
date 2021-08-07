import {capitalize} from "lodash";
import propTypes from "prop-types";
import React from "react";
import {formatScore} from "../../helpers/miscellaneous";

import ProductCard from "./ProductCard";

import "./ProductsCardsGrid.scss";

export default function ProductsCardsGrid({products}) {


    return (
        <div className="products-cards-grid__wrapper">
            <div className="products-cards-grid">
                {products.map((product) => {
                    const {
                        image_small_url,
                        brands_tags = [],
                        product_name = "Nom inconnu",
                        nutriscore_grade,
                        ecoscore_grade,
                        nova_group
                    } = product.data;

                    const nutriscore = formatScore(nutriscore_grade, true);
                    const ecoscore = formatScore(ecoscore_grade, true);
                    const nova = formatScore(nova_group);

                    const brands = capitalize(brands_tags.map(tag => tag.name).join(", "));

                    const name = capitalize(product_name);

                    return (
                        <ProductCard
                            key={product.barcode}
                            barcode={product.barcode}
                            quantity={product.quantity}
                            imageUrl={image_small_url}
                            brands={brands}
                            name={name}
                            nutriscore={nutriscore}
                            ecoscore={ecoscore}
                            nova={nova}
                        />
                    );
                })}
            </div>
        </div>
    );
}

ProductsCardsGrid.propTypes = {
    products: propTypes.array.isRequired,
};
