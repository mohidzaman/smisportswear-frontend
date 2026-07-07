import './globals.css';

export const metadata = {
  metadataBase: new URL('https://smisportswears.site'),
  title: {
    default: 'SMI Sportswear | Elite Custom Sportswear Manufacturer Sialkot',
    template: '%s | SMI Sportswear'
  },
  description: 'Enterprise custom sportswear manufacturer & supplier in Sialkot, Pakistan. OEM & Private Label soccer jerseys, basketball kits, cricket uniforms, and teamwear.',
  alternates: {
    canonical: 'https://smisportswears.site',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    siteName: 'SMI Sportswear',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Montserrat:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background-dark text-white font-body selection:bg-primary/30 selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
