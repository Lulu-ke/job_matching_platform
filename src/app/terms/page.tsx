import type { Metadata } from 'next';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';

// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the terms of service for JOBR Kenya. Understand your rights and obligations as a job seeker or employer using our platform.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service',
    description:
      'Read the terms of service for JOBR Kenya. Understand your rights and obligations as a job seeker or employer using our platform.',
    siteName: 'JOBR Kenya',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service',
    description:
      'Read the terms of service for JOBR Kenya. Understand your rights and obligations as a job seeker or employer using our platform.',
  },
};

// ============================================================
// PAGE
// ============================================================

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbNav items={[{ label: 'Terms of Service' }]} />

      <article className="mx-auto max-w-3xl">
        {/* ── Header ── */}
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Terms of <span className="text-emerald-600">Service</span>
          </h1>
          <p className="mt-3 text-gray-500">
            Last updated: 1 January 2025
          </p>
        </header>

        <div className="space-y-10">
          {/* ── Acceptance ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">1. Acceptance of Terms</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              By accessing or using JOBR Kenya (&quot;the Platform&quot;), available at{' '}
              <a
                href="https://jobr.co.ke"
                className="font-medium text-emerald-600 underline"
              >
                jobr.co.ke
              </a>
              , you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do
              not agree to these Terms, you must not use the Platform. These Terms constitute a
              legally binding agreement between you and JOBR Kenya.
            </p>
            <p className="mt-3 leading-relaxed text-gray-600">
              We reserve the right to modify these Terms at any time. Continued use of the
              Platform after modifications constitutes acceptance of the updated Terms. We will
              notify users of material changes via email or a prominent notice on the website.
            </p>
          </section>

          {/* ── User Accounts ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">2. User Accounts</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              To access certain features of the Platform, you may be required to create an
              account. When creating an account, you agree to the following:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-600">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain the security of your account credentials (password, email)</li>
              <li>Immediately notify us of any unauthorised use of your account</li>
              <li>Accept responsibility for all activities conducted under your account</li>
              <li>Not create multiple accounts for fraudulent or abusive purposes</li>
              <li>Not use another person&apos;s account or impersonate any individual or entity</li>
            </ul>
            <p className="mt-3 leading-relaxed text-gray-600">
              JOBR Kenya reserves the right to suspend or terminate accounts that violate these
              Terms or that have been inactive for an extended period without prior notice.
            </p>
          </section>

          {/* ── Job Listings ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">3. Job Listings &amp; Applications</h2>

            <h3 className="mt-5 text-lg font-semibold text-gray-800">3.1 For Employers</h3>
            <p className="mt-2 leading-relaxed text-gray-600">
              Employers who post jobs on JOBR Kenya warrant that:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-600">
              <li>All job listings contain accurate and truthful information</li>
              <li>Positions are legitimate and comply with Kenyan labour laws</li>
              <li>Company information is accurate and the employer is authorised to represent the organisation</li>
              <li>Job requirements do not discriminate on the basis of gender, race, religion, disability, or tribal affiliation</li>
              <li>Compensation information, where provided, reflects actual remuneration</li>
            </ul>

            <h3 className="mt-5 text-lg font-semibold text-gray-800">3.2 For Job Seekers</h3>
            <p className="mt-2 leading-relaxed text-gray-600">
              Job seekers using the Platform agree to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-600">
              <li>Provide truthful and accurate information in their profiles and applications</li>
              <li>Not submit fraudulent credentials, qualifications, or references</li>
              <li>Apply only for positions for which they are genuinely interested and qualified</li>
              <li>Not misuse the application system (e.g., mass-applying without genuine interest)</li>
            </ul>

            <h3 className="mt-5 text-lg font-semibold text-gray-800">3.3 Verification</h3>
            <p className="mt-2 leading-relaxed text-gray-600">
              JOBR Kenya makes reasonable efforts to verify job listings and employer legitimacy.
              However, we do not guarantee the accuracy, completeness, or authenticity of any
              listing. Users are encouraged to independently verify employer credentials before
              sharing sensitive personal information.
            </p>
          </section>

          {/* ── Prohibited Conduct ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">4. Prohibited Conduct</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              You may not use the Platform to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-600">
              <li>Post fraudulent, misleading, or scam job listings</li>
              <li>Collect personal data from job seekers for malicious or unauthorised purposes</li>
              <li>Scrape, crawl, or extract data from the Platform through automated means without our written consent</li>
              <li>Interfere with or disrupt the Platform&apos;s functionality, servers, or networks</li>
              <li>Post content that is defamatory, obscene, threatening, or violates any law</li>
              <li>Attempt to gain unauthorised access to user accounts or our systems</li>
              <li>Use the Platform for any purpose that is unlawful or prohibited by these Terms</li>
              <li>Impersonate JOBR Kenya staff, employers, or other users</li>
            </ul>
          </section>

          {/* ── Intellectual Property ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">5. Intellectual Property</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              All content, design, graphics, logos, and software on the JOBR Kenya Platform are
              the intellectual property of JOBR Kenya or its licensors and are protected by
              Kenyan and international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-3 leading-relaxed text-gray-600">
              You may not reproduce, distribute, modify, create derivative works from, publicly
              display, or exploit any content from the Platform without our prior written
              consent. The JOBR Kenya name, logo, and all related marks are proprietary and
              may not be used without express permission.
            </p>
            <p className="mt-3 leading-relaxed text-gray-600">
              By submitting content to the Platform (e.g., job listings, CVs, reviews), you grant
              JOBR Kenya a non-exclusive, worldwide, royalty-free licence to use, reproduce, and
              distribute that content solely for the purpose of operating and improving the Platform.
            </p>
          </section>

          {/* ── Fees ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">6. Fees &amp; Payments</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Basic use of JOBR Kenya is free for job seekers. Employer services, including
              featured listings and premium employer features, may require payment. All fees
              will be clearly communicated before you are charged.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-600">
              <li>All prices are quoted in Kenyan Shillings (KES) unless otherwise stated</li>
              <li>Payments are processed securely through our payment partners</li>
              <li>Refund requests must be submitted within 7 days of the transaction</li>
              <li>JOBR Kenya reserves the right to modify pricing with 30 days&apos; notice</li>
            </ul>
          </section>

          {/* ── Limitations of Liability ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">7. Limitation of Liability</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              To the maximum extent permitted by Kenyan law:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-600">
              <li>
                JOBR Kenya is a platform that connects job seekers with employers. We are not
                a party to any employment relationship between users and employers.
              </li>
              <li>
                We do not guarantee that any job listing will result in employment, nor do we
                verify the qualifications or representations of employers or job seekers.
              </li>
              <li>
                The Platform is provided &quot;as is&quot; and &quot;as available&quot; without warranties
                of any kind, either express or implied, including but not limited to
                merchantability and fitness for a particular purpose.
              </li>
              <li>
                We shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages arising from your use of the Platform.
              </li>
              <li>
                Our total liability for any claim shall not exceed the amount you paid to JOBR
                Kenya in the 12 months preceding the claim, or KES 10,000, whichever is greater.
              </li>
            </ul>
          </section>

          {/* ── Indemnification ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">8. Indemnification</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              You agree to indemnify, defend, and hold harmless JOBR Kenya, its directors,
              employees, and affiliates from any claims, damages, losses, liabilities, and
              expenses (including legal fees) arising from your use of the Platform, your
              violation of these Terms, or your infringement of any third party&apos;s rights.
            </p>
          </section>

          {/* ── Termination ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">9. Termination</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Either party may terminate these Terms at any time. JOBR Kenya reserves the right
              to suspend or terminate your access to the Platform immediately, without prior
              notice or liability, for any reason, including but not limited to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-600">
              <li>Breach of these Terms or applicable laws</li>
              <li>Fraudulent, abusive, or disruptive behaviour</li>
              <li>Prolonged account inactivity</li>
              <li>Requests by law enforcement or regulatory authorities</li>
            </ul>
            <p className="mt-3 leading-relaxed text-gray-600">
              Upon termination, your right to use the Platform will cease immediately.
              Provisions that by their nature should survive termination (e.g., intellectual
              property, limitation of liability) will remain in effect.
            </p>
          </section>

          {/* ── Dispute Resolution & Governing Law ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">10. Governing Law &amp; Dispute Resolution</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              These Terms are governed by and construed in accordance with the laws of the
              Republic of Kenya, without regard to conflict of law principles.
            </p>
            <p className="mt-3 leading-relaxed text-gray-600">
              Any disputes arising from these Terms or your use of the Platform shall first
              be attempted to be resolved through good-faith negotiation. If negotiation fails
              within 30 days, the dispute shall be submitted to exclusive jurisdiction of the
              courts of Nairobi, Kenya.
            </p>
          </section>

          {/* ── General Provisions ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">11. General Provisions</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
              <li>
                <strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy,
                constitute the entire agreement between you and JOBR Kenya regarding use of the Platform.
              </li>
              <li>
                <strong>Severability:</strong> If any provision of these Terms is found to be
                unenforceable or invalid, the remaining provisions shall continue in full force
                and effect.
              </li>
              <li>
                <strong>Waiver:</strong> The failure of JOBR Kenya to enforce any right or
                provision of these Terms shall not constitute a waiver of that right or provision.
              </li>
              <li>
                <strong>Assignment:</strong> You may not assign or transfer your rights under
                these Terms without our prior written consent.
              </li>
            </ul>
          </section>

          {/* ── Contact ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900">12. Contact Us</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              If you have questions about these Terms of Service, please contact us:
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
