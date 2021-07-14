import {take} from "lodash";
import propTypes from "prop-types";
import React, {useState} from "react";
import "./ProductTagsField.scss";
import TagInfosModal from "../TagInfosModal";
import {ReactComponent as InformationIcon} from "./../../../assets/icons/information.svg";

function ProductTagsFieldList({tags, onMoreInfosButtonClick}) {

    const [tagsLimit, setTagsLimit] = useState(8);

    const isShowMoreButtonActive = tags.length > tagsLimit && tags.length > 8;

    return <ul className="product-tags-field__list">
        {take(tags, tagsLimit).map((tag) => {
            return <li className="product-tags-field__list-item" key={tag.name}>{tag.name}
                {tag.wikidata &&
                <button
                    className="product-tags-field__more-infos-button"
                    onClick={() => onMoreInfosButtonClick(tag)}>
                    <InformationIcon/>
                </button>}
            </li>;
        })}
        {isShowMoreButtonActive && <li className="product-tags-field__list-show-more">
            <button onClick={() => setTagsLimit(tags.length)}>Afficher plus</button>
        </li>}
    </ul>
}

ProductTagsFieldList.propTypes = {
    tags: propTypes.array,
    onMoreInfosButtonClick: propTypes.func.isRequired,
};

export default function ProductTagsField({fieldName, tags = []}) {


    const [isTagInfosModalOpen, setIsTagInfosModalOpen] = useState(false)
    const [tagInfos, setTagInfos] = useState({
        wikidataQID: null,
        name: null,
        categoryName: fieldName
    })

    function handleMoreInfosButtonClick({wikidata, name}) {
        setTagInfos({...tagInfos, wikidataQID: wikidata, name: name})
        setIsTagInfosModalOpen(true)
    }


    return <div className="product-tags-field">
        <h4 className="product-tags-field__name">{fieldName}</h4>
        {tags.length === 0 ?
            <p className="product-tags-field__no-tags">Vide ou non renseigné</p>
            :
            <ProductTagsFieldList tags={tags} onMoreInfosButtonClick={handleMoreInfosButtonClick}/>
        }
        {isTagInfosModalOpen &&
        <TagInfosModal onClose={() => setIsTagInfosModalOpen(false)} tagInfos={tagInfos}/>}
    </div>;
}

ProductTagsField.propTypes = {
    fieldName: propTypes.string.isRequired,
    tags: propTypes.array,
};
