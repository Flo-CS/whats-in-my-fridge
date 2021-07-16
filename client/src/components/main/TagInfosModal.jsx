import propTypes from "prop-types";
import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import {getWikipediaPageDataByWikidataQID} from "../../helpers/wikipediaAPI";
import ThreeDotLoading from "../ThreeDotLoading";
import ProductTextField from "./product/ProductTextField";

import "./TagInfosModal.scss";


export default function TagInfosModal({tagInfos, onClose}) {
    const [wikipediaData, setWikipediaData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    Modal.setAppElement('body');


    useEffect(() => {
        (async () => {
            const data = await getWikipediaPageDataByWikidataQID(tagInfos.wikidataQID);
            setWikipediaData(data);
            setIsLoading(false);
        })();
    }, [tagInfos.wikidataQID]);

    const {description, extract, pageid} = wikipediaData || {};

    return <Modal
        isOpen={true}
        shouldCloseOnOverlayClick
        onRequestClose={onClose}
        className="tag-infos-modal"
        overlayClassName="tag-infos-modal__overlay">
        {isLoading ?
            <ThreeDotLoading/> :
            <>
                <h1 className="tag-infos-modal__title">{tagInfos.categoryName} : {tagInfos.name} {description && `(${description})`}</h1>
                <ProductTextField title="Wikipedia" text={extract}
                                  seeMoreUrl={`https://fr.wikipedia.org/?curid=${pageid}`}/>
                <ProductTextField title="Description" text={tagInfos.description}/>
            </>
        }
        <button onClick={() => onClose()} className="tag-infos-modal__close-button">Fermer</button>

    </Modal>;
}

TagInfosModal.propTypes = {
    tagInfos: propTypes.object.isRequired,
    onClose: propTypes.func.isRequired
};
