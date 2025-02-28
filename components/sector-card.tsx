interface SectorCardProps {
  setNumber: number;
  isActive?: boolean;
}

export function SectorCard({ setNumber, isActive = false }: SectorCardProps) {
  return (
    <div
      className={`rounded-lg p-4 transition-colors ${
        isActive ? 'bg-asset-light-blue' : 'bg-gray-200'
      }`}
    >
      <div className="space-y-2">
        <p className="text-sm text-asset-medium">Set {setNumber}:</p>
        <p className="text-asset-dark">
          Sustainable Water & Wastewater management{' '}
        </p>
      </div>
    </div>
  );
}
