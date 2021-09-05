import {capitalize} from "lodash";
import propTypes from "prop-types";
import React from "react";

import ProductCard from "./ProductCard";

import "./ProductsCardsGrid.scss";

export default function ProductsCardsGrid({products}) {


    return (
        <div className="products-cards-grid__wrapper">
            <div className="products-cards-grid">
                {products.map((product) => {
                    let {
                        barcode,
                        quantity,
                        image_url,
                        brands = [],
                        name = "Nom inconnu",
                        nutriscore,
                        ecoscore,
                        nova
                    } = product;

                    const brandsText = capitalize(brands.map(tag => tag.name).join(", "));

                    return (
                        <ProductCard
                            key={barcode}
                            barcode={barcode}
                            quantity={quantity}
                            imageUrl={image_url}
                            brands={brandsText}
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
