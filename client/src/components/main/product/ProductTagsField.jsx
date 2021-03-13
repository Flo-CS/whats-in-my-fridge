import propTypes from "prop-types";
import React from "react";
import "./ProductTagsField.scss";

export default function ProductTagsField({fieldName, tags}) {

    return <div className="product-tags-field">
        <p className="product-tags-field__name">{fieldName}:</p>
        {tags ?
            tags.length === 0 ?
                <p className="product-tags-field__empty-tags">Vide</p>
                :
                <ul className="product-tags-field__bulleted-list">
                    {tags.map((tag) => {
                        return <li className="product-tags-field__bulleted-list-item"
                                   key={tag.name}>{tag.name}<br/></li>;
                    })}
                </ul>
            :
            <p className="product-tags-field__no-tags">Non renseigné</p>}
    </div>;
}

ProductTagsField.propTypes = {
    fieldName: propTypes.string.isRequired,
    tags: propTypes.array
};
