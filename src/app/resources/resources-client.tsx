'use client';

import { useState } from 'react';
import { Clock } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/utils/seo';

// ============================================================
// DATA (shared with server page)
// ============================================================

const CATEGORIES = [
  'All',
  'CV Tips',
  'Interview Prep',
  'Salary Guide',
  'Career Growth',
  'Remote Work',
  'Government Jobs',
] as const;

type Category = (typeof CATEGORIES)[number];

interface Article {
  slug: string;
  title: string;
  description: string;
  category: Category;
  readTime: string;
  date: string;
}

const ARTICLES: Article[] = [
  {
    slug: 'how-to-write-kenyan-cv',
    title: 'How to Write a CV That Gets Noticed in Kenya (2026 Guide)',
    description:
      'Learn the exact format, structure, and content that Kenyan recruiters look for. Includes examples for fresh graduates and experienced professionals.',
    category: 'CV Tips',
    readTime: '8 min read',
    date: '12 Jan 2026',
  },
  {
    slug: 'salary-negotiation-tips',
    title: 'Salary Negotiation Tips for Kenyan Professionals',
    description:
      'Discover proven strategies to negotiate better pay in Kenya. Understand KES market rates, when to discuss salary, and how to handle lowball offers.',
    category: 'Salary Guide',
    readTime: '6 min read',
    date: '8 Jan 2026',
  },
  {
    slug: 'government-job-application-guide',
    title: 'How to Apply for Government Jobs in Kenya: Complete Guide',
    description:
      'A step-by-step walkthrough of the Kenyan government recruitment process — from finding openings on the Public Service Commission portal to acing interviews.',
    category: 'Government Jobs',
    readTime: '10 min read',
    date: '3 Jan 2026',
  },
  {
    slug: 'interview-preparation-kenya',
    title: 'Interview Preparation Guide: What Kenyan Employers Really Ask',
    description:
      'The most common interview questions in Kenya, how to answer them, and what hiring managers in Nairobi, Mombasa, and beyond are really looking for.',
    category: 'Interview Prep',
    readTime: '7 min read',
    date: '28 Dec 2025',
  },
  {
    slug: 'cover-letter-tips-2026',
    title: 'Cover Letter Tips That Will Get You Hired in 2026',
    description:
      'Write a cover letter that stands out. Includes Kenyan-specific examples, common mistakes to avoid, and templates for different industries.',
    category: 'CV Tips',
    readTime: '5 min read',
    date: '22 Dec 2025',
  },
  {
    slug: 'remote-work-kenya-guide',
    title: 'The Complete Guide to Remote Work in Kenya',
    description:
      'Everything you need to know about finding and succeeding in remote jobs — from the best platforms to tax implications and productivity tips.',
    category: 'Remote Work',
    readTime: '9 min read',
    date: '15 Dec 2025',
  },

];

const CATEGORY_COLORS: Record<Category, string> = {
  All: 'bg-gray-100 text-gray-700',
  'CV Tips': 'bg-blue-50 text-blue-700',
  'Interview Prep': 'bg-amber-50 text-amber-700',
  'Salary Guide': 'bg-emerald-50 text-emerald-700',
  'Career Growth': 'bg-purple-50 text-purple-700',
  'Remote Work': 'bg-cyan-50 text-cyan-700',
  'Government Jobs': 'bg-rose-50 text-rose-700',
};

// ============================================================
// COMPONENT
// ============================================================

export function ResourcesClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered =
    activeCategory === 'All'
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <>
      {/* ── Category Filter ── */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'border border-gray-200 bg-white/70 text-gray-600 hover:bg-white hover:text-gray-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Article Grid ── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <a
            key={article.slug}
            href={`/resources/${article.slug}`}
            className="group flex flex-col rounded-xl border border-gray-200/60 bg-white/70 p-6 backdrop-blur-sm transition hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  CATEGORY_COLORS[article.category]
                }`}
              >
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                {article.readTime}
              </span>
            </div>
            <h3 className="text-base font-bold leading-snug text-gray-900 transition group-hover:text-emerald-600">
              {article.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
              {article.description}
            </p>
            <p className="mt-4 text-xs text-gray-400">{article.date}</p>
          </a>
        ))}
      </div>

      {/* ── Empty State ── */}
      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-gray-500">No articles found in this category yet.</p>
        </div>
      )}
    </>
  );
}