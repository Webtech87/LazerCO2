import React, { useEffect } from 'react';
import './CookiesPolicy.css';

const CookiesPolicy: React.FC = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleManageCookies = () => {
    // This would trigger your cookies banner to reopen
    // You can implement this to show the cookies preference modal
    alert('Esta funcionalidade irá abrir as preferências de cookies.');
    console.log('Opening cookies preferences...');
  };

  return (
    <div className="cookies-policy">
      <div className="cookies-policy__container">
        {/* Header */}
        <div className="cookies-policy__header">
          <h1 className="cookies-policy__title">Política de Cookies</h1>
          <p className="cookies-policy__subtitle">
            Informações sobre como utilizamos cookies para melhorar a sua experiência no nosso website.
          </p>
          <div className="cookies-policy__meta">
            <span className="cookies-policy__date">Última atualização: Janeiro 2025</span>
            <span className="cookies-policy__version">Versão 1.0</span>
          </div>
        </div>

        {/* Content */}
        <div className="cookies-policy__content">
          
          {/* Section 1 */}
          <section className="cookies-policy__section">
            <h2 className="cookies-policy__section-title">1. O que são Cookies?</h2>
            <div className="cookies-policy__section-content">
              <p>
                Os cookies são pequenos ficheiros de texto que são colocados no seu dispositivo 
                (computador, tablet ou telemóvel) quando visita o nosso website. Estes ficheiros 
                permitem que o website reconheça o seu dispositivo e armazene algumas informações 
                sobre as suas preferências ou ações passadas.
              </p>
              <p>
                Os cookies são amplamente utilizados para fazer os websites funcionarem de forma 
                mais eficiente, bem como para fornecer informações aos proprietários do website 
                sobre como os utilizadores interagem com o site.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="cookies-policy__section">
            <h2 className="cookies-policy__section-title">2. Como Utilizamos Cookies</h2>
            <div className="cookies-policy__section-content">
              <p>
                A Santiclinic utiliza cookies para várias finalidades, sempre com o objetivo 
                de melhorar a sua experiência no nosso website e fornecer serviços personalizados.
              </p>

              <h3>2.1 Funcionalidade do Website</h3>
              <ul>
                <li>Lembrar as suas preferências de idioma</li>
                <li>Manter a sua sessão ativa durante a navegação</li>
                <li>Guardar informações de formulários para sua conveniência</li>
                <li>Personalizar a apresentação de conteúdos</li>
              </ul>

              <h3>2.2 Análise e Melhoria</h3>
              <ul>
                <li>Analisar o tráfego e padrões de utilização do website</li>
                <li>Identificar páginas mais populares e áreas de interesse</li>
                <li>Melhorar a estrutura e conteúdo do website</li>
                <li>Otimizar a experiência do utilizador</li>
              </ul>

              <h3>2.3 Marketing e Comunicação</h3>
              <ul>
                <li>Mostrar publicidade relevante aos seus interesses</li>
                <li>Medir a eficácia das nossas campanhas</li>
                <li>Personalizar ofertas e comunicações</li>
                <li>Retargeting em outras plataformas</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="cookies-policy__section">
            <h2 className="cookies-policy__section-title">3. Tipos de Cookies</h2>
            <div className="cookies-policy__section-content">
              <p>
                Utilizamos diferentes tipos de cookies, cada um com finalidades específicas:
              </p>

              <div className="cookies-policy__cookie-types">
                <div className="cookies-policy__cookie-type">
                  <h4>🔧 Cookies Necessários</h4>
                  <div className="cookies-policy__cookie-badge cookies-policy__cookie-badge--required">
                    Sempre Ativos
                  </div>
                  <p>
                    Estes cookies são essenciais para o funcionamento básico do website. 
                    Sem eles, certas funcionalidades não funcionariam corretamente.
                  </p>
                  <ul>
                    <li>Gestão de sessões</li>
                    <li>Segurança do website</li>
                    <li>Funcionalidades básicas de navegação</li>
                    <li>Preferências de acessibilidade</li>
                  </ul>
                </div>

                <div className="cookies-policy__cookie-type">
                  <h4>📊 Cookies de Análise</h4>
                  <div className="cookies-policy__cookie-badge cookies-policy__cookie-badge--optional">
                    Opcional
                  </div>
                  <p>
                    Ajudam-nos a compreender como os visitantes interagem com o website, 
                    fornecendo informações sobre as páginas visitadas, tempo de permanência 
                    e outras métricas.
                  </p>
                  <ul>
                    <li>Google Analytics</li>
                    <li>Heatmaps e gravações de sessão</li>
                    <li>Análise de performance</li>
                    <li>Estatísticas de utilização</li>
                  </ul>
                </div>

                <div className="cookies-policy__cookie-type">
                  <h4>📈 Cookies de Marketing</h4>
                  <div className="cookies-policy__cookie-badge cookies-policy__cookie-badge--optional">
                    Opcional
                  </div>
                  <p>
                    Utilizados para mostrar publicidade relevante e medir a eficácia 
                    das nossas campanhas de marketing.
                  </p>
                  <ul>
                    <li>Facebook Pixel</li>
                    <li>Google Ads</li>
                    <li>Remarketing e retargeting</li>
                    <li>Publicidade personalizada</li>
                  </ul>
                </div>

                <div className="cookies-policy__cookie-type">
                  <h4>⚙️ Cookies Funcionais</h4>
                  <div className="cookies-policy__cookie-badge cookies-policy__cookie-badge--optional">
                    Opcional
                  </div>
                  <p>
                    Permitem funcionalidades avançadas como chat ao vivo, 
                    formulários melhorados e outras características personalizadas.
                  </p>
                  <ul>
                    <li>Chat ao vivo</li>
                    <li>Formulários inteligentes</li>
                    <li>Personalização de conteúdo</li>
                    <li>Preferências do utilizador</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="cookies-policy__section">
            <h2 className="cookies-policy__section-title">4. Cookies Específicos Utilizados</h2>
            <div className="cookies-policy__section-content">
              <p>
                A seguinte tabela detalha os cookies específicos utilizados no nosso website:
              </p>

              <div className="cookies-policy__table-wrapper">
                <table className="cookies-policy__table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Tipo</th>
                      <th>Duração</th>
                      <th>Finalidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>santiclinic-cookies-consent</code></td>
                      <td>Necessário</td>
                      <td>1 ano</td>
                      <td>Armazena as suas preferências de cookies</td>
                    </tr>
                    <tr>
                      <td><code>session_id</code></td>
                      <td>Necessário</td>
                      <td>Sessão</td>
                      <td>Identifica a sua sessão no website</td>
                    </tr>
                    <tr>
                      <td><code>_ga</code></td>
                      <td>Análise</td>
                      <td>2 anos</td>
                      <td>Google Analytics - identificação de utilizadores</td>
                    </tr>
                    <tr>
                      <td><code>_ga_*</code></td>
                      <td>Análise</td>
                      <td>2 anos</td>
                      <td>Google Analytics - dados de sessão</td>
                    </tr>
                    <tr>
                      <td><code>_fbp</code></td>
                      <td>Marketing</td>
                      <td>3 meses</td>
                      <td>Facebook Pixel - tracking de conversões</td>
                    </tr>
                    <tr>
                      <td><code>_gcl_au</code></td>
                      <td>Marketing</td>
                      <td>3 meses</td>
                      <td>Google Ads - atribuição de conversões</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="cookies-policy__section">
            <h2 className="cookies-policy__section-title">5. Gestão de Cookies</h2>
            <div className="cookies-policy__section-content">
              <h3>5.1 Controlo das Suas Preferências</h3>
              <p>
                Pode gerir as suas preferências de cookies a qualquer momento através 
                do nosso banner de cookies ou clicando no botão abaixo:
              </p>
              
              <div className="cookies-policy__manage">
                <button 
                  className="cookies-policy__manage-btn"
                  onClick={handleManageCookies}
                >
                  🍪 Gerir Preferências de Cookies
                </button>
              </div>

              <h3>5.2 Configurações do Navegador</h3>
              <p>
                A maioria dos navegadores permite controlar os cookies através das 
                configurações. Pode configurar o seu navegador para:
              </p>
              <ul>
                <li>Bloquear todos os cookies</li>
                <li>Aceitar apenas cookies de primeira parte</li>
                <li>Eliminar cookies quando fechar o navegador</li>
                <li>Notificar antes de aceitar cookies</li>
              </ul>

              <h3>5.3 Links para Configurações</h3>
              <div className="cookies-policy__browsers">
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                  Google Chrome
                </a>
                <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">
                  Mozilla Firefox
                </a>
                <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">
                  Safari
                </a>
                <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">
                  Microsoft Edge
                </a>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="cookies-policy__section">
            <h2 className="cookies-policy__section-title">6. Cookies de Terceiros</h2>
            <div className="cookies-policy__section-content">
              <p>
                Alguns cookies no nosso website são definidos por serviços de terceiros. 
                Estes serviços têm as suas próprias políticas de privacidade:
              </p>

              <div className="cookies-policy__third-parties">
                <div className="cookies-policy__third-party">
                  <h4>Google Analytics</h4>
                  <p>Utilizado para análise de tráfego e comportamento dos utilizadores.</p>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Ver Política de Privacidade
                  </a>
                </div>

                <div className="cookies-policy__third-party">
                  <h4>Facebook Pixel</h4>
                  <p>Utilizado para publicidade direcionada e medição de conversões.</p>
                  <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer">
                    Ver Política de Privacidade
                  </a>
                </div>

                <div className="cookies-policy__third-party">
                  <h4>Google Ads</h4>
                  <p>Utilizado para campanhas publicitárias e remarketing.</p>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Ver Política de Privacidade
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="cookies-policy__section">
            <h2 className="cookies-policy__section-title">7. Impacto da Desativação</h2>
            <div className="cookies-policy__section-content">
              <p>
                Se optar por desativar cookies, algumas funcionalidades do website 
                podem ser afetadas:
              </p>

              <div className="cookies-policy__impact">
                <div className="cookies-policy__impact-item cookies-policy__impact-item--warning">
                  <h4>⚠️ Cookies Necessários</h4>
                  <p>
                    A desativação pode causar problemas de funcionamento, 
                    perda de sessão e dificuldades de navegação.
                  </p>
                </div>

                <div className="cookies-policy__impact-item cookies-policy__impact-item--info">
                  <h4>ℹ️ Cookies de Análise</h4>
                  <p>
                    A desativação não afeta a funcionalidade, mas limita 
                    a nossa capacidade de melhorar o website.
                  </p>
                </div>

                <div className="cookies-policy__impact-item cookies-policy__impact-item--neutral">
                  <h4>📢 Cookies de Marketing</h4>
                  <p>
                    A desativação significa que poderá ver publicidade 
                    menos relevante para os seus interesses.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="cookies-policy__section">
            <h2 className="cookies-policy__section-title">8. Atualizações desta Política</h2>
            <div className="cookies-policy__section-content">
              <p>
                A Santiclinic pode atualizar esta Política de Cookies periodicamente 
                para refletir mudanças nos nossos serviços ou na legislação aplicável.
              </p>
              <p>
                Quando fizermos alterações significativas, notificaremos através 
                do nosso website e, se aplicável, por email. A data da última 
                atualização está sempre indicada no topo desta página.
              </p>
              <p>
                Recomendamos que reveja esta política regularmente para se 
                manter informado sobre como utilizamos cookies.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="cookies-policy__section">
            <h2 className="cookies-policy__section-title">9. Contacto</h2>
            <div className="cookies-policy__section-content">
              <p>
                Se tiver dúvidas sobre esta Política de Cookies ou sobre 
                como utilizamos cookies, pode contactar-nos:
              </p>

              <div className="cookies-policy__contact">
                <div className="cookies-policy__contact-item">
                  <strong>Email:</strong> geral@santiclinic.eu
                </div>
                <div className="cookies-policy__contact-item">
                  <strong>Telefone:</strong> +351 915 007 427
                </div>
                <div className="cookies-policy__contact-item">
                  <strong>Morada:</strong> Praceta Agostinho Ferreira Chaves 5 Lj 4 AA, 8005-328 Faro
                </div>
              </div>

              <p>
                Para questões gerais sobre privacidade e proteção de dados, 
                consulte a nossa <a href="/politica-privacidade">Política de Privacidade</a>.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="cookies-policy__footer">
          <div className="cookies-policy__back">
            <a href="/" className="cookies-policy__back-link">
              ← Voltar ao Website
            </a>
          </div>
          
          <div className="cookies-policy__related">
            <p>Documentos relacionados:</p>
            <a href="/politica-privacidade" className="cookies-policy__related-link">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;