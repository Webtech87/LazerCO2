import './Footer.css'
import whatsapp from '../../assets/whasapp-logo.png'
import {useTranslation} from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    return (
    <div className='page-container'>
      <div className='footer-container'>
        <section className='footer'>
            <div className='footer-info'>
                <img className='logo' src="/logo-santiclinic.png" alt="" />
                <span>{t("ftr.slogan")}</span>
                <div className='social-media'>
                    <a href=""><img src="/instagram.png" alt="" /></a>
                    <a href=""><img src="/facebook-logo.png" alt="" /></a>
                    <a href=""><img src="/tiktok-logo.png" alt="" /></a>
                </div>
                <div className='contact-politics'>
                    <div className='contacts'>
                        <h3>{t("ftr.contact.title")}</h3>
                        <span>📞 (+351) 910 144-032</span>
                        <span>📍 Praceta Agostinho <br /> 8005-147, Faro</span>
                        <button><img src={whatsapp} alt="" />{t("ftr.contact.btn")}</button>
                    </div>
                    <div className='politics'>
                        <h3>{t("ftr.policy.title")}</h3>
                        <a href="/politica-privacidade">{t("ftr.policy.lt.0")}</a>
                        <a href="/politica-cookies">{t("ftr.policy.lt.1")}</a>
                        <a href="/termos-condicoes">{t("ftr.policy.lt.2")}</a>
                    </div>
                </div>
            </div>
            <div className='form-container'>
                <div className='form'>
                    <h2>{t("ftr.form.title")}</h2>
                    <span>{t("ftr.form.p")}</span>
                    <form action="">
                        <label htmlFor="">{t("ftr.form.flds.name")}</label>
                        <input type="text" />
                        <div className='email-phone'>
                            <div className="field">
                                <label>Email*</label>
                                <input type="email" />
                            </div>
                            <div className="field">
                                <label>{t("ftr.form.flds.phone")}*</label>
                                <input type="tel" />
                            </div>
                        </div>
                        <label htmlFor="">{t("ftr.form.flds.obj")}*</label>
                        <select name="subject" id="subject">
                            <option value="">Selecione o assunto</option>
                            <option value="lazer-co2-face">Lazer Co2 Face</option>
                            <option value="lazer-co2-pescoco">Lazer Co2 Pescoço</option>
                            <option value="blefo-superior">Blefosuperior sem corte</option>
                            <option value="blefo-inferior">Blefoinferior sem corte</option>
                        </select>
                        <label htmlFor="">{t("ftr.form.flds.msg")}*</label>
                        <textarea name="" id=""></textarea>
                        <div className='checkbox'>
                            <input type="checkbox" />
                            <span>{t("ftr.form.flds.axept")} <a href="/politica-privacidade" target="_blank" rel="noopener noreferrer">{t("ftr.policy.lt.0")}</a></span>
                        </div>
                        <button>{t("ftr.form.flds.btn")}</button>
                    </form>
                </div>
            </div>
            
        </section>
        <div className='copyright'>
            <span>© 2025 SANTICLINIC. {t("ftr.bf")}.</span>
        </div>
      </div>
    </div>
  )
}

export default Footer