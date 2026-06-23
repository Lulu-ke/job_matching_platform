import type { Metadata } from 'next';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to the most common questions about using JOBR Kenya — from applying for jobs and posting listings to creating alerts and uploading your CV.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Frequently Asked Questions',
    description:
      'Find answers to the most common questions about using JOBR Kenya — from applying for jobs and posting listings to creating alerts and uploading your CV.',
    siteName: 'JOBR Kenya',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions',
    description:
      'Find answers to the most common questions about using JOBR Kenya — from applying for jobs and posting listings to creating alerts and uploading your CV.',
  },
};

// ============================================================
// DATA
// ============================================================

interface FAQEntry {
  question: string;
  answer: string;
}

const FAQ_DATA: { category: string; items: FAQEntry[] }[] = [
  {
    category: 'Getting Started',
    items: [
      {
        question: 'How do I apply for a job on JOBR?',
        answer:
          'Applying for a job is simple. Browse or search for a job listing that interests you, click on it to view the full details, and then click the "Apply" button. Depending on the listing, you may be directed to apply through the employer\'s website, or you can apply directly on JOBR by submitting your CV and cover letter. Make sure your profile is up to date with your latest skills and experience before applying.',
      },
      {
        question: 'Are all jobs listed on JOBR verified?',
        answer:
          'Yes. Every job listing on JOBR Kenya goes through a verification process before it is published. Our moderation team reviews each posting to confirm the employer\'s legitimacy, job details accuracy, and compliance with Kenyan labour laws. While we make every effort to ensure authenticity, we also encourage job seekers to independently verify employer details before sharing sensitive personal information.',
      },
      {
        question: 'Is JOBR free for job seekers?',
        answer:
          'Absolutely. JOBR Kenya is completely free for job seekers. You can create an account, browse listings, apply for jobs, set up alerts, and upload your CV at no cost. We believe every Kenyan should have access to employment opportunities without financial barriers.',
      },
    ],
  },
  {
    category: 'Job Search & Alerts',
    items: [
      {
        question: 'How do I search for jobs in my county?',
        answer:
          'You can filter jobs by county in several ways. Use the county dropdown filter on the jobs page, browse our "Jobs by County" directory, or simply type your county name into the search bar (e.g., "jobs in Mombasa"). JOBR covers all 47 Kenyan counties, so you can find opportunities no matter where you are. You can also save your preferred county in your profile for faster future searches.',
      },
      {
        question: 'How do I create a job alert?',
        answer:
          'To create a job alert, click on the "Job Alerts" section in your profile dashboard. Enter your preferred job title, category, location (county or city), and employment type. You can create multiple alerts for different preferences. Whenever new jobs matching your criteria are posted, you\'ll receive an email notification so you never miss an opportunity.',
      },
      {
        question: 'What types of opportunities do you list?',
        answer:
          'JOBR Kenya lists a wide variety of opportunities including full-time and part-time jobs, internships, contract positions, freelance work, volunteer roles, government jobs (both national and county), tenders, scholarships, and career training programmes. We cover 49 job categories spanning industries like IT, healthcare, finance, education, engineering, hospitality, and more.',
      },
    ],
  },
  {
    category: 'Profiles & Applications',
    items: [
      {
        question: 'Can I upload my CV to JOBR?',
        answer:
          'Yes. You can upload your CV in PDF, DOC, or DOCX format through your profile dashboard. We recommend keeping your CV updated with your latest qualifications, work experience, and skills. A well-maintained CV on JOBR makes it easier for employers to find you and for you to apply to listings quickly. You can also set your profile to "Open to Opportunities" to increase your visibility to recruiters.',
      },
      {
        question: 'How do I track my job applications?',
        answer:
          'All your job applications are tracked in your profile dashboard under "My Applications." Here you can see the status of each application (submitted, viewed, shortlisted, or rejected), the date you applied, and the job details. If an employer responds, you\'ll receive an email notification and can continue the conversation through our messaging system.',
      },
    ],
  },
  {
    category: 'For Employers',
    items: [
      {
        question: 'How do I post a job as an employer?',
        answer:
          'To post a job, first create an employer account on JOBR. Once verified, you can access the employer dashboard where you\'ll find the "Post a Job" option. Fill in the job details including title, description, requirements, location, salary range, and application deadline. You can choose to make the listing standard (free) or featured (paid for extra visibility). Your listing will be reviewed by our team before going live.',
      },
    ],
  },
];

// ============================================================
// PAGE
// ============================================================

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbNav items={[{ label: 'FAQ' }]} />

      {/* ── Hero Section ── */}
      <section className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Frequently Asked{' '}
          <span className="text-emerald-600">Questions</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Find quick answers to common questions about using JOBR Kenya. Can&apos;t
          find what you&apos;re looking for?{' '}
          <a href="/contact" className="font-medium text-emerald-600 underline">
            Contact our support team
          </a>
          .
        </p>
      </section>

      {/* ── FAQ Sections ── */}
      <div className="mx-auto max-w-3xl space-y-10">
        {FAQ_DATA.map((section) => (
          <section key={section.category}>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-1 w-8 rounded-full bg-emerald-600" />
              <h2 className="text-xl font-bold text-gray-900">
                {section.category}
              </h2>
            </div>

            <div className="rounded-xl border border-gray-200/60 bg-white/70 p-6 backdrop-blur-sm sm:p-8">
              <Accordion type="single" collapsible className="w-full">
                {section.items.map((item, i) => (
                  <AccordionItem key={i} value={`${section.category}-${i}`}>
                    <AccordionTrigger className="text-left text-gray-800 hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        ))}
      </div>

      {/* ── CTA ── */}
      <section className="mx-auto mt-16 max-w-3xl">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-8 text-center backdrop-blur-sm sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Still Have Questions?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-gray-600">
            Our support team is here to help. Reach out and we&apos;ll get back
            to you within 24 hours.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Contact Us
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white/70 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-white"
            >
              Learn About JOBR
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
