import { useContext } from "react";
import ContentContext from "context/content/Context";

import './styles.css';

const Link = (props) => {
    const {changeContentRight, changePlayer} = useContext(ContentContext);

    const followLink = (e) => {
        const followLinkFuncs = {
            song: (data) => {
                changePlayer(data);
            },
            article: (data) => {
                changeContentRight(data.href);
            }
        };
        const target = e.currentTarget;
        const dataset = target.dataset;
        const data = JSON.parse(dataset.data);

        if (followLinkFuncs[props.type]) {
            followLinkFuncs[props.type](data);
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
        <mark 
            className="special-link"
            onClick={handleClick}
            data-data={JSON.stringify(props.data)}
            data-href={props.href}
            data-type={props.type}
        >
            {props.children}
        </mark>
    );
}

export default Link;