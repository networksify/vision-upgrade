'use client';

import { useId } from 'react';
import { Icon } from '@/components/ui/Icon';

type FormFieldProps = {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  rows?: number;
  fullWidth?: boolean;
  options?: { id: number; label: string }[];
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
};

const controlClasses =
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy outline-none transition duration-200 placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-offset-0';

export const FormField = ({
  id,
  name,
  label,
  type,
  placeholder,
  required = false,
  autoComplete,
  rows = 5,
  fullWidth = false,
  options,
  value,
  onChange,
  error,
}: FormFieldProps) => {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const describedBy = error ? `${fieldId}-error` : undefined;

  const borderClass = error
    ? 'border-brand-ink focus:border-brand-ink focus:ring-brand-ink/25'
    : 'border-line focus:border-brand focus:ring-brand/25';

  const labelClass = error ? 'text-brand-ink' : 'text-navy';

  return (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
      <label
        htmlFor={fieldId}
        className={`mb-2 block text-sm font-bold ${labelClass}`}
      >
        {label}
        {required ? (
          <span className="ml-1 text-brand-ink" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 font-normal text-muted-foreground">(optional)</span>
        )}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={fieldId}
          name={name}
          rows={rows}
          value={value}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          placeholder={placeholder}
          onChange={(event) => onChange(name, event.target.value)}
          className={`${controlClasses} ${borderClass} resize-y`}
        />
      ) : type === 'select' ? (
        <div className="relative">
          <select
            id={fieldId}
            name={name}
            value={value}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            onChange={(event) => onChange(name, event.target.value)}
            className={`${controlClasses} ${borderClass} appearance-none pr-11 ${
              value ? 'text-navy' : 'text-muted-foreground/80'
            }`}
          >
            <option value="">{placeholder ?? 'Select an option'}</option>
            {options?.map((option) => (
              <option key={option.id} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
          <Icon
            name="arrowRight"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-muted-foreground"
          />
        </div>
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          placeholder={placeholder}
          onChange={(event) => onChange(name, event.target.value)}
          className={`${controlClasses} ${borderClass}`}
        />
      )}

      {error ? (
        <p
          id={describedBy}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-brand-ink"
        >
          <span aria-hidden="true">!</span>
          {error}
        </p>
      ) : null}
    </div>
  );
};
