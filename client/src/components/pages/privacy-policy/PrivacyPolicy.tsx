import React, { useEffect } from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-policy">
      <div className="privacy-policy__container">
        {/* Header */}
        <div className="privacy-policy__header">
          <h1 className="privacy-policy__title">Política de Privacidade</h1>
          <p className="privacy-policy__subtitle">
            A Santiclinic compromete-se a proteger a sua privacidade e os seus dados pessoais.
          </p>
          <div className="privacy-policy__meta">
            <span className="privacy-policy__date">Última atualização: Janeiro 2025</span>
            <span className="privacy-policy__version">Versão 1.0</span>
          </div>
        </div>

        {/* Content */}
        <div className="privacy-policy__content">
          
          {/* Section 1 */}
          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">1. Informações Gerais</h2>
            <div className="privacy-policy__section-content">
              <p>
                A presente Política de Privacidade define como a <strong>Santiclinic</strong> recolhe, 
                utiliza, armazena e protege as informações pessoais dos utilizadores do nosso website 
                e dos nossos serviços de microcirurgia cosmética.
              </p>
              <p>
                Esta política aplica-se a todos os dados pessoais recolhidos através do nosso website, 
                formulários de contacto, consultas presenciais e quaisquer outras interações com a Santiclinic.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">2. Dados Pessoais Recolhidos</h2>
            <div className="privacy-policy__section-content">
              <h3>2.1 Dados de Identificação</h3>
              <ul>
                <li>Nome completo</li>
                <li>Endereço de email</li>
                <li>Número de telefone</li>
                <li>Data de nascimento (quando aplicável)</li>
                <li>Dados de contacto postal</li>
              </ul>

              <h3>2.2 Dados de Navegação</h3>
              <ul>
                <li>Endereço IP</li>
                <li>Tipo de navegador e versão</li>
                <li>Sistema operativo</li>
                <li>Páginas visitadas e tempo de permanência</li>
                <li>Origem do tráfego (referrer)</li>
              </ul>

              <h3>2.3 Dados Médicos (quando aplicável)</h3>
              <ul>
                <li>Historial médico relevante</li>
                <li>Alergias e medicações</li>
                <li>Fotografias clínicas (com consentimento expresso)</li>
                <li>Informações sobre tratamentos realizados</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">3. Finalidades do Tratamento</h2>
            <div className="privacy-policy__section-content">
              <h3>3.1 Prestação de Serviços</h3>
              <ul>
                <li>Agendamento e gestão de consultas</li>
                <li>Prestação de cuidados médicos especializados</li>
                <li>Seguimento pós-tratamento</li>
                <li>Comunicação sobre tratamentos e resultados</li>
              </ul>

              <h3>3.2 Comunicação e Marketing</h3>
              <ul>
                <li>Resposta a pedidos de informação</li>
                <li>Envio de newsletters (com consentimento)</li>
                <li>Comunicação de novos tratamentos e promoções</li>
                <li>Inquéritos de satisfação</li>
              </ul>

              <h3>3.3 Melhoria dos Serviços</h3>
              <ul>
                <li>Análise do website e otimização da experiência</li>
                <li>Desenvolvimento de novos tratamentos</li>
                <li>Formação da equipa médica</li>
                <li>Investigação científica (dados anonimizados)</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">4. Base Legal do Tratamento</h2>
            <div className="privacy-policy__section-content">
              <p>O tratamento dos seus dados pessoais baseia-se nas seguintes bases legais:</p>
              
              <h3>4.1 Consentimento</h3>
              <p>
                Para o envio de comunicações de marketing, newsletters e utilização de cookies 
                não essenciais, solicitamos o seu consentimento expresso.
              </p>

              <h3>4.2 Execução de Contrato</h3>
              <p>
                Para a prestação dos nossos serviços médicos, o tratamento dos dados é necessário 
                para a execução do contrato de prestação de serviços.
              </p>

              <h3>4.3 Interesse Legítimo</h3>
              <p>
                Para a melhoria dos nossos serviços, análise do website e segurança, 
                baseamo-nos no nosso interesse legítimo.
              </p>

              <h3>4.4 Obrigação Legal</h3>
              <p>
                Alguns dados são tratados para cumprimento de obrigações legais, 
                nomeadamente em matéria fiscal e de saúde.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">5. Partilha de Dados</h2>
            <div className="privacy-policy__section-content">
              <p>
                A Santiclinic não vende, aluga ou partilha os seus dados pessoais com terceiros, 
                exceto nas seguintes situações:
              </p>

              <h3>5.1 Prestadores de Serviços</h3>
              <ul>
                <li>Empresas de hosting e manutenção do website</li>
                <li>Serviços de email marketing (com consentimento)</li>
                <li>Processadores de pagamento</li>
                <li>Serviços de análise web (Google Analytics)</li>
              </ul>

              <h3>5.2 Obrigações Legais</h3>
              <ul>
                <li>Autoridades de saúde competentes</li>
                <li>Tribunais e autoridades judiciárias</li>
                <li>Autoridades fiscais</li>
                <li>Outras entidades quando legalmente obrigatório</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">6. Segurança dos Dados</h2>
            <div className="privacy-policy__section-content">
              <p>
                Implementamos medidas de segurança técnicas e organizacionais adequadas para 
                proteger os seus dados pessoais contra acesso não autorizado, alteração, 
                divulgação ou destruição.
              </p>

              <h3>6.1 Medidas Técnicas</h3>
              <ul>
                <li>Encriptação SSL/TLS para transmissão de dados</li>
                <li>Firewalls e sistemas de deteção de intrusão</li>
                <li>Backups regulares e seguros</li>
                <li>Atualizações de segurança regulares</li>
              </ul>

              <h3>6.2 Medidas Organizacionais</h3>
              <ul>
                <li>Acesso restrito aos dados numa base "need-to-know"</li>
                <li>Formação regular da equipa em proteção de dados</li>
                <li>Políticas internas de segurança</li>
                <li>Controlo de acessos físicos às instalações</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">7. Retenção de Dados</h2>
            <div className="privacy-policy__section-content">
              <p>
                Os seus dados pessoais são conservados apenas pelo tempo necessário 
                para as finalidades para as quais foram recolhidos:
              </p>

              <h3>7.1 Dados de Pacientes</h3>
              <p>
                Os dados médicos são conservados pelo período mínimo de 5 anos após 
                o último contacto, conforme legislação aplicável.
              </p>

              <h3>7.2 Dados de Marketing</h3>
              <p>
                Os dados para fins de marketing são conservados até à retirada do 
                consentimento ou por um período máximo de 3 anos sem interação.
              </p>

              <h3>7.3 Dados de Navegação</h3>
              <p>
                Os dados de navegação são conservados por um período máximo de 
                26 meses, conforme recomendações da CNIL.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">8. Os Seus Direitos</h2>
            <div className="privacy-policy__section-content">
              <p>
                Ao abrigo do Regulamento Geral sobre a Proteção de Dados (RGPD), 
                tem os seguintes direitos:
              </p>

              <div className="privacy-policy__rights">
                <div className="privacy-policy__right">
                  <h4>Direito de Acesso</h4>
                  <p>Pode solicitar informações sobre os dados que processamos sobre si.</p>
                </div>

                <div className="privacy-policy__right">
                  <h4>Direito de Retificação</h4>
                  <p>Pode solicitar a correção de dados incorretos ou incompletos.</p>
                </div>

                <div className="privacy-policy__right">
                  <h4>Direito ao Apagamento</h4>
                  <p>Pode solicitar a eliminação dos seus dados pessoais.</p>
                </div>

                <div className="privacy-policy__right">
                  <h4>Direito à Limitação</h4>
                  <p>Pode solicitar a limitação do tratamento dos seus dados.</p>
                </div>

                <div className="privacy-policy__right">
                  <h4>Direito à Portabilidade</h4>
                  <p>Pode solicitar a transferência dos seus dados para outro responsável.</p>
                </div>

                <div className="privacy-policy__right">
                  <h4>Direito de Oposição</h4>
                  <p>Pode opor-se ao tratamento dos seus dados para fins de marketing.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">9. Contactos e Exercício de Direitos</h2>
            <div className="privacy-policy__section-content">
              <p>
                Para exercer os seus direitos ou esclarecer dúvidas sobre esta política 
                de privacidade, pode contactar-nos:
              </p>

              <div className="privacy-policy__contact">
                <div className="privacy-policy__contact-item">
                  <strong>Email:</strong> geral@santiclinic.eu
                </div>
                <div className="privacy-policy__contact-item">
                  <strong>Telefone:</strong> +351 915 007 427
                </div>
                <div className="privacy-policy__contact-item">
                  <strong>Morada:</strong> Praceta Agostinho Ferreira Chaves 5 Lj 4 AA, 8005-328 Faro
                </div>
                <div className="privacy-policy__contact-item">
                  <strong>Encarregado de Proteção de Dados:</strong> geral@santiclinic.eu
                </div>
              </div>

              <p>
                Caso não fique satisfeito com a nossa resposta, tem o direito de apresentar 
                uma reclamação à <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong>.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">10. Alterações à Política</h2>
            <div className="privacy-policy__section-content">
              <p>
                A Santiclinic reserva-se o direito de alterar esta Política de Privacidade 
                a qualquer momento. As alterações serão comunicadas através do nosso website 
                e, quando materiais, por email aos titulares dos dados.
              </p>
              <p>
                Recomendamos que consulte regularmente esta página para se manter informado 
                sobre como protegemos os seus dados pessoais.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="privacy-policy__footer">
          <div className="privacy-policy__back">
            <a href="/" className="privacy-policy__back-link">
              ← Voltar ao Website
            </a>
          </div>
          
          <div className="privacy-policy__related">
            <p>Documentos relacionados:</p>
            <a href="/politica-cookies" className="privacy-policy__related-link">
              Política de Cookies
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;