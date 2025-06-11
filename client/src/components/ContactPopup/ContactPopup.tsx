// src/components/ContactPopup/ContactPopup.tsx
import React, { useState, useEffect } from 'react';
import type { ContactFormData, ContactPopupProps } from './types';
import './ContactPopup.css';

const ContactPopup: React.FC<ContactPopupProps> = ({
  companyName = "SantiClinic",
  onSubmit,
  onClose,
  showDelay = 15000,
  isVisible: externalVisible
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [formData, setFormData] = useState<ContactFormData>({
    nome: '',
    telefone: '',
    email: '',
    assunto: '',
    mensagem: ''
  });

  const subjects = [
    { value: 'lazer-co2-face', label: '🔥 Laser CO₂ Face' },
    { value: 'lazer-co2-pescoco', label: '✨ Laser CO₂ Pescoço' },
    { value: 'blefo-superior', label: '🩹 Blefosuperior sem corte' },
    { value: 'blefo-inferior', label: '🎯 Blefoinferior sem corte' },
    { value: 'consulta-avaliacao', label: '👩‍⚕️ Consulta de Avaliação' },
    { value: 'outros', label: '💬 Outros Assuntos' }
  ];

  useEffect(() => {
    console.log('🚀 ContactPopup mounted with props:', { companyName, showDelay, externalVisible });

    if (externalVisible !== undefined) {
      setIsVisible(externalVisible);
      return;
    }

    // ALWAYS show popup after delay - no localStorage checks
    console.log(`⏰ Starting timer for ${showDelay/1000} seconds...`);
    
    const timer = setTimeout(() => {
      console.log('🎯 Timer finished - showing popup!');
      setIsVisible(true);
    }, showDelay);
    
    return () => {
      console.log('🧹 Cleaning up timer');
      clearTimeout(timer);
    };
  }, [showDelay, externalVisible]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    // Nome validation
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    // Telefone validation
    const phoneRegex = /^[\d\s\(\)\+\-]{8,}$/;
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!phoneRegex.test(formData.telefone)) {
      newErrors.telefone = 'Formato de telefone inválido';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    // Assunto validation
    if (!formData.assunto) {
      newErrors.assunto = 'Selecione um assunto';
    }

    // Mensagem validation
    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória';
    } else if (formData.mensagem.trim().length < 10) {
      newErrors.mensagem = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear submit error
    if (submitError) {
      setSubmitError('');
    }
  };

  // 🚀 NEW: Backend submission function
  const submitToBackend = async (data: ContactFormData) => {
    console.log('📝 Popup form data to submit:', data);

    try {
      // Create FormData object matching backend expectations
      const submitData = new FormData();
      submitData.append('name', data.nome);           // Map nome -> name
      submitData.append('email', data.email);
      submitData.append('phone', data.telefone);      // Map telefone -> phone
      submitData.append('subject', data.assunto);     // Map assunto -> subject
      submitData.append('msg', data.mensagem);        // Map mensagem -> msg
      submitData.append('accept_terms', 'true');      // Popup implies acceptance

      console.log('🚀 Sending popup data to backend...');

      const response = await fetch('https://lazerco2-backend.onrender.com', {
        method: 'POST',
        body: submitData,
        credentials: 'include'
      });

      console.log('📡 Popup response status:', response.status);

      const result = await response.json();
      console.log('📋 Popup response data:', result);

      if (!result.success) {
        throw new Error(result.message || 'Erro ao enviar formulário');
      }

      return result;
    } catch (error) {
      console.error('💥 Popup submission error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake animation for errors
      const form = document.querySelector('.popup-form');
      form?.classList.add('shake');
      setTimeout(() => form?.classList.remove('shake'), 600);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      console.log('🚀 Starting popup form submission...');
      
      // Submit to backend
      const result = await submitToBackend(formData);
      
      console.log('✅ Popup form submitted successfully:', result);

      // Call optional onSubmit callback
      if (onSubmit) {
        await onSubmit(formData);
      }
      
      // Success - move to step 3
      setCurrentStep(3);
      
      // Auto-close after showing success
      setTimeout(() => {
        handleClose();
      }, 4000); // Increased to 4 seconds to show success message
      
    } catch (error) {
      console.error('❌ Popup form submission failed:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar mensagem. Tente novamente.';
      setSubmitError(errorMessage);
      
      // Shake animation for error
      const form = document.querySelector('.popup-form');
      form?.classList.add('shake');
      setTimeout(() => form?.classList.remove('shake'), 600);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    console.log('❌ Popup closed by user');
    setIsClosing(true);
    
    // REMOVED: Don't save dismissed state to localStorage
    // This allows popup to show again on next page load
    
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      if (onClose) onClose();
    }, 500);
  };

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate first step
      const step1Errors: Partial<ContactFormData> = {};
      if (!formData.nome.trim()) step1Errors.nome = 'Nome é obrigatório';
      if (!formData.telefone.trim()) step1Errors.telefone = 'Telefone é obrigatório';
      if (!formData.email.trim()) step1Errors.email = 'Email é obrigatório';
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email.trim() && !emailRegex.test(formData.email)) {
        step1Errors.email = 'Formato de email inválido';
      }
      
      const phoneRegex = /^[\d\s\(\)\+\-]{8,}$/;
      if (formData.telefone.trim() && !phoneRegex.test(formData.telefone)) {
        step1Errors.telefone = 'Formato de telefone inválido';
      }
      
      if (Object.keys(step1Errors).length > 0) {
        setErrors(step1Errors);
        const form = document.querySelector('.popup-form');
        form?.classList.add('shake');
        setTimeout(() => form?.classList.remove('shake'), 600);
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setSubmitError(''); // Clear any submit errors when going back
  };

  if (!isVisible) return null;

  return (
    <div className={`popup-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`popup-container ${isClosing ? 'closing' : ''}`}>
        
        {/* Background Effects */}
        <div className="popup-bg-effects">
          <div className="floating-orbs">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`orb orb-${i + 1}`} />
            ))}
          </div>
          <div className="neural-network">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`node node-${i + 1}`} />
            ))}
          </div>
          <div className="grid-overlay" />
        </div>

        {/* Close Button */}
        <button 
          className="close-btn"
          onClick={handleClose}
          aria-label="Fechar formulário"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>
          <div className="progress-steps">
            {[1, 2].map((step) => (
              <div 
                key={step}
                className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
              >
                {currentStep > step ? (
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="popup-content">
          {currentStep === 1 && (
            <div className="form-step step-1">
              <div className="step-header">
                <div className="icon-pulse">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.9 19.1 17 18 17H6C4.9 17 4 17.9 4 19V21M16 7C16 9.21 14.21 11 12 11C9.79 11 8 9.21 8 7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2>Vamos nos conhecer! 👋</h2>
                <p>Conte-nos sobre você para personalizarmos seu atendimento</p>
              </div>

              <form className="popup-form" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                <div className="form-group">
                  <div className="input-container">
                    <input
                      type="text"
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      className={errors.nome ? 'error' : ''}
                      placeholder=" "
                      autoComplete="name"
                    />
                    <label htmlFor="nome">Nome Completo</label>
                    <div className="input-border" />
                    <div className="input-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 21V19C20 17.9 19.1 17 18 17H6C4.9 17 4 17.9 4 19V21M16 7C16 9.21 14.21 11 12 11C9.79 11 8 9.21 8 7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7Z" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  </div>
                  {errors.nome && <span className="error-message">{errors.nome}</span>}
                </div>

                <div className="form-group">
                  <div className="input-container">
                    <input
                      type="tel"
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      className={errors.telefone ? 'error' : ''}
                      placeholder=" "
                      autoComplete="tel"
                    />
                    <label htmlFor="telefone">Telefone / WhatsApp</label>
                    <div className="input-border" />
                    <div className="input-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M22 16.92V19.92C22 20.51 21.39 21 20.83 21C9.28 21 0 11.72 0 0.17C0 -0.39 0.49 -1 1.08 -1H4.08C4.67 -1 5.16 -0.51 5.16 0.08C5.16 1.58 5.35 3.05 5.72 4.47C5.81 4.76 5.72 5.07 5.49 5.24L3.9 6.83C6.07 10.97 9.03 13.93 13.17 16.1L14.76 14.51C14.93 14.28 15.24 14.19 15.53 14.28C16.95 14.65 18.42 14.84 19.92 14.84C20.51 14.84 21 15.33 21 15.92V16.92H22Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  {errors.telefone && <span className="error-message">{errors.telefone}</span>}
                </div>

                <div className="form-group">
                  <div className="input-container">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'error' : ''}
                      placeholder=" "
                      autoComplete="email"
                    />
                    <label htmlFor="email">Email</label>
                    <div className="input-border" />
                    <div className="input-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <button type="submit" className="btn-next">
                  <span>Continuar</span>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="btn-glow" />
                </button>
              </form>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step step-2">
              <div className="step-header">
                <div className="icon-pulse">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2>Como podemos ajudar? 💬</h2>
                <p>Conte-nos sobre seu interesse e como podemos te atender melhor</p>
              </div>

              <form className="popup-form" onSubmit={handleSubmit}>
                {/* Show submit error if any */}
                {submitError && (
                  <div 
                    className="error-message" 
                    style={{
                      backgroundColor: '#fee',
                      border: '1px solid #fcc',
                      borderRadius: '8px',
                      padding: '12px',
                      marginBottom: '20px',
                      color: '#c33'
                    }}
                  >
                    {submitError}
                  </div>
                )}

                <div className="form-group">
                  <div className="select-container">
                    <select
                      id="assunto"
                      value={formData.assunto}
                      onChange={(e) => handleInputChange('assunto', e.target.value)}
                      className={errors.assunto ? 'error' : ''}
                    >
                      <option value="">Selecione o assunto...</option>
                      {subjects.map((subject) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="assunto">Assunto de Interesse</label>
                    <div className="select-border" />
                    <div className="select-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  {errors.assunto && <span className="error-message">{errors.assunto}</span>}
                </div>

                <div className="form-group">
                  <div className="textarea-container">
                    <textarea
                      id="mensagem"
                      value={formData.mensagem}
                      onChange={(e) => handleInputChange('mensagem', e.target.value)}
                      className={errors.mensagem ? 'error' : ''}
                      placeholder=" "
                      rows={4}
                      maxLength={500}
                    />
                    <label htmlFor="mensagem">Sua Mensagem</label>
                    <div className="textarea-border" />
                    <div className="char-counter">
                      {formData.mensagem.length}/500
                    </div>
                  </div>
                  {errors.mensagem && <span className="error-message">{errors.mensagem}</span>}
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-back" onClick={prevStep}>
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Voltar</span>
                  </button>

                  <button 
                    type="submit" 
                    className="btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Mensagem</span>
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                    <div className="btn-glow" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step step-3">
              <div className="success-animation">
                <div className="success-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2>Mensagem Enviada! 🎉</h2>
                <p>Recebemos sua mensagem e entraremos em contato em breve. Obrigado pelo interesse na {companyName}!</p>
                
                <div className="success-features">
                  <div className="feature">
                    <div className="feature-icon">⚡</div>
                    <span>Resposta rápida</span>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">👩‍⚕️</div>
                    <span>Atendimento especializado</span>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">🎯</div>
                    <span>Tratamento personalizado</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="popup-footer">
          <div className="security-badge">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 22S8 18 8 13V7L12 5L16 7V13C16 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Seus dados estão protegidos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;