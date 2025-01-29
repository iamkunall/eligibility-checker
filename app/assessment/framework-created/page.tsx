import { SiteHeader } from '@/components/site-header';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FrameworkCreatedPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container flex flex-col items-center justify-center py-20">
          <div className="mb-8 rounded-full bg-asset-mint p-4">
            <CheckCircle className="h-12 w-12 text-asset-dark" />
          </div>
          <h1 className="mb-4 text-4xl font-semibold text-asset-dark">
            Framework Created Successfully
          </h1>
          <p className="mb-8 text-center text-asset-medium">
            Your framework has been created and is ready to use.
          </p>
          <Button asChild className="bg-asset-dark hover:bg-asset-dark/90">
            <Link href="/assessment">Return to Assessment</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
