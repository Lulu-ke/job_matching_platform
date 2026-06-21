import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';

const FEATURED_ARTICLE = {
  title: 'The Ultimate CV Checklist for 2026',
  excerpt: 'From formatting to keywords – everything you need to get past ATS filters and land interviews.',
  date: '15 Jun 2026',
  readTime: '8 min read',
  image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop&crop=center',
};

const SMALL_ARTICLES = [
  {
    title: 'Cover Letter Secrets',
    excerpt: 'How to make yours stand out.',
    category: 'Writing Tips',
    categoryColor: 'text-blue-600',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop&crop=center',
  },
  {
    title: 'Ace Your Virtual Interview',
    excerpt: 'Prepare with confidence.',
    category: 'Interview Tips',
    categoryColor: 'text-purple-600',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=200&fit=crop&crop=center',
  },
  {
    title: 'Salary Negotiation in Kenya',
    excerpt: 'Tactics that work.',
    category: 'Salary Guide',
    categoryColor: 'text-amber-600',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop&crop=center',
  },
];

const TRENDING_TOPICS = [
  'CV Writing Tips',
  'Interview Questions',
  'Salary Trends 2026',
  'Remote Work Guide',
  'Reskilling for 2026',
];

export function CareerAdviceSection() {
  return (
    <section className="border-t border-gray-200/50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="📖 Career Advice & Resources"
          subtitle="Practical guides to help you write better CVs, prepare for interviews, and negotiate salaries."
          viewAllHref="/career-advice"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main content (2/3) */}
          <div className="space-y-6 lg:col-span-2">
            {/* Featured article */}
            <Link
              href="#"
              className="group relative block overflow-hidden rounded-xl border border-white/60 transition hover:border-emerald-400"
            >
              <img
                src={FEATURED_ARTICLE.image}
                alt="Team collaboration"
                className="h-64 w-full object-cover md:h-72"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <span className="mb-3 inline-block rounded-full bg-black/30 px-3 py-1 text-xs font-bold text-emerald-300">
                  <BookOpen className="mr-1 inline-block h-3 w-3" /> Featured
                </span>
                <h3 className="text-xl font-extrabold leading-snug text-white transition group-hover:text-emerald-200 md:text-2xl">
                  {FEATURED_ARTICLE.title}
                </h3>
                <p className="mt-2 max-w-md text-sm text-white/80">{FEATURED_ARTICLE.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-white/60">
                  <span>&#128197; {FEATURED_ARTICLE.date}</span>
                  <span>&#9201; {FEATURED_ARTICLE.readTime}</span>
                </div>
              </div>
            </Link>

            {/* Small article cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {SMALL_ARTICLES.map((article) => (
                <Link
                  key={article.title}
                  href="#"
                  className="group overflow-hidden rounded-xl border border-white/60 bg-white/70 backdrop-blur-sm transition hover:border-emerald-400 hover:bg-emerald-50/30"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-32 w-full object-cover"
                  />
                  <div className="p-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wide ${article.categoryColor}`}>
                      {article.category}
                    </span>
                    <h4 className="mt-1 text-sm font-semibold text-gray-800 transition group-hover:text-emerald-600">
                      {article.title}
                    </h4>
                    <p className="mt-0.5 text-xs text-gray-500">{article.excerpt}</p>
                    <span className="mt-1 block text-[10px] text-gray-400">{article.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* View all link */}
            <div className="mt-4 text-center">
              <Link
                href="/career-advice"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
              >
                View all articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar (1/3) */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
              <h4 className="mb-4 flex items-center gap-2 border-b border-gray-200/60 pb-3 text-sm font-bold uppercase tracking-wider text-gray-700">
                <span>🔥</span> Trending Topics
              </h4>
              <ul className="space-y-3">
                {TRENDING_TOPICS.map((topic) => (
                  <li key={topic}>
                    <Link
                      href={`/career-advice?q=${encodeURIComponent(topic)}`}
                      className="group flex items-center justify-between rounded-lg p-2 text-sm text-gray-700 transition hover:bg-emerald-50/50 hover:text-emerald-600"
                    >
                      <span>{topic}</span>
                      <span className="text-xs text-gray-400 transition group-hover:text-emerald-600">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mini CTA */}
              <div className="mt-6 border-t border-gray-200/60 pt-4">
                <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50/70 p-4 text-center">
                  <p className="text-xs font-semibold text-gray-600">Get weekly career tips</p>
                  <button className="mt-2 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700">
                    Subscribe &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}