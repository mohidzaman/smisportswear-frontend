import AdminLogin from '@/admin/pages/Login';

export const metadata = {
  title: 'Admin Portal | SMI Sportswear',
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <AdminLogin />;
}
