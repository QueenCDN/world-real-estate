
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { DISTRICTS, ROOM_OPTIONS, PROPERTY_TYPES, SELLER_TYPES } from '../constants';
import { FilterState } from '../types';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onApply: () => void;
  onReset: () => void;
}

const FilterInput: React.FC<{ children: React.ReactNode; label: string }> = ({ children, label }) => (
    <div className="flex flex-col space-y-2">
        <label className="text-slate-300 font-semibold">{label}</label>
        {children}
    </div>
);

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange, onApply, onReset }) => {
    const { t } = useTranslation();

    const selectClasses = "w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none";
    const inputClasses = "w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none";

    return (
        <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <FilterInput label={t('filter_district')}>
                    <select value={filters.district} onChange={(e) => onFilterChange('district', e.target.value)} className={selectClasses}>
                        <option value="all">{t('filter_all')}</option>
                        {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </FilterInput>
                <FilterInput label={t('filter_price')}>
                    <div className="flex items-center space-x-2">
                         <input type="number" placeholder="Min" value={filters.priceMin || ''} onChange={(e) => onFilterChange('priceMin', Number(e.target.value))} className={inputClasses}/>
                         <span className="text-slate-400">-</span>
                         <input type="number" placeholder="Max" value={filters.priceMax || ''} onChange={(e) => onFilterChange('priceMax', Number(e.target.value))} className={inputClasses}/>
                    </div>
                </FilterInput>
                <FilterInput label={t('filter_seller')}>
                    <select value={filters.seller} onChange={(e) => onFilterChange('seller', e.target.value)} className={selectClasses}>
                        <option value="all">{t('filter_all')}</option>
                        {SELLER_TYPES.map(s => <option key={s} value={s}>{t(s === 'owner' ? 'filter_from_owner' : 'filter_from_developer')}</option>)}
                    </select>
                </FilterInput>
                <FilterInput label={t('filter_rooms')}>
                    <select value={filters.rooms} onChange={(e) => onFilterChange('rooms', e.target.value)} className={selectClasses}>
                        <option value="all">{t('filter_all')}</option>
                        {ROOM_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </FilterInput>
                <FilterInput label={t('filter_type')}>
                    <select value={filters.type} onChange={(e) => onFilterChange('type', e.target.value)} className={selectClasses}>
                        <option value="all">{t('filter_all')}</option>
                        {PROPERTY_TYPES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                    </select>
                </FilterInput>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
                <button onClick={onReset} className="px-6 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-500 transition-colors">{t('filter_reset')}</button>
                <button onClick={onApply} className="px-6 py-2 bg-yellow-500 text-slate-900 font-bold rounded-md hover:bg-yellow-400 transition-colors">{t('filter_apply')}</button>
            </div>
        </div>
    );
};

export default Filters;
