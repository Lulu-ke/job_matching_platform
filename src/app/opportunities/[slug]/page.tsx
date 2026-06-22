import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ExternalLink,
  Mail,
  Heart,
  Globe,
  MapPin,
  Clock,
  CalendarDays,
  Banknote,
  Building2,
} from 'lucide-react';
import { OpportunityType } from '@prisma/client';
import {
  getOpportunityBySlug,
  getAllOpportunitySlugs,
  getSimilarOpportunities,
  getOpportunitiesByProvider,
} from '@/lib/data/opportunities';
import type { OpportunityDetail, OpportunityListItem } from '@/lib/data/opportunities';
import {
  OpportunityTypeLabels,
  OpportunityTypeColors,
  FundingDisclosureLabels,
} from '@/lib/enums';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import {
  generateBreadcrumbSchema,
  truncate,
  formatRelativeDate,
  formatDeadlineCountdown,
  formatDate,
  isClosingSoon,
} from '@/lib/utils/seo';
import { Badge } from '@/components/ui/badge';
import { GoogleAdPlaceholder, SmartMatchingWidget } from '@/components/shared/MarketingSidebar';

// ============================================================
// RENDERING MODE
// ============================================================

export const dynamic = 'force-dynamic';

// ============================================================
// TYPES
// ============================================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ============================================================
// STATIC PARAMS
// ============================================================

