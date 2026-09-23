import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technician Dashboard - NeaPure',
  description: 'Technician work overview dashboard',
};

export default function TechnicianDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {children}
    </div>
  );
}