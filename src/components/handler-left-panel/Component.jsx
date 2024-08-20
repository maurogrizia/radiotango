import {    useContext, 
            useEffect }         from 'react';
import {    useParams,
            useLocation,
            useNavigate }       from 'react-router-dom';
import      ContentContext      from 'context/content/Context';
import      LanguageContext     from 'context/language/Context';

const Component = (props) => {
    const { contentLeft, 
            changeContentLeft,
            changeIsClosedLeft, 
            changeIsError,
            isError } = useContext(ContentContext);
    const { language,
            changeLanguage } = useContext(LanguageContext);

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const lang = params.lang.toLowerCase();
    const cl = params.cl;

    useEffect(() => {
        if (isError) {
            navigate(`/${lang}/error`);
            changeIsError(false);
        }
    }, []);

    useEffect(() => {
        changeIsClosedLeft(false);
    }, [location]);

    useEffect(() => {
        if (lang !== language.toLowerCase()) {
            changeLanguage(lang);
        }
    }, [language]);

    useEffect(() => {
        if (    cl.toLowerCase() 
            &&  contentLeft.href 
            &&  cl !== contentLeft.href.toLowerCase()) {
            changeContentLeft(cl);
        }
    }, [cl]);

    return null;
}

export default Component;