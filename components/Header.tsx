
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { Language } from '../types';
import WorldRealEstateLogo from '../assets/logo.png';

const Header: React.FC = () => {
  const { t, language, setLanguage, translations } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages: { code: Language; name: string }[] = [
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' },
    { code: 'tr', name: 'Türkçe' },
  ];

  const activeLinkClass = "text-yellow-400";
  const inactiveLinkClass = "text-white hover:text-yellow-400 transition-colors";

  return (
    <header className="bg-slate-800/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-slate-900/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center space-x-2">
            <img src={WorldRealEstateLogo} alt="logo" className="h-12 w-auto" />
            <span className="text-xl font-bold text-white hidden sm:block">World Real Estate</span>
          </NavLink>

          <nav className="hidden lg:flex items-center space-x-6 text-lg">
            <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>{t('nav_home')}</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>{t('nav_about')}</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>{t('nav_contact')}</NavLink>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a href={`tel:${translations.phone_number.replace(/\s/g, '')}`} className="text-white hover:text-yellow-400 transition-colors font-semibold">
              {translations.phone_number}
            </a>
            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center space-x-1 text-white bg-slate-700 px-3 py-2 rounded-md hover:bg-slate-600 transition-colors">
                <span>{language.toUpperCase()}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-slate-700 rounded-md shadow-lg py-1">
                  {languages.map(lang => (
                    <button key={lang.code} onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-600">
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 bg-slate-700 rounded-lg p-4">
            <nav className="flex flex-col space-y-4 text-center">
              <NavLink to="/" onClick={()=>setIsMenuOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>{t('nav_home')}</NavLink>
              <NavLink to="/about" onClick={()=>setIsMenuOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>{t('nav_about')}</NavLink>
              <NavLink to="/contact" onClick={()=>setIsMenuOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>{t('nav_contact')}</NavLink>
              <hr className="border-slate-600"/>
              <a href={`tel:${translations.phone_number.replace(/\s/g, '')}`} className="text-white hover:text-yellow-400 transition-colors font-semibold">
                {translations.phone_number}
              </a>
              <div className="flex justify-center space-x-2 pt-2">
                 {languages.map(lang => (
                    <button key={lang.code} onClick={() => { setLanguage(lang.code); setIsMenuOpen(false); }} 
                    className={`px-3 py-1 rounded ${language === lang.code ? 'bg-yellow-500 text-slate-900' : 'bg-slate-600 text-white'}`}>
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
