import React from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * 404 Page styled to match your UI:
 * - Brand accent: #FF9A01
 * - Soft card background: #EDF1F5 / #FBFBFB
 * - Responsive layout for mobile and desktop
 * - Accessible buttons and descriptive text
 */

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#FBFBFB] flex items-center justify-center px-6 md:px-[100px]">
      <div className="max-w-[1100px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Illustration + short message */}
        <section className="flex flex-col gap-6 justify-center">
          {/* subtle badge */}
          <div className="inline-flex items-center gap-2 bg-[#FFECD6] text-[#8A4B00] px-3 py-1 rounded-full w-max">
            <span className="font-semibold text-sm">404</span>
            <span className="text-xs">Page not found</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2D2E2E] leading-tight">
            Oops — we can’t find that page.
          </h1>

          <p className="text-[#595A5B] text-base md:text-lg max-w-[560px]">
            The page you’re looking for might have been removed, had its name
            changed, or is temporarily unavailable. Try one of the options below
            — or head back home to start fresh.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={() => navigate("/")}
              className="bg-[#FF9A01] text-[#2D2E2E] font-bold rounded-2xl px-6 py-3 shadow-sm hover:bg-[#e68a00] transition"
              aria-label="Go to homepage"
            >
              Go to homepage
            </button>

            <Link
              to="/search-result"
              className="bg-white border border-[#DCE0E4] text-[#2D2E2E] rounded-2xl px-6 py-3 font-medium text-center hover:shadow-sm transition"
              aria-label="Discover listings"
            >
              Browse listings
            </Link>

            <button
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
              className="mt-0 sm:mt-0 text-sm text-[#6B6D6E] underline"
              aria-label="Report an issue"
            >
              Report an issue
            </button>
          </div>

          <div className="mt-6 text-sm text-[#8A8C8D]">
            Tip: If you followed a link, try refreshing — or check our{" "}
            <Link to="/help" className="text-[#FF9A01] underline">
              Help center
            </Link>
            .
          </div>
        </section>

        {/* Right: Illustration / card with search and quick links */}
        <aside className="bg-white rounded-2xl p-6 shadow-md">
          {/* simple illustrative SVG (keeps UI consistent without extra assets) */}
          <div className="flex items-center justify-center mb-4">
            <svg
              width="220"
              height="160"
              viewBox="0 0 220 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Illustration of a lost map"
            >
              <rect
                x="0"
                y="0"
                width="220"
                height="160"
                rx="16"
                fill="#EDF1F5"
              />
              <g transform="translate(28,18)">
                <path
                  d="M10 92 L90 10 L170 92 L90 162 Z"
                  fill="#FFFFFF"
                  stroke="#DCE0E4"
                  strokeWidth="3"
                />
                <circle cx="90" cy="86" r="28" fill="#FFEBCC" />
                <path
                  d="M90 70 L110 86 L90 102"
                  stroke="#FF9A01"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M80 86 L100 86"
                  stroke="#2D2E2E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>

          {/* Small in-card search (keeps users in flow) */}
          <div className="mb-4">
            <label htmlFor="quickSearch" className="sr-only">
              Search listings
            </label>
            <div className="flex items-center gap-2 bg-[#F7F8F9] border border-[#E6E9EB] rounded-xl px-3 py-2">
              <input
                id="quickSearch"
                type="search"
                placeholder="Search city, area or property"
                className="flex-1 bg-transparent outline-none text-sm text-[#2D2E2E]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const q = e.target.value.trim();
                    if (q) {
                      // quick client-side navigation to discover/search route
                      window.location.href = `/discover?query=${encodeURIComponent(
                        q
                      )}`;
                    }
                  }
                }}
                aria-label="Search city, area or property"
              />
              <button
                onClick={() => {
                  const input = document.getElementById("quickSearch");
                  const q = input?.value.trim();
                  if (q)
                    window.location.href = `/discover?query=${encodeURIComponent(
                      q
                    )}`;
                }}
                className="font-semibold text-[#FF9A01] px-3 py-1"
                aria-label="Search"
              >
                Search
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link
              to="/nearby"
              className="block px-3 py-3 rounded-lg border border-[#EDF1F5] hover:bg-[#FBFBFB]"
            >
              Nearby stays
            </Link>
            <Link
              to="/stay"
              className="block px-3 py-3 rounded-lg border border-[#EDF1F5] hover:bg-[#FBFBFB]"
            >
              Browse stays
            </Link>
            <Link
              to="/sign-in"
              className="block px-3 py-3 rounded-lg border border-[#EDF1F5] hover:bg-[#FBFBFB]"
            >
              Sign in
            </Link>
            <Link
              to="/sign-up"
              className="block px-3 py-3 rounded-lg border border-[#EDF1F5] hover:bg-[#FBFBFB]"
            >
              Create account
            </Link>
          </div>

          <div className="mt-4 text-xs text-[#8B8D8E]">
            Still stuck?{" "}
            <Link to="/contact" className="text-[#FF9A01] underline">
              Get help
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default NotFoundPage;
