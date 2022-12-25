import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import twitterLogo from "../assets/twitter-logo.png";

const FooterBadge = () => {
    return (
        <>
            <div className="badge-container grow">
            <a
            href="https://buildspace.so/builds/ai-writer"
            target="_blank"
            rel="noreferrer"
            >
            <div className="badge">
                <Image src={buildspaceLogo} alt="buildspace logo" />
                <p>build with buildspace</p>
            </div>
            </a>
        </div>
        <div className="badge-container-right grow">
            <a href="https://twitter.com/haomaaax" target="_blank" rel="noreferrer">
            <div className="badge">
                <Image src={twitterLogo} alt="twitter logo" />
                <p>built by maaax</p>
            </div>
            </a>
        </div>
        </>
    )
}

export default FooterBadge