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

    // 🚀 WhatsApp redirect function
    const handleWhatsAppClick = () => {
        console.log('💬 WhatsApp button clicked in Footer');
        
        const phoneNumber = "351915007427"; // Your WhatsApp number
        const message = "Olá! Vi o site da SantiClinic e gostaria de falar convosco sobre os vossos tratamentos. Podem ajudar-me?";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        console.log('🔗 Opening WhatsApp:', whatsappUrl);
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
    };

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

        console.log('📝 Submitting form data:', formData);

        try {
            // Create FormData object for submission
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('email', formData.email);
            submitData.append('phone', formData.phone);
            submitData.append('subject', formData.subject);
            submitData.append('msg', formData.msg);
            submitData.append('accept_terms', formData.accept_terms.toString());

            console.log('🚀 Sending request to backend...');

            const response = await fetch('https://lazerco2-backend.onrender.com', {
                method: 'POST',
                body: submitData,
                credentials: 'include'
            });

            console.log('📡 Response status:', response.status);

            const result = await response.json();
            console.log('📋 Response data:', result);

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
                
                console.log('✅ Form submitted successfully');

                // Optional: Scroll to top of form to show success message
                const formElement = document.querySelector('.form-container');
                if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                setSubmitSuccess(false);
                if (result.errors) {
                    setErrors(result.errors);
                    console.log('❌ Form validation errors:', result.errors);
                }
                setSubmitMessage(result.message || 'Erro ao enviar formulário. Tente novamente.');
            }
        } catch (error) {
            console.error('💥 Error submitting form:', error);
            setSubmitSuccess(false);
            setSubmitMessage('Erro de conexão. Verifique sua internet e tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="footer-section" className='page-container footer-section'>
            <div className='footer-container'>
                <section className='footer' id="footer">
                    <div className='footer-info'>
                        <img className='logo' src="/logo-santiclinic.png" alt="SantiClinic Logo" />
                        <span>{t("ftr.slogan")}</span>
                        <div className='social-media'>
                            <a href="" aria-label="Instagram"><img src="/instagram.png" alt="Instagram" /></a>
                            <a href="" aria-label="Facebook"><img src="/facebook-logo.png" alt="Facebook" /></a>
                            <a href="" aria-label="TikTok"><img src="/tiktok-logo.png" alt="TikTok" /></a>
                        </div>
                        <div className='contact-politics'>
                            <div className='contacts'>
                                <h3>{t("ftr.contact.title")}</h3>
                                <span>📞 (+351) 910 144-032</span>
                                <span>📍 Praceta Agostinho <br /> 8005-147, Faro</span>
                                
                                {/* 🔥 WhatsApp button with enhanced styling */}
                                <button 
                                    onClick={handleWhatsAppClick}
                                    title="Falar connosco no WhatsApp"
                                    className="whatsapp-footer-btn"
                                    style={{
                                        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        padding: '12px 20px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                                        marginTop: '15px',
                                        width: 'fit-content'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.3)';
                                    }}
                                >
                                    <img src={whatsapp} alt="WhatsApp" style={{ width: '20px', height: '20px' }} />
                                    {t("ftr.contact.btn")}
                                </button>
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
                                <div 
                                    className={`submit-message ${submitSuccess ? 'success' : 'error'}`}
                                    style={{
                                        padding: '15px',
                                        borderRadius: '8px',
                                        margin: '15px 0',
                                        backgroundColor: submitSuccess ? '#d4edda' : '#f8d7da',
                                        color: submitSuccess ? '#155724' : '#721c24',
                                        border: `1px solid ${submitSuccess ? '#c3e6cb' : '#f5c6cb'}`,
                                        fontWeight: '500'
                                    }}
                                >
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
                                    placeholder="Seu nome completo"
                                />
                                {errors.name && (
                                    <div className="field-error" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
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
                                            placeholder="seu@email.com"
                                        />
                                        {errors.email && (
                                            <div className="field-error" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
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
                                            placeholder="+351 910 000 000"
                                        />
                                        {errors.phone && (
                                            <div className="field-error" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
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
                                    <div className="field-error" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
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
                                    placeholder="Descreva o que gostaria de saber sobre nossos tratamentos..."
                                ></textarea>
                                {errors.msg && (
                                    <div className="field-error" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
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
                                    <div className="field-error" style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                                        {errors.accept_terms.join(', ')}
                                    </div>
                                )}
                                
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    style={{
                                        opacity: isSubmitting ? 0.7 : 1,
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                    }}
                                >
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