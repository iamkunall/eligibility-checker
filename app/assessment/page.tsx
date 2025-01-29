import { SiteHeader } from '@/components/site-header';
import { Sprout } from 'lucide-react';
import Link from 'next/link';

export default function AssessmentPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container grid gap-16 pt-20 md:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <div className="rounded-2xl bg-asset-mint p-4">
            <Sprout className="h-8 w-8 text-asset-dark" />
          </div>
          <h1 className="text-5xl font-semibold text-asset-dark">
            Choose your Framework
          </h1>
          <p className="text-asset-medium leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <Link
            href="/assessment/default-framework"
            className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-asset-light-blue to-asset-mint p-8 text-left shadow-lg transition-all hover:shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-asset-dark">
              EDIT A DEFAULT FRAMEWORK
            </h2>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-asset-teal transition-all group-hover:h-2" />
          </Link>

          <Link
            href="/assessment/create-framework"
            className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-asset-light-blue to-asset-mint p-8 text-left shadow-lg transition-all hover:shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-asset-dark">
              CREATE YOUR OWN FRAMEWORK
            </h2>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-asset-teal transition-all group-hover:h-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
