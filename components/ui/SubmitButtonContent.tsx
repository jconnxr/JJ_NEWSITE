type Props = {
  status: "idle" | "loading" | "success" | "error";
  idleLabel: string;
};

export function SubmitButtonContent({ status, idleLabel }: Props) {
  if (status === "loading") {
    return (
      <span className="flex items-center justify-center gap-2" aria-live="polite">
        <svg
          className="h-5 w-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span>Sending…</span>
      </span>
    );
  }

  if (status === "success") {
    return (
      <span className="flex items-center justify-center gap-2" aria-live="polite">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span>Sent</span>
      </span>
    );
  }

  return <span>{idleLabel}</span>;
}
