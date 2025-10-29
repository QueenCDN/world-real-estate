
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import ImageCarousel from '../components/ImageCarousel';

const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="bg-slate-800 p-4 rounded-lg">
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
    </div>
);

const PropertyDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { properties, addContactRequest } = useAppContext();
    const { t, language } = useTranslation();
    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const property = properties.find(p => p.id === Number(id));

    if (!property) {
        return <div className="text-center py-20 text-xl">Property not found.</div>;
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price);
    };
    
    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addContactRequest({ name, phone, email, message, propertyId: property.id });
      setSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <ImageCarousel images={property.images} />
                    <div className="mt-8 bg-slate-800 p-6 rounded-lg">
                        <h1 className="text-3xl font-bold text-yellow-400 mb-2">{property.title[language]}</h1>
                        <p className="text-cyan-400 mb-4">{property.district}</p>
                        <p className="text-slate-300 leading-relaxed">{property.description[language]}</p>
                    </div>
                </div>
                <div>
                    <div className="sticky top-24">
                        <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-6">
                            <h2 className="text-2xl font-bold text-yellow-400 mb-4">{formatPrice(property.price)}</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem label={t('rooms')} value={property.rooms} />
                                <DetailItem label={t('area')} value={`${property.area} ${t('sqm')}`} />
                                <DetailItem label={t('sea_distance')} value={`${property.distanceToSea}${t('meter')}`} />
                                <DetailItem label={t('seller')} value={t(property.seller === 'owner' ? 'filter_from_owner' : 'filter_from_developer')} />
                            </div>
                        </div>

                        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-cyan-300 mb-4">{t('request_info')}</h3>
                            {submitted ? (
                                <p className="text-green-400 text-center">{t('request_success')}</p>
                            ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <input type="text" placeholder={t('your_name')} value={name} onChange={e => setName(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" />
                                <input type="tel" placeholder={t('your_phone')} value={phone} onChange={e => setPhone(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" />
                                <input type="email" placeholder={t('your_email')} value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" />
                                <textarea placeholder={t('your_message')} value={message} onChange={e => setMessage(e.target.value)} rows={3} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"></textarea>
                                <button type="submit" className="w-full bg-yellow-500 text-slate-900 font-bold py-2 rounded-md hover:bg-yellow-400 transition-colors">{t('send_request')}</button>
                            </form>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 mt-8">
                    <div className="bg-slate-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-cyan-300 mb-4">{t('infrastructure')}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {property.infrastructure.map(item => (
                                <div key={item.key} className="flex items-center space-x-3">
                                    {item.available ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    )}
                                    <span className={item.available ? 'text-slate-200' : 'text-slate-500 line-through'}>{t(item.key)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailsPage;
