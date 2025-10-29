
import { useAppContext } from '../context/AppContext';
import { translations } from '../constants';
import { Language } from '../types';

export const useTranslation = () => {
  const { language, setLanguage, t } = useAppContext();

  return {
    t,
    language,
    setLanguage,
    // Direct access to current language's translations object
    translations: translations[language]
  };
};
