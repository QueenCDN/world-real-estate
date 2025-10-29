import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface PropertyCardProps {
  property: Property;
}

// FIX: Replaced `JSX.Element` with `React.ReactNode` to resolve the 'Cannot find namespace JSX' error. `React.ReactNode` is also a more flexible type for props that accept renderable content.
const InfoPill: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
    <div className="flex items-center space-x-2 bg-slate-700/50 rounded-full px-3 py-1 text-sm">
        {icon}
        <span>{label}</span>
    </div>
);

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const { t, language } = useTranslation();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(price);
    };

    return (
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg shadow-slate-900/50 transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
            <div className="relative">
                <img src={property.images[0]} alt={property.title[language]} className="w-full h-56 object-cover" />
                <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 font-bold px-4 py-2 rounded-bl-lg">
                    {formatPrice(property.price)}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-yellow-300 mb-2 truncate">{property.title[language]}</h3>
                <p className="text-slate-400 mb-4 text-sm">{property.district}</p>
                <div className="flex flex-wrap gap-2 mb-4 text-slate-300">
                    <InfoPill icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} label={`${t('rooms')}: ${property.rooms}`} />
                    <InfoPill icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" /></svg>} label={`${t('area')}: ${property.area} ${t('sqm')}`} />
                    <InfoPill icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} label={`${t('sea_distance')}: ${property.distanceToSea}${t('meter')}`} />
                </div>
                 <div className="mt-auto">
                    <Link to={`/property/${property.id}`} className="block w-full text-center bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-500 transition-colors duration-300">
                        {t('details_btn')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;