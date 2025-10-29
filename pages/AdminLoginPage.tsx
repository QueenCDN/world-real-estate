
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../hooks/useTranslation';

const AdminLoginPage: React.FC = () => {
    const { login } = useAuth();
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(username, password);
        if (!success) {
            setError('Invalid username or password');
        }
    };

    const inputClasses = "w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors";

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-slate-900">
            <div className="w-full max-w-md bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700">
                <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">{t('admin_panel')}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">{t('username')}</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">{t('password')}</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={inputClasses}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" className="w-full bg-yellow-500 text-slate-900 font-bold py-3 rounded-md hover:bg-yellow-400 transition-colors text-lg">
                        {t('login')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
