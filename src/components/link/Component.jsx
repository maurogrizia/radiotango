import { useContext }   from "react";
import { useNavigate }  from "react-router-dom";

import ContentContext   from "context/content/Context";
import LanguageContext  from "context/language/Context";

import './styles.css';

const RTLink = (props) => {
    const navigate = useNavigate();
    const { language } = useContext(LanguageContext);
    const { changePlayer} = useContext(ContentContext);
    
    const followLink = (e) => {
        const followLinkFuncs = {
            song: ({idx}) => {
                const song = contentRight.playlist[idx];
  
                changePlayer(song);
            },
            article: ({cl, href}) => {
                navigate(`${language}/${cl}/${href}`);
            }
        };
        const target = e.currentTarget;
        const dataset = target.dataset;
    
        if (followLinkFuncs[dataset.type]) {
            followLinkFuncs[dataset.type]({...dataset});
        }
    };
    const handleClick = (e) => {
        followLink(e);

        const iconAbs = document.getElementById('icon-abs');

        if (props.type === 'song') {
            iconAbs.classList.add('show');
            setTimeout(() => {
                iconAbs.classList.remove('show');
            }, 2500);
        }
    }

    return (
        <rt-link
            onClick={handleClick}
            data-idx={props.data.idx}
            data-href={props.data.href}
            data-cl={props.cl}
            data-type={props.type}
        >
            {props.children}
        </rt-link>
    );
}

export default RTLink;