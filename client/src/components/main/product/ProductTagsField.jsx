import {take} from "lodash";
import propTypes from "prop-types";
import React, {useState} from "react";
import TagInfosModal from "../TagInfosModal";
import {ReactComponent as InformationIcon} from "./../../../assets/icons/information.svg";
import "./ProductTagsField.scss";

function ProductTagsFieldList({tags, onMoreInfosButtonClick}) {

    const [tagsLimit, setTagsLimit] = useState(8);

    const isShowMoreButtonActive = tags.length > tagsLimit && tags.length > 8;

    return <ul className="product-tags-field__list">
        {take(tags, tagsLimit).map((tag) => {
            const isMoreInfosButtonActive = Object.keys(tag).length > 2;

            return <li className="product-tags-field__list-item" key={tag.name}>{tag.name}
                {isMoreInfosButtonActive && <button
                    className="product-tags-field__more-infos-button"
                    onClick={() => onMoreInfosButtonClick(tag)}>
                    <InformationIcon/>
                </button>}
            </li>;
        })}
        {isShowMoreButtonActive && <li className="product-tags-field__list-show-more">
            <button onClick={() => setTagsLimit(tags.length)}>Afficher plus</button>
        </li>}
    </ul>;
}

ProductTagsFieldList.propTypes = {
    tags: propTypes.array,
    onMoreInfosButtonClick: propTypes.func.isRequired,
};

export default function ProductTagsField({fieldName, tags = [], isShownWhenEmpty = true}) {
    const [isTagInfosModalOpen, setIsTagInfosModalOpen] = useState(false);
    const [tagInfos, setTagInfos] = useState({});

    function handleMoreInfosButtonClick(tag) {
        setTagInfos({categoryName: fieldName, ...tag});
        setIsTagInfosModalOpen(true);
    }

    if (tags.length === 0 && !isShownWhenEmpty)
        return null;

    return <div className="product-tags-field">
        <p className="product-tags-field__name">{fieldName}</p>
        {tags.length === 0 ?
            <p className="product-tags-field__no-tags">Vide ou non renseigné</p>
            :
            <ProductTagsFieldList tags={tags} onMoreInfosButtonClick={handleMoreInfosButtonClick}/>
        }
        {isTagInfosModalOpen &&
        <TagInfosModal onClose={() => setIsTagInfosModalOpen(false)} infos={tagInfos}/>}
    </div>;
}

ProductTagsField.propTypes = {
    fieldName: propTypes.string.isRequired,
    tags: propTypes.array,
    isShownWhenEmpty: propTypes.bool
};
