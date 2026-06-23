import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { OpportunityType } from '@prisma/client';
import {
  slugToOpportunityType,
  opportunityTypeToSlug,
  OpportunityTypeLabels,
  OpportunityTypeColors,
  FundingDisclosureLabels,
} from '@/lib/enums';
import {
  searchOpportunities,
  getOpportunityCountsByType,
} from '@/lib/data/opportunities';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  formatRelativeDate,
  formatDeadlineCountdown,
} from '@/lib/utils/seo';
import { Badge } from '@/components/ui/badge';
import {
  SmartMatchingWidget,
  TrendingSearchesWidget,
  CVAdWidget,
  JobAlertsWidget,
  GoogleAdPlaceholder,
} from '@/components/shared/MarketingSidebar';
import type { OpportunityListItem } from '@/lib/data/opportunities';

// ============================================================
// DYNAMIC RENDERING
// ============================================================

export const dynamic = 'force-dynamic';

// ============================================================
// TYPES
// ============================================================

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}

// ============================================================
// STATIC PARAMS
// ============================================================

export async function generateStaticParams() {
  const types = Object.values(OpportunityType);
  return types.map((t) => ({
    slug: t.toLowerCase().replace(/_/g, '-'),
  }));
}

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const type = slugToOpportunityType(slug);

  if (!type) return { title: 'Opportunity Type Not Found | JOBR Kenya' };

  const label = OpportunityTypeLabels[type];

  const title = `${label} Opportunities in Kenya`;
  const description = `Discover the latest ${label.toLowerCase()} opportunities in Kenya. Browse verified listings, check deadlines, and apply today on JOBR Kenya.`;

  return {
    title,
    description,
    alternates: { canonical: `/opportunities/type/${slug}` },
    openGraph: { title, description, siteName: 'JOBR Kenya' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

// ============================================================
// SEO TEXT PER TYPE
// ============================================================

const TYPE_SEO_TEXT: Record<OpportunityType, (count: number) => string> = {
  [OpportunityType.SCHOLARSHIP]: (n) =>
    `Scholarships are one of the most sought-after opportunities for Kenyan students and professionals seeking to advance their education without financial burden. JOBR currently lists ${n} active scholarship opportunities from universities, government programs, foundations, and international organizations. These range from fully funded undergraduate and postgraduate scholarships to short-term research grants and professional development funding. Many scholarships specifically target Kenyan nationals, while others are open to applicants across Africa or globally. Use this page to filter by deadline, funding type, and location to find the scholarship that matches your academic profile and career aspirations.`,
  [OpportunityType.GRANT]: (n) =>
    `Grants provide essential funding for NGOs, community organizations, researchers, and entrepreneurs across Kenya. JOBR lists ${n} active grant opportunities from local and international donors including USAID, EU, GIZ, and private foundations. These grants support sectors ranging from healthcare and education to agriculture, technology innovation, and environmental conservation. Whether you are a grassroots organization seeking programmatic funding or a researcher looking for project support, this page consolidates all verified grant listings to help you find and apply before deadlines close.`,
  [OpportunityType.FELLOWSHIP]: (n) =>
    `Fellowship programs offer Kenyan professionals unparalleled access to mentorship, funding, and global networks. JOBR currently features ${n} active fellowship opportunities from prestigious institutions, think tanks, and international organizations. Fellowships span sectors including public policy, technology, public health, journalism, and social entrepreneurship. Many fellowships are fully funded and include travel, stipends, and professional development components. Whether you are an emerging leader or a mid-career professional, these programs can accelerate your career trajectory and expand your impact.`,
  [OpportunityType.SPONSORSHIP]: (n) =>
    `Sponsorship opportunities help individuals and organizations in Kenya access funding for events, projects, education, and professional development. JOBR lists ${n} active sponsorship opportunities from corporate partners, foundations, and government programs. These can cover conference attendance, research projects, community initiatives, and skills development programs. Browse available sponsorships and apply early to maximize your chances of securing financial support for your goals.`,
  [OpportunityType.MENTORSHIP]: (n) =>
    `Mentorship programs connect aspiring and mid-career Kenyan professionals with experienced industry leaders who provide guidance, career advice, and networking opportunities. JOBR features ${n} active mentorship programs across technology, business, creative industries, and public service. These structured programs typically run for 3-12 months and include regular meetings, skill-building workshops, and access to professional communities. A strong mentorship relationship can be transformative for your career — find the right program for your field and experience level.`,
  [OpportunityType.COMPETITION]: (n) =>
    `Competitions, hackathons, awards, and challenges provide Kenyans with opportunities to showcase talent, win prizes, and launch careers. JOBR lists ${n} active competitions spanning technology, business pitching, essay writing, photography, data science, and social innovation. Many competitions offer substantial cash prizes, incubation programs, or direct employment opportunities. Whether you are a student, entrepreneur, or creative professional, competing can build your portfolio, expand your network, and open doors to new opportunities.`,
  [OpportunityType.CONFERENCE]: (n) =>
    `Conferences, summits, and professional events in Kenya and internationally offer invaluable networking, learning, and career advancement opportunities. JOBR lists ${n} upcoming conferences covering technology, business, healthcare, education, agriculture, and public policy. Many conferences offer early-bird registration discounts, student rates, and scholarship seats. Attending conferences helps you stay current with industry trends, meet potential employers or collaborators, and gain visibility in your professional community.`,
  [OpportunityType.TRAINING]: (n) =>
    `Training programs and short courses help Kenyan professionals develop in-demand skills and stay competitive in the job market. JOBR features ${n} active training opportunities in technology, business management, leadership, digital marketing, data analysis, and specialized technical fields. Programs range from free online courses and workshops to intensive bootcamps and professional certifications. Investing in continuous learning is one of the most effective ways to advance your career — browse available programs and enroll in training that aligns with your career goals.`,
  [OpportunityType.VOLUNTEER]: (n) =>
    `Volunteering in Kenya provides meaningful ways to contribute to community development while building valuable professional experience. JOBR lists ${n} active volunteer opportunities with NGOs, community organizations, hospitals, schools, and international programs. Volunteer roles span teaching, healthcare support, environmental conservation, event management, and administrative assistance. Whether you are a student gaining practical experience or a professional giving back, volunteering strengthens your CV, expands your network, and creates lasting social impact.`,
};

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

function formatFundingBadge(
  disclosure: string,
  amount?: number | null,
  currency: string = 'KES'
): string | null {
  const label = FundingDisclosureLabels[disclosure as keyof typeof FundingDisclosureLabels];
  if (!label || label === 'Not Disclosed') return null;
  if (label === 'Show Amount' && amount) {
    const symbol = currency === 'KES' ? 'KSh' : currency;
    if (amount >= 1_000_000) return `${symbol} ${(amount / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (amount >= 1_000) return `${symbol} ${(amount / 1_000).toFixed(0)}K`;
    return `${symbol} ${amount.toLocaleString('en-KE')}`;
  }
  return label;
}

// ============================================================
// OPPORTUNITY CARD (compact for hub pages)
// ============================================================

function OpportunityCard({ opp }: { opp: OpportunityListItem }) {
  const deadlineText = opp.deadline ? formatDeadlineCountdown(opp.deadline) : null;
  const fundingText = formatFundingBadge(opp.fundingDisclosure as string, opp.fundingAmount, opp.fundingCurrency);

  const borderClass = opp.featured
    ? 'border-l-4 border-l-emerald-500 border-t-white/60 border-r-white/60 border-b-white/60'
    : 'border-white/60';

  return (
    <div
      className={`group rounded-xl border bg-white/70 p-4 backdrop-blur-sm transition hover:border-emerald-300 hover:bg-emerald-50/30 sm:p-5 ${borderClass}`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="shrink-0">
          {opp.providerLogoUrl ? (
            <img
              src={opp.providerLogoUrl}
              alt={opp.providerName}
              className="h-11 w-11 rounded-xl object-cover shadow-sm sm:h-12 sm:w-12"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-sm font-extrabold text-emerald-700 shadow-sm sm:h-12 sm:w-12 sm:text-base">
              {getInitials(opp.providerName)}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                href={`/opportunities/${opp.slug}`}
                className="text-sm font-semibold leading-snug text-gray-800 transition hover:text-emerald-600 sm:text-base sm:font-bold"
              >
                {opp.title}
              </Link>
              <div className="mt-0.5 text-xs text-gray-400 sm:text-sm">
                {opp.providerName}
              </div>
            </div>
            <span className="shrink-0 text-xs text-gray-300">
              {formatRelativeDate(opp.datePosted)}
            </span>
          </div>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <Badge
              variant="outline"
              className="gap-1 border-gray-200 bg-gray-50 text-xs font-medium text-gray-600"
            >
              {getLocationLabel(opp.locationCity, opp.locationCounty, opp.isRemote, opp.isOnline)}
            </Badge>
            {fundingText && (
              <Badge
                variant="outline"
                className="border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-700"
              >
                {fundingText}
              </Badge>
            )}
            {deadlineText && deadlineText !== 'Closed' && (
              <Badge
                variant="outline"
                className="border-red-200 bg-red-50 text-xs font-medium text-red-600"
              >
                Closes in {deadlineText}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PAGINATION
// ============================================================

function Pagination({
  total,
  page,
  totalPages,
  typeSlug,
  currentSort,
}: {
  total: number;
  page: number;
  totalPages: number;
  typeSlug: string;
  currentSort?: string;
}) {
  function createPageUrl(pageNum: number): string {
    const sp = new URLSearchParams();
    if (currentSort) sp.set('sort', currentSort);
    if (pageNum > 1) sp.set('page', String(pageNum));
    const qs = sp.toString();
    return qs ? `/opportunities/type/${typeSlug}?${qs}` : `/opportunities/type/${typeSlug}`;
  }

  const pages: (number | 'ellipsis')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('ellipsis');
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200/50 pt-4">
      <p className="text-sm text-gray-500">
        Page <span className="font-medium text-gray-700">{page}</span> of{' '}
        <span className="font-medium text-gray-700">{totalPages}</span>
      </p>
      <div className="flex items-center gap-2">
        <Link
          href={createPageUrl(page - 1)}
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
            page <= 1
              ? 'pointer-events-none border-gray-200 text-gray-400'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
          }`}
        >
          &larr;
        </Link>
        {pages.map((item, idx) =>
          item === 'ellipsis' ? (
            <span key={`e-${idx}`} className="px-2 text-sm text-gray-400">...</span>
          ) : (
            <Link
              key={item}
              href={createPageUrl(item)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                page === item
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item}
            </Link>
          )
        )}
        <Link
          href={createPageUrl(page + 1)}
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
            page >= totalPages
              ? 'pointer-events-none border-gray-200 text-gray-400'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
          }`}
        >
          &rarr;
        </Link>
      </div>
    </div>
  );
}

// ============================================================
// PAGE
// ============================================================

export default async function OpportunityTypeHubPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const sortParam = sp.sort as 'newest' | 'deadline-soon' | 'deadline-later' | undefined;

  const type = slugToOpportunityType(slug);
  if (!type) notFound();

  const label = OpportunityTypeLabels[type];
  const typeColor = OpportunityTypeColors[type];

  // Fetch data in parallel
  let result = { data: [] as any[], total: 0, page, limit: 20, totalPages: 0 };
  let allTypeCounts = {} as Record<OpportunityType, number>;

  try {
    [result, allTypeCounts] = await Promise.all([
      searchOpportunities({ type, sort: sortParam, page, limit: 20 }),
      getOpportunityCountsByType().catch(() => ({}) as Record<OpportunityType, number>),
    ]);
  } catch (err) {
    console.error('OpportunityTypePage error:', err);
  }

  const seoTextFn = TYPE_SEO_TEXT[type];
  const seoText = seoTextFn ? seoTextFn(result.total) : '';

  // Breadcrumb
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Opportunities', href: '/opportunities' },
    { label },
  ];

  // JSON-LD
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Opportunities', href: 'https://jobr.co.ke/opportunities' },
    { name: label },
  ]);

  const collectionSchema = generateCollectionPageSchema({
    name: `${label} Opportunities in Kenya`,
    description: `Browse all ${label.toLowerCase()} opportunities in Kenya. ${result.total} verified listings.`,
    url: `https://jobr.co.ke/opportunities/type/${slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6">
          <BreadcrumbNav items={breadcrumbItems} />
        </nav>

        {/* Header */}
        <div className="border-b border-gray-200/50 pb-6">
          <div className="flex items-center gap-3">
            <span className={`rounded-full border px-3 py-1 text-sm font-semibold ${typeColor}`}>
              {label}
            </span>
            <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
              {label} Opportunities in Kenya
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            <span className="font-semibold text-emerald-600">{result.total}</span> active{' '}
            {result.total === 1 ? 'opportunity' : 'opportunities'}
          </p>
        </div>

        {/* Type navigation tabs */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-200/30 pb-4">
          <Link
            href="/opportunities"
            className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
          >
            All Opportunities
          </Link>
          {Object.values(OpportunityType).map((t) => {
            const tSlug = t.toLowerCase().replace(/_/g, '-');
            const count = allTypeCounts[t] ?? 0;
            if (count === 0 && t !== type) return null;
            const isActive = t === type;
            return (
              <Link
                key={t}
                href={`/opportunities/type/${tSlug}`}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  isActive
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {OpportunityTypeLabels[t]} ({count})
              </Link>
            );
          })}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* SEO text block */}
            {seoText && (
              <div className="mb-6 rounded-xl border border-white/60 bg-white/70 p-5 backdrop-blur-sm">
                <p className="text-sm leading-relaxed text-gray-600">{seoText}</p>
              </div>
            )}

            {/* Opportunity cards */}
            {result.data.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white/50 px-6 py-16 text-center">
                <p className="text-gray-500">No {label.toLowerCase()} opportunities available at the moment.</p>
                <Link
                  href="/opportunities"
                  className="mt-3 text-sm font-medium text-emerald-600 hover:underline"
                >
                  Browse all opportunities &rarr;
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {result.data.map((opp) => (
                    <OpportunityCard key={opp.id} opp={opp} />
                  ))}
                </div>
                <Pagination
                  total={result.total}
                  page={result.page}
                  totalPages={result.totalPages}
                  typeSlug={slug}
                  currentSort={sp.sort ? sortParam : undefined}
                />
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <SmartMatchingWidget />
            <GoogleAdPlaceholder />
            <TrendingSearchesWidget />
            <CVAdWidget />
            <JobAlertsWidget />
          </div>
        </div>
      </div>
    </>
  );
}