import classNames from "classnames";
import propTypes from "prop-types";
import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {deleteProduct, updateProductQuantity} from "../../features/productSlice";
import {cleanScoreField, truncateString} from "../../helpers/miscellaneous";

import "./ProductCard.scss";
import ProductQuantityControls from "./ProductQuantityControls";

export default function ProductCard({barcode, quantity, productData}) {

    const history = useHistory();
    const dispatch = useDispatch();
    const productCardRef = useRef(null);

    function handleIncreaseQuantity() {
        // run this function from an event handler or an effect to execute scroll
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

    function handleCardClick() {
        history.push(`/products/${barcode}`);
    }


    const productCardClass = classNames("product-card", {
        "product-card--disabled": quantity <= 0,
    });
    const {
        image_small_url,
        brands_tags = [],
        product_name = "Nom inconnu",
        nutriscore_grade,
        ecoscore_grade,
        nova_group
    } = productData;

    const nutriscore = cleanScoreField(nutriscore_grade, true);
    const ecoscore = cleanScoreField(ecoscore_grade, true);
    const nova = cleanScoreField(nova_group);

    return (
        <div className={productCardClass} ref={productCardRef}>
            <div className="product-card__content" onClick={handleCardClick}
                 onKeyDown={handleCardClick} role="button" tabIndex="0"> {/*role is mandatory to respect a11y*/}
                <div className="product-card__header">
                    <p className="product-card__name">
                        <b className="product-card__name--bold">{truncateString(product_name, 30)}</b><br/>{brands_tags.map(tag => tag.name).join(", ")} - <span
                        className="product-card__name--soft">{barcode}</span>
                    </p>
                </div>
                <div className="product-card__body">
                    <img
                        className="product-card__image"

                        alt="Product"
                        src={image_small_url}
                    />

                    {nutriscore !== "unknown" && <img className="product-card__attribute-image"
                                                      src={`/static/images/nutriscore-${nutriscore}.svg`}
                                                      alt=""/>}
                    {ecoscore !== "unknown" && <img className="product-card__attribute-image"
                                                    src={`/static/images/ecoscore-${ecoscore}.svg`}
                                                    alt=""/>}
                    {nova !== "unknown" && <img className="product-card__attribute-image"
                                                src={`/static/images/nova-group-${nova}.svg`}
                                                alt=""/>}

                </div>

            </div>
            <ProductQuantityControls quantity={quantity} direction="vertical"
                                     onDecreaseQuantity={handleDecreaseQuantity}
                                     onIncreaseQuantity={handleIncreaseQuantity}/>


        </div>
    );
}

ProductCard.propTypes = {
    barcode: propTypes.string.isRequired,
    quantity: propTypes.number.isRequired,
    productData: propTypes.object.isRequired
};


