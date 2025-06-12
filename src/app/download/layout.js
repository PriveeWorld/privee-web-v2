import { generateViewport } from 'next'
import { Suspense } from 'react'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default function DownloadLayout({ children }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3A1772] to-[#CD1A70]">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
      </div>
    }>
      {children}
    </Suspense>
  )
} 