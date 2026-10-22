'use client';

import { useState, type FormEvent } from 'react';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { FormField } from '@/components/ui/FormField';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ContactProps, FormField as FormFieldType } from '@/types/types';

type Status = 'idle' | 'success';

const groupFields = (fields: FormFieldType[]) => {
  const rows: FormFieldType[][] = [];

  fields.forEach((field) => {
    const last = rows[rows.length - 1];

    if (!field.fullWidth && last && last.length < 2 && !last[0].fullWidth) {
      last.push(field);
      return;
    }

    rows.push([field]);
  });

  return rows;
};

export const Contact = ({
  eyebrow,
  title,
  description,
  details,
  sideCard,
  form,
}: ContactProps) => {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('success');
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-16 grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <ul className="space-y-6">
              {details.map((detail) => (
                <li key={detail.id} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon name={detail.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="mt-1 block text-sm font-semibold text-slate-900 transition hover:text-blue-700"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {detail.value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-bold text-slate-900">{sideCard.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {sideCard.description}
              </p>
              <ArrowLink cta={sideCard.link} className="mt-4 text-sm" />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-7 w-7"
                      aria-hidden="true"
                    >
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {form.successTitle}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                    {form.successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-semibold text-blue-700 transition hover:text-blue-800"
                  >
                    {form.resetLabel}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {groupFields(form.fields).map((row) => (
                    <div
                      key={row.map((field) => field.id).join('-')}
                      className={
                        row.length > 1
                          ? 'grid gap-5 sm:grid-cols-2'
                          : 'grid gap-5'
                      }
                    >
                      {row.map((field) => (
                        <FormField key={field.id} field={field} />
                      ))}
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
                  >
                    {form.submitLabel}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
