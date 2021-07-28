import propTypes from "prop-types";
import {countBy, entries, flow, head, last, maxBy, partialRight} from "lodash";
import Quagga from "quagga";
import React, {useEffect, useState} from "react";

import {ReactComponent as CloseIcon} from "./../../../assets/icons/close.svg";
import {ReactComponent as FlashIcon} from "./../../../assets/icons/flash.svg";

import "./Scanner.scss";

export default function Scanner({onDetected, onClose}) {
    const [isLightOn, setIsLightOn] = useState(false);
    const [scannedBarcodes, setScannedBarcodes] = useState([])


    async function changeFlashlightState(state) {
        try {

            const track = Quagga.CameraAccess.getActiveTrack();

            if (!track) return;
            if (!track.getCapabilities().torch) return;


            return await track.applyConstraints({advanced: [{torch: state}]}).catch((error) => {
                    return error;
                }
            );
        } catch (e) {

        }
    }


    useEffect(() => {
        Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: document.querySelector(".scanner__viewport"),
                },
                constraints: {
                    facingMode: "environment",
                },
                decoder: {
                    readers: ["ean_reader", "ean_8_reader"],
                },
                locate: true,
                locator: {
                    halfSample: true,
                    patchSize: "medium",
                },
            },
            (error) => {
                if (error)
                    return error;
                Quagga.start();
            });

        Quagga.onDetected((result) => {
                // Store multiple scan results of the barcode to find the most probable
                setScannedBarcodes(scannedBarcodes => {
                        return [...scannedBarcodes, result.codeResult.code]
                    }
                )
            }
        );

        return () => {
            Quagga.stop();
        };
    }, [onDetected]);

    // Wait for 7 detection of the barcode to find the most probable barcode code
    useEffect(() => {
        if (scannedBarcodes.length >= 12) {

            const mostProbableBarcode = flow(
                countBy,
                entries,
                partialRight(maxBy, last),
                head)(scannedBarcodes)

            onDetected(mostProbableBarcode)
        }
    }, [scannedBarcodes, onDetected])


    useEffect(() => {
        (async () => {
            await changeFlashlightState(isLightOn);
        })();
    }, [isLightOn]);


    return (
        <div className="scanner">
            <div className="scanner__viewport">
                <div className="scanner__buttons">
                    {!isLightOn &&
                    <button className="scanner__flash-button" onClick={() => setIsLightOn((isLightOn) => !isLightOn)}>
                        <FlashIcon/>
                    </button>}
                    <button className="scanner__close-button" onClick={() => onClose()}>
                        <CloseIcon/>
                    </button>
                </div>

            </div>
        </div>
    );
}

Scanner.propTypes = {
    onDetected: propTypes.func.isRequired,
    onClose: propTypes.func.isRequired
};
