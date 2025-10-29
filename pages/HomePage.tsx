
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import Filters from '../components/Filters';
import PropertyCard from '../components/PropertyCard';
import { FilterState } from '../types';

const HomePage: React.FC = () => {
  const { properties } = useAppContext();
  const { t } = useTranslation();

  const initialFilters: FilterState = {
    district: 'all',
    priceMin: 0,
    priceMax: 0,
    seller: 'all',
    rooms: 'all',
    type: 'all'
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(initialFilters);

  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({...prev, [key]: value}));
  }

  const handleApply = () => {
    setAppliedFilters(filters);
  };
  
  const handleReset = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      const { district, priceMin, priceMax, seller, rooms, type } = appliedFilters;
      if (district !== 'all' && prop.district !== district) return false;
      if (priceMin > 0 && prop.price < priceMin) return false;
      if (priceMax > 0 && prop.price > priceMax) return false;
      if (seller !== 'all' && prop.seller !== seller) return false;
      if (rooms !== 'all' && prop.rooms !== rooms) return false;
      if (type !== 'all' && prop.type !== type) return false;
      return true;
    });
  }, [properties, appliedFilters]);

  return (
    <div>
      <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url('https://www.alanya.bel.tr/Photos/Slider/726619904.jpg')` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-300 drop-shadow-lg">{t('hero_title')}</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-200">{t('hero_subtitle')}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-20 relative z-20">
        <Filters 
          filters={filters}
          onFilterChange={handleFilterChange}
          onApply={handleApply}
          onReset={handleReset}
        />
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-cyan-300">{t('all_offers')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        {filteredProperties.length === 0 && (
          <p className="text-center text-slate-400 mt-8">No properties match the current filters.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
