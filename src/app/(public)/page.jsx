import HomeClient from '@/pages/Home';

export const metadata = {
  title: 'Custom Sportswear Manufacturer | B2B Sports Apparel Supplier',
  description: 'SMI Sportswear is a leading custom sportswear manufacturer & sports apparel supplier. We manufacture bulk team uniforms, custom teamwear, and private label apparel with low MOQ and fast shipping.',
  alternates: {
    canonical: 'https://smisportswears.site',
  },
  openGraph: {
    title: 'Custom Sportswear Manufacturer | SMI Sportswear',
    description: 'B2B Custom Sportswear & Sports Apparel Manufacturer in Sialkot, Pakistan. OEM & Private Label bulk team uniforms.',
    url: 'https://smisportswears.site',
    type: 'website',
    images: [
      {
        url: 'https://smisportswears.site/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'SMI Sportswear Custom Manufacturer Sialkot',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Sportswear Manufacturer | SMI Sportswear',
    description: 'B2B Custom Sportswear & Sports Apparel Manufacturer in Sialkot, Pakistan. OEM & Private Label bulk team uniforms.',
    images: ['https://smisportswears.site/android-chrome-512x512.png'],
  }
};

export default function Page() {
  // Inject Organization Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    'name': 'SMI Sportswear',
    'url': 'https://smisportswears.site',
    'logo': 'https://smisportswears.site/android-chrome-192x192.png',
    'image': 'https://smisportswears.site/android-chrome-512x512.png',
    'description': 'Leading enterprise B2B custom sportswear & sports apparel manufacturer in Sialkot, Pakistan. Specializing in soccer uniforms, football jerseys, basketball kits, and private label production.',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Sialkot',
      'addressRegion': 'Punjab',
      'addressCountry': 'Pakistan'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+92-342-5744310',
      'contactType': 'sales',
      'email': 'smisportswears@gmail.com',
      'availableLanguage': ['English', 'Urdu']
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
