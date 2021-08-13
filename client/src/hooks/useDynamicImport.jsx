import {useEffect, useState} from "react";

export default function useDynamicAssetImport(assetPath) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [asset, setAsset] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const module = await import(`./../assets/${assetPath}`);
                setAsset(module.default);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        })();
    }, [assetPath]);

    return {asset, isLoading, error};
}