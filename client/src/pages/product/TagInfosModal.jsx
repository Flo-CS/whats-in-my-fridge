import propTypes from "prop-types";
import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import ThreeDotLoading from "../../components/loading/ThreeDotLoading";
import {getWikipediaPageDataByWikidataQID} from "../../helpers/wikipediaAPI";
import ProductTagsField from "./ProductTagsField";
import ProductTextField from "./ProductTextField";

import "./TagInfosModal.scss";


export default function TagInfosModal({infos, onClose}) {
    const [wikipediaData, setWikipediaData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    Modal.setAppElement('body');

    const {
        name,
        isInTaxonomy,
        description,
        wikidata,
        vegetarian,
        vegan,
        from_palm_oil,
        additives_classes,
        efsa_evaluation_overexposure_risk,
        efsa_evaluation_adi,
        efsa_evaluation_exposure_mean_greater_than_adi,
        efsa_evaluation_exposure_95th_greater_than_adi,
        country,
        origins,
        region,
        daily_value,
        unit,
        categoryName,
    } = infos;

    useEffect(() => {
        (async () => {
            const data = await getWikipediaPageDataByWikidataQID(wikidata);
            setWikipediaData(data);
            setIsLoading(false);
        })();
    }, [wikidata]);

    const {
        description: wikiDescription,
        extract: wikiExtract,
        pageid: wikiPageId
    } = wikipediaData || {};

    return <Modal
        isOpen={true}
        shouldCloseOnOverlayClick
        onRequestClose={onClose}
        className="tag-infos-modal"
        overlayClassName="tag-infos-modal__overlay">
        {isLoading ?
            <ThreeDotLoading/> :
            <>
                <h1 className="tag-infos-modal__title">{categoryName} : {name} {wikiDescription && `(${wikiDescription})`}</h1>
                <ProductTextField fieldName="Description" text={description}/>
                <ProductTextField fieldName="Wikipedia" text={wikiExtract}
                                  seeMoreUrl={`https://fr.wikipedia.org/?curid=${wikiPageId}`}/>
                <ProductTagsField fieldName="Fonctions" tags={additives_classes} isShownWhenEmpty={false}/>
                <ProductTextField fieldName="Risque de surexposition" text={efsa_evaluation_overexposure_risk}/>
                <ProductTagsField
                    fieldName="Catégories de la population dont 50% des gens sont susceptibles de dépasser la dose journalière admissible"
                    tags={efsa_evaluation_exposure_mean_greater_than_adi} isShownWhenEmpty={false}/>
                <ProductTagsField
                    fieldName="Catégories de la population dont 5% des gens sont susceptibles de dépasser la dose journalière admissible"
                    tags={efsa_evaluation_exposure_95th_greater_than_adi} isShownWhenEmpty={false}/>
                <ProductTextField fieldName="Végétarien" text={vegetarian}/>
                <ProductTextField fieldName="Vegan" text={vegan}/>
                <ProductTextField fieldName="Provient de l'huile de palme" text={from_palm_oil}/>
                <ProductTextField fieldName="Pays" text={country}/>
                <ProductTagsField fieldName="Origines" tags={origins} isShownWhenEmpty={false}/>
                <ProductTextField fieldName="Region" text={region}/>
                <ProductTextField fieldName="Dose journalière" text={daily_value}/>
                <ProductTextField fieldName="Unité" text={unit}/>

                <button onClick={() => onClose()} className="tag-infos-modal__close-button">Fermer</button>
            </>
        }
    </Modal>;
}

TagInfosModal.propTypes = {
    infos: propTypes.object.isRequired,
    onClose: propTypes.func.isRequired
};
