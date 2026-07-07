import Gallery from '@/pages/Gallery';

export const metadata = {
  title: 'Gallery | SMI Sportswear',
  description: 'View our gallery of custom sportswear and manufacturing projects.',
  alternates: {
    canonical: 'https://smisportswears.site/gallery',
  }
};

export default function Page() {
  return <Gallery />;
}
