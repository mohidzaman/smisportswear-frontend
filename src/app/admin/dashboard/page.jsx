import AdminDashboard from '@/admin/pages/Dashboard';

export const metadata = {
  title: 'Dashboard | SMI Sportswear Admin',
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <AdminDashboard />;
}
