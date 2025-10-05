import React from 'react'
import { Helmet } from "react-helmet";
import {useLocation} from "react-router-dom"

const SeoIndex = ({title, description,  pageTitle, previewImage = "/images/facebook-preview.png"}) => {

    const path = useLocation().pathname
    const url = "https://gudrun-hackl-stoll.de"

    return ( 
        <Helmet>
            {/* Basis */}
            <title>{pageTitle ? pageTitle : title}</title>
            <meta name="description" content={description}/>
            <link rel="canonical" href={url + path} />

            {/* Open Graph (Facebook, LinkedIn etc.) */}
            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={url + previewImage} />
            <meta property="og:url" content={url + path} />

            {/* Twitter Cards */}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:image" content={url + previewImage} />

            {/* Strukturierte Daten (Schema.org JSON-LD) */}
            <script type="application/ld+json">
                {`
                {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "url": "${url + path}",
                    "name": "${title}",
                    "description": "${description}",
                    "publisher": {
                    "@type": "Organization",
                    "name": "Bündnis 90 / die Grünen Ortsverband Höhenkirchen-Siegertsbrunn",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "${url}/logo512.png"
                    }
                    }
                }
                `}
            </script>
        </Helmet> 
    );
}
 
export default SeoIndex;