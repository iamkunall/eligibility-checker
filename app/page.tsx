import { FeatureCard } from '@/components/feature-card';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container grid gap-16 py-20 md:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <Image src="/home/flower.png" height={64} width={64} alt="" />
            <h1 className="text-5xl font-semibold text-[#212A3A]">
              Green Eligibility Checker
            </h1>
            <p className="text-[#40495E] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat.
            </p>
            <Link
              href="/assessment"
              className="rounded-lg bg-[#212A3A] px-6 py-3 text-white hover:bg-[#212A3A]/90"
            >
              Start Assessment
            </Link>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-[32px] bg-gradient-to-br from-[#ace5ea] to-[#dee9b5]" />
        </section>

        {/* Features Section */}
        <section className="container py-20">
          <h2 className="mb-2 text-4xl font-semibold text-[#212A3A]">
            Assess an investment project
            <br />
            for financing.
          </h2>
          <p className="mb-16 text-[#40495E]">
            Key features of the Green Eligibility Checker
          </p>
          <div className="grid gap-12 md:grid-cols-3">
            <FeatureCard
              icon="/home/wind-power.png"
              title="Green eligibility confirmation across several sectors"
              description=""
            />
            <FeatureCard
              icon="/home/earth.png"
              title="Simplified climate impact estimation for more than 40 measures"
              description=""
            />
            <FeatureCard
              icon="/home/download.png"
              title="Download Green Checker Results"
              description=""
            />
          </div>
        </section>
      </main>
    </div>
  );
}
