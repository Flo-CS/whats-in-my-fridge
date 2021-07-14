import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import propTypes from "prop-types"
import {getWikipediaPageDataByWikidataQID} from "../../helpers/wikipediaAPI";

import "./TagInfosModal.scss"
import ThreeDotLoading from "../ThreeDotLoading";

export default function TagInfosModal({tagInfos, onClose}) {
    const [wikipediaData, setWikipediaData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    Modal.setAppElement('body');


    useEffect(() => {
        (async () => {
            const data = await getWikipediaPageDataByWikidataQID(tagInfos.wikidataQID)
            setWikipediaData(data)
            setIsLoading(false)
        })()
    }, [tagInfos.wikidataQID]);

    const {description, extract, pageid} = wikipediaData || {}


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
                {wikipediaData && <>
                    <p className="tag-infos-modal__paragraph-title">Wikipedia</p>
                    <p className="tag-infos-modal__paragraph">{extract}{" "}
                        <a className="tag-infos-modal__link"
                           href={`https://fr.wikipedia.org/?curid=${pageid}`}
                           target="_blank" rel="noopener noreferrer">Voir plus</a>
                    </p></>}
            </>
        }
        <button onClick={() => onClose()} className="tag-infos-modal__close-button">Fermer</button>

    </Modal>
}

TagInfosModal.propTypes = {
    tagInfos: propTypes.object.isRequired,
    onClose: propTypes.func.isRequired
}
