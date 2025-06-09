// src/components/ContactPopup/types.ts

export interface ContactFormData {
  nome: string;
  telefone: string;
  email: string;
  assunto: string;
  mensagem: string;
}

export interface ContactPopupProps {
  companyName?: string;
  onSubmit?: (formData: ContactFormData) => Promise<void> | void;
  onClose?: () => void;
  showDelay?: number; // in milliseconds
  isVisible?: boolean; // for manual control
}

export interface SubjectOption {
  value: string;
  label: string;
}
