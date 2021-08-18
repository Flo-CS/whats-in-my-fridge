import React from 'react';
import "./ProductPageFooter.scss"
import dayjs from "dayjs";
import PropTypes from "prop-types"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

ProductPageFooter.propTypes = {
    barcode: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
    modificationDate: PropTypes.string.isRequired
};


function ProductPageFooter({dateAdded, modificationDate, barcode}) {

    const openFoodFactsLink = `https://fr.openfoodfacts.org/product/${barcode}`;

    return (
        <div className="product-page-footer">
            <p className="product-page-footer__text">Quantité modifiée il y a
                {" "}<strong
                    className="product-page-footer__text-strong">{dayjs(modificationDate).fromNow(true)}</strong>
            </p>
            <p className="product-page-footer__text">Ajouté pour la première fois il y a
                {" "}<strong className="product-page-footer__text-strong">{dayjs(dateAdded).fromNow(true)}</strong>
            </p>
            <a className="product-page-footer__link" href={openFoodFactsLink} target="_blank" rel="noopener noreferrer">
                Voir/compléter sur OpenFoodFacts
            </a>
        </div>
    );
}

export default ProductPageFooter;