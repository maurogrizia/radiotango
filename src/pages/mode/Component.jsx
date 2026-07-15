import {    useState,
            useRef,
            useEffect,
            useContext }    from 'react';

import      Form            from 'react-bootstrap/Form';
import      ToggleSwitch    from 'components/toggle-switch/Component';
//import      ContentContext  from 'context/content/Context';
import      LanguageContext from 'context/language/Context';
import      * as dictionary from './lang/index.js';

import './styles.css';

let lang = 'ES';
let text = dictionary[lang];

const Component = () => {
    const ref = useRef(null);
    const { language } = useContext(LanguageContext);
    const [checkedFull, setCheckedFull] = useState(false);

    //const { showCanvas, changeShowCanvas } = useContext(ContentContext);

    lang = language;
    text = dictionary[lang];

    const toggleFullscreen = () => {
        const elem = document.documentElement;

        if (checkedFull) {
            if (document.exitFullscreen) {
                // Catch error when entering with F11 and exiting with button
                document.exitFullscreen()
                .catch((e) => {
                    console.error(e);
                    setCheckedFull(true);
                    ref.current.checked = true;
                });
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        }
        ref.current.checked = !checkedFull;
        setCheckedFull(checkedFull => !checkedFull);
    };
    /*const toggleAnimation = () => {
        changeShowCanvas(!showCanvas);
    };*/


    useEffect( () => {
        const f = (e) => {
            const isFullscreen = window.fullScreen;
    
            if (e.key === 'F11' && ref && ref.current) {
                ref.current.checked = isFullscreen;
                setCheckedFull(isFullscreen);
            }
        };

        document.addEventListener('keyup', f);

        return () => {document.removeEventListener('keyup', f)};
    }, []);
    
   /*
   <Form.Check
        type="switch"
        label="Background animation"
        onChange={toggleAnimation}
    />
    */

    return (
        <>
        <Form
            id="f-mode"
        >
            <ToggleSwitch
                ref={ref}
                label={text['lbl-1']}
                onChange={toggleFullscreen}
            />
            
        </Form>
        </>
    );
};

const data = {
    title: {
        ES: "Modo",
        EN: "Mode"
    },
    href: 'mode',
    body: <Component/>
};

export default data;