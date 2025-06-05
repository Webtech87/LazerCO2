import React, { useEffect } from 'react';
import './TermsConditions.css';

const TermsConditions: React.FC = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-conditions">
      <div className="terms-conditions__container">
        {/* Header */}
        <div className="terms-conditions__header">
          <h1 className="terms-conditions__title">Termos e Condições</h1>
          <p className="terms-conditions__subtitle">
            Termos e condições gerais de utilização dos serviços da Santiclinic.
          </p>
          <div className="terms-conditions__meta">
            <span className="terms-conditions__date">Última atualização: Janeiro 2025</span>
            <span className="terms-conditions__version">Versão 1.0</span>
          </div>
        </div>

        {/* Content */}
        <div className="terms-conditions__content">
          
          {/* Section 1 */}
          <section className="terms-conditions__section">
            <h2 className="terms-conditions__section-title">1. Informações Gerais</h2>
            <div className="terms-conditions__section-content">
              <p>
                Os presentes Termos e Condições regulam a utilização do website da <strong>Santiclinic</strong> 
                e a prestação dos nossos serviços de microcirurgia cosmética. Ao aceder ao nosso website 
                ou utilizar os nossos serviços, aceita integralmente estes termos.
              </p>
              <p>
                A Santiclinic reserva-se o direito de alterar estes termos a qualquer momento, 
                sendo as alterações eficazes a partir da sua publicação no website.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="terms-conditions__section">
            <h2 className="terms-conditions__section-title">2. Identificação da Entidade</h2>
            <div className="terms-conditions__section-content">
              <div className="terms-conditions__contact">
                <div className="terms-conditions__contact-item">
                  <strong>Denominação:</strong> Santiclinic - Microcirurgia Cosmética
                </div>
                <div className="terms-conditions__contact-item">
                  <strong>Morada:</strong> Praceta Agostinho Ferreira Chaves 5 Lj 4 AA, 8005-328 Faro
                </div>
                <div className="terms-conditions__contact-item">
                  <strong>Telefone:</strong> +351 915 007 427
                </div>
                <div className="terms-conditions__contact-item">
                  <strong>Email:</strong> geral@santiclinic.eu
                </div>
                <div className="terms-conditions__contact-item">
                  <strong>Website:</strong> www.santiclinic.eu
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="terms-conditions__section">
            <h2 className="terms-conditions__section-title">3. Serviços Prestados</h2>
            <div className="terms-conditions__section-content">
              <p>
                A Santiclinic presta serviços especializados de microcirurgia cosmética, incluindo:
              </p>
              
              <h3>3.1 Tratamentos Disponíveis</h3>
              <ul>
                <li>Micro lifting de sobrancelha</li>
                <li>Micro blefaroplastia superior e inferior</li>
                <li>Micro lifting deep plane</li>
                <li>Mini micro lifting</li>
                <li>Micro implante de sobrancelha (técnica exclusiva)</li>
                <li>Micro otoplastia</li>
                <li>Micro lobuloplastia</li>
                <li>Consultas de microcirurgia cosmética</li>
              </ul>

              <h3>3.2 Consultas</h3>
              <p>
                Todos os tratamentos são precedidos de consulta médica obrigatória para avaliação 
                da adequabilidade do procedimento e esclarecimento de dúvidas.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="terms-conditions__section">
            <h2 className="terms-conditions__section-title">4. Utilização do Website</h2>
            <div className="terms-conditions__section-content">
              <h3>4.1 Condições de Acesso</h3>
              <p>
                O acesso ao website é gratuito, mas alguns serviços podem estar condicionados 
                ao preenchimento de formulários ou ao fornecimento de dados pessoais.
              </p>

              <h3>4.2 Utilizações Proibidas</h3>
              <p>É expressamente proibido:</p>
              <ul>
                <li>Utilizar o website para fins ilegais ou não autorizados</li>
                <li>Transmitir vírus ou códigos maliciosos</li>
                <li>Tentar aceder a áreas restritas do sistema</li>
                <li>Reproduzir, distribuir ou modificar conteúdos sem autorização</li>
                <li>Interferir com o funcionamento normal do website</li>
              </ul>

              <h3>4.3 Propriedade Intelectual</h3>
              <p>
                Todos os conteúdos do website, incluindo textos, imagens, logótipos e design, 
                são propriedade da Santiclinic e estão protegidos por direitos de autor.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="terms-conditions__section">
            <h2 className="terms-conditions__section-title">5. Agendamento e Cancelamentos</h2>
            <div className="terms-conditions__section-content">
              <h3>5.1 Marcação de Consultas</h3>
              <p>
                As consultas podem ser marcadas através do website, telefone ou WhatsApp. 
                A confirmação será enviada por email ou SMS.
              </p>

              <h3>5.2 Política de Cancelamentos</h3>
              <ul>
                <li>Cancelamentos devem ser comunicados com 24 horas de antecedência</li>
                <li>Cancelamentos tardios podem estar sujeitos a taxas</li>
                <li>Faltas não justificadas podem resultar na cobrança da consulta</li>
                <li>Reagendamentos são permitidos mediante disponibilidade</li>
              </ul>

              <h3>5.3 Atrasos</h3>
              <p>
                Em caso de atraso superior a 15 minutos, a consulta poderá ser reagendada 
                para outro horário disponível.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="terms-conditions__section">
            <h2 className="terms-conditions__section-title">6. Condições Comerciais</h2>
            <div className="terms-conditions__section-content">
              <h3>6.1 Preços e Pagamentos</h3>
              <ul>
                <li>Os preços são apresentados em euros e incluem IVA</li>
                <li>Os preços podem ser alterados sem aviso prévio</li>
                <li>O pagamento pode ser efetuado em dinheiro, cartão ou transferência</li>
                <li>Alguns tratamentos podem requerer pagamento antecipado</li>
              </ul>

              <h3>6.2 Orçamentos</h3>
              <p>
                Todos os orçamentos são válidos por 30 dias e estão sujeitos a confirmação 
                após consulta médica.
              </p>

              <h3>6.3 Garantias</h3>
              <p>
                A Santiclinic garante a qualidade dos serviços prestados de acordo com 
                as boas práticas médicas, mas não garante resultados específicos.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="terms-conditions__section">
            <h2 className="terms-conditions__section-title">7. Responsabilidades e Limitações</h2>
            <div className="terms-conditions__section-content">
              <h3>7.1 Responsabilidade da Santiclinic</h3>
              <p>
                A Santiclinic compromete-se a prestar serviços de qualidade, mas a sua 
                responsabilidade está limitada aos danos diretos e comprováveis.
              </p>

              <h3>7.2 Responsabilidade do Cliente</h3>
              <ul>
                <li>Fornecer informações médicas verdadeiras e completas</li>
                <li>Seguir as instruções pré e pós-operatórias</li>
                <li>Comunicar qualquer alteração no estado de saúde</li>
                <li>Cumprir os compromissos de pagamento</li>
              </ul>

              <h3>7.3 Limitações</h3>
              <p>
                A Santiclinic não se responsabiliza por resultados que dependam de fatores 
                externos ao seu controlo, como cicatrização individual ou cumprimento 
                das recomendações médicas.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="terms-conditions__section">
            <h2 className="terms-conditions__section-title">8. Proteção de Dados</h2>
            <div className="terms-conditions__section-content">
              <p>
                O tratamento dos seus dados pessoais está regulado pela nossa 
                <strong> Política de Privacidade</strong>, que constitui parte integrante 
                destes termos e condições.
              </p>
              
              <h3>8.1 Finalidades</h3>
              <ul>
                <li>Prestação de serviços médicos</li>
                <li>Gestão da relação comercial</li>
                <li>Cumprimento de obrigações legais</li>
                <li>Marketing direto (com consentimento)</li>
              </ul>

              <h3>8.2 Direitos do Titular</h3>
              <p>
                Pode exercer os seus direitos de acesso, retificação, apagamento e outros 
                previstos no RGPD contactando-nos através dos meios indicados na Política de Privacidade.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="terms-conditions__section">
            <h2 className="terms-conditions__section-title">9. Resolução de Conflitos</h2>
            <div className="terms-conditions__section-content">
              <h3>9.1 Reclamações</h3>
              <p>
                As reclamações devem ser dirigidas em primeiro lugar à Santiclinic, 
                através dos contactos disponibilizados no website.
              </p>

              <h3>9.2 Mediação</h3>
              <p>
                Em caso de litígio, as partes comprometem-se a tentar resolver o conflito 
                através de mediação antes de recorrer aos tribunais.
              </p>

              <h3>9.3 Lei Aplicável</h3>
              <p>
                Estes termos são regidos pela lei portuguesa, sendo competentes os tribunais 
                da comarca da sede da Santiclinic.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="terms-conditions__section">
            <h2 className="terms-conditions__section-title">10. Disposições Finais</h2>
            <div className="terms-conditions__section-content">
              <h3>10.1 Alterações</h3>
              <p>
                A Santiclinic reserva-se o direito de alterar estes termos a qualquer momento, 
                comunicando as alterações através do website.
              </p>

              <h3>10.2 Validade</h3>
              <p>
                Se alguma disposição destes termos for considerada inválida, as restantes 
                disposições mantêm-se em vigor.
              </p>

              <h3>10.3 Contactos</h3>
              <p>
                Para questões relacionadas com estes termos e condições, 
                pode contactar-nos através de:
              </p>
              
              <div className="terms-conditions__contact">
                <div className="terms-conditions__contact-item">
                  <strong>Email:</strong> geral@santiclinic.eu
                </div>
                <div className="terms-conditions__contact-item">
                  <strong>Telefone:</strong> +351 915 007 427
                </div>
                <div className="terms-conditions__contact-item">
                  <strong>WhatsApp:</strong> +351 915 007 427
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="terms-conditions__footer">
          <div className="terms-conditions__back">
            <a href="/" className="terms-conditions__back-link">
              ← Voltar ao Website
            </a>
          </div>
          
          <div className="terms-conditions__related">
            <p>Documentos relacionados:</p>
            <a href="/politica-privacidade" className="terms-conditions__related-link">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;