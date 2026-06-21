import { AdBanner } from '@/components/shared/AdBanner';

export function BottomAdBanner() {
  return (
    <div className="pb-6">
      <div className="mx-auto flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <AdBanner size="leaderboard" />
      </div>
    </div>
  );
}