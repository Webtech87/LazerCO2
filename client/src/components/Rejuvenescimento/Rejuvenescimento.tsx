import './Rejuvenescimento.css'
import {useTranslation} from "react-i18next";

const Rejuvenescimento = () => {
    const {t} = useTranslation();
    return (
        <div className='page-container'>
            <div className='rejuv-container'>
                <section className='rejuvenescimento'>
                    <div className='content'>
                        <div className='info-text'>
                            <h1>{t("gr.title")}</h1>
                            <span><strong>{t("gr.subtitle")}:</strong></span>
                            <ul>
                                <li>{t("gr.lt.0")}</li>
                                <li>{t("gr.lt.1")}</li>
                                <li>{t("gr.lt.2")}</li>
                                <li>{t("gr.lt.3")}</li>
                            </ul>
                        </div>
                        <div className='img-container'>
                            <div className='images'>
                                <img src='/laser-treatment.jpg' alt="laserImg"/>
                                <img src='/laser-treatment.jpg' alt="laserImg"/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Rejuvenescimento
