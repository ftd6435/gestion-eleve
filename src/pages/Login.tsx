import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FormField } from '../components/ui/FormField';

interface LocationState {
  from?: { pathname: string };
}

export const Login: React.FC = () => {
  const { login, token, isLoading } = useAuth();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const from = state?.from?.pathname || '/dashboard';

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  if (token) {
    return <Navigate to={from} replace />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(formData.username, formData.password);
    if (!success) {
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
  <div className="h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
    <div className="max-w-md w-full bg-white shadow rounded-lg p-8">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">✓</span>
        </div>
      </div>

      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        Connexion
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 mb-8">
        Connectez-vous à votre espace élève pour gérer vos études.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Nom d'utilisateur"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Votre nom d'utilisateur"
          required
        />

        <FormField
          label="Mot de passe"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Votre mot de passe"
          required
        />

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <div className="text-right">
          <a
            href="#"
            className="text-sm font-medium text-green-600 hover:text-green-700"
          >
            Mot de passe oublié ?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  </div>
);

};
