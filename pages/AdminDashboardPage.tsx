
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { Property, ContactRequest } from '../types';

type AdminView = 'properties' | 'requests';

// Dummy component for managing properties - could be expanded into its own file
const PropertyManager: React.FC = () => {
    const { properties, setProperties } = useAppContext();
    const { t, language } = useTranslation();

    const handleDelete = (id: number) => {
        if (window.confirm(t('confirm_delete'))) {
            setProperties(prev => prev.filter(p => p.id !== id));
        }
    };
    
    // In a real app, Add/Edit would open a modal with a form
    const handleEdit = (property: Property) => {
      alert(`Editing ${property.title[language]}. In a real app, this would open a form.`);
    }

    const handleAdd = () => {
      alert("In a real app, this would open a form to add a new property.");
    }
    
    return (
        <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-cyan-300">{t('manage_properties')}</h2>
                <button onClick={handleAdd} className="bg-yellow-500 text-slate-900 font-bold py-2 px-4 rounded hover:bg-yellow-400 transition">{t('add_property')}</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-700 text-slate-300">
                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">{t('property_title')}</th>
                            <th className="p-3">{t('district')}</th>
                            <th className="p-3">{t('price')}</th>
                            <th className="p-3">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map(prop => (
                            <tr key={prop.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                                <td className="p-3">{prop.id}</td>
                                <td className="p-3">{prop.title[language]}</td>
                                <td className="p-3">{prop.district}</td>
                                <td className="p-3">€{prop.price.toLocaleString()}</td>
                                <td className="p-3">
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleEdit(prop)} className="text-cyan-400 hover:text-cyan-300">{t('edit_property')}</button>
                                        <button onClick={() => handleDelete(prop.id)} className="text-red-500 hover:text-red-400">{t('delete_property')}</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Dummy component for viewing requests
const RequestViewer: React.FC = () => {
    const { contactRequests, properties } = useAppContext();
    const { t, language } = useTranslation();

    const getPropertyName = (id?: number) => {
        if (!id) return '-';
        return properties.find(p => p.id === id)?.title[language] || `ID: ${id}`;
    }

    return (
        <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">{t('view_requests')}</h2>
            {contactRequests.length > 0 ? (
                <div className="space-y-4">
                    {contactRequests.map((req: ContactRequest) => (
                        <div key={req.id} className="bg-slate-700 p-4 rounded">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p><strong>{t('your_name')}:</strong> {req.name}</p>
                                    <p><strong>{t('your_phone')}:</strong> {req.phone}</p>
                                    <p><strong>{t('your_email')}:</strong> {req.email}</p>
                                    {req.propertyId && <p><strong>{t('from_property')}:</strong> {getPropertyName(req.propertyId)}</p>}
                                </div>
                                <span className="text-sm text-slate-400">{req.date}</span>
                            </div>
                            {req.message && <p className="mt-2 pt-2 border-t border-slate-600 text-slate-300">{req.message}</p>}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-slate-400">{t('no_requests')}</p>
            )}
        </div>
    );
}

const AdminDashboardPage: React.FC = () => {
    const { logout } = useAuth();
    const { t } = useTranslation();
    const [view, setView] = useState<AdminView>('properties');

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-yellow-400">{t('admin_panel')}</h1>
                <button onClick={logout} className="bg-slate-600 text-white py-2 px-4 rounded hover:bg-slate-500 transition">
                    {t('logout')}
                </button>
            </div>
            
            <div className="flex space-x-4 border-b border-slate-700 mb-6">
                <button
                    onClick={() => setView('properties')}
                    className={`py-2 px-4 text-lg ${view === 'properties' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                >
                    {t('manage_properties')}
                </button>
                <button
                    onClick={() => setView('requests')}
                    className={`py-2 px-4 text-lg ${view === 'requests' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                >
                    {t('view_requests')}
                </button>
            </div>

            <div>
                {view === 'properties' && <PropertyManager />}
                {view === 'requests' && <RequestViewer />}
            </div>
        </div>
    );
};

export default AdminDashboardPage;
