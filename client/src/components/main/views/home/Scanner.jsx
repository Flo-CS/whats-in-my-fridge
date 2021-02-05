import React, {useEffect} from "react";

import quagga from "quagga";
import propTypes from "prop-types";

import "./Scanner.scss";

export default function Scanner({onDetected}) {
    useEffect(() => {
        quagga.init(
            {
                inputStream: {
                    type: "LiveStream",
                    target: document.querySelector(".scanner__viewport"),
                    constraints: {
                        facingMode: "environment",
                    },
                },
                locator: {
                    patchSize: "large",
                    halfSample: true,
                },
                locate: true,
                decoder: {
                    readers: ["ean_reader"],
                },
            },
            function (error) {
                if (error) {
                    return console.log(error);
                }
                quagga.start();
                return () => {
                    quagga.stop();
                };
            }
        );
        quagga.onDetected(onDetected);
    }, [onDetected]);

    return (
        <div className="scanner">
            <div className="scanner__viewport"></div>
        </div>
    );
}

Scanner.propTypes = {
    onDetected: propTypes.func.isRequired,
};
