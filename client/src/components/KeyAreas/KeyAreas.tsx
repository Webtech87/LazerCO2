import './KeyAreas.css'
import {useTranslation} from "react-i18next";


const KeyAreas = () => {
    const {t} = useTranslation();
    return (
        <div className='page-container'>
            <div className='keys-container'>
                <section className='key-areas'>
                    <div className='title'>
                        <h1>{t("key_areas.title")}</h1>
                    </div>
                    <div className='content'>
                        <div className='img-container'>
                            <div className='images'>
                                <img src='/laser-treatment.jpg' alt="laserImg"/>
                                <img src='/laser-treatment.jpg' alt="laserImg"/>
                            </div>
                        </div>
                        <div className='info-text'>
                            <h1>{t("key_areas.subtitle")}</h1>
                            <span><strong>{t("key_areas.lt_title")}:</strong></span>
                            <ul>
                                <li>{t("key_areas.lt.0")}</li>
                                <li>{t("key_areas.lt.1")}</li>
                                <li>{t("key_areas.lt.2")}</li>
                                <li>{t("key_areas.lt.3")}</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default KeyAreas
