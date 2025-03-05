import RegionalManagerTable from '../../../components/dashboard/RegionalManagerTable';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-20">
          <div className="mb-16">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-semibold text-asset-dark">
                All Reginal Managers
              </h1>
              <div className="h-0.5 w-full bg-asset-teal" />
            </div>
          </div>
          <RegionalManagerTable />
        </div>
      </main>
    </div>
  );
}
