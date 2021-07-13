import {take} from "lodash";
import propTypes from "prop-types";
import React, {useState} from "react";
import "./ProductTagsField.scss";
import TagInfosModal from "../TagInfosModal";


export default function ProductTagsField({fieldName, tags = []}) {

    const [tagsLimit, setTagsLimit] = useState(8);
    const [isTagInfosModalOpen, setIsTagInfosModalOpen] = useState(false)
    const [wikidataQID, setWikidataQID] = useState(null)

    const isShowMoreButtonActive = tags.length > tagsLimit && tags.length > 8;

    return <div className="product-tags-field">
        <h4 className="product-tags-field__name">{fieldName}</h4>
        {tags.length === 0 ?
            <p className="product-tags-field__no-tags">Vide ou non renseigné</p>
            :
            <ul className="product-tags-field__list">
                {take(tags, tagsLimit).map((tag) => {
                    return <li className="product-tags-field__list-item" key={tag.name}>{tag.name}
                        {tag.wikidata && <button onClick={() => {
                            setWikidataQID(tag.wikidata)
                            setIsTagInfosModalOpen(true)
                        }}/>}
                    </li>;
                })}
                {isShowMoreButtonActive && <li className="product-tags-field__list-show-more">
                    <button onClick={() => setTagsLimit(tags.length)}>Afficher plus</button>
                </li>}
            </ul>
        }
        {isTagInfosModalOpen &&
        <TagInfosModal onClose={() => setIsTagInfosModalOpen(false)} wikidataQID={wikidataQID}/>}
    </div>;
}

ProductTagsField.propTypes = {
    fieldName: propTypes.string.isRequired,
    tags: propTypes.array,
};
