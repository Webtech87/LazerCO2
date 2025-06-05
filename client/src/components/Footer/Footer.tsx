import './Footer.css'
import whatsapp from '../../assets/whasapp-logo.png'
import {useTranslation} from "react-i18next";
import axios from 'axios'
import { useState } from 'react'


const Footer = () => {    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        accept: false
    })
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false)
    const [responseMsg, setResponseMsg] = useState('')

    const { t } = useTranslation();

    const validateForm = () => {
        const errors: any = {};
        
        if (!formData.name.trim()) errors.name = 'Obrigatório';
        if (!formData.email.trim()) errors.email = 'Obrigatório';
        if (!formData.phone.trim()) errors.phone = 'Obrigatório';
        if (!formData.subject.trim()) errors.subject = 'Obrigatório';
        if (!formData.message.trim()) errors.message = 'Obrigatório';
        if (!formData.accept) errors.accept = 'Obrigatório';

        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResponseMsg('');

        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            return; // Stop if there are errors
        }

    setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/', formData, {
                headers: { 'Content-Type': 'application/json' }
            })

            if (res.data.success) {
            setResponseMsg('Formulário enviado com sucesso!');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '', accept: false });
            setFormErrors({});
            } else {
                setResponseMsg('Erro ao enviar formulário.');
            }

        } catch (err: any) {
            setResponseMsg(`Erro: ${err.response?.data?.message || 'Servidor indisponível'}`);
        } finally {
            setLoading(false);
        }
    }
    
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
                        <a href="#">{t("ftr.policy.lt.0")}</a>
                        <a href="#">{t("ftr.policy.lt.1")}</a>
                        <a href="#">{t("ftr.policy.lt.2")}</a>
                    </div>
                </div>
            </div>
            <div className='form-container'>
                <div className='form'>
                    <h2>{t("ftr.form.title")}</h2>
                    <span>{t("ftr.form.p")}</span>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">{t("ftr.form.flds.name")}*</label>
                        <input
                            id='name' 
                            type="text" 
                            value={formData.name} 
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                        {formErrors.name && <p className="error">{formErrors.name}</p>}
                        <div className='email-phone'>
                            <div className="field">
                                <label htmlFor='email'>Email*</label>
                                <input 
                                    id='email'
                                    type="email" 
                                    value={formData.email} 
                                    onChange={e => setFormData({...formData, email: e.target.value})} 
                                />
                                {formErrors.email && <p className="error">{formErrors.email}</p>}
                            </div>
                            <div className="field">
                                <label htmlFor='phone'>{t("ftr.form.flds.phone")}*</label>
                                <input
                                    id='phone' 
                                    type="tel" 
                                    value={formData.phone} 
                                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                                />
                                {formErrors.phone && <p className="error">{formErrors.phone}</p>}
                            </div>
                        </div>
                        <label htmlFor="subject">{t("ftr.form.flds.obj")}*</label>
                        <select
                            id='subject' 
                            value={formData.subject} 
                            onChange={e => setFormData({...formData, subject: e.target.value})} 
                        />
                        {formErrors.subject && <p className="error">{formErrors.subject}</p>}
                        <label htmlFor="message">{t("ftr.form.flds.msg")}*</label>
                        <textarea 
                            id='message'
                            value={formData.message} 
                            onChange={e => setFormData({...formData, message: e.target.value})} 
                        />
                        {formErrors.message && <p className="error">{formErrors.message}</p>}
                        <div className='checkbox'>
                            <input 
                                id='accept'
                                type="checkbox" 
                                checked={formData.accept} 
                                onChange={e => setFormData({...formData, accept: e.target.checked})} 
                            />
                            <label htmlFor=''>{t("ftr.form.flds.axept")} <a href="#">{t("ftr.policy.lt.0")}</a>{formErrors.accept && <p className="error">{formErrors.accept}</p>}</label>
                            
                        </div>
                        <button type='submit' disabled={loading}>
                            {loading ? 'Enviando...' : t("ftr.form.flds.btn")}
                        </button>
                    </form>
                    {responseMsg && <p className="response-msg">{responseMsg}</p>}
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