export async function generateStaticParams() {
  try {
    const slugs = await getAllOpportunitySlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const opp = await getOpportunityBySlug(slug);

  if (!opp) {
    return { title: 'Opportunity Not Found | JOBR Kenya' };
  }

  const typeLabel = OpportunityTypeLabels[opp.type];
  const description = opp.seoDescription
    ? opp.seoDescription.slice(0, 160)
    : truncate(opp.description, 160);

  const title = opp.seoTitle || `${opp.title} — ${typeLabel}`;

  return {
    title,
    description,
    alternates: { canonical: `/opportunities/${opp.slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: opp.datePosted.toISOString(),
      ...(opp.deadline && { expiresTime: opp.deadline.toISOString() }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ============================================================
// HELPERS
// ============================================================

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function getLocationLabel(
  city?: string | null,
  county?: string | null,
  isRemote?: boolean,
  isOnline?: boolean
): string {
  const parts: string[] = [];
  if (isOnline) parts.push('Online');
  else if (isRemote) parts.push('Remote');
  if (city) parts.push(city);
  else if (county) parts.push(county);
  return parts.join(', ') || 'Kenya';
}

function formatFundingText(
  disclosure: string,
  amount?: number | null,
  currency: string = 'KES'
): string {
  const label = FundingDisclosureLabels[disclosure as keyof typeof FundingDisclosureLabels];
  if (!label || label === 'Not Disclosed') return 'Not disclosed';
  if (label === 'Show Amount' && amount) {
    const symbol = currency === 'KES' ? 'KSh' : currency;
    if (amount >= 1_000_000) return `${symbol} ${(amount / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (amount >= 1_000) return `${symbol} ${(amount / 1_000).toFixed(0)}K`;
    return `${symbol} ${amount.toLocaleString('en-KE')}`;
  }
  return label;
}

function formatRichText(text: string): string {
  if (!text) return '';

  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^([ \t]*[-*][ \t]+)(.+)$/gm, '<li>$2</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);
  html = html.replace(/^([ \t]*\d+[.)][ \t]+)(.+)$/gm, '<li>$2</li>');
  html = html.replace(/^(#{1,6})\s+(.+)$/gm, (_match, hashes, content) => {
    const level = hashes.length;
    return `<h${Math.min(level, 4)}>${content}</h${Math.min(level, 4)}>`;
  });

  html = html
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^<(ul|ol|h[1-4])/.test(trimmed)) return trimmed;
      return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
    })
    .filter(Boolean)
    .join('\n');

  return html;
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/60 bg-white/70 p-6 backdrop-blur-sm">
      <h2 className="text-lg font-extrabold text-gray-800">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

// ============================================================
// MORE FROM THIS PROVIDER
// ============================================================

function MoreFromProvider({
  opportunities,
  providerName,
  excludeId,
}: {
  opportunities: OpportunityListItem[];
  providerName: string;
  excludeId: string;
}) {
  if (opportunities.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/60 bg-white/70 backdrop-blur-sm">
      <div className="border-b border-gray-200/60 px-6 py-4">
        <h3 className="flex items-center gap-2 text-base font-extrabold text-gray-800">
          <Building2 className="h-4 w-4" />
          More from {providerName}
        </h3>
      </div>
      <div className="divide-y divide-gray-200/50">
        {opportunities.slice(0, 5).map((opp) => (
          <Link
            key={opp.id}
            href={`/opportunities/${opp.slug}`}
            className="flex items-center justify-between gap-3 px-6 py-3.5 transition hover:bg-emerald-50/30"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-800 transition hover:text-emerald-600">
                {opp.title}
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${OpportunityTypeColors[opp.type]}`}>
                  {OpportunityTypeLabels[opp.type]}
                </span>
                {opp.deadline && (
                  <span className="text-xs text-gray-400">
                    {formatRelativeDate(opp.datePosted)}
                  </span>
                )}
              </div>
            </div>
            {opp.deadline && (
              <span className={`shrink-0 text-xs font-medium ${
                formatDeadlineCountdown(opp.deadline) === 'Closed'
                  ? 'text-gray-400'
                  : 'text-red-600'
              }`}>
                {formatDeadlineCountdown(opp.deadline)}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SIMILAR OPPORTUNITIES
// ============================================================

function SimilarOpportunities({ opportunities, title }: { opportunities: OpportunityListItem[]; title?: string }) {
  if (opportunities.length === 0) return null;

  return (
    <div>
      <h3 className="mb-4 text-lg font-extrabold text-gray-800">{title || 'Similar Opportunities'}</h3>
      <div className="divide-y divide-gray-200/50 rounded-xl border border-white/60 bg-white/70 backdrop-blur-sm">
        {opportunities.slice(0, 5).map((opp, i) => {
          const location = getLocationLabel(opp.locationCity, opp.locationCounty, opp.isRemote, opp.isOnline);

          return (
            <Link
              key={opp.id}
              href={`/opportunities/${opp.slug}`}
              className={`flex flex-wrap items-center justify-between gap-2 py-3 px-5 transition hover:bg-emerald-50/30 ${
                i === 0 ? 'rounded-t-xl' : ''
              } ${i === Math.min(opportunities.length, 5) - 1 ? 'rounded-b-xl' : ''}`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${OpportunityTypeColors[opp.type]}`}
                >
                  {OpportunityTypeLabels[opp.type]}
                </span>
                <span className="text-sm font-semibold text-gray-800 transition hover:text-emerald-600">
                  {opp.title}
                </span>
                <span className="text-sm text-gray-400">
                  {opp.providerName}{location ? ` · ${location}` : ''}
                </span>
              </div>
              <span className="text-xs text-gray-500">{formatRelativeDate(opp.datePosted)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// PAGE
// ============================================================

export default async function OpportunityDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const opp = await getOpportunityBySlug(slug);
  if (!opp) notFound();

  // Fetch similar opps by type, by county, and more from provider in parallel
  const [similarByType, similarByCounty, moreFromProvider] = await Promise.all([
    getSimilarOpportunities(opp.id, opp.type, undefined, 5).catch(() => []),
    opp.locationCounty
      ? getSimilarOpportunities(opp.id, undefined, opp.locationCounty, 5).catch(() => [])
      : Promise.resolve([]),
    getOpportunitiesByProvider(opp.providerName, opp.id, 5).catch(() => []),
  ]);

  // Deduplicate and prefer type-based similar, then county, then provider
  const seenIds = new Set([opp.id]);
  const relatedOpps: OpportunityListItem[] = [];

  for (const item of [...similarByType, ...similarByCounty]) {
    if (!seenIds.has(item.id) && relatedOpps.length < 5) {
      seenIds.add(item.id);
      relatedOpps.push(item);
    }
  }

  const typeLabel = OpportunityTypeLabels[opp.type];
  const typeColor = OpportunityTypeColors[opp.type];
  const locationLabel = getLocationLabel(opp.locationCity, opp.locationCounty, opp.isRemote, opp.isOnline);
  const fundingText = formatFundingText(opp.fundingDisclosure as string, opp.fundingAmount, opp.fundingCurrency);
  const deadlineText = opp.deadline ? formatDeadlineCountdown(opp.deadline) : null;
  const closingSoon = opp.deadline ? isClosingSoon(opp.deadline) : false;
  const isClosed = deadlineText === 'Closed';

  // Apply actions
  const hasApplyUrl = !!opp.applicationUrl;
  const hasApplyEmail = !!opp.applyEmail && !hasApplyUrl;

  // ── JSON-LD Schemas ──
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Opportunities', href: 'https://jobr.co.ke/opportunities' },
    { name: typeLabel, href: `https://jobr.co.ke/opportunities/type/${opp.type.toLowerCase().replace(/_/g, '-')}` },
    { name: opp.title },
  ]);

  // Organization JSON-LD (when linked to a provider org)
  const organizationSchema = opp.providerOrg ? {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: opp.providerOrg.orgName,
    url: `https://jobr.co.ke/organizations/${opp.providerOrg.orgSlug}`,
    ...(opp.providerWebsite && { sameAs: opp.providerWebsite }),
  } : null;

  // ── Breadcrumb items ──
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Opportunities', href: '/opportunities' },
    {
      label: typeLabel,
      href: `/opportunities/type/${opp.type.toLowerCase().replace(/_/g, '-')}`,
    },
    { label: opp.title },
  ];

  return (
    <>
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* JSON-LD: Organization (if provider is linked) */}
      {organizationSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <BreadcrumbNav items={breadcrumbItems} />
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Content (2/3) */}
          <div className="space-y-6 lg:col-span-2">
            {/* ── Header Card ── */}
            <div className="rounded-xl border border-white/60 bg-white/70 p-6 backdrop-blur-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Provider avatar */}
                  {opp.providerLogoUrl ? (
                    <img
                      src={opp.providerLogoUrl}
                      alt={opp.providerName}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-xl font-extrabold text-emerald-700 shadow-sm">
                      {getInitials(opp.providerName)}
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-extrabold leading-tight text-gray-800 md:text-3xl">
                      {opp.title}
                    </h1>
                    <p className="mt-0.5 flex items-center gap-2 text-sm text-gray-500">
                      {opp.providerOrg ? (
                        <Link
                          href={`/organizations/${opp.providerOrg.orgSlug}`}
                          className="font-semibold text-gray-700 transition hover:text-emerald-600"
                        >
                          {opp.providerName}
                        </Link>
                      ) : (
                        <span className="font-semibold text-gray-700">{opp.providerName}</span>
                      )}
                      <span className="text-gray-300">&bull;</span>
                      <span>{locationLabel}</span>
                    </p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${typeColor}`}>
                    {typeLabel}
                  </span>
                  {opp.featured && (
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Meta row */}
              <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-gray-200/50 pt-4 text-xs text-gray-500">
                {fundingText && (
                  <span className="flex items-center gap-1.5">
                    <Banknote className="h-3.5 w-3.5" />
                    <span className="font-medium text-emerald-600">{fundingText}</span>
                  </span>
                )}
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Posted <span className="font-medium text-gray-700">{formatRelativeDate(opp.datePosted)}</span>
                </span>
                {opp.deadline && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      Closes{' '}
                      <span className={`font-medium ${isClosed ? 'text-gray-400' : 'text-red-600'}`}>
                        {formatDate(opp.deadline)}
                      </span>
                    </span>
                  </>
                )}
                {opp.openToInternational && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                      Open Internationally
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* ── Description ── */}
            <DetailSection title="Description">
              <div
                className="text-sm leading-relaxed text-gray-600 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: formatRichText(opp.description) }}
              />
            </DetailSection>

            {/* ── Eligibility Criteria ── */}
            {opp.eligibilityCriteria && (
              <DetailSection title="Eligibility Criteria">
                <div
                  className="text-sm leading-relaxed text-gray-600 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatRichText(opp.eligibilityCriteria) }}
                />
              </DetailSection>
            )}

            {/* ── Requirements ── */}
            {opp.requirements && (
              <DetailSection title="Requirements">
                <div
                  className="text-sm leading-relaxed text-gray-600 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatRichText(opp.requirements) }}
                />
              </DetailSection>
            )}

            {/* ── Benefits ── */}
            {opp.benefits && (
              <DetailSection title="Benefits">
                <div
                  className="text-sm leading-relaxed text-gray-600 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatRichText(opp.benefits) }}
                />
              </DetailSection>
            )}

            {/* ── How to Apply ── */}
            {opp.howToApply && (
              <DetailSection title="How to Apply">
                <div
                  className="text-sm leading-relaxed text-gray-600 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatRichText(opp.howToApply) }}
                />
              </DetailSection>
            )}

            {/* ── Apply Section (emerald gradient) ── */}
            <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50/80 p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-extrabold text-gray-800">Ready to apply?</h3>
                  <p className="text-sm text-gray-600">Submit your application before the deadline.</p>
                  {opp.deadline && !isClosed && (
                    <p className="mt-1 text-xs font-medium text-red-600">
                      Closes in {deadlineText}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {hasApplyUrl && (
                    <a
                      href={opp.applicationUrl!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-emerald-600 px-8 py-3 text-sm font-bold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700"
                    >
                      Apply Now
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {hasApplyEmail && (
                    <a
                      href={`mailto:${opp.applyEmail}`}
                      className="flex items-center gap-2 rounded-lg bg-emerald-600 px-8 py-3 text-sm font-bold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700"
                    >
                      <Mail className="h-4 w-4" />
                      Apply via Email
                    </a>
                  )}
                  <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white/70 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-emerald-400 hover:text-emerald-600">
                    <Heart className="h-4 w-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* ── More from this Provider ── */}
            <MoreFromProvider
              opportunities={moreFromProvider}
              providerName={opp.providerName}
              excludeId={opp.id}
            />

            {/* ── Provider Info ── */}
            <DetailSection title="About the Provider">
              <div className="flex items-start gap-4">
                {opp.providerLogoUrl ? (
                  <img
                    src={opp.providerLogoUrl}
                    alt={opp.providerName}
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-xl font-extrabold text-emerald-700 shadow-sm">
                    {getInitials(opp.providerName)}
                  </div>
                )}
                <div>
                  <h3 className="text-md font-bold text-gray-800">
                    {opp.providerOrg ? (
                      <Link href={`/organizations/${opp.providerOrg.orgSlug}`} className="transition hover:text-emerald-600">
                        {opp.providerName}
                      </Link>
                    ) : opp.providerName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {locationLabel}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {opp.providerOrg
                      ? `${opp.providerName} is a verified organization on JOBR Kenya. View their full profile to see all active positions and opportunities.`
                      : `${opp.providerName} is the provider of this opportunity.`}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {opp.providerOrg && (
                      <Link
                        href={`/organizations/${opp.providerOrg.orgSlug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
                      >
                        <Building2 className="h-3.5 w-3.5" />
                        View Full Profile &rarr;
                      </Link>
                    )}
                    {opp.providerWebsite && (
                      <a
                        href={opp.providerWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        Visit website &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </DetailSection>

            {/* ── Share & Report ── */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <span className="font-medium">Share:</span>
                <a
                  href={`mailto:?subject=${encodeURIComponent(opp.title)}&body=${encodeURIComponent(`Check out this opportunity on JOBR Kenya: ${opp.title}\n\nhttps://jobr.co.ke/opportunities/${opp.slug}`)}`}
                  className="transition hover:text-emerald-600"
                  title="Share via email"
                >
                  Email
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(opp.title)}&url=${encodeURIComponent(`https://jobr.co.ke/opportunities/${opp.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-emerald-600"
                  title="Share on X (Twitter)"
                >
                  X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://jobr.co.ke/opportunities/${opp.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-emerald-600"
                  title="Share on LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${opp.title} — https://jobr.co.ke/opportunities/${opp.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-emerald-600"
                  title="Share on WhatsApp"
                >
                  WhatsApp
                </a>
              </div>
              <a
                href={`mailto:hello@jobr.co.ke?subject=Report: ${encodeURIComponent(opp.title)}&body=${encodeURIComponent(`I'd like to report this opportunity: https://jobr.co.ke/opportunities/${opp.slug}\n\nReason: `)}`}
                className="text-xs text-gray-400 transition hover:text-red-500"
              >
                Report this opportunity
              </a>
            </div>

            {/* ── Similar Opportunities ── */}
            <SimilarOpportunities
              opportunities={relatedOpps}
              title={opp.locationCounty ? `More in ${opp.locationCounty}` : 'Similar Opportunities'}
            />
          </div>

          {/* Right: Sidebar (1/3) */}
          <div className="space-y-6 lg:col-span-1">
            {/* ── Opportunity Summary ── */}
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-xl border border-white/60 bg-white/70 p-5 backdrop-blur-sm">
                <h4 className="mb-3 border-b border-gray-200/60 pb-3 text-sm font-bold uppercase tracking-wider text-gray-700">
                  Opportunity Summary
                </h4>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${typeColor}`}>
                      {typeLabel}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    <span className="font-medium text-gray-700">{locationLabel}</span>
                  </div>

                  {opp.duration && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium text-gray-700">{opp.duration}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-500">Funding</span>
                    <span className="font-medium text-emerald-600">{fundingText}</span>
                  </div>

                  {opp.deadline && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Deadline</span>
                      <span
                        className={`font-medium ${
                          isClosed ? 'text-gray-400' : closingSoon ? 'text-red-600' : 'text-gray-700'
                        }`}
                      >
                        {formatDate(opp.deadline)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-500">Posted</span>
                    <span className="font-medium text-gray-700">{formatDate(opp.datePosted)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">International</span>
                    <span className="font-medium text-gray-700">
                      {opp.openToInternational ? 'Yes' : 'No'}
                    </span>
                  </div>

                  {opp.targetDemographic && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Target</span>
                      <span className="font-medium text-gray-700">{opp.targetDemographic}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Quick Info Cards ── */}
              {/* Deadline Card */}
              {opp.deadline && (
                <div className="rounded-xl border border-white/60 bg-white/70 p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                      <Clock className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Application Deadline</p>
                      <p className={`text-sm font-bold ${isClosed ? 'text-gray-400' : closingSoon ? 'text-red-600' : 'text-gray-800'}`}>
                        {isClosed ? 'Closed' : deadlineText}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Funding Card */}
              <div className="rounded-xl border border-white/60 bg-white/70 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                    <Banknote className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Funding</p>
                    <p className="text-sm font-bold text-emerald-700">{fundingText}</p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="rounded-xl border border-white/60 bg-white/70 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <MapPin className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-bold text-gray-800">{locationLabel}</p>
                  </div>
                </div>
              </div>

              {/* Provider Card */}
              <div className="rounded-xl border border-white/60 bg-white/70 p-5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  {opp.providerLogoUrl ? (
                    <img
                      src={opp.providerLogoUrl}
                      alt={opp.providerName}
                      className="h-10 w-10 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 text-sm font-extrabold text-emerald-700">
                      {getInitials(opp.providerName)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Provided by</p>
                    {opp.providerOrg ? (
                      <Link href={`/organizations/${opp.providerOrg.orgSlug}`} className="block text-sm font-bold text-gray-800 truncate transition hover:text-emerald-600">
                        {opp.providerName}
                      </Link>
                    ) : (
                      <p className="text-sm font-bold text-gray-800 truncate">{opp.providerName}</p>
                    )}
                    {opp.providerWebsite && (
                      <a
                        href={opp.providerWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-600 transition hover:text-emerald-700"
                      >
                        Visit website &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Smart Matching Widget */}
              <SmartMatchingWidget />

              {/* Ad Placeholder */}
              <GoogleAdPlaceholder />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}