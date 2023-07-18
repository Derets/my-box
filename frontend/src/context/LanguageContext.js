import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Изначально установлен английский язык

  const switchLanguage = (lang) => {
    if(lang === 'en')setLanguage(lang)
    else if(lang === 'ua')setLanguage(lang)
    else setLanguage('en')
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;