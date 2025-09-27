import { useState } from "react";
import { useEffect } from "react";

export default function InstagramEmbed() {

  const [consent, setConsent] = useState(false)

  useEffect(() => {
    const savedConsent = localStorage.getItem("instagram-consent");
    if (savedConsent === "true") {
      setConsent(true);
    }
  }, []);

  useEffect(() => {
    if(consent){
      const processEmbeds = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();

          setTimeout(() => {
            const iframe = document.querySelector(
              '#instagram-embed-0'
            );
            if (iframe) {
              iframe.setAttribute("title", "Instagram Post von @gudrun.hacklstoll");
            }
          }, 500);
        }
      };

      if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = processEmbeds;
        document.body.appendChild(script);
      } else {
        processEmbeds();
      }
    }
  }, [consent]);

  const handleConsent = () => {
    setConsent(true);
    localStorage.setItem("instagram-consent", "true");
  };


  if(!consent){
      return(
        <div className="instagram-consent">
            <div className="consent">
              <p>Um diesen Instagram-Post anzuzeigen, müssen Daten an Instagram (Meta) übertragen werden.</p>
              <button onClick={handleConsent}>Post laden</button>
            </div>

            <div className="head">
              <div className="pp placeholder"></div>
              <div className="username placeholder"></div>
              <div className="btn placeholder"></div>
            </div>
            <div className="img placeholder"></div>

            <div className="foot">
              <div className="more placeholder"></div>
              <hr/>
              <div className="icons">
                <div className="icon placeholder"></div>
                <div className="icon placeholder"></div>
                <div className="icon placeholder"></div>
                <div className="icon placeholder"></div>
              </div>
              <div className="likes placeholder"></div>
              <hr/>
            </div>
        </div>
    )
  }

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink="https://www.instagram.com/p/DMiGj_dN6Ak/?utm_source=ig_embed&amp;utm_campaign=loading"
      data-instgrm-version="14"
      style={{
        maxWidth: "540px",
        minWidth: "326px",
      }}
    ></blockquote>
  );
}
