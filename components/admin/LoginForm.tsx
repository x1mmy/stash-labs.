'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/app/admin/actions';

const field =
  'w-full rounded-[3px] border border-line bg-bg px-3.5 py-2.5 text-[15px] text-ink transition-colors placeholder:text-ink-3 hover:border-line-strong focus:border-line-strong';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full cursor-pointer rounded-[3px] bg-accent px-4 py-3 font-mono text-[11.5px] uppercase tracking-[.12em] text-accent-ink transition-opacity hover:opacity-90 active:translate-y-px disabled:opacity-60"
    >
      {pending ? 'Checking…' : 'Sign in'}
    </button>
  );
}

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useFormState(login, {});

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="next" value={next ?? '/admin'} />
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
          Email
        </span>
        <input
          className={field}
          type="email"
          name="email"
          autoComplete="username"
          required
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] uppercase tracking-[.1em] text-ink-3">
          Password
        </span>
        <input
          className={field}
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
      </label>

      {state?.error && (
        <p
          role="alert"
          className="m-0 rounded-[3px] border border-accent/40 bg-accent/[.07] px-3 py-2 text-[13px] text-accent"
        >
          {state.error}
        </p>
      )}

      <div className="mt-2">
        <Submit />
      </div>
    </form>
  );
}
