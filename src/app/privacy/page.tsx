import type { Metadata } from 'next';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'JOBR Kenya privacy policy — learn how we collect, use, store, and protect your personal data when you use our job board platform.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy',
    description:
      'JOBR Kenya privacy policy — learn how we collect, use, store, and protect your personal data when you use our job board platform.',
    siteName: 'JOBR Kenya',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy',
    description:
      'JOBR Kenya privacy policy — learn how we collect, use, store, and protect your personal data when you use our job board platform.',
  },
};

// ============================================================
// PAGE
// ============================================================

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbNav items={[{ label: 'Privacy Policy' }]} />

      <article className="mx-auto max-w-3xl">
        {/* ── Header ── */}
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Privacy <span className="text-emerald-600">Policy</span>
          </h1>
          <p className="mt-3 text-gray-500">
            Last updated: 1 January 2025
          </p>
        </header>

        <div className="prose-container space-y-10">
          {/* ── Introduction ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">1. Introduction</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              JOBR Kenya (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), accessible
              at{' '}
              <a
                href="https://jobr.co.ke"
                className="font-medium text-emerald-600 underline"
              >
                jobr.co.ke
              </a>
              , is committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you
              visit our website and use our job board services. This policy applies
              to all visitors, job seekers, and employers who access or use JOBR Kenya.
            </p>
            <p className="mt-3 leading-relaxed text-gray-600">
              By using JOBR Kenya, you consent to the data practices described in this
              policy. If you do not agree with the terms of this Privacy Policy, please
              do not access or use our services.
            </p>
          </section>

          {/* ── Data Collection ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">2. Information We Collect</h2>

            <h3 className="mt-5 text-lg font-semibold text-gray-800">2.1 Personal Information</h3>
            <p className="mt-2 leading-relaxed text-gray-600">
              When you create an account or use our services, we may collect:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-600">
              <li>Full name, email address, and phone number</li>
              <li>Curriculum vitae (CV), cover letters, and career documents</li>
              <li>Professional profile information (skills, experience, education)</li>
              <li>Location data (county, city) for job matching purposes</li>
              <li>Job application history and saved preferences</li>
              <li>Employer information (company name, registration details) for employer accounts</li>
            </ul>

            <h3 className="mt-5 text-lg font-semibold text-gray-800">2.2 Automatically Collected Data</h3>
            <p className="mt-2 leading-relaxed text-gray-600">
              When you visit JOBR Kenya, we automatically collect certain device and
              usage information, including:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-600">
              <li>IP address, browser type, and operating system</li>
              <li>Pages visited, time spent on pages, and navigation patterns</li>
              <li>Referring URL and search queries used to find our site</li>
              <li>Device type (desktop, mobile, tablet) and screen resolution</li>
            </ul>

            <h3 className="mt-5 text-lg font-semibold text-gray-800">2.3 Cookies &amp; Tracking Technologies</h3>
            <p className="mt-2 leading-relaxed text-gray-600">
              We use cookies and similar tracking technologies to enhance your experience.
              These include:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-600">
              <li>
                <strong>Essential cookies:</strong> Required for site functionality, such
                as session management and authentication.
              </li>
              <li>
                <strong>Analytics cookies:</strong> Help us understand how visitors interact
                with our site (e.g., Google Analytics).
              </li>
              <li>
                <strong>Advertising cookies:</strong> Used by Google Ads and partners to
                deliver relevant job-related advertisements.
              </li>
              <li>
                <strong>Preference cookies:</strong> Store your search filters, saved
                jobs, and county preferences.
              </li>
            </ul>
          </section>

          {/* ── How We Use Your Data ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">3. How We Use Your Information</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              We use the collected information for the following purposes:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-600">
              <li>To provide and maintain our job board services</li>
              <li>To match job seekers with relevant employment opportunities</li>
              <li>To process and manage job applications on behalf of employers</li>
              <li>To send job alerts, newsletters, and service notifications (with your consent)</li>
              <li>To improve our website, features, and user experience</li>
              <li>To analyse usage trends and optimise site performance</li>
              <li>To detect, prevent, and address fraud, scams, or abusive behaviour</li>
              <li>To comply with legal obligations under Kenyan data protection laws</li>
            </ul>
          </section>

          {/* ── Third-Party Services ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">4. Third-Party Services</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              JOBR Kenya integrates with the following third-party services:
            </p>

            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-gray-200/60 bg-white/70 p-4 backdrop-blur-sm">
                <h4 className="font-semibold text-gray-800">Google Analytics</h4>
                <p className="mt-1 text-sm text-gray-600">
                  We use Google Analytics to collect anonymised website usage data.
                  This helps us understand traffic patterns and improve the platform.
                  Google may process your data according to its own{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 underline"
                  >
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="rounded-lg border border-gray-200/60 bg-white/70 p-4 backdrop-blur-sm">
                <h4 className="font-semibold text-gray-800">Google Ads</h4>
                <p className="mt-1 text-sm text-gray-600">
                  We display advertisements through Google Ads. Google may use cookies to
                  serve personalised ads based on your browsing history. You can opt out of
                  personalised advertising through{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 underline"
                  >
                    Google Ads Settings
                  </a>
                  .
                </p>
              </div>

              <div className="rounded-lg border border-gray-200/60 bg-white/70 p-4 backdrop-blur-sm">
                <h4 className="font-semibold text-gray-800">Email Service Providers</h4>
                <p className="mt-1 text-sm text-gray-600">
                  We use third-party email services to deliver job alerts and
                  communications. These providers have access to your email address solely
                  for delivery purposes and are bound by data processing agreements.
                </p>
              </div>
            </div>
          </section>

          {/* ── Data Sharing ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">5. Data Sharing &amp; Disclosure</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              We do not sell, trade, or rent your personal information. We may share your data in the following circumstances:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-600">
              <li>
                <strong>With employers:</strong> Your application data (CV, cover letter, contact info) is shared with employers you apply to.
              </li>
              <li>
                <strong>With service providers:</strong> Third-party vendors who assist in operating our platform (analytics, email, hosting).
              </li>
              <li>
                <strong>For legal compliance:</strong> When required by Kenyan law, court order, or government regulation.
              </li>
              <li>
                <strong>To protect our rights:</strong> To investigate fraud, enforce our terms, or ensure platform safety.
              </li>
            </ul>
          </section>

          {/* ── Data Security ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">6. Data Security</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              We implement industry-standard security measures to protect your personal
              information, including SSL encryption, secure server infrastructure, access
              controls, and regular security audits. However, no method of transmission over
              the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* ── User Rights ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">7. Your Rights</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Under the Kenya Data Protection Act, 2019, you have the following rights:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-600">
              <li>
                <strong>Right of Access:</strong> Request a copy of the personal data we hold about you.
              </li>
              <li>
                <strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion of your personal data, subject to legal obligations.
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> Request limitation of how your data is processed.
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Request your data in a machine-readable format.
              </li>
              <li>
                <strong>Right to Object:</strong> Object to processing of your data for direct marketing purposes.
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Withdraw any consent you have previously given at any time.
              </li>
            </ul>
            <p className="mt-3 leading-relaxed text-gray-600">
              To exercise any of these rights, please contact us at{' '}
              <a
                href="mailto:hello@jobr.co.ke"
                className="font-medium text-emerald-600 underline"
              >
                hello@jobr.co.ke
              </a>
              . We will respond to your request within 30 days as required by law.
            </p>
          </section>

          {/* ── Data Retention ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">8. Data Retention</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              We retain your personal data only for as long as necessary to fulfil the
              purposes outlined in this policy:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-600">
              <li>
                <strong>Active accounts:</strong> Data is retained for the duration of your account activity.
              </li>
              <li>
                <strong>Inactive accounts:</strong> Accounts inactive for 24+ months may be deactivated and data anonymised.
              </li>
              <li>
                <strong>Applications:</strong> Job application data is retained for 12 months after the application deadline.
              </li>
              <li>
                <strong>Analytics data:</strong> Anonymised usage data may be retained for up to 3 years.
              </li>
              <li>
                <strong>Legal holds:</strong> Data may be retained longer if required by law or for dispute resolution.
              </li>
            </ul>
          </section>

          {/* ── Children's Privacy ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">9. Children&apos;s Privacy</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              JOBR Kenya is not intended for use by individuals under the age of 18. We do
              not knowingly collect personal data from minors. If we discover that we have
              collected data from a person under 18, we will take immediate steps to delete
              that information. If you believe a minor has provided us with personal data,
              please contact us at{' '}
              <a
                href="mailto:hello@jobr.co.ke"
                className="font-medium text-emerald-600 underline"
              >
                hello@jobr.co.ke
              </a>
              .
            </p>
          </section>

          {/* ── Changes to Policy ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">10. Changes to This Policy</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              We may update this Privacy Policy from time to time to reflect changes in our
              practices, technology, or legal requirements. We will notify you of material
              changes by posting a prominent notice on our website or by sending you an email.
              Your continued use of JOBR Kenya after any changes constitutes your acceptance
              of the updated policy. We encourage you to review this page periodically.
            </p>
          </section>

          {/* ── Contact ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">11. Contact Us</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              If you have any questions, concerns, or requests regarding this Privacy Policy
              or our data practices, please contact us:
            </p>
            <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-6 backdrop-blur-sm">
              <p className="font-semibold text-gray-900">JOBR Kenya</p>
              <p className="mt-1 text-gray-600">Westlands, Waiyaki Way</p>
              <p className="text-gray-600">Nairobi, Kenya</p>
              <p className="mt-3 text-gray-600">
                Email:{' '}
                <a
                  href="mailto:hello@jobr.co.ke"
                  className="font-medium text-emerald-600 underline"
                >
                  hello@jobr.co.ke
                </a>
              </p>
              <p className="mt-1 text-gray-600">
                Website:{' '}
                <a
                  href="https://jobr.co.ke"
                  className="font-medium text-emerald-600 underline"
                >
                  jobr.co.ke
                </a>
              </p>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
