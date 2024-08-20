import {    useContext }        from 'react';

import      ButtonGroup         from 'react-bootstrap/ButtonGroup';
import      ToggleButton        from 'react-bootstrap/ToggleButton';
import    	LanguageContext   	from 'context/language/Context';
import      languages           from 'context/language/languages';

import './styles.css';

const Component = () => {
    const { language,
            changeLanguage } = useContext(LanguageContext);

    return  (
        <ButtonGroup className="bg-language">
            {Object.values(languages).map((lang, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="outline-light"
                    name="radio"
                    value={lang.name}
                    checked={language === lang.value}
                    onChange={(e) => changeLanguage(e.currentTarget.value)}
                >
                    {lang.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    );
};

export default Component;