import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {last} from "lodash";
import PropTypes from "prop-types";
import React from "react";

import "./ProductFooter.scss";

dayjs.extend(relativeTime);


export default function ProductFooter({presences, barcode}) {

    const lastPresence = last(presences);
    const lastPresenceDate = dayjs(lastPresence.date);

    const openFoodFactsLink = `https://world.openfoodfacts.org/product/${barcode}`;

    return <div className="product-footer">
        {
            lastPresence.value === true ?
                <p className="product-footer__text">En stock, pour la dernière fois,
                    depuis {lastPresenceDate.fromNow(true)}</p> :
                <p className="product-footer__text">Epuisé, pour la dernière fois,
                    depuis {lastPresenceDate.fromNow(true)}</p>
        }
        <a className="product-footer__link" href={openFoodFactsLink} target="_blank" rel="noopener noreferrer">
            Voir, compléter sur OpenFoodFacts
        </a>
    </div>
}

ProductFooter.propTypes = {
    presences: PropTypes.array.isRequired,
    barcode: PropTypes.string.isRequired
}