'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getJobsByType } from '@/lib/data/jobs';
import type { JobWithOrg } from '@/lib/data/jobs';
import type { EmploymentType } from '@prisma/client';

type FlexTab = 'part-time' | 'contract' | 'freelance' | 'casual';

const TABS: { key: FlexTab; label: string; type: EmploymentType }[] = [
  { key: 'part-time', label: 'Part-Time', type: 'PART_TIME' },
  { key: 'contract', label: 'Contract', type: 'CONTRACT' },
  { key: 'freelance', label: 'Freelance', type: 'FREELANCE' },
  { key: 'casual', label: 'Casual', type: 'CASUAL' },
];

const TYPE_COLORS: Record<string, string> = {
  'PART_TIME': 'bg-blue-50 text-blue-700',
  'CONTRACT': 'bg-amber-50 text-amber-700',
  'FREELANCE': 'bg-purple-50 text-purple-700',
  'CASUAL': 'bg-orange-50 text-orange-700',
  'TEMPORARY': 'bg-yellow-50 text-yellow-700',
};

const FALLBACK_JOBS: Record<FlexTab, { title: string; location: string; type: string; typeKey: string; salary: string; emoji: string }[]> = {
  'part-time': [
    { title: 'Retail Sales Assistant', location: 'Nairobi', type: 'Part-time', typeKey: 'PART_TIME', salary: 'KSh 15k/mo', emoji: '🛍️' },
    { title: 'Tutor - Mathematics', location: 'Nakuru', type: 'Part-time', typeKey: 'PART_TIME', salary: 'KSh 800/hr', emoji: '📚' },
    { title: 'Restaurant Server', location: 'Mombasa', type: 'Part-time', typeKey: 'PART_TIME', salary: 'KSh 12k/mo', emoji: '🍽️' },
    { title: 'Data Entry Clerk', location: 'Remote', type: 'Part-time', typeKey: 'PART_TIME', salary: 'KSh 10k/mo', emoji: '💻' },
  ],
  'contract': [
    { title: 'Project Manager', location: 'Nairobi', type: 'Contract', typeKey: 'CONTRACT', salary: 'KSh 180k/mo', emoji: '📊' },
    { title: 'Consultant - HR', location: 'Nairobi', type: 'Contract', typeKey: 'CONTRACT', salary: 'KSh 120k/mo', emoji: '🤝' },
    { title: 'Electrical Technician', location: 'Kisumu', type: 'Contract', typeKey: 'CONTRACT', salary: 'KSh 45k/mo', emoji: '⚡' },
    { title: 'Surveyor', location: 'Mombasa', type: 'Contract', typeKey: 'CONTRACT', salary: 'KSh 60k/mo', emoji: '📐' },
  ],
  'freelance': [
    { title: 'Freelance Writer', location: 'Remote', type: 'Freelance', typeKey: 'FREELANCE', salary: 'KSh 2k/article', emoji: '✍️' },
    { title: 'Graphic Designer', location: 'Remote', type: 'Freelance', typeKey: 'FREELANCE', salary: 'KSh 5k/project', emoji: '🎨' },
    { title: 'Web Developer', location: 'Remote', type: 'Freelance', typeKey: 'FREELANCE', salary: 'KSh 50k/project', emoji: '🌐' },
    { title: 'Social Media Manager', location: 'Nairobi', type: 'Freelance', typeKey: 'FREELANCE', salary: 'KSh 20k/mo', emoji: '📱' },
  ],
  'casual': [
    { title: 'Event Staff', location: 'Mombasa', type: 'Casual', typeKey: 'CASUAL', salary: 'KSh 1.5k/day', emoji: '🎪' },
    { title: 'Warehouse Assistant', location: 'Nairobi', type: 'Casual', typeKey: 'CASUAL', salary: 'KSh 1.2k/day', emoji: '📦' },
    { title: 'Construction Helper', location: 'Nakuru', type: 'Casual', typeKey: 'CASUAL', salary: 'KSh 1k/day', emoji: '🏗️' },
    { title: 'Farm Worker', location: 'Eldoret', type: 'Casual', typeKey: 'CASUAL', salary: 'KSh 800/day', emoji: '🌾' },
  ],
};

