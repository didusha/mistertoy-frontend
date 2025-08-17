import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        resources: {
            en: {
                translation: {
                    home: 'Home',
                    products: 'Toys',
                    dashboard: 'Dashboard',
                    about: 'About',
                    footer: 'Coffeerights Adi Bar 2025',
                    online: 'Online',
                    disconnected: 'Disconnected',
                },
            },
            es: {
                translation: {
                    home: 'Inicio',
                    products: 'Juguetes',
                    dashboard: 'Tablero',
                    about: 'Acerca de',
                    footer: 'Coffeerights Adi Bar 2025',
                    online: 'En línea',
                    disconnected: 'Desconectado'
                },
            },
            heb: {
                translation: {
                    home: 'בית',
                    products: 'צעצועים',
                    dashboard: 'דשבורד',
                    about: 'עלינו',
                    footer: 'כל הזכויות שמורות לעדי בר @2025',
                    disconnected: 'התנתק'
                },
            },
        },
        fallbackLng: 'heb',
        interpolation: {
            escapeValue: false, // React already does escaping
        },
    })

export default i18n
