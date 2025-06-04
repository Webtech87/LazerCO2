import './Footer.css'

const Footer = () => {
  return (
    <div className='page-container'>
      <div className='footer-container'>
        <section className='footer'>
            <div className='footer-info'>
                <img className='logo' src="/logo-santiclinic.png" alt="" />
                <span>Tratamentos de beleza personalizados para
mulheres que merecem cuidado especial.</span>
                <div className='social-media'>
                    <a href="">Instagram</a>
                    <a href="">Facebook</a>
                    <a href="">TikTok</a>
                </div>
                <div className='contact-politics'>
                    <div className='contacts'>
                        <h3>Contacto</h3>
                        <span>📞 (+351) 910 144-032</span>
                        <span>📍 Praceta Agostinho 8005-147, Faro</span>
                        <button>WHATSAPP</button>
                    </div>
                    <div className='politics'>
                        <h3>Políticas</h3>
                        <a href="">Politica de Privacidade</a>
                        <a href="">Politica de Cookies</a>
                        <a href="">Termos e Condições</a>
                    </div>
                </div>
            </div>
            <div className='form-container'>
                <div className='form'>
                    <h2>Agende a sua avaliação agora</h2>
                    <span>Por favor, preencha o formulário abaixo para entrar em contacto com a nossa equipa.</span>
                    <form action="">
                        <label htmlFor="">Nome*</label>
                        <input type="text" />
                        <div className='email-phone'>
                            <div className="field">
                                <label>Email*</label>
                                <input type="email" />
                            </div>
                            <div className="field">
                                <label>Telefone*</label>
                                <input type="tel" />
                            </div>
                        </div>
                        <label htmlFor="">Assunto*</label>
                        <select name="" id=""></select>
                        <label htmlFor="">Mensagem*</label>
                        <textarea name="" id=""></textarea>
                        <div className='checkbox'>
                            <input type="checkbox" />
                            <span>Li e aceito a <a href="">Política de Privacidade</a></span>
                        </div>
                        <button>Agende a sua avaliação</button>
                    </form>
                </div>
            </div>
            
        </section>
        <div className='copyright'>
            <span>© 2025 SANTICLINIC. Todos os direitos reservados.</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
