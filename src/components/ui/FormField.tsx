import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  options,
  placeholder,
  required = false,
  disabled = false,
  rows,
  className = ''
}) => {
  const baseInputClasses = `
    mt-1 block w-full rounded-md border border-gray-300 bg-white
    px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none
    focus:ring-2 focus:ring-green-500 focus:border-green-500
    sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === 'select' && options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={baseInputClasses}
          aria-required={required}
        >
          <option value="">{placeholder || 'Sélectionnez...'}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows || 4}
          className={baseInputClasses}
          aria-required={required}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={baseInputClasses}
          aria-required={required}
          autoComplete={name === 'password' ? 'current-password' : 'username'}
        />
      )}
    </div>
  );
};
