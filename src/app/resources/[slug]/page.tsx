import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { generateBreadcrumbSchema } from '@/lib/utils/seo';

// ============================================================
// TYPES & DATA
// ============================================================

interface ArticleData {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
  description: string;
}

const ARTICLES: Record<string, ArticleData> = {
  'how-to-write-kenyan-cv': {
    slug: 'how-to-write-kenyan-cv',
    title: 'How to Write a CV That Gets Noticed in Kenya (2026 Guide)',
    category: 'CV Tips',
    date: '2026-01-12',
    readTime: '8 min read',
    author: 'JOBR Kenya Editorial Team',
    description:
      'Learn the exact format, structure, and content that Kenyan recruiters look for.',
    content: `Writing a CV that stands out in Kenya requires understanding what local recruiters and hiring managers actually look for. Unlike international CVs, Kenyan employers typically expect a specific structure that includes personal details, a professional summary, work experience, education, and skills — all presented in a clean, single-page format for entry-level roles or two pages maximum for senior positions.

Start with your personal information at the top: full name, phone number, email address, and location (county and town). Unlike some Western markets, including a professional headshot is common and often expected in Kenya. Use a high-quality, recent photo dressed in professional attire.

Your professional summary should be 3–4 lines that highlight your key qualifications, years of experience, and career objective. Avoid generic statements — instead, focus on what makes you unique. For example, "Results-driven accountant with 4 years of experience in financial reporting and tax compliance, seeking a senior role in the Nairobi fintech sector."

When listing work experience, use reverse chronological order. For each role, include the job title, employer name, location, and dates of employment. Use bullet points to describe your achievements with measurable results wherever possible. "Increased sales by 30% in Q3 2025" is far more impactful than "Responsible for sales."

Education should include your institution, qualification, and graduation year. If you recently graduated, place education before work experience. Include relevant certifications, professional memberships (ICPAK, IET, etc.), and any short courses that add value to your application.

Finally, tailor your CV for every application. Review the job description and mirror the language and keywords used. Many Kenyan companies use ATS (Applicant Tracking Systems) that scan for specific terms, so matching the job description can significantly increase your chances of being shortlisted.`,
  },
  'salary-negotiation-tips': {
    slug: 'salary-negotiation-tips',
    title: 'Salary Negotiation Tips for Kenyan Professionals',
    category: 'Salary Guide',
    date: '2026-01-08',
    readTime: '6 min read',
    author: 'JOBR Kenya Editorial Team',
    description:
      'Discover proven strategies to negotiate better pay in Kenya.',
    content: `Salary negotiation is one of the most intimidating parts of the job search process, yet it has an enormous impact on your long-term earnings. Research shows that professionals who negotiate their starting salary can earn significantly more over their careers compared to those who accept the first offer.

Before any negotiation, research current market rates for your role in Kenya. Use platforms like JOBR Kenya to review salary ranges listed for similar positions. Websites such as the Kenya National Bureau of Statistics and salary survey reports from firms like PwC and Deloitte can provide additional benchmarking data. Understanding what your skills are worth in the current market gives you confidence and credibility during negotiations.

Timing matters. The best time to discuss salary is after you have received a job offer but before you accept it. Avoid bringing up compensation in the first interview unless the interviewer specifically asks about your expectations. When asked about salary expectations early, provide a range based on your research rather than a fixed number — this shows flexibility while still anchoring the conversation.

When you receive an offer, express enthusiasm first. "Thank you for the offer — I'm very excited about this opportunity." Then transition into the negotiation. "Based on my research and the value I bring in [specific skill], I was hoping we could discuss the compensation. Would KSh [your target] be possible?" Always be professional and collaborative, never adversarial.

Consider the full compensation package, not just the base salary. Benefits like medical insurance, transport allowance, house allowance, annual bonuses, training budgets, and flexible working arrangements can add significant value. Sometimes a lower base salary with excellent benefits is worth more than a higher base with no perks.

If the employer cannot meet your salary expectation, explore alternatives: a signing bonus, a performance review after three months, additional leave days, or a clear path to a raise. Leave the door open for future discussions rather than declining outright. Remember, once you're in the role and demonstrating value, you'll be in an even stronger position to negotiate.`,
  },
  'government-job-application-guide': {
    slug: 'government-job-application-guide',
    title: 'How to Apply for Government Jobs in Kenya: Complete Guide',
    category: 'Government Jobs',
    date: '2026-01-03',
    readTime: '10 min read',
    author: 'JOBR Kenya Editorial Team',
    description:
      'A step-by-step walkthrough of the Kenyan government recruitment process.',
    content: `Government jobs in Kenya are among the most sought-after positions in the country, offering job security, comprehensive benefits, and structured career progression. The Public Service Commission (PSC) is the primary body responsible for recruiting civil servants, while county governments handle their own hiring through Public Service Boards.

The first step is finding open positions. Government vacancies are published on the PSC website (publicservice.go.ke), the Kenya Gazette, and major newspapers (Daily Nation, The Standard). JOBR Kenya also aggregates government job listings in one convenient place. Set up job alerts to be notified immediately when new government positions are posted.

Before applying, ensure you meet all the minimum requirements. Government jobs have strict qualification criteria — if you don't meet even one requirement, your application will be automatically disqualified. Common requirements include Kenyan citizenship, specific academic qualifications, professional certifications, and sometimes a minimum age or years of experience.

The application process typically involves filling out an application form (often the PSC Application for Employment Form), attaching certified copies of your academic certificates, national ID, and any other required documents. Follow the instructions precisely — government applications are rejected for even minor formatting errors or missing documents.

Shortlisted candidates are invited for interviews, which are usually more formal than private sector interviews. Expect panel interviews with structured questions often aligned to the job description. Prepare by researching the specific ministry, department, or agency, and be ready to discuss how your qualifications and experience align with their mandate.

After the interview, successful candidates undergo security clearance (including a certificate of good conduct from the Directorate of Criminal Investigations) and medical examination before receiving their appointment letter. The entire process from application to appointment can take anywhere from one to six months, so patience is essential.`,
  },
  'interview-preparation-kenya': {
    slug: 'interview-preparation-kenya',
    title: 'Interview Preparation Guide: What Kenyan Employers Really Ask',
    category: 'Interview Prep',
    date: '2025-12-28',
    readTime: '7 min read',
    author: 'JOBR Kenya Editorial Team',
    description:
      'The most common interview questions in Kenya and how to answer them.',
    content: `Preparing for a job interview in Kenya requires understanding both universal best practices and local expectations. Kenyan interviewers tend to value professionalism, cultural awareness, and practical problem-solving abilities. This guide covers the most frequently asked questions and strategies for answering them effectively.

"Tell me about yourself" is almost guaranteed to be the opening question. Keep your response to 2 minutes maximum, structured in three parts: your professional background, your key achievements, and why you're interested in this specific role. Avoid personal details unless they're directly relevant to the job.

"Why do you want to work here?" is designed to test whether you've done your research. Mention specific aspects of the company: their mission, recent projects, company culture, or market position. For example, "I've been following your expansion into the East African market, and I'm excited about the opportunity to contribute to that growth with my experience in regional business development."

Behavioral questions using the STAR method (Situation, Task, Action, Result) are increasingly common. "Tell me about a time you handled a difficult situation at work" or "Describe a project where you demonstrated leadership." Structure your answers with clear examples and quantifiable outcomes.

Technical interviews are standard in fields like IT, engineering, and finance. Review core concepts in your field and practice with mock interviews. Many Kenyan tech companies include coding challenges or case studies, so familiarise yourself with common problem-solving patterns.

Dress professionally — business formal is the safest choice for most industries in Kenya. Arrive 15 minutes early, carry printed copies of your CV, and prepare thoughtful questions to ask the interviewer. Questions about team structure, growth opportunities, and company challenges demonstrate genuine interest and engagement.

Finally, follow up with a thank-you email within 24 hours. While not universally expected in Kenya, it's a professional touch that sets you apart. Keep it brief, reference a specific topic discussed during the interview, and reiterate your enthusiasm for the role.`,
  },
  'cover-letter-tips-2026': {
    slug: 'cover-letter-tips-2026',
    title: 'Cover Letter Tips That Will Get You Hired in 2026',
    category: 'CV Tips',
    date: '2025-12-22',
    readTime: '5 min read',
    author: 'JOBR Kenya Editorial Team',
    description:
      'Write a cover letter that stands out with Kenyan-specific examples.',
    content: `A well-written cover letter can be the difference between your application being shortlisted or overlooked. In 2026, with employers receiving hundreds of applications for each position, your cover letter needs to quickly demonstrate why you're the best fit.

Keep your cover letter to one page — ideally 300–400 words. Use a standard business letter format with your contact details at the top, followed by the date, employer's details, a formal salutation, three concise paragraphs, and a professional closing.

The opening paragraph should be compelling and specific. Instead of "I am writing to apply for the Marketing Manager position," try "With five years of experience scaling digital marketing campaigns for Kenyan e-commerce brands, I was excited to see the Marketing Manager opening at [Company Name]." This immediately establishes relevance and enthusiasm.

The middle paragraph is your opportunity to connect your experience to the role. Reference the job description directly: "Your requirement for experience with Google Ads aligns perfectly with my track record of managing KSh 5M+ monthly ad budgets that delivered a 40% increase in ROAS." Use specific, quantifiable achievements rather than vague claims.

The closing paragraph should express confidence and include a clear call to action. "I would welcome the opportunity to discuss how my experience can contribute to your team's goals. I am available for an interview at your convenience and can be reached at [phone] or [email]."

Common mistakes to avoid: using the same cover letter for every application, repeating information already in your CV, including typos or grammatical errors, being overly formal or generic, and exceeding one page. Always proofread carefully — consider having a friend or mentor review it before submission.

For government job applications, follow the exact format specified in the application guidelines. Government cover letters are typically more formal and should reference the specific vacancy number and gazette notice date.`,
  },
  'remote-work-kenya-guide': {
    slug: 'remote-work-kenya-guide',
    title: 'The Complete Guide to Remote Work in Kenya',
    category: 'Remote Work',
    date: '2025-12-15',
    readTime: '9 min read',
    author: 'JOBR Kenya Editorial Team',
    description:
      'Everything you need to know about finding and succeeding in remote jobs.',
    content: `Remote work in Kenya has grown significantly, accelerated by global shifts and improved digital infrastructure. More Kenyan professionals are now working for international companies, local businesses with distributed teams, or as freelancers serving clients worldwide. This guide covers everything you need to know to find and succeed in remote roles.

The best platforms for finding remote work available to Kenyans include international job boards like Remote.co, We Work Remotely, and FlexJobs, as well as local platforms like JOBR Kenya which filter for remote-friendly positions. LinkedIn is another powerful tool — set your location to "Kenya" and use keywords like "remote," "distributed team," or "work from anywhere" in your search.

In-demand remote skills for Kenyan professionals include software development (especially JavaScript, Python, and mobile development), digital marketing, content writing, graphic design, data analysis, virtual assistance, and customer support. If you're looking to transition to remote work, investing in upskilling through platforms like Coursera, Udemy, or Google Digital Skills for Africa can significantly boost your chances.

Setting up a productive home office doesn't require a large investment. Essentials include a reliable internet connection (at least 10 Mbps), a dedicated workspace, noise-cancelling headphones, and a comfortable chair. Co-working spaces in Nairobi (like Nairobi Garage, Ihub, and The Foundry) offer affordable alternatives if you need a professional environment.

Tax implications are important to understand. If you're working for a foreign company while residing in Kenya, you're still subject to Kenyan income tax on your worldwide income. Keep detailed records of your earnings and consider consulting a tax professional. The Kenya Revenue Authority (KRA) has specific guidelines for digital workers that you should familiarise yourself with.

Time zone management is crucial when working with international teams. Kenya is UTC+3, which works well for European clients (1–2 hours ahead) but requires flexibility for US-based teams. Communicate your working hours clearly and use tools like World Time Buddy to schedule meetings. Building a routine and setting boundaries between work and personal time is essential for long-term sustainability in remote work.`,
  },
};

