import Link from 'next/link';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function JobNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100">
        <Briefcase className="h-10 w-10 text-emerald-600" />
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900">Job Not Found</h1>

      <p className="mt-3 max-w-md text-base text-gray-500">
        The job listing you&apos;re looking for may have been removed, expired, or
        the link may be incorrect.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
          <Link href="/jobs">
            Browse All Jobs
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}