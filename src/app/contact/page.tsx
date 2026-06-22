import type { Metadata } from 'next';
import { Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { ContactForm } from '@/components/shared/ContactForm';
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
  title: 'Contact Us',
  description:
    'Get in touch with the JOBR Kenya team. Reach out for support, partnerships, or general enquiries about our job board services.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us',
    description:
      'Get in touch with the JOBR Kenya team. Reach out for support, partnerships, or general enquiries about our job board services.',
    siteName: 'JOBR Kenya',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us',
    description:
      'Get in touch with the JOBR Kenya team. Reach out for support, partnerships, or general enquiries about our job board services.',
  },
};

// ============================================================
// DATA
// ============================================================

const CONTACT_CARDS = [
  {
    icon: Mail,
    title: 'Email',
    detail: 'hello@jobr.co.ke',
    sub: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Location',
    detail: 'Nairobi, Kenya',
    sub: 'Westlands, Waiyaki Way',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    detail: 'Mon – Fri, 8 AM – 6 PM EAT',
    sub: 'Weekend support via email',
  },
];

const FAQ_ITEMS = [
  {
    q: 'How can I report a suspicious job listing?',
    a: 'If you come across a listing that seems fraudulent or misleading, please email us at hello@jobr.co.ke with the job title and a link to the listing. Our moderation team reviews every report within 24 hours and takes prompt action to remove any verified scams.',
  },
  {
    q: 'I am an employer — how do I post jobs on JOBR?',
    a: 'Simply head to our "Post a Job" page, create an employer account, and follow the guided listing process. You can manage all your postings from a single dashboard. If you need a custom enterprise plan, contact us directly and we will set up a consultation.',
  },
  {
    q: 'Can JOBR partner with my organisation or university?',
    a: 'Absolutely! We actively partner with universities, county governments, NGOs, and training institutions across Kenya. Send us an email at hello@jobr.co.ke with details about your organisation and how you envision working together.',
  },
  {
    q: 'I found a bug or have a feature suggestion — who should I tell?',
    a: 'We love hearing from our community. Drop us an email at hello@jobr.co.ke with "Bug Report" or "Feature Idea" in the subject line. Our product team reviews all feedback and many of our best features started as user suggestions.',
  },
];

// ============================================================
// PAGE
// ============================================================

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbNav items={[{ label: 'Contact Us' }]} />

      {/* ── Hero Heading ── */}
      <section className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Get in <span className="text-emerald-600">Touch</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Have a question, feedback, or partnership idea? We&apos;d love to
          hear from you. Fill out the form below or use our contact details to
          reach us directly.
        </p>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className="mb-16 grid gap-6 sm:grid-cols-3">
        {CONTACT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-xl border border-gray-200/60 bg-white/70 p-6 text-center backdrop-blur-sm transition hover:shadow-md"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
              <p className="mt-1 font-medium text-gray-800">{card.detail}</p>
              <p className="mt-0.5 text-sm text-gray-500">{card.sub}</p>
            </div>
          );
        })}
      </section>

      {/* ── Contact Form + Info ── */}
      <section className="mb-16 grid gap-10 lg:grid-cols-5">
        {/* Form (client component with API submission) */}
        <div className="rounded-xl border border-gray-200/60 bg-white/70 p-6 backdrop-blur-sm lg:col-span-3 sm:p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Send Us a Message
          </h2>
          <ContactForm />
        </div>

        {/* Sidebar info */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-6 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2 text-emerald-700">
              <MessageSquare className="h-5 w-5" />
              <h3 className="text-lg font-bold">Quick Help</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              For instant answers, check our{' '}
              <a href="/faq" className="font-medium text-emerald-600 underline">
                FAQ page
              </a>{' '}
              or browse the{' '}
              <a href="/about" className="font-medium text-emerald-600 underline">
                About Us
              </a>{' '}
              section. Most common questions are already answered there.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200/60 bg-white/70 p-6 backdrop-blur-sm">
            <h3 className="mb-3 text-lg font-bold text-gray-900">
              Other Enquiries
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>
                  <strong className="text-gray-800">Employers:</strong> Post
                  jobs and manage applications through our employer dashboard.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>
                  <strong className="text-gray-800">Partnerships:</strong>
                  Email hello@jobr.co.ke with &quot;Partnership&quot; in the
                  subject.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>
                  <strong className="text-gray-800">Media &amp; Press:</strong>
                  For interviews, features, or press releases, contact our
                  communications team.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Common Questions (FAQ) ── */}
      <section className="mb-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Common Questions
          </h2>
          <p className="mt-2 text-gray-500">
            Quick answers to questions we receive most often.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-gray-200/60 bg-white/70 p-6 backdrop-blur-sm sm:p-8">
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-gray-800 hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}