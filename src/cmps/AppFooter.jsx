import { useTranslation } from "react-i18next";
import i18n from "../services/i18";

export function AppFooter() {

    const { t, i18n } = useTranslation()

    function onChangeLanguage(ev){
        const value = ev.target.value
        i18n.changeLanguage(value)
    }


    return (
        <footer className="app-footer">
            <p>{t('footer')}</p>

            <select name="" id="" value={i18n.language} className="language" onChange={onChangeLanguage}>
                <option value="en">English</option>
                <option value="heb">Hebrew</option>
                <option value="es">Spanish</option>
            </select>
        </footer>
    )
}
