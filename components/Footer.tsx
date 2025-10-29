
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import WorldRealEstateLogo from '../assets/logo.png';
import { TelegramIcon } from './icons/TelegramIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { InstagramIcon } from './icons/InstagramIcon';

const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-slate-800 border-t border-slate-700/50 mt-12">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
                    <div className="flex flex-col items-center md:items-start">
                        <NavLink to="/" className="flex items-center space-x-3 mb-2">
                            <img src={WorldRealEstateLogo} className="h-12 w-auto" alt="Logo" />
                            {/* <WorldRealEstateLogo className="h-12 w-auto" /> */}
                            <span className="text-2xl font-bold text-white">World Real Estate</span>
                        </NavLink>
                        <p className="text-slate-400 text-sm">{t('copyright')}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                            <TelegramIcon className="w-8 h-8" />
                        </a>
                        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-500 transition-colors">
                            <WhatsAppIcon className="w-8 h-8" />
                        </a>
                         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 transition-colors">
                            <InstagramIcon className="w-8 h-8" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
