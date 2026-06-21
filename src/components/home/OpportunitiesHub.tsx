'use client';

import { useState, useEffect } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getRecentOpportunities, getOpportunitiesByType, getFeaturedOpportunities } from '@/lib/data/opportunities';
import { OpportunityTypeLabels, OpportunityTypeColors } from '@/lib/enums';
import type { OpportunityListItem } from '@/lib/data/opportunities';
import type { OpportunityType } from '@prisma/client';

type TabKey = 'entry' | 'internships' | 'scholarships';

const TABS: { key: TabKey; label: string; type?: OpportunityType }[] = [
  { key: 'entry', label: 'Entry Level' },
  { key: 'internships', label: 'Internships', type: 'INTERNSHIP' as OpportunityType },
  { key: 'scholarships', label: 'Scholarships', type: 'SCHOLARSHIP' as OpportunityType },
];

// Fallback data for when DB is empty
const FALLBACK: Record<TabKey, { title: string; sub: string; right: string; rightClass?: string }[]> = {
  entry: [
    { title: 'Graduate Trainee', sub: 'Safaricom \u00b7 Nairobi', right: '5d ago' },
    { title: 'Assistant Accountant', sub: 'KPMG \u00b7 Nairobi', right: '2d ago' },
    { title: 'Field Officer', sub: 'World Food Programme \u00b7 Kisumu', right: '1w ago' },
    { title: 'Sales Representative', sub: 'Twiga Foods \u00b7 Mombasa', right: '3d ago' },
  ],
  internships: [
    { title: 'Software Dev Intern', sub: 'Google \u00b7 Remote', right: '4d ago' },
    { title: 'Data Science Intern', sub: 'UN Habitat \u00b7 Nairobi', right: '1d ago' },
    { title: 'Audit Intern', sub: 'EY \u00b7 Nairobi', right: '2w ago' },
    { title: 'Communications Intern', sub: 'Red Cross \u00b7 Nairobi', right: '5d ago' },
  ],
  scholarships: [
    { title: 'Mastercard Foundation Scholars Program', sub: 'Full Tuition', right: 'Closes 15 Jun', rightClass: 'text-red-600 font-medium' },
    { title: 'DAAD Kenya Scholarships', sub: 'Partial Tuition', right: 'Closes 30 Jun', rightClass: 'text-red-600 font-medium' },
    { title: 'KCB Foundation Scholarships', sub: 'Full Tuition', right: 'Closes 10 Jul', rightClass: 'text-red-600 font-medium' },
    { title: 'Equity Group Wings to Fly', sub: 'Full Tuition', right: 'Closes 25 Jun', rightClass: 'text-red-600 font-medium' },
  ],
};

export function OpportunitiesHub() {
  const [activeTab, setActiveTab] = useState<TabKey>('entry');
  const [data, setData] = useState<Record<TabKey, OpportunityListItem[]>>({
    entry: [],
    internships: [],
    scholarships: [],
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [featured, internships, scholarships] = await Promise.all([
          getFeaturedOpportunities(4),
          getOpportunitiesByType('INTERNSHIP' as OpportunityType, 4),
          getOpportunitiesByType('SCHOLARSHIP' as OpportunityType, 4),
        ]);
        setData({
          entry: featured,
          internships,
          scholarships,
        });
      } catch {
        // Use fallback
      } finally {
        setLoaded(true);
      }
    }
    load();
  }, []);

  const currentItems = loaded && data[activeTab].length > 0
    ? data[activeTab].map((o) => ({
        title: o.title,
        sub: `${o.providerName}${o.locationCity ? ` \u00b7 ${o.locationCity}` : ''}`,
        right: o.deadline ? `Closes ${new Date(o.deadline).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}` : 'Open',
        rightClass: o.deadline ? 'text-red-600 font-medium' : 'text-gray-300',
      }))
    : FALLBACK[activeTab];

  return (
    <section className="border-t border-gray-200/50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="🚀 Opportunities Hub"
          subtitle="Discover internships, scholarships, graduate programs, and career opportunities."
          viewAllHref="/opportunities"
        />

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-gray-200/60 pb-3">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition ${
                activeTab === tab.key
                  ? 'bg-emerald-700 text-white shadow-emerald-700/20'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              {tab.label}
              <span
                className={`ml-1 text-xs ${
                  activeTab === tab.key ? 'text-emerald-200' : 'text-gray-400'
                }`}
              >
                ({currentItems.length})
              </span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <ul className="divide-y divide-gray-200/50 rounded-xl border border-white/60 bg-white/70 px-4 backdrop-blur-sm">
          {currentItems.map((item, i) => (
            <li
              key={`${activeTab}-${i}`}
              className="flex flex-wrap items-center justify-between gap-2 py-3"
            >
              <div>
                <span className="text-sm font-semibold text-gray-800">{item.title}</span>
                <span className="ml-2 text-sm text-gray-400">{item.sub}</span>
              </div>
              <span className={`text-xs ${item.rightClass ?? 'text-gray-300'}`}>{item.right}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}