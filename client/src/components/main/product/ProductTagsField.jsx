import propTypes from "prop-types";
import React from "react";
import "./ProductTagsField.scss";

export default function ProductTagsField({fieldName, tags = []}) {

    return <div className="product-tags-field">
        <h4 className="product-tags-field__name">{fieldName}</h4>
        {tags.length === 0 ?
            <p className="product-tags-field__no-tags">Vide ou non renseigné</p>
            :
            <ul className="product-tags-field__list">
                {tags.map((tag) => {
                    return <li className="product-tags-field__list-item"
                               key={tag.name}>
                        {tag.name}
                        <br/>
                    </li>;
                })}
            </ul>
        }
    </div>;
}

ProductTagsField.propTypes = {
    fieldName: propTypes.string.isRequired,
    tags: propTypes.array,
};
