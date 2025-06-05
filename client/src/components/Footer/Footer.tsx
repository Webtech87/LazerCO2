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
    const [loading, setLoading] = useState(false)
    const [responseMsg, setResponseMsg] = useState('')

    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setResponseMsg('')

        try {
            const res = await axios.post('http://localhost:5000/', formData, {
                headers: { 'Content-Type': 'application/json' }
            })

            if (res.data.success) {
                setResponseMsg('Formulário enviado com sucesso!')
            } else {
                setResponseMsg('Erro ao enviar formulário.')
            }

        } catch (err: any) {
            setResponseMsg(`Erro: ${err.response?.data?.message || 'Servidor indisponível'}`)
        } finally {
            setLoading(false)
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
                        <div className='email-phone'>
                            <div className="field">
                                <label htmlFor='email'>Email*</label>
                                <input 
                                    id='email'
                                    type="email" 
                                    value={formData.email} 
                                    onChange={e => setFormData({...formData, email: e.target.value})} 
                                />
                            </div>
                            <div className="field">
                                <label htmlFor='phone'>{t("ftr.form.flds.phone")}*</label>
                                <input
                                    id='phone' 
                                    type="tel" 
                                    value={formData.phone} 
                                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                                />
                            </div>
                        </div>
                        <label htmlFor="subject">{t("ftr.form.flds.obj")}*</label>
                        <select
                            id='subject' 
                            value={formData.subject} 
                            onChange={e => setFormData({...formData, subject: e.target.value})} 
                        />
                        <label htmlFor="message">{t("ftr.form.flds.msg")}*</label>
                        <textarea 
                            id='message'
                            value={formData.message} 
                            onChange={e => setFormData({...formData, message: e.target.value})} 
                        />
                        <div className='checkbox'>
                            <input 
                                type="checkbox" 
                                checked={formData.accept} 
                                onChange={e => setFormData({...formData, accept: e.target.checked})} 
                            />
                            <span>{t("ftr.form.flds.axept")} <a href="#">{t("ftr.policy.lt.0")}</a></span>
                        </div>
                        <button type='submit'>{t("ftr.form.flds.btn")}</button>
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
