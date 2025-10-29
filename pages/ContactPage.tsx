
import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useAppContext } from '../context/AppContext';
import { TelegramIcon } from '../components/icons/TelegramIcon';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';


const ContactPage: React.FC = () => {
    const { t } = useTranslation();
    const { addContactRequest } = useAppContext();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addContactRequest({ name, phone, email, message });
        setSubmitted(true);
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
        setTimeout(() => setSubmitted(false), 5000);
    };

    const inputClasses = "w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors";

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-12 text-yellow-400">{t('contact_us')}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-cyan-300 mb-6">{t('our_office')}</h2>
                    <div className="space-y-4 text-lg text-slate-300">
                        <p><strong className="text-slate-100">{t('address')}:</strong> {t('address')}</p>
                        <p><strong className="text-slate-100">{t('phone_number')}:</strong> <a href={`tel:${t('phone_number').replace(/\s/g, '')}`} className="hover:text-yellow-400">{t('phone_number')}</a></p>
                        <p><strong className="text-slate-100">{t('email')}:</strong> <a href={`mailto:${t('email')}`} className="hover:text-yellow-400">{t('email')}</a></p>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-bold text-cyan-300 mb-4">{t('social_media')}</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
                                <TelegramIcon className="w-8 h-8"/>
                                <span>Telegram</span>
                            </a>
                             <a href="#" className="flex items-center space-x-2 text-slate-300 hover:text-green-500 transition-colors">
                                <WhatsAppIcon className="w-8 h-8"/>
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                    <div className="mt-8 rounded-lg overflow-hidden border-2 border-slate-700">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51187.35942488346!2d31.9547283623696!3d36.54585618228399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39aa0f24a29a5%3A0x29c63c4f90f05566!2sAlanya%2C%20Antalya%2C%20Turkey!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                </div>

                <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
                     <h2 className="text-2xl font-bold text-cyan-300 mb-6">{t('leave_request')}</h2>
                     {submitted ? (
                         <div className="flex items-center justify-center h-full">
                            <p className="text-green-400 text-xl text-center">{t('request_success')}</p>
                         </div>
                     ) : (
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">{t('your_name')}</label>
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className={inputClasses}/>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">{t('your_phone')}</label>
                                <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required className={inputClasses}/>
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">{t('your_email')}</label>
                                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputClasses}/>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">{t('your_message')}</label>
                                <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={5} className={inputClasses}></textarea>
                            </div>
                            <button type="submit" className="w-full bg-yellow-500 text-slate-900 font-bold py-3 rounded-md hover:bg-yellow-400 transition-colors text-lg">{t('send_request')}</button>
                        </form>
                     )}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
