"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageCircle } from "lucide-react";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";
import AIChatbot from "../components/AIChatbot";
import helpData from "../data/helpData.json";

const SECTION_HEADINGS = [
  "Newsroom",
  "Discover Privee",
  "Privee Story",
  "Privee Hub",
  "Help Center",
  "FAQ",
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

  // Feedback state management
  const [feedbackSubmitted, setFeedbackSubmitted] = useState({});
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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

    const normalizedQuery = query.toLowerCase().trim();
    const results = new Map(); // Use Map to prevent duplicates

    // Helper function to add result if it matches and isn't already added
    const addIfMatches = (item) => {
      if (!results.has(item.id)) {
        const titleMatch = item.title.toLowerCase().includes(normalizedQuery);
        if (titleMatch) {
          results.set(item.id, { ...item, matchType: 'title' });
        }
      }
    };

    // Search in popular articles
    helpData.popularArticles.forEach(addIfMatches);

    // Search in topics and subtopics
    helpData.topics.forEach((topic) => {
      topic.subtopics.forEach(addIfMatches);
    });

    // Search in article content
    helpData.articles.forEach((article) => {
      if (!results.has(article.id)) {
        const contentToSearch = [
          article.title,
          ...(article.steps || []),
          article.note || ''
        ].map(text => (text || '').toLowerCase()).join(' ');

        if (contentToSearch.includes(normalizedQuery)) {
          results.set(article.id, { ...article, matchType: 'content' });
        }
      }
    });

    setSearchResults(Array.from(results.values()));
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

  // Feedback handlers
  const handleFeedbackSubmit = async (rating, articleId) => {
    setIsSubmittingFeedback(true);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId,
          rating,
          comment: feedbackComment,
          email: feedbackEmail,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      if (response.ok) {
        setFeedbackSubmitted(prev => ({
          ...prev,
          [articleId]: { rating, submitted: true }
        }));
        setFeedbackComment('');
        setFeedbackEmail('');
        setShowCommentForm(false);
        setSelectedRating(null);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Still update UI even if API fails
      setFeedbackSubmitted(prev => ({
        ...prev,
        [articleId]: { rating, submitted: true }
      }));
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const handleFeedbackClick = (rating, articleId) => {
    if (isSubmittingFeedback) return; // Prevent multiple clicks
    setSelectedRating(rating);
    if (rating === 'No') {
      setShowCommentForm(true);
    } else {
      handleFeedbackSubmit(rating, articleId);
    }
  };

  const handleCommentSubmit = () => {
    if (selectedRating && !isSubmittingFeedback) {
      handleFeedbackSubmit(selectedRating, selectedArticle);
    }
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
                  <div className="mb-8">
                    <motion.button
                      onClick={() => setIsChatbotOpen(true)}
                      className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#3A1772] to-[#CD1A70] px-6 py-3 text-white font-medium hover:opacity-90 transition-opacity"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Ask AI Assistant
                    </motion.button>
                    <p className="text-sm text-gray-500 mt-2">Get instant answers from our AI assistant</p>
                  </div>
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
                          {!feedbackSubmitted[selectedArticle]?.submitted ? (
                            <>
                          <p className="mb-4 text-base text-gray-600">
                            Was this article helpful?
                          </p>
                          <div className="flex gap-4">
                            <motion.button
                                  onClick={() => handleFeedbackClick('Yes', selectedArticle)}
                                  disabled={isSubmittingFeedback}
                                  className={`rounded-md bg-gradient-to-r from-[#3A1772] to-[#CD1A70] px-6 py-2 text-base font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                                  whileHover={!isSubmittingFeedback ? { scale: 1.05 } : {}}
                                  whileTap={!isSubmittingFeedback ? { scale: 0.95 } : {}}
                              transition={{ duration: 0.2 }}
                            >
                                  {isSubmittingFeedback && selectedRating === 'Yes' ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                      Sending...
                                    </>
                                  ) : (
                                    'Yes 👍'
                                  )}
                            </motion.button>
                            <motion.button
                                  onClick={() => handleFeedbackClick('No', selectedArticle)}
                                  disabled={isSubmittingFeedback}
                                  className={`rounded-md border border-gray-200 bg-white px-6 py-2 text-base font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                                  whileHover={!isSubmittingFeedback ? { scale: 1.05 } : {}}
                                  whileTap={!isSubmittingFeedback ? { scale: 0.95 } : {}}
                              transition={{ duration: 0.2 }}
                                >
                                  {isSubmittingFeedback && selectedRating === 'No' ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                                      Sending...
                                    </>
                                  ) : (
                                    'No 👎'
                                  )}
                                </motion.button>
                              </div>
                              
                              {/* Comment form for negative feedback */}
                              {showCommentForm && selectedRating === 'No' && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6"
                                >
                                  <p className="mb-3 text-sm font-medium text-gray-700">
                                    Help us improve this article. What was missing or unclear?
                                  </p>
                                  <textarea
                                    value={feedbackComment}
                                    onChange={(e) => setFeedbackComment(e.target.value)}
                                    placeholder="Please share your feedback..."
                                    className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#CD1A70] focus:outline-none focus:ring-2 focus:ring-[#CD1A70]/20"
                                    rows={3}
                                  />
                                  <input
                                    type="email"
                                    value={feedbackEmail}
                                    onChange={(e) => setFeedbackEmail(e.target.value)}
                                    placeholder="Your email (optional) - for support to contact you"
                                    className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#CD1A70] focus:outline-none focus:ring-2 focus:ring-[#CD1A70]/20"
                                  />
                                  <div className="flex gap-3">
                                    <motion.button
                                      onClick={handleCommentSubmit}
                                      disabled={isSubmittingFeedback}
                                      className={`rounded-md bg-[#CD1A70] px-4 py-2 text-sm font-medium text-white hover:bg-[#B01560] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                                      whileHover={!isSubmittingFeedback ? { scale: 1.05 } : {}}
                                      whileTap={!isSubmittingFeedback ? { scale: 0.95 } : {}}
                                    >
                                      {isSubmittingFeedback ? (
                                        <>
                                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                          Sending...
                                        </>
                                      ) : (
                                        'Send Feedback'
                                      )}
                                    </motion.button>
                                    <motion.button
                                      onClick={() => {
                                        setShowCommentForm(false);
                                        setFeedbackComment('');
                                        setFeedbackEmail('');
                                        setSelectedRating(null);
                                        setIsSubmittingFeedback(false);
                                      }}
                                      disabled={isSubmittingFeedback}
                                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                      whileHover={!isSubmittingFeedback ? { scale: 1.05 } : {}}
                                      whileTap={!isSubmittingFeedback ? { scale: 0.95 } : {}}
                                    >
                                      Cancel
                                    </motion.button>
                                  </div>
                                </motion.div>
                              )}
                            </>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-6"
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">🎉</div>
                                <div>
                                  <p className="text-sm font-medium text-green-800">
                                    Thank you for your feedback!
                                  </p>
                                  <p className="text-xs text-green-600">
                                    Your input helps us improve our help center.
                                  </p>
                                </div>
                              </div>
                              {feedbackSubmitted[selectedArticle]?.rating === 'No' && (
                                <div className="mt-4 rounded-md bg-blue-50 border border-blue-200 p-4">
                                  <p className="text-sm text-blue-800">
                                    <strong>Need more help?</strong> Our support team is here to assist you. 
                                    {feedbackEmail ? (
                                      <span> We'll contact you at <strong>{feedbackEmail}</strong> if you provided your email.</span>
                                    ) : (
                                      <>
                                        <a 
                                          href="/contact-us" 
                                          className="ml-1 text-blue-600 underline hover:text-blue-800"
                                        >
                                          Contact us
                                        </a> for personalized assistance.
                                      </>
                                    )}
                                  </p>
                          </div>
                              )}
                            </motion.div>
                          )}
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
            className="absolute right-4 top-4 text-3xl text-white"
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
      
      {/* Floating Chat Button */}
      {!isChatbotOpen && (
        <motion.button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full shadow-lg hover:shadow-xl transition-shadow z-30 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </motion.button>
      )}
      
      {/* AI Chatbot */}
      <AIChatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </div>
  );
}
