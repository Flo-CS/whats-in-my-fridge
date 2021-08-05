import classNames from "classnames";
import PropTypes from "prop-types";
import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {ReactComponent as MinusIcon} from "../../assets/icons/minus.svg";
import {ReactComponent as PlusIcon} from "../../assets/icons/plus.svg";
import {ReactComponent as TrashIcon} from "../../assets/icons/trash.svg";
import {deleteProduct, updateProductQuantity} from "../../features/productSlice";
import {LETTER_SCORES_COLORS, NOVA_COLORS} from "../../helpers/constants";
import {truncateString} from "../../helpers/miscellaneous";

import "./ProductCard.scss";

export default function ProductCard({barcode, quantity, imageUrl, brands, name, nutriscore, ecoscore, nova}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const productCardRef = useRef(null);
    const [isProductImageRotated, setIsProductImageRotated] = useState(false);


    function handleIncreaseQuantity() {
        // run this function from an event handler or an effect to execute scroll
        dispatch(updateProductQuantity({barcode: barcode, quantity: quantity + 1}));
    }

    function handleDecreaseQuantity() {
        dispatch(updateProductQuantity({barcode: barcode, quantity: quantity - 1}));
    }

    function handleDeleteProduct() {
        if (window.confirm("Voulez vous définitivement supprimer ce produit ?")) {
            dispatch(deleteProduct({barcode}));
        }
    }

    function handleCardClick() {
        history.push(`/products/${barcode}`);
    }

    function handleImageLoad(e) {
        const {naturalWidth, naturalHeight} = e.target;

        if (naturalWidth > naturalHeight) {
            setIsProductImageRotated(true);
        }
    }

    const productCardClass = classNames("product-card", {
        "product-card--disabled": quantity <= 0,
    });

    const productImageClass = classNames("product-card__image", {"product-card__image--rotated": isProductImageRotated});

    return (
        <div className={productCardClass} ref={productCardRef}>
            <div className="product-card__image-container">
                <img className={productImageClass}
                     alt=""
                     onLoad={handleImageLoad}
                     src={imageUrl}
                />
            </div>
            <div className="product-card__content" onClick={handleCardClick} onKeyDown={handleCardClick} role="button"
                 tabIndex="0"> {/*role is mandatory to respect a11y*/}
                <p className="product-card__name">
                    {truncateString(name, 30)}
                </p>
                <p className="product-card__brands">
                    {truncateString(brands, 40)}
                </p>
                <div className="product-card__attributes">
                    <p className="product-card__attribute">
                        <span className="product-card__attribute-label">Nutriscore</span>
                        <span className="product-card__attribute-value"
                              style={{color: LETTER_SCORES_COLORS[nutriscore]}}>
                            {nutriscore}
                        </span>
                    </p>
                    <p className="product-card__attribute">
                        <span className="product-card__attribute-label">Ecoscore</span>
                        <span className="product-card__attribute-value"
                              style={{color: LETTER_SCORES_COLORS[ecoscore]}}>
                            {ecoscore}
                        </span>
                    </p>
                    <p className="product-card__attribute">
                        <span className="product-card__attribute-label">Nova</span>
                        <span className="product-card__attribute-value"
                              style={{color: NOVA_COLORS[nova]}}>
                            {nova}
                        </span>
                    </p>
                </div>
            </div>
            <div className="product-card__controls">
                <button className="product-card__button" onClick={handleIncreaseQuantity}>
                    <PlusIcon className="product-card__button-icon"/>
                </button>
                <p className="product-card__quantity">{quantity}</p>
                {quantity > 0 ?
                    <button className="product-card__button" onClick={handleDecreaseQuantity}>
                        <MinusIcon className="product-card__button-icon"/>
                    </button>
                    :
                    <button className="product-card__button product-card__button--warning"
                            onClick={handleDeleteProduct}>
                        <TrashIcon className="product-card__button-icon"/>
                    </button>
                }
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    barcode: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    brands: PropTypes.string,
    name: PropTypes.string,
    nutriscore: PropTypes.string,
    ecoscore: PropTypes.string,
    nova: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(["?"])])
};

