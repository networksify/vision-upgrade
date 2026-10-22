import type { FormField as FormFieldType } from '@/types/types';

const inputClasses =
  'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10';

type FormFieldProps = {
  field: FormFieldType;
  className?: string;
};

export const FormField = ({ field, className = '' }: FormFieldProps) => (
  <div className={className}>
    <label htmlFor={field.id} className="block text-sm font-semibold text-slate-700">
      {field.label}
    </label>
    {field.type === 'textarea' ? (
      <textarea
        id={field.id}
        name={field.name}
        rows={field.rows ?? 5}
        required={field.required}
        placeholder={field.placeholder}
        className={`${inputClasses} resize-y`}
      />
    ) : (
      <input
        id={field.id}
        name={field.name}
        type={field.type}
        required={field.required}
        autoComplete={field.autoComplete}
        placeholder={field.placeholder}
        className={inputClasses}
      />
    )}
  </div>
);
