import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation from './en/translation.json';

i18next.use(initReactI18next).init({
    fallbackLng: 'en',
    resources: {
        en: { translation },
    },
});
