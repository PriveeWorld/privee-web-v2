import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <h1 className="mb-2 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-8xl font-bold text-transparent">
        404
      </h1>
      <h2 className="mb-4 font-clash text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md text-center font-inter text-lg text-gray-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-full bg-gradient-to-r from-[#3A1772] to-[#CD1A70] px-8 py-3 font-inter font-semibold text-white transition-opacity hover:opacity-90"
        >
          Go Home
        </Link>
        <Link
          href="/discover"
          className="rounded-full border-2 border-[#3A1772] px-8 py-3 font-inter font-semibold text-[#3A1772] transition-colors hover:bg-[#3A1772]/5"
        >
          Discover Privee
        </Link>
      </div>
    </div>
  );
}
