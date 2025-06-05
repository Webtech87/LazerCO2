import React, { useState, useEffect } from 'react';
import './PopupForm.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  msg: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  msg?: string;
}

const PopupForm: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'c_m_cosmética', // Default to consultation
    msg: 'Solicitação de consulta através do formulário popup.'
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Show popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Close popup with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Nome validation (aligned with Flask form)
    if (!formData.name.trim()) {
      newErrors.name = 'O nome é obrigatório';
    } else if (formData.name.trim().length < 4) {
      newErrors.name = 'O nome deve ter pelo menos 4 caracteres';
    } else if (formData.name.trim().length > 20) {
      newErrors.name = 'O nome deve ter no máximo 20 caracteres';
    }

    // Email validation (aligned with Flask form)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'O email é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido';
    } else if (formData.email.length < 6 || formData.email.length > 35) {
      newErrors.email = 'O email deve ter entre 6 e 35 caracteres';
    }

    // Telefone validation (aligned with Flask form - numbers only)
    const phoneRegex = /^\d{9,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'O telefone é obrigatório';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Por favor, insira um telefone válido (apenas números, 9-15 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object to match Flask's expected format
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('subject', formData.subject);
      submitData.append('msg', formData.msg);

      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        body: submitData,
        credentials: 'include', // Include cookies for CORS
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        
        // Auto-close after success
        setTimeout(() => {
          closePopup();
          // Reset form data for next time
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: 'c_m_cosmética',
            msg: 'Solicitação de consulta através do formulário popup.'
          });
          setIsSubmitted(false);
        }, 3000);
        
      } else {
        // Handle validation errors from backend
        if (result.errors) {
          setErrors(result.errors);
        } else {
          console.error('Submission failed:', result.message);
          alert('Erro ao enviar formulário: ' + (result.message || 'Erro desconhecido'));
        }
      }
    } catch (error) {
      console.error('Error submitting popup form:', error);
      alert('Erro de conexão. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setIsVisible(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handlePrivacyLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Close the popup first
    closePopup();
    // Navigate to privacy policy page
    window.location.href = '/politica-privacidade';
  };

  if (!isVisible) return null;

  return (
    <div className="popup-form__overlay" onClick={handleOverlayClick}>
      <div className="popup-form__container">
        {/* Close Button */}
        <button 
          className="popup-form__close"
          onClick={closePopup}
          aria-label="Fechar formulário"
        >
          ×
        </button>

        {isSubmitted ? (
          /* Success State */
          <div className="popup-form__success">
            <div className="popup-form__success-icon">✓</div>
            <h2 className="popup-form__success-title">Obrigado!</h2>
            <p className="popup-form__success-text">
              Recebemos os seus dados. A nossa equipa entrará em contacto consigo brevemente para agendar a sua consulta gratuita.
            </p>
          </div>
        ) : (
          /* Form State */
          <div className="popup-form__content">
            <div className="popup-form__header">
              <div className="popup-form__icon">💎</div>
              <h2 className="popup-form__title">
                Agende a Sua Consulta!
              </h2>
              <p className="popup-form__subtitle">
                Reserve já a sua avaliação personalizada com os nossos especialistas. 
                <strong> Descubra o melhor tratamento para si.</strong>
              </p>
            </div>

            <form className="popup-form__form" onSubmit={handleSubmit} noValidate>
              <div className="popup-form__form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`popup-form__input ${errors.name ? 'popup-form__input--error' : ''}`}
                  placeholder="O seu nome completo *"
                  required
                />
                {errors.name && (
                  <span className="popup-form__error">{errors.name}</span>
                )}
              </div>

              <div className="popup-form__form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`popup-form__input ${errors.email ? 'popup-form__input--error' : ''}`}
                  placeholder="O seu melhor email *"
                  required
                />
                {errors.email && (
                  <span className="popup-form__error">{errors.email}</span>
                )}
              </div>

              <div className="popup-form__form-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`popup-form__input ${errors.phone ? 'popup-form__input--error' : ''}`}
                  placeholder="O seu número de telefone (apenas números) *"
                  required
                />
                {errors.phone && (
                  <span className="popup-form__error">{errors.phone}</span>
                )}
              </div>

              <button 
                type="submit" 
                className="popup-form__submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="popup-form__spinner"></span>
                    AGENDANDO...
                  </>
                ) : (
                  'AGENDAR CONSULTA'
                )}
              </button>

              <div className="popup-form__benefits">
                <div className="popup-form__benefit">
                  <span className="popup-form__benefit-icon">✓</span>
                  <span>Avaliação personalizada</span>
                </div>
                <div className="popup-form__benefit">
                  <span className="popup-form__benefit-icon">✓</span>
                  <span>Especialistas qualificados</span>
                </div>
                <div className="popup-form__benefit">
                  <span className="popup-form__benefit-icon">✓</span>
                  <span>Resultados garantidos</span>
                </div>
              </div>

              <p className="popup-form__privacy">
                🔒 Os seus dados estão seguros connosco. 
                <a 
                  href="/politica-privacidade" 
                  className="popup-form__privacy-link"
                  onClick={handlePrivacyLinkClick}
                >
                  Política de Privacidade
                </a>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupForm;