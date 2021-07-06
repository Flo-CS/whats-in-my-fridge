import {take} from "lodash";
import propTypes from "prop-types";
import React, {useState} from "react";
import "./ProductTagsField.scss";

export default function ProductTagsField({fieldName, tags = []}) {

    const [tagsLimit, setTagsLimit] = useState(8);

    const isShowMoreButtonActive = tags.length > tagsLimit && tags.length > 8;


    return <div className="product-tags-field">
        <h4 className="product-tags-field__name">{fieldName}</h4>
        {tags.length === 0 ?
            <p className="product-tags-field__no-tags">Vide ou non renseigné</p>
            :
            <ul className="product-tags-field__list">
                {take(tags, tagsLimit).map((tag) => {
                    return <li className="product-tags-field__list-item"
                               key={tag.name}>
                        {tag.name}
                        <br/>
                    </li>;
                })}
                {isShowMoreButtonActive && <li className="product-tags-field__list-show-more">
                    <button onClick={() => setTagsLimit(tags.length)}>Afficher plus</button>
                </li>}
            </ul>
        }
    </div>;
}

ProductTagsField.propTypes = {
    fieldName: propTypes.string.isRequired,
    tags: propTypes.array,
};
