import ProductManagement from '@/admin/pages/ProductManagement';

export const metadata = {
  title: 'Product Management | SMI Sportswear Admin',
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <ProductManagement />;
}
