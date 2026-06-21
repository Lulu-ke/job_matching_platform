import { Suspense } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { OfficialUpdates } from '@/components/home/OfficialUpdates';
import { ClosingSoonSection } from '@/components/home/ClosingSoonSection';
import { BrowseByCategory } from '@/components/home/BrowseByCategory';
import { OpportunitiesHub } from '@/components/home/OpportunitiesHub';
import { GovernmentJobsSection } from '@/components/home/GovernmentJobsSection';
import { JobMatchingPremium } from '@/components/home/JobMatchingPremium';
import { FlexibleJobsSection } from '@/components/home/FlexibleJobsSection';
import { CareerAdviceSection } from '@/components/home/CareerAdviceSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { BottomAdBanner } from '@/components/home/BottomAdBanner';
import { generateWebSiteSchema } from '@/lib/utils/seo';

export default function HomePage() {
  return (
    <>
      {/* JSON-LD: WebSite with SearchAction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteSchema()) }}
      />

      {/* 1. Hero with search + recently posted */}
      <HeroSection />

      {/* 2. Official Updates + Ad + Alerts */}
      <OfficialUpdates />

      {/* 3. Closing Soon + CV Promo */}
      <Suspense>
        <ClosingSoonSection />
      </Suspense>

      {/* 4. Browse by Category (horizontal scroll) */}
      <BrowseByCategory />

      {/* 5. Opportunities Hub (tabs) */}
      <OpportunitiesHub />

      {/* 6. Government Jobs (National + County) */}
      <GovernmentJobsSection />

      {/* 7. AI Job Matching Premium */}
      <JobMatchingPremium />

      {/* 8. Flexible Jobs + Across Kenya */}
      <FlexibleJobsSection />

      {/* 9. Career Advice & Resources */}
      <CareerAdviceSection />

      {/* 10. Newsletter Subscription */}
      <NewsletterSection />

      {/* 11. Bottom Ad Banner */}
      <BottomAdBanner />

      {/* 12. Footer is in layout.tsx */}
    </>
  );
}