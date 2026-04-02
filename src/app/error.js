"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <h1 className="mb-4 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-5xl font-bold text-transparent">
        Something went wrong
      </h1>
      <p className="mb-8 max-w-md text-center font-inter text-lg text-gray-600">
        We encountered an unexpected error. Please try again.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-full bg-gradient-to-r from-[#3A1772] to-[#CD1A70] px-8 py-3 font-inter font-semibold text-white transition-opacity hover:opacity-90"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-full border-2 border-[#3A1772] px-8 py-3 font-inter font-semibold text-[#3A1772] transition-colors hover:bg-[#3A1772]/5"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
