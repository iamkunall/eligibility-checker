'use client';

import {
  Sprout,
  PlusCircle,
  BookOpen,
  Users,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type DashboardCard = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

const DashboardCard = ({ card }: { card: DashboardCard }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={card.href}
      className={`bg-asset-mint shadow-lg text-center p-6 rounded-lg flex flex-col items-center justify-center h-40 transition-all duration-200 ${
        isHovered ? 'shadow-xl translate-y-[-2px]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <card.icon
        className={`h-8 w-8 text-asset-dark mb-2 transition-transform ${
          isHovered ? 'scale-110' : ''
        }`}
      />
      <h2 className="text-xl font-semibold text-asset-dark">{card.title}</h2>
      {card.description && (
        <p className="text-sm text-asset-medium mt-1">{card.description}</p>
      )}
    </Link>
  );
};

export default function RegionalManagerCards() {
  // Dashboard cards data
  const dashboardCards: DashboardCard[] = [
    {
      title: 'CREATE NEW APPLICATION',
      href: '/assessment',
      icon: PlusCircle,
      // description: "Build new assessment frameworks",
    },
    {
      title: 'REVIEW DRAFT APPLICATIONS',
      href: '/assessment/saved-frameworks',
      icon: BookOpen,
      // description: "View and edit existing frameworks",
    },
    {
      title: 'VIEW FRAMEWORK',
      href: '/assessment/saved-frameworks',
      icon: Users,
      // description: "Relationship manager settings",
    },
    {
      title: 'REVIEW SUBMITTED APPLICATIONS',
      href: '/settings',
      icon: Settings,
      // description: "Configure system preferences",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col mt-28">
      <div className="container grid gap-16 pt-20 md:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <div className="rounded-2xl bg-asset-mint p-4 shadow-md">
            <Sprout className="h-8 w-8 text-asset-dark" />
          </div>
          <h1 className="text-5xl font-semibold text-asset-dark">Dashboard</h1>
          <p className="text-asset-medium leading-relaxed">Admin Portal</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dashboardCards.map((card) => (
            <DashboardCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
