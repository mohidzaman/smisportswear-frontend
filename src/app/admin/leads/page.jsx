import LeadManagement from '@/admin/pages/LeadManagement';

export const metadata = {
  title: 'Lead Management | SMI Sportswear Admin',
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <LeadManagement />;
}
