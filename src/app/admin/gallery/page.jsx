import GalleryManagement from '@/admin/pages/GalleryManagement';

export const metadata = {
  title: 'Gallery Management | SMI Sportswear Admin',
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <GalleryManagement />;
}
