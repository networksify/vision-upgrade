'use client';

import { useState, type FormEvent } from 'react';
import { FormField } from '@/components/ui/FormField';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ContactProps } from '@/types/types';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const Contact = ({
  eyebrow,
  title,
  description,
  details,
  detailsNotice,
  notes,
  form,
}: ContactProps) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const next: Record<string, string> = {};

    form.fields.forEach((field) => {
      const value = (values[field.name] ?? '').trim();

      if (field.required && !value) {
        next[field.name] = `${field.label} is required.`;
        return;
      }

      if (field.type === 'email' && value && !emailPattern.test(value)) {
        next[field.name] = 'Enter a valid email address.';
      }
    });

    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validate();
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      const firstInvalid = form.fields.find((field) => validation[field.name]);
      if (firstInvalid) {
        document.getElementById(firstInvalid.id)?.focus();
      }
      return;
    }

    setStatus('submitting');

    try {
      if (form.mode === 'api' && form.endpoint) {
        const response = await fetch(form.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues({});
    setErrors({});
    setStatus('idle');
  };

  const isDemo = form.mode === 'demo';

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-32"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div id="contact-title">
                <SectionHeading
                  eyebrow={eyebrow}
                  title={title}
                  description={description}
                />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-10 space-y-4">
                {details.map((detail) => {
                  const content = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand-ink">
                        <Icon name={detail.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                          {detail.label}
                        </span>
                        <span className="mt-1 block text-sm font-bold text-navy sm:text-base">
                          {detail.value}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={detail.id}>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="flex items-center gap-4 rounded-2xl border border-line p-4 transition duration-300 hover:border-brand/40 hover:bg-brand-tint/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 rounded-2xl border border-line p-4">
                          {content}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            {detailsNotice ? (
              <Reveal delay={100}>
                <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-dashed border-brand/40 bg-brand-tint/40 p-3.5 text-xs leading-relaxed text-brand-ink">
                  <Icon name="lightbulb" className="mt-0.5 h-4 w-4 shrink-0" />
                  {detailsNotice}
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={120}>
              <ul className="mt-9 space-y-4">
                {notes.map((note) => (
                  <li key={note.id} className="flex gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy text-white"
                    >
                      <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-navy">{note.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {note.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-linear-to-br from-brand/10 to-brand-deep/10 blur-2xl"
              />
              <div className="relative rounded-[1.75rem] border border-line bg-surface p-6 sm:p-9">
                {status === 'success' ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="flex flex-col items-start"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-brand-warm text-navy">
                      <Icon name="check" className="h-7 w-7" strokeWidth={2.5} />
                    </span>
                    <h3 className="mt-6 text-2xl font-black text-navy">
                      {form.successTitle}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {form.successMessage}
                    </p>
                    {isDemo ? (
                      <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-dashed border-brand/40 bg-brand-tint/50 p-3.5 text-sm leading-relaxed text-brand-ink">
                        <Icon name="lightbulb" className="mt-0.5 h-4 w-4 shrink-0" />
                        {form.demoNotice}
                      </p>
                    ) : null}
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-7 inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-5 py-2.5 text-sm font-bold text-navy transition hover:border-brand hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                    >
                      {form.resetLabel}
                      <Icon name="arrowRight" className="h-4 w-4" />
                    </button>
                  </div>
                ) : status === 'error' ? (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="flex flex-col items-start"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-tint text-brand-ink">
                      <Icon name="lightbulb" className="h-7 w-7" />
                    </span>
                    <h3 className="mt-6 text-2xl font-black text-navy">
                      {form.errorTitle}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {form.errorMessage}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand to-brand-warm px-5 py-2.5 text-sm font-bold text-navy transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                    >
                      {form.retryLabel}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      {form.fields.map((field) => (
                        <FormField
                          key={field.id}
                          id={field.id}
                          name={field.name}
                          label={field.label}
                          type={field.type}
                          placeholder={field.placeholder}
                          required={field.required}
                          autoComplete={field.autoComplete}
                          rows={field.rows}
                          fullWidth={field.fullWidth}
                          options={field.options}
                          value={values[field.name] ?? ''}
                          onChange={handleChange}
                          error={errors[field.name]}
                        />
                      ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand to-brand-warm px-7 py-3.5 text-base font-bold text-navy shadow-[0_14px_30px_-14px_rgba(240,43,22,0.9)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                      >
                        {status === 'submitting'
                          ? form.submittingLabel
                          : form.submitLabel}
                        {status === 'submitting' ? (
                          <span
                            aria-hidden="true"
                            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                          />
                        ) : (
                          <Icon name="arrowRight" className="h-4 w-4" />
                        )}
                      </button>

                      {isDemo ? (
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {form.demoNotice}
                        </p>
                      ) : null}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
