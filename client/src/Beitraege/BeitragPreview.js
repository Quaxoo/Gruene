import { Link } from "react-router-dom";

import "./BeitragPreview.css"

const BeitragPreview = ({beitrag, ...props}) => {

    function truncateText(text, maxLength = 250) {
        if (text.length <= maxLength) return text;

        let shortened = text.slice(0, maxLength);

        const lastIndex = shortened.search(/[\s,.!?;:]+(?=[^,\s.!?;:]*$)/);

        if (lastIndex !== -1) {
            shortened = shortened.slice(0, lastIndex).trim();
        }

        return shortened.concat(" [...]");
    }

    function createPreview(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");

        const firstImg = doc.querySelector("img");
        let imgSrc = null;
        if (firstImg) {
            imgSrc = firstImg.getAttribute("src");
            firstImg.remove();
        }

        let text = doc.body.textContent || "";
        text = truncateText(text);

        return { imgSrc, text };
    }

    return ( 
        <div className='admin-beitrag-preview' {...props}>

            {beitrag.content && (() => {
                const { imgSrc} = createPreview(beitrag.content);
                return (
                     <>
                        {imgSrc && <Link className='img-link' to={"/beitrag/" + beitrag.id}> <img src={imgSrc} alt="Preview" className="preview-image" /> </Link>}
                    </>
                );
            })()}

            <div className='text'>
                {beitrag.title && <h2>{beitrag.title}</h2>}

                <p className='date'>
                    {beitrag.date &&
                        new Date(beitrag.date).toLocaleString("de-DE", {
                            day: "2-digit", 
                            month: "long", 
                            year: "numeric"
                        })
                    }   
                </p>

                {beitrag.content && (() => {
                    const { text } = createPreview(beitrag.content);
                    return (
                        <>
                            <p className="content">{text}</p>
                        </>
                    );
                })()}
            </div>

            <Link className='link' to={"/beitrag/" + beitrag.id}>WEITERLESEN</Link>
        </div>
    );
}
 
export default BeitragPreview;