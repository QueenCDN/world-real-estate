import React, { createContext, useState, useContext, ReactNode } from 'react';
// FIX: `Property`, `Language`, and `ContactRequest` are types and should be imported from `../types`.
import { Property, Language, ContactRequest } from '../types';
import { MOCK_PROPERTIES, translations } from '../constants';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  contactRequests: ContactRequest[];
  addContactRequest: (request: Omit<ContactRequest, 'id' | 'date'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key;
      }
    }
    return result;
  };

  const addContactRequest = (request: Omit<ContactRequest, 'id' | 'date'>) => {
    const newRequest: ContactRequest = {
      ...request,
      id: Date.now(),
      date: new Date().toLocaleString(),
    };
    setContactRequests(prev => [newRequest, ...prev]);
  };
  
  const value = {
    language,
    setLanguage,
    t,
    properties,
    setProperties,
    contactRequests,
    addContactRequest
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};