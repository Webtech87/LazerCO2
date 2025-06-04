import "./Blefaroplastia.css";
import {useTranslation} from "react-i18next";

const Blefaroplastia = () => {
    const {t} = useTranslation();
    return (
        <div className="page-container">
            <main className="container">
                <section className="laser-treatment">
                    <article className="treatment-content">
                        <h2 className="main_title">{t("blf.title")}</h2>
                        <div className="treatment-text-container">
                            <h3>
                                <li className="treatment-item">{t("blf.subtitle")}</li>
                            </h3>
                            <ul className="list_container">
                                <li className="treatment-item">{t("blf.lt.0")}</li>
                                <li className="treatment-item">{t("blf.lt.1")}</li>
                                <li className="treatment-item">{t("blf.lt.2")}</li>
                                <li className="treatment-item">{t("blf.lt.3")}</li>
                            </ul>
                        </div>
                    </article>
                    <div className="treatment-image">
                        <img
                            src="/laser-treatment.jpg"
                            alt="Blefaroplastia"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Blefaroplastia;

