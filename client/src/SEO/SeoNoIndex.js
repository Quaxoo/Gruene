import React from 'react'
import { Helmet } from "react-helmet";

const SeoNoIndex = ({title}) => {
    const url = "https://gudrun-hackl-stoll.de"

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="robots" content="noindex, nofollow" />

            <meta charset="utf-8" />

            <link rel="icon" href={url + "/favicon.ico"} />
            <link rel="apple-touch-icon" href={url + "/logo192.png"} />
            <link rel="manifest" href={url + "/manifest.json"} />

            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#005437" />
        </Helmet>
    )
}
 
export default SeoNoIndex;