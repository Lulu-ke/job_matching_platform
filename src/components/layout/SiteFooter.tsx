import Link from 'next/link';
import { Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import { getAllCategories } from '@/lib/data/categories';
import { UNIQUE_COUNTIES, TOP_COUNTIES } from '@/lib/data/counties';

// ============================================================
// FOOTER LINKS (fixed paths)
// ============================================================

const FOOTER_JOBS = [
  { label: 'Browse All Jobs', href: '/jobs' },
  { label: 'Government Jobs', href: '/government' },
  { label: 'Internships', href: '/jobs/type/internship' },
  { label: 'Remote Jobs', href: '/jobs?remote=true' },
  { label: 'Part-time Jobs', href: '/jobs/type/part-time' },
  { label: 'Full-time Jobs', href: '/jobs/type/full-time' },
  { label: 'Jobs by County', href: '/jobs/county' },
  { label: 'Jobs by Category', href: '/jobs/category' },
];

const FOOTER_OPPORTUNITIES = [
  { label: 'All Opportunities', href: '/opportunities' },
  { label: 'Scholarships', href: '/opportunities?type=scholarship' },
  { label: 'Grants & Fellowships', href: '/opportunities?type=grant' },
  { label: 'Training & Conferences', href: '/opportunities?type=training' },
  { label: 'Mentorship Programs', href: '/opportunities?type=mentorship' },
];

const FOOTER_COMPANY = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
];

// ============================================================
// SERVER COMPONENT
// ============================================================

export async function SiteFooter() {
  // Fetch categories for the SEO sitemap footer (Strategy 3)
  const categories = await getAllCategories().catch(() => []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Logo & tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold text-emerald-400">
                JOBR
              </span>
              <span className="rounded-full bg-emerald-800 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-300">
                KE
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Helping Kenyans discover verified jobs, internships, and
              opportunities every day.
            </p>

            {/* Social icons */}
            <div className="mt-4 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-full p-2 text-gray-500 transition hover:bg-gray-800 hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Jobs */}
          <div>
            <h4 className="font-semibold text-white">Jobs</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-400">
              {FOOTER_JOBS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Opportunities */}
          <div>
            <h4 className="font-semibold text-white">Opportunities</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-400">
              {FOOTER_OPPORTUNITIES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="font-semibold text-white">Company</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-400">
              {FOOTER_COMPANY.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Popular Categories (Strategy 3 — SEO crawl budget) */}
          <div>
            <h4 className="font-semibold text-white">Popular Categories</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-400">
              {categories.slice(0, 10).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/jobs/category/${cat.slug}`}
                    className="transition hover:text-white"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO Category Links Bar (Strategy 3 — all 49 categories as plain links) */}
        {categories.length > 10 && (
          <div className="mt-6 border-t border-gray-800 pt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              All Job Categories
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/jobs/category/${cat.slug}`}
                  className="text-xs text-gray-500 transition hover:text-gray-300"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SEO County Links Bar (Strategy 3 — all 47 counties for crawl budget) */}
        <div className="mt-6 border-t border-gray-800 pt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Jobs by County
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {UNIQUE_COUNTIES.map((county) => (
              <Link
                key={county.slug}
                href={`/jobs/county/${county.slug}`}
                className="text-xs text-gray-500 transition hover:text-gray-300"
              >
                {county.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-6 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} JOBR Kenya. All rights
            reserved.
          </p>
          <div className="hidden items-center gap-3 sm:flex">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-800 hover:text-white"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}