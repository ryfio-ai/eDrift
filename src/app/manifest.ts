import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'eDrift Electric',
    short_name: 'eDrift',
    description: 'Advanced Power Electronics for the EV Ecosystem.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B1120',
    theme_color: '#0A4FCC',
    icons: [
      {
        src: '/images/edrift logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
