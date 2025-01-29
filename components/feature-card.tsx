import Image from 'next/image';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-start">
      <div className="mb-6">
        <Image
          src={icon || '/placeholder.svg'}
          alt="icon"
          height={80}
          width={80}
        />
      </div>
      <div className="border-l-2 border-[#7bd2d3] pl-4">
        <h3 className="text-lg font-medium text-[#212A3A]">{title}</h3>
      </div>
    </div>
  );
}
