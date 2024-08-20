import {    useState }              from "react";
import {    useNavigate }           from "react-router-dom";
import {    getDefaultLanguage }    from "utils/language";

import      Context                 from "./Context";
import      languages               from "./languages";

const Provider = ({ children }) => {
    const navigate = useNavigate();
    const defaultLanguage = getDefaultLanguage();
    const [language, setLanguage] = useState(defaultLanguage);
    const provider = {
        language,
        changeLanguage: selected => {
            selected = selected.toUpperCase();
            const newLanguage = languages[selected]? selected.toUpperCase() : 'ES';
            const url = window.location.href;
            const idx = url.toLowerCase().indexOf(language.toLowerCase());
            
            if (idx > -1) {
                navigate(`${newLanguage}/${url.substring(idx + 3, url.length)}`);
            }
            setLanguage(newLanguage);
            window.localStorage.setItem('language', newLanguage);
        }
    };

    return (
        <Context.Provider value={provider}>
            {children}
        </Context.Provider>
    );
};

export default Provider;