import Link from 'next/link';
import { Check, Sparkles, Star } from 'lucide-react';

export function JobMatchingPremium() {
  return (
    <section className="border-t border-gray-200/50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="matching-card relative overflow-hidden p-6 md:p-8">
          {/* Decorative blurs */}
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-teal-200/30 blur-3xl" />

          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
            {/* Left: Info */}
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <Sparkles className="h-7 w-7 text-emerald-600" />
                <span className="premium-badge inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-2.5 py-0.5 text-[0.6rem] font-extrabold uppercase tracking-wide text-amber-900 shadow-sm">
                  <Star className="h-2.5 w-2.5" /> Premium
                </span>
                <span className="highlight inline-block rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 px-3 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-white">
                  AI-Powered
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-800 md:text-3xl">
                Smart Job Matching
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-gray-600">
                Upload your CV — our AI extracts your skills, experience, and preferences, then matches
                you to the most relevant jobs. No more endless scrolling.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                {['CV parsing & skill extraction', 'AI-powered job matching', 'Real-time match scores', 'Personalized job alerts'].map(
                  (feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 font-extrabold text-emerald-700" />
                      {feat}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Right: CTA + Sample matches */}
            <div className="flex w-full flex-col items-start gap-3 md:w-auto md:items-end">
              <Link
                href="#"
                className="cta-btn inline-block w-full rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 px-8 py-3 text-center text-sm font-bold text-white shadow-lg shadow-emerald-700/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-700/40 md:w-auto md:text-base"
              >
                Upload CV &amp; Get Matched &rarr;
              </Link>
              <p className="text-center text-[10px] text-gray-400 md:text-right">
                Free trial &middot; No credit card required
              </p>

              <div className="mt-2 w-full space-y-1.5 md:w-64">
                {[
                  { title: 'Senior Software Engineer', org: 'Safaricom', score: 92, high: true },
                  { title: 'Data Analyst', org: 'KRA', score: 78, high: false },
                ].map((m) => (
                  <div
                    key={m.title}
                    className="match-result flex items-center justify-between rounded-lg border border-emerald-100 bg-white/70 p-3 backdrop-blur-sm transition hover:border-emerald-500 hover:bg-white/90"
                  >
                    <div>
                      <span className="text-xs font-semibold text-gray-800">{m.title}</span>
                      <span className="ml-1 text-[10px] text-gray-400">{m.org}</span>
                    </div>
                    <span
                      className={`match-score whitespace-nowrap rounded-full px-2 py-0.5 text-[0.65rem] font-extrabold ${
                        m.high
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {m.score}% Match
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}