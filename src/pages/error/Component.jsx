import {    useContext }        from 'react';
import      LanguageContext     from 'context/language/Context';
import      * as dictionary     from './lang/index.js';

const Component = () => {
    const { language } = useContext(LanguageContext);
    const text = dictionary[language];

    return (
        <>
        <h2>Error 404</h2>
        <br/>
        <p>
            {text['msg']}
        </p>
        </>
    );
};
const data = {
    title: {
        ES: 'Error',
        EN: "Error"
    },
    href: 'error',
    body: <Component/>
};

export default data;