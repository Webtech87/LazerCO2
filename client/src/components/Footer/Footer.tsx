import './Footer.css'
import whatsapp from '../../assets/whasapp-logo.png'
import { useTranslation } from "react-i18next";
import { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    msg: string;
    accept_terms: boolean;
}

interface FormErrors {
    [key: string]: string[];
}

const Footer = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        msg: '',
        accept_terms: false
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string>('');
    const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
        
        // Clear specific field error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: []
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');
        setSubmitSuccess(null);
        setErrors({});

        try {
            // Create FormData object for submission
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('email', formData.email);
            submitData.append('phone', formData.phone);
            submitData.append('subject', formData.subject);
            submitData.append('msg', formData.msg);
            submitData.append('accept_terms', formData.accept_terms.toString());

            const response = await fetch('http://localhost:5000/', {
                method: 'POST',
                body: submitData,
                credentials: 'include'
            });

            const result = await response.json();

            if (result.success) {
                setSubmitSuccess(true);
                setSubmitMessage(result.message || 'Formulário enviado com sucesso!');
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    msg: '',
                    accept_terms: false
                });
            } else {
                setSubmitSuccess(false);
                if (result.errors) {
                    setErrors(result.errors);
                }
                setSubmitMessage(result.message || 'Erro ao enviar formulário. Tente novamente.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitSuccess(false);
            setSubmitMessage('Erro de conexão. Verifique sua internet e tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            
                            {/* Success/Error Message */}
                            {submitMessage && (
                                <div className={`submit-message ${submitSuccess ? 'success' : 'error'}`}>
                                    {submitMessage}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name">{t("ftr.form.flds.name")}*</label>
                                <input 
                                    type="text" 
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={errors.name ? 'error' : ''}
                                    required
                                />
                                {errors.name && (
                                    <div className="field-error">
                                        {errors.name.join(', ')}
                                    </div>
                                )}
                                
                                <div className='email-phone'>
                                    <div className="field">
                                        <label htmlFor="email">Email*</label>
                                        <input 
                                            type="email" 
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={errors.email ? 'error' : ''}
                                            required
                                        />
                                        {errors.email && (
                                            <div className="field-error">
                                                {errors.email.join(', ')}
                                            </div>
                                        )}
                                    </div>
                                    <div className="field">
                                        <label htmlFor="phone">{t("ftr.form.flds.phone")}*</label>
                                        <input 
                                            type="tel" 
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={errors.phone ? 'error' : ''}
                                            required
                                        />
                                        {errors.phone && (
                                            <div className="field-error">
                                                {errors.phone.join(', ')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <label htmlFor="subject">{t("ftr.form.flds.obj")}*</label>
                                <select 
                                    name="subject" 
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className={errors.subject ? 'error' : ''}
                                    required
                                >
                                    <option value="">Selecione o assunto</option>
                                    <option value="lazer-co2-face">Lazer Co2 Face</option>
                                    <option value="lazer-co2-pescoco">Lazer Co2 Pescoço</option>
                                    <option value="blefo-superior">Blefosuperior sem corte</option>
                                    <option value="blefo-inferior">Blefoinferior sem corte</option>
                                </select>
                                {errors.subject && (
                                    <div className="field-error">
                                        {errors.subject.join(', ')}
                                    </div>
                                )}
                                
                                <label htmlFor="msg">{t("ftr.form.flds.msg")}*</label>
                                <textarea 
                                    name="msg" 
                                    id="msg"
                                    value={formData.msg}
                                    onChange={handleInputChange}
                                    className={errors.msg ? 'error' : ''}
                                    rows={5}
                                    required
                                ></textarea>
                                {errors.msg && (
                                    <div className="field-error">
                                        {errors.msg.join(', ')}
                                    </div>
                                )}
                                
                                <div className='checkbox'>
                                    <input 
                                        type="checkbox" 
                                        id="accept_terms"
                                        name="accept_terms"
                                        checked={formData.accept_terms}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <span>
                                        {t("ftr.form.flds.axept")} 
                                        <a href="/politica-privacidade" target="_blank" rel="noopener noreferrer">
                                            {t("ftr.policy.lt.0")}
                                        </a>
                                    </span>
                                </div>
                                {errors.accept_terms && (
                                    <div className="field-error">
                                        {errors.accept_terms.join(', ')}
                                    </div>
                                )}
                                
                                <button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Enviando...' : t("ftr.form.flds.btn")}
                                </button>
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