import {
    WhatsappShareButton,
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappIcon,
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
  } from "react-share";
  
  export default function ShareButtons({ texto }) {
    const url = typeof window !== "undefined" ? window.location.href : "";
  
    return (
      <div className="flex gap-2 mt-4">
        <WhatsappShareButton url={url} title={texto}><WhatsappIcon size={32} round /></WhatsappShareButton>
        <FacebookShareButton url={url} quote={texto}><FacebookIcon size={32} round /></FacebookShareButton>
        <TwitterShareButton url={url} title={texto}><TwitterIcon size={32} round /></TwitterShareButton>
        <EmailShareButton url={url} subject="Entrenamiento de Triatlón" body={texto}><EmailIcon size={32} round /></EmailShareButton>
      </div>
    );
  }
  