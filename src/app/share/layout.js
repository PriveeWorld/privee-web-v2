import { generateViewport } from 'next/viewport'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default function ShareLayout({ children }) {
  return children
} 