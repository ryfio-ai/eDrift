import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'eDrift Electric',
    short_name: 'eDrift',
    description: 'Premium automotive-grade power electronics for the EV ecosystem.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0086c1',
    icons: [
      {
        src: '/images/edrift logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