export const ALL_SLUGS = Object.keys(ARTICLES);

// ============================================================
// STATIC PARAMS & METADATA
// ============================================================

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      siteName: 'JOBR Kenya',
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  };
}

// ============================================================
// HELPERS
// ============================================================

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getRelatedArticles(currentSlug: string): ArticleData[] {
  const current = ARTICLES[currentSlug];
  if (!current) return [];
  return Object.values(ARTICLES)
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 3);
}

// ============================================================
// PAGE
// ============================================================

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(slug);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: 'https://jobr.co.ke' },
    { name: 'Career Advice & Resources', href: 'https://jobr.co.ke/resources' },
    { name: article.title, href: `https://jobr.co.ke/resources/${slug}` },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: 'https://jobr.co.ke',
    },
    publisher: {
      '@type': 'Organization',
      name: 'JOBR Kenya',
      url: 'https://jobr.co.ke',
    },
    mainEntityOfPage: `https://jobr.co.ke/resources/${slug}`,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ── JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <BreadcrumbNav
        items={[
          { label: 'Career Advice & Resources', href: '/resources' },
          { label: article.title },
        ]}
      />

      {/* ── Article Layout ── */}
      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* ── Main Content ── */}
        <article className="min-w-0">
          <div className="rounded-xl border border-gray-200/60 bg-white/70 p-6 backdrop-blur-sm sm:p-10">
            {/* Category Badge */}
            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="mt-4 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {article.author}
              </span>
              <span>{formatDate(article.date)}</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>

            {/* Divider */}
            <hr className="my-8 border-gray-200/60" />

            {/* Content Body */}
            <div className="prose prose-gray max-w-none">
              {article.content.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className="mb-4 text-base leading-relaxed text-gray-700 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* ── Back Link ── */}
          <Link
            href="/resources"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all resources
          </Link>
        </article>

        {/* ── Sidebar: Related Articles ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-8">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-400">
              Related Articles
            </h3>
            <div className="space-y-4">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/resources/${r.slug}`}
                  className="group block rounded-xl border border-gray-200/60 bg-white/70 p-4 backdrop-blur-sm transition hover:shadow-md"
                >
                  <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                    {r.category}
                  </span>
                  <h4 className="mt-2 text-sm font-bold leading-snug text-gray-900 transition group-hover:text-emerald-600">
                    {r.title}
                  </h4>
                  <p className="mt-1 text-xs text-gray-400">
                    {r.readTime} &middot; {formatDate(r.date)}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}