const ACROSS_KENYA = [
  { county: 'Nairobi', count: 234 },
  { county: 'Mombasa', count: 98 },
  { county: 'Kisumu', count: 76 },
  { county: 'Nakuru', count: 63 },
  { county: 'Eldoret', count: 52 },
  { county: 'Thika', count: 41 },
  { county: 'Kakamega', count: 29 },
  { county: 'Machakos', count: 33 },
];

export function FlexibleJobsSection() {
  const [activeTab, setActiveTab] = useState<FlexTab>('part-time');
  const [jobs, setJobs] = useState<Record<FlexTab, JobWithOrg[]>>({
    'part-time': [],
    'contract': [],
    'freelance': [],
    'casual': [],
  });

  useEffect(() => {
    async function load() {
      try {
        const results = await Promise.all(
          TABS.map((t) => getJobsByType(t.type, 1, 4))
        );
        const mapped: Record<FlexTab, JobWithOrg[]> = {} as Record<FlexTab, JobWithOrg[]>;
        results.forEach((r, i) => {
          mapped[TABS[i].key] = r.data;
        });
        setJobs(mapped);
      } catch {
        // Use fallback
      }
    }
    load();
  }, []);

  const currentTab = TABS.find((t) => t.key === activeTab)!;
  const currentJobs = jobs[activeTab];
  const useFallback = currentJobs.length === 0;
  const displayItems = useFallback ? FALLBACK_JOBS[activeTab] : null;

  return (
    <section className="border-t border-gray-200/50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Flexible Jobs */}
          <div className="lg:col-span-2">
            <SectionHeading
              title="🧩 Flexible Work Opportunities"
              subtitle="Browse casual, temporary, freelance, and part-time jobs."
              viewAllHref="/jobs?flexible=true"
            />

            {/* Tabs */}
            <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-gray-200/60 pb-3">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    activeTab === tab.key
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Job list */}
            <div className="divide-y divide-gray-200/50 rounded-xl border border-white/60 bg-white/70 backdrop-blur-sm">
              {useFallback && displayItems
                ? displayItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-wrap items-center justify-between px-5 py-4 transition hover:bg-emerald-50/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.emoji}</span>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800">{item.title}</h4>
                          <p className="text-xs text-gray-500">{item.location}</p>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center gap-3 sm:mt-0">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_COLORS[item.typeKey] ?? 'bg-gray-100 text-gray-600'}`}>
                          {item.type}
                        </span>
                        <span className="text-sm font-medium text-gray-700">{item.salary}</span>
                      </div>
                    </div>
                  ))
                : currentJobs.map((job) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.slug}`}
                      className="flex flex-wrap items-center justify-between px-5 py-4 transition hover:bg-emerald-50/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 text-xs font-bold text-emerald-700">
                          {job.title.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800">{job.title}</h4>
                          <p className="text-xs text-gray-500">
                            {[job.locationCity, job.locationCounty].filter(Boolean).join(', ') || 'Kenya'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center gap-3 sm:mt-0">
                        {job.employmentType && (
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_COLORS[job.employmentType] ?? 'bg-gray-100 text-gray-600'}`}>
                            {job.employmentType.replace('_', '-').replace(/\b\w/g, (l) => l.toUpperCase())}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
            </div>
          </div>

          {/* Right: Across Kenya */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-extrabold text-gray-800">
                <span>📍</span> Across Kenya
              </h3>
              <Link
                href="/counties"
                className="text-xs font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                View All &rarr;
              </Link>
            </div>
            <div className="rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm">
              <div className="space-y-1">
                {ACROSS_KENYA.map((loc) => (
                  <Link
                    key={loc.county}
                    href={`/jobs?county=${encodeURIComponent(loc.county)}`}
                    className="location-item flex items-center justify-between rounded-lg p-2.5 transition hover:bg-emerald-50"
                  >
                    <span className="text-sm font-medium text-gray-700 transition hover:text-emerald-700">
                      {loc.county}
                    </span>
                    <span className="rounded-full bg-emerald-100/60 px-2 py-0.5 text-xs font-medium text-emerald-600">
                      {loc.count} jobs
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}