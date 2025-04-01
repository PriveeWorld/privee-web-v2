"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";
import helpData from "../data/helpData.json";

const SECTION_HEADINGS = [
  "Discover Privee",
  "Privee Story",
  "Privee Hub",
  "Privacy Policy",
  "Contact Us",
];

const SEARCH_SUGGESTIONS = [
  "how to create visual",
  "how to create account",
  "how to share content",
];

export default function Tutorials() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [section, setSection] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // Rotate search suggestions
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSuggestion((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Search function
  const searchArticles = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const normalizedQuery = query.toLowerCase();

    // Search through all articles and subtopics
    const results = [];

    // Search in popular articles
    helpData.popularArticles.forEach((article) => {
      if (article.title.toLowerCase().includes(normalizedQuery)) {
        results.push(article);
      }
    });

    // Search in topics and subtopics
    helpData.topics.forEach((topic) => {
      topic.subtopics.forEach((subtopic) => {
        if (
          subtopic.title.toLowerCase().includes(normalizedQuery) &&
          !results.find((r) => r.id === subtopic.id)
        ) {
          results.push(subtopic);
        }
      });
    });

    // Search in article content
    helpData.articles.forEach((article) => {
      const contentToSearch = [article.title, ...article.steps, article.note]
        .join(" ")
        .toLowerCase();

      if (
        contentToSearch.includes(normalizedQuery) &&
        !results.find((r) => r.id === article.id)
      ) {
        results.push(article);
      }
    });

    setSearchResults(results);
    setIsSearching(true);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchArticles(query);
  };

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchArticles(searchQuery);
  };

  // Get the article content if one is selected
  const articleContent = selectedArticle
    ? helpData.articles.find((article) => article.id === selectedArticle)
    : null;

  return (
    <div className="relative flex min-h-screen w-screen items-start justify-center overflow-auto bg-white">
      <FullscreenNav
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        sections={SECTION_HEADINGS}
        onSelectSection={(index) => {
          setSection(index);
          setIsNavOpen(false);
        }}
      />
      <TopNav
        onMenuClick={() => setIsNavOpen(true)}
        section={SECTION_HEADINGS[section]}
      />

      <div className="relative mt-[100px] w-full max-w-[1600px] px-4 py-8 sm:px-8 sm:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedArticle || "overview"}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {!selectedArticle ? (
              // Overview Page
              <div>
                {/* Help Center Header and Search */}
                <div className="mb-16 text-center">
                  <h1 className="mb-4 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-[40px] font-semibold leading-tight tracking-tight text-transparent sm:text-[50px] md:text-[60px] lg:text-[70px]">
                    Help Center
                  </h1>
                  <p className="mb-8 text-xl text-gray-600">
                    Hi, how can we help?
                  </p>
                  <div className="mx-auto max-w-2xl">
                    <form onSubmit={handleSearchSubmit} className="relative">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="w-full rounded-full border border-gray-300 bg-white py-4 pl-12 pr-4 text-lg text-gray-900 placeholder-gray-500 focus:border-[#CD1A70] focus:outline-none focus:ring-2 focus:ring-[#CD1A70]/20"
                          placeholder="Search for help..."
                        />
                      </div>
                      {!searchQuery && (
                        <div className="absolute left-0 right-0 mt-2 text-center text-sm text-gray-500">
                          Try "{SEARCH_SUGGESTIONS[activeSuggestion]}"
                        </div>
                      )}
                    </form>
                  </div>
                </div>

                {/* Search Results */}
                {isSearching && (
                  <section className="mb-12">
                    <h2 className="mb-8 font-clash text-[28px] font-semibold text-gray-900">
                      Search Results
                    </h2>
                    {searchResults.length > 0 ? (
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {searchResults.map((result) => (
                          <motion.button
                            key={result.id}
                            onClick={() => setSelectedArticle(result.id)}
                            className="rounded-lg border border-gray-200 bg-white p-6 text-left shadow-md transition hover:border-[#CD1A70] hover:shadow-xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h3 className="text-lg font-medium text-gray-900">
                              {result.title}
                            </h3>
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-gray-600">
                        No results found for "{searchQuery}"
                      </div>
                    )}
                  </section>
                )}

                {/* Show Popular Articles and Topics only when not searching */}
                {!isSearching && (
                  <>
                    {/* Popular Articles Section */}
                    <section className="mx-4 mb-12 md:mx-20">
                      <h2 className="mb-8 font-clash text-[28px] font-semibold text-gray-900">
                        Popular articles
                      </h2>
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {helpData.popularArticles.map((article) => (
                          <motion.button
                            key={article.id}
                            onClick={() => setSelectedArticle(article.id)}
                            className="rounded-lg border border-gray-200 bg-white p-6 text-left shadow-md transition hover:border-[#CD1A70] hover:shadow-xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h3 className="text-lg font-medium text-gray-900">
                              {article.title}
                            </h3>
                          </motion.button>
                        ))}
                      </div>
                    </section>

                    {/* Topics Section */}
                    <section className="mx-4 md:mx-20">
                      <h2 className="mb-8 font-clash text-[28px] font-semibold text-gray-900">
                        Topics
                      </h2>
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {helpData.topics.map((topic, index) => (
                          <motion.div
                            key={index}
                            className="rounded-xl border border-gray-200 bg-white p-8 shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <h3 className="mb-6 font-clash text-xl font-semibold text-gray-900">
                              {topic.title}
                            </h3>
                            <ul className="grid gap-4">
                              {topic.subtopics.map((subtopic) => (
                                <li key={subtopic.id}>
                                  <motion.button
                                    onClick={() =>
                                      setSelectedArticle(subtopic.id)
                                    }
                                    className="w-full text-left text-base text-gray-600 transition-all duration-200 hover:text-[#CD1A70]"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {subtopic.title}
                                  </motion.button>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  </>
                )}
              </div>
            ) : (
              // Article Detail Page
              <div>
                {/* MOBILE-ONLY DROPDOWN - place it at the top */}
                <div className="mb-8 block w-full lg:hidden">
                  <button
                    onClick={() =>
                      setIsMobileDropdownOpen(!isMobileDropdownOpen)
                    }
                    className="w-full rounded border border-gray-300 bg-white px-4 py-2 text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CD1A70]/20"
                  >
                    {selectedArticle ? articleContent?.title : "Select a Topic"}
                  </button>
                  {isMobileDropdownOpen && (
                    <div className="mt-2 rounded border border-gray-200 bg-white">
                      {helpData.topics.map((topic, i) => (
                        <div key={i} className="px-4 py-2">
                          <button
                            onClick={() =>
                              setExpandedTopic(expandedTopic === i ? null : i)
                            }
                            className="w-full text-left font-medium text-gray-900 hover:text-[#CD1A70]"
                          >
                            {topic.title}
                          </button>
                          {expandedTopic === i && (
                            <ul className="ml-4 mt-2 space-y-2">
                              {topic.subtopics.map((subtopic) => (
                                <li key={subtopic.id}>
                                  <button
                                    onClick={() => {
                                      setSelectedArticle(subtopic.id);
                                      setIsMobileDropdownOpen(false);
                                    }}
                                    className="text-gray-600 hover:text-[#CD1A70]"
                                  >
                                    {subtopic.title}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Rest of the detail page layout */}
                <div className="flex gap-12">
                  {/* LEFT NAVIGATION (DESKTOP ONLY) */}
                  <nav className="hidden w-72 flex-shrink-0 lg:block">
                    <div className="sticky top-8">
                      {helpData.topics.map((topic, index) => (
                        <motion.div
                          key={index}
                          className="mb-8"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <button
                            onClick={() =>
                              setExpandedTopic(
                                expandedTopic === index ? null : index,
                              )
                            }
                            className="mb-2 w-full text-left font-clash text-lg font-medium text-gray-900 transition-colors hover:text-[#CD1A70]"
                          >
                            {topic.title}
                          </button>
                          {expandedTopic === index && (
                            <ul className="ml-4 mt-2 space-y-3">
                              {topic.subtopics.map((subtopic) => (
                                <li key={subtopic.id}>
                                  <button
                                    onClick={() =>
                                      setSelectedArticle(subtopic.id)
                                    }
                                    className={`text-base transition-colors ${
                                      selectedArticle === subtopic.id
                                        ? "font-medium text-[#CD1A70]"
                                        : "text-gray-600 hover:text-[#CD1A70]"
                                    }`}
                                  >
                                    {subtopic.title}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </nav>

                  {/* MAIN CONTENT */}
                  <main className="flex-1">
                    <motion.button
                      onClick={() => {
                        setSelectedArticle(null);
                        setSearchQuery("");
                        setIsSearching(false);
                      }}
                      className="mb-8 flex items-center text-base text-gray-600 hover:text-[#CD1A70]"
                      whileHover={{ x: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      ← Back to Help Center
                    </motion.button>

                    {articleContent && (
                      <article>
                        <h1 className="mb-8 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-[32px] font-semibold leading-tight tracking-tight text-transparent sm:text-[40px]">
                          {articleContent.title}
                        </h1>
                        {/* Steps */}
                        {articleContent.steps && (
                          <div className="mb-8">
                            <ol className="list-decimal space-y-4 pl-6">
                              {articleContent.steps.map((step, index) => (
                                <li
                                  key={index}
                                  className="text-lg text-gray-700"
                                >
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                        {/* Note */}
                        {articleContent.note && (
                          <div className="mb-12 rounded-lg bg-gradient-to-r from-[#3A1772]/5 to-[#CD1A70]/5 p-6 text-base text-gray-700">
                            <p>{articleContent.note}</p>
                          </div>
                        )}
                        {articleContent.image && (
                          <div className="mb-8">
                            <img
                              src={articleContent.image}
                              className="mx-auto cursor-pointer"
                              onLoad={(e) => {
                                if (
                                  e.target.naturalHeight > e.target.naturalWidth
                                ) {
                                  e.target.style.maxHeight = "80vh";
                                  e.target.style.width = "auto";
                                }
                              }}
                              onClick={() =>
                                setFullscreenImage(articleContent.image)
                              }
                            />
                          </div>
                        )}
                        {/* Was this helpful */}
                        <div className="mb-12 border-t border-gray-200 pt-8">
                          <p className="mb-4 text-base text-gray-600">
                            Was this article helpful?
                          </p>
                          <div className="flex gap-4">
                            <motion.button
                              className="rounded-md bg-gradient-to-r from-[#3A1772] to-[#CD1A70] px-6 py-2 text-base font-medium text-white"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              Yes
                            </motion.button>
                            <motion.button
                              className="rounded-md border border-gray-200 bg-white px-6 py-2 text-base font-medium text-gray-700 hover:border-gray-300"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              No
                            </motion.button>
                          </div>
                        </div>
                        {/* Related Links */}
                        {articleContent.relatedLinks && (
                          <div className="rounded-lg border border-gray-200 bg-white p-8">
                            <h2 className="mb-6 font-clash text-xl font-medium text-gray-900">
                              Helpful links
                            </h2>
                            <ul className="space-y-3">
                              {articleContent.relatedLinks.map((link) => (
                                <li key={link.id}>
                                  <motion.button
                                    onClick={() => setSelectedArticle(link.id)}
                                    className="text-[#CD1A70] hover:text-[#3A1772]"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {link.title}
                                  </motion.button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </article>
                    )}
                  </main>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="blank-spacer h-20"></div>
      </div>
      {fullscreenImage && (
        <div
          className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-80"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFullscreenImage(null);
            }}
            className="absolute right-4 top-4 text-lg text-white"
          >
            ✕
          </button>
          <img
            src={fullscreenImage}
            className="max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
