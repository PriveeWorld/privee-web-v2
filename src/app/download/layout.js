import { generateViewport } from 'next'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default function DownloadLayout({ children }) {
  return children
} 