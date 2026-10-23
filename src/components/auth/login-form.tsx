"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, TriangleAlertIcon } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { DEMO_SIGN_IN_USERNAMES } from "@/lib/providers/mock/demo-data";
import { signInSchema } from "@/lib/validation/schemas";
import { useLanguage } from "@/lib/i18n/language-context";
import { authTranslations } from "@/lib/i18n/translations";

type FieldErrors = Partial<Record<"username" | "password", string>>;

/**
 * Where to continue after signing in.
 *
 * The `next` query parameter is only honoured when it is a path inside this
 * application, so the login screen can never be used to bounce a visitor to an
 * external host. It is read on demand rather than held in state because it
 * never changes during the life of the form.
 */
function nextPathAfterSignIn(): string {
  if (typeof window === "undefined") return "/dashboard";

  const requested = new URLSearchParams(window.location.search).get("next");

  if (requested && requested.startsWith("/") && !requested.startsWith("//")) {
    return requested;
  }

  return "/dashboard";
}

/**
 * Sign-in form.
 *
 * It talks to the auth service through `useAuth()`; it has no knowledge of
 * how a session is issued. The prototype adapter never verifies a credential,
 * and the notice below says so plainly rather than pretending otherwise.
 */
export function LoginForm() {
  const { signIn, status } = useAuth();
  const { language } = useLanguage();
  const t = authTranslations[language];
  const router = useRouter();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  // Someone who is already signed in has no business on this screen.
  React.useEffect(() => {
    if (status === "authenticated") {
      router.replace(nextPathAfterSignIn());
    }
  }, [status, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const parsed = signInSchema.safeParse({ username, password });

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if ((key === "username" || key === "password") && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const outcome = await signIn({
      username: parsed.data.username,
      password: parsed.data.password,
    });
    setSubmitting(false);

    if (!outcome.ok) {
      setFormError(outcome.message);
      return;
    }

    router.replace(nextPathAfterSignIn());
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">
          {t.loginForm.title}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {t.loginForm.subtitle}
        </p>
      </div>

      {formError ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <TriangleAlertIcon
            className="mt-0.5 size-4 shrink-0"
            aria-hidden="true"
          />
          <p>{formError}</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <Field data-invalid={Boolean(errors.username)}>
          <FieldLabel htmlFor="username">{t.loginForm.username}</FieldLabel>
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? "username-error" : undefined}
            placeholder="demo.admin"
            className="h-10"
          />
          <FieldError
            id="username-error"
            errors={
              errors.username ? [{ message: errors.username }] : undefined
            }
          />
        </Field>

        <Field data-invalid={Boolean(errors.password)}>
          <FieldLabel htmlFor="password">{t.loginForm.password}</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              className="h-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? t.loginForm.hidePassword : t.loginForm.showPassword}
              aria-pressed={showPassword}
              className="absolute top-1/2 right-1 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {showPassword ? (
                <EyeOffIcon className="size-4" aria-hidden="true" />
              ) : (
                <EyeIcon className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
          <FieldError
            id="password-error"
            errors={
              errors.password ? [{ message: errors.password }] : undefined
            }
          />
        </Field>

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full"
        >
          {submitting ? (
            <>
              <Spinner />
              {t.loginForm.signingIn}
            </>
          ) : (
            t.loginForm.signIn
          )}
        </Button>
      </form>

      <div className="rounded-lg border border-line bg-surface p-4">
        <p className="text-sm font-semibold text-navy">{t.loginForm.prototypeMode}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.loginForm.prototypeDesc}
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {DEMO_SIGN_IN_USERNAMES.map((name) => (
            <li key={name}>
              <button
                type="button"
                onClick={() => {
                  setUsername(name);
                  setErrors((current) => ({ ...current, username: undefined }));
                }}
                className="rounded-md border border-line bg-white px-2 py-1 font-mono text-xs text-navy transition-colors hover:border-brand hover:bg-brand-tint"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
        <FieldDescription className="mt-2">
          {t.loginForm.fillUsername}
        </FieldDescription>
      </div>
    </div>
  );
}
