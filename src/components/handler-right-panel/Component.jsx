import {
  useContext,
  useEffect
} from 'react';
import {
  useParams,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { getWeeksArtist } from 'utils/artists';
import ContentContext from 'context/content/Context';
import LanguageContext from 'context/language/Context';

const Component = () => {
  const { weeksArtist,
    changeContentRight,
    changeIsClosedRight,
    changeWeeksArtist } = useContext(ContentContext);
  const { language,
    changeLanguage } = useContext(LanguageContext);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = params.lang.toUpperCase();
  const cl = params.cl.toLowerCase();
  const cr = params.cr;

  useEffect(() => {
    const fetchData = async () => {
      if (cr === 'star') {
        if (!weeksArtist) {
          const wa = await getWeeksArtist();

          if (wa) {
            changeWeeksArtist(wa);
            navigate(`/${lang}/artists/${wa}`);
          } else {
            navigate(`/${lang}/error`);
          }
        } else {
          navigate(`/${lang}/artists/${weeksArtist}`);
        }
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    changeIsClosedRight(false);
  }, [location]);

  useEffect(() => {
    if (lang !== language.toUpperCase()) {
      changeLanguage(lang);
    }
  }, [language]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await changeContentRight(lang, cl, cr);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate(`/${lang}/error`);
      }
    }

    fetchData();
  }, [lang, cr]);

  return null;
}

export default Component;
