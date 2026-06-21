'use client';

import { Bell, Megaphone } from 'lucide-react';
import { AdBanner } from '@/components/shared/AdBanner';

const UPDATES = [
  {
    icon: '📢',
    title: 'KNEC announces shortlisted candidates for 2026 recruitment',
    category: 'Shortlisting',
    time: '2h ago',
  },
  {
    icon: '📅',
    title: 'KRA interviews for tax officers scheduled for 28 June',
    category: 'Interview Date',
    time: '5h ago',
  },
  {
    icon: '📋',
    title: 'County government of Nakuru opens 50 new positions',
    category: 'Recruitment',
    time: '1d ago',
  },
  {
    icon: '⏳',
    title: 'TSC extends application deadline to 30 June',
    category: 'Deadline Extension',
    time: '2d ago',
  },
];

export function OfficialUpdates() {
  return (
    <section className="border-t border-gray-200/50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Updates list */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800">Official Updates</h2>
                <p className="text-sm font-light text-gray-500">
                  Stay informed with recruitment notices, shortlisting updates, and application announcements.
                </p>
              </div>
              <a
                href="#"
                className="ml-4 whitespace-nowrap text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                View all &rarr;
              </a>
            </div>
            <div className="divide-y divide-gray-200/60 rounded-xl border border-white/60 bg-white/70 backdrop-blur-sm">
              {UPDATES.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl px-4 py-3.5 transition hover:bg-white/40"
                >
                  <span className="mt-0.5 text-xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                    <div className="mt-0.5 flex items-center gap-3">
                      <span className="text-xs text-gray-400">{item.category}</span>
                      <span className="text-xs text-gray-300">&bull;</span>
                      <span className="text-xs text-gray-300">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Ad + Alerts */}
          <div className="space-y-6 lg:col-span-1">
            <AdBanner size="sidebar" />
            <div className="rounded-xl border border-emerald-100/60 bg-emerald-50 p-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-gray-800">Get alerts</h3>
              </div>
              <p className="mt-0.5 text-xs text-gray-600">
                Receive WhatsApp notifications for new jobs.
              </p>
              <button className="mt-2 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}