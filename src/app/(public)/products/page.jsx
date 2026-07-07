import Products from '@/pages/Products';

export const metadata = {
  title: 'Products | SMI Sportswear',
  description: 'Explore our catalog of premium custom sportswear products.',
  alternates: {
    canonical: 'https://smisportswears.site/products',
  }
};

export default function Page() {
  return <Products />;
}
