import propTypes from "prop-types";

import Quagga from "quagga";
import React, {useEffect, useState} from "react";

import {ReactComponent as CloseIcon} from "./../../../assets/icons/close.svg";
import {ReactComponent as FlashIcon} from "./../../../assets/icons/flash.svg";

import "./Scanner.scss";

export default function Scanner({onDetected, onClose}) {
    const [isLightOn, setIsLightOn] = useState(false);

    async function changeFlashlightState(state) {
        const track = Quagga.CameraAccess.getActiveTrack();

        if (!track) return;
        if (!track.getCapabilities().torch) return;


        return await track.applyConstraints({advanced: [{torch: state}]}).catch((error) => {
                return error;
            }
        );
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
                    readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader"],
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

        Quagga.onDetected((result) => onDetected(result));

        return () => {
            Quagga.stop();
        };
    }, [onDetected]);


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
