'use client';

import { useEffect, useState } from 'react';
import { Monitor, Heart, Calculator, HardHat, GraduationCap, Building2, Scale, Truck, Palette, Handshake } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ScrollContainer } from '@/components/shared/ScrollContainer';
import { getAllCategories } from '@/lib/data/categories';
import type { CategoryWithCount } from '@/lib/data/categories';

// Map category slugs/labels to icons
const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  'it-software': <Monitor className="h-8 w-8 text-emerald-600" />,
  'health-medical': <Heart className="h-8 w-8 text-rose-500" />,
  'finance-accounting': <Calculator className="h-8 w-8 text-amber-600" />,
  'engineering': <HardHat className="h-8 w-8 text-orange-600" />,
  'education': <GraduationCap className="h-8 w-8 text-emerald-700" />,
  'administration': <Building2 className="h-8 w-8 text-gray-600" />,
  'legal': <Scale className="h-8 w-8 text-purple-600" />,
  'logistics': <Truck className="h-8 w-8 text-teal-600" />,
  'creative-design': <Palette className="h-8 w-8 text-pink-500" />,
  'ngo-social-work': <Handshake className="h-8 w-8 text-emerald-500" />,
};

// Fallback categories for when DB is empty
const FALLBACK_CATEGORIES = [
  { id: '1', label: 'IT & Software', slug: 'it-software', jobCount: 124 },
  { id: '2', label: 'Health & Medical', slug: 'health-medical', jobCount: 87 },
  { id: '3', label: 'Finance & Accounting', slug: 'finance-accounting', jobCount: 63 },
  { id: '4', label: 'Engineering', slug: 'engineering', jobCount: 52 },
  { id: '5', label: 'Education', slug: 'education', jobCount: 41 },
  { id: '6', label: 'Administration', slug: 'administration', jobCount: 38 },
  { id: '7', label: 'Legal', slug: 'legal', jobCount: 24 },
  { id: '8', label: 'Logistics', slug: 'logistics', jobCount: 19 },
  { id: '9', label: 'Creative & Design', slug: 'creative-design', jobCount: 16 },
  { id: '10', label: 'NGO & Social Work', slug: 'ngo-social-work', jobCount: 28 },
];

export function BrowseByCategory() {
  const [categories, setCategories] = useState<(CategoryWithCount | typeof FALLBACK_CATEGORIES[number])[]>(
    FALLBACK_CATEGORIES
  );

  useEffect(() => {
    getAllCategories()
      .then((cats) => {
        if (cats.length > 0) {
          setCategories(cats.map((c) => ({ ...c, jobCount: c._count.jobs })));
        }
      })
      .catch(() => {
        // Use fallback
      });
  }, []);

  return (
    <section className="border-t border-gray-200/50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Browse by Category"
          subtitle="Explore opportunities based on your field, interests, and experience."
          viewAllHref="/categories"
        />

        <ScrollContainer>
          {categories.map((cat) => {
            const icon = CATEGORY_ICON_MAP[cat.slug] ?? (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-700">
                {cat.label.charAt(0)}
              </div>
            );

            return (
              <a
                key={cat.id}
                href={`/jobs/category/${cat.slug}`}
                className="category-item flex w-[160px] flex-shrink-0 flex-col items-center rounded-xl border border-white/60 bg-white/70 p-4 text-center backdrop-blur-sm transition hover:border-emerald-400 sm:w-[170px]"
              >
                <div className="mb-2">{icon}</div>
                <p className="text-sm font-semibold text-gray-800">{cat.label}</p>
                <span className="text-xs text-gray-400">
                  {'jobCount' in cat ? `${cat.jobCount} jobs` : '0 jobs'}
                </span>
              </a>
            );
          })}
        </ScrollContainer>
      </div>
    </section>
  );
}