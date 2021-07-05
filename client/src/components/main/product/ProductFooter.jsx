import React from "react"
import PropTypes from "prop-types"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import {last} from "lodash"

import "./ProductFooter.scss"

dayjs.extend(relativeTime)


export default function ProductFooter({presences}) {

    const lastPresence = last(presences)
    const lastPresenceDate = dayjs(lastPresence.date)

    return <div className="product-footer">
        {
            lastPresence.value === true ?
                <p className="product-footer__text">En stock, pour la dernière fois,
                    depuis {lastPresenceDate.fromNow(true)}</p> :
                <p className="product-footer__text">Epuisé, pour la dernière fois,
                    depuis {lastPresenceDate.fromNow(true)}</p>
        }
    </div>
}

ProductFooter.propTypes = {
    presences: PropTypes.array.isRequired
}