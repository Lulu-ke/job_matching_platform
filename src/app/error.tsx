'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur-sm sm:p-12">
        <div className="mb-4 text-5xl">⚠️</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Something went wrong
        </h1>
        <p className="mb-6 max-w-md text-sm text-gray-500">
          We couldn&apos;t load this page. This may be a temporary issue — please try again.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Try Again
          </button>
          <a
            href="/"
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Go Home
          </a>
        </div>
        {error.digest && (
          <p className="mt-4 text-xs text-gray-400">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}