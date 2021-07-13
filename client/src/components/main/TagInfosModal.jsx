import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import propTypes from "prop-types"
import {getWikipediaPageDataByWikidataQID} from "../../helpers/wikipediaAPI";


export default function TagInfosModal({wikidataQID, onClose}) {
    const [wikipediaData, setWikipediaData] = useState(null)

    Modal.setAppElement('body');


    useEffect(() => {
        (async () => {
            const data = await getWikipediaPageDataByWikidataQID(wikidataQID)
            setWikipediaData(data)
        })()
    }, [wikidataQID]);

    return (
        <Modal
            isOpen={true}
            shouldCloseOnOverlayClick
            onRequestClose={onClose}>
            <p>{wikipediaData?.extract}</p>
        </Modal>
    );
}

TagInfosModal.propTypes = {
    wikidataQID: propTypes.string,
    onClose: propTypes.func.isRequired
};