
import React, { createContext, useContext, useState } from 'react';
import { AppConfig, Profession, FieldConfig } from '../types';
import { PROFESSIONS, PROFESSION_FIELDS_CONFIG } from '../constants';
import { FileText } from 'lucide-react';

// Initial state derived from constants
const INITIAL_CONFIG: AppConfig = {
  landing: {
    heroTitle: "Transforme sua Agenda em Experiência Premium",
    heroSubtitle: "A solução universal para profissionais que querem crescer. Do agendamento ao pagamento, automatize seu negócio com estilo.",
    heroButtonText: "Começar Gratuitamente"
  },
  professions: PROFESSIONS.map(p => ({ ...p, active: true })),
  fieldConfigs: { ...PROFESSION_FIELDS_CONFIG }
};

interface ConfigContextType {
  config: AppConfig;
  updateLandingConfig: (key: keyof AppConfig['landing'], value: string) => void;
  updateProfession: (id: string, updates: Partial<Profession>) => void;
  toggleProfession: (id: string) => void;
  resetConfig: () => void;
  // Field management
  updateField: (professionId: string, fieldIndex: number, updates: Partial<FieldConfig>) => void;
  addField: (professionId: string) => void;
  removeField: (professionId: string, fieldIndex: number) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AppConfig>(INITIAL_CONFIG);

  const updateLandingConfig = (key: keyof AppConfig['landing'], value: string) => {
    setConfig(prev => ({
      ...prev,
      landing: {
        ...prev.landing,
        [key]: value
      }
    }));
  };

  const updateProfession = (id: string, updates: Partial<Profession>) => {
    setConfig(prev => ({
      ...prev,
      professions: prev.professions.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const toggleProfession = (id: string) => {
    setConfig(prev => ({
      ...prev,
      professions: prev.professions.map(p => p.id === id ? { ...p, active: !p.active } : p)
    }));
  };

  const updateField = (professionId: string, fieldIndex: number, updates: Partial<FieldConfig>) => {
    setConfig(prev => {
      const currentFields = [...(prev.fieldConfigs[professionId] || [])];
      if (currentFields[fieldIndex]) {
        currentFields[fieldIndex] = { ...currentFields[fieldIndex], ...updates };
      }
      return {
        ...prev,
        fieldConfigs: {
          ...prev.fieldConfigs,
          [professionId]: currentFields
        }
      };
    });
  };

  const addField = (professionId: string) => {
    const newField: FieldConfig = {
      label: 'Novo Campo',
      type: 'Texto',
      icon: FileText, // Default icon
      color: 'text-slate-400'
    };

    setConfig(prev => ({
      ...prev,
      fieldConfigs: {
        ...prev.fieldConfigs,
        [professionId]: [...(prev.fieldConfigs[professionId] || []), newField]
      }
    }));
  };

  const removeField = (professionId: string, fieldIndex: number) => {
    setConfig(prev => {
      const currentFields = [...(prev.fieldConfigs[professionId] || [])];
      currentFields.splice(fieldIndex, 1);
      return {
        ...prev,
        fieldConfigs: {
          ...prev.fieldConfigs,
          [professionId]: currentFields
        }
      };
    });
  };

  const resetConfig = () => setConfig(INITIAL_CONFIG);

  return (
    <ConfigContext.Provider value={{ 
      config, 
      updateLandingConfig, 
      updateProfession, 
      toggleProfession, 
      resetConfig,
      updateField,
      addField,
      removeField
    }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
