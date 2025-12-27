"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Hls from "hls.js";
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Using native touch events for swipe detection

// Helper functions
function isImageFile(url = "") {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
}

function isHlsFile(url = "") {
  return /\.m3u8$/i.test(url);
}

function isMp4File(url = "") {
  return /\.(mp4|m4v|mov)$/i.test(url);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 19).replace("T", " ");
}

// Helper function to filter movies with visuals
function filterMoviesWithVisuals(moviesList) {
  return moviesList.filter(
    (movie) =>
      movie?.visuals?.items &&
      Array.isArray(movie.visuals.items) &&
      movie.visuals.items.length > 0
  );
}

export default function CinemaViewer() {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [currentVisualIndex, setCurrentVisualIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const containerRef = useRef(null);
  const hideControlsTimeout = useRef(null);
  const lastSeenDateRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const isLoadingMoreRef = useRef(false);
  const lastCheckedMovieCountRef = useRef(0);

  const currentMovie = movies[currentMovieIndex];
  const currentVisual =
    currentMovie?.visuals?.items?.[currentVisualIndex] || null;

  // Fetch guest feed
  const fetchGuestFeed = useCallback(
    async (seenBeforeDate, page = "1", skip = "0", networkCode = null) => {
      try {
        const params = new URLSearchParams({
          seenBeforeDate,
          page,
          skip,
        });

        if (networkCode) {
          params.append("networkCode", networkCode);
        }

        const response = await fetch(
          `https://38wzs9wt1a.execute-api.eu-central-1.amazonaws.com/cinema/guestfeed?${params.toString()}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data?.data || { listCinemaMovies: [], additionalMoviesCount: 0 };
      } catch (err) {
        console.error("Error fetching guest feed:", err);
        throw err;
      }
    },
    []
  );

  // Initial load
  useEffect(() => {
    const loadInitialFeed = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const seenBeforeDate = formatDate(new Date());
        lastSeenDateRef.current = seenBeforeDate;

        const result = await fetchGuestFeed(seenBeforeDate, "1", "0");
        const allMovies = result.listCinemaMovies || [];
        
        // Filter out movies with no visuals
        const moviesWithVisuals = filterMoviesWithVisuals(allMovies);

        if (moviesWithVisuals.length > 0) {
          setMovies(moviesWithVisuals);
          setHasMore(result.additionalMoviesCount > 0);
          // Reset to first movie/visual
          setCurrentMovieIndex(0);
          setCurrentVisualIndex(0);
        } else {
          setError("No movies with content available");
        }
      } catch (err) {
        setError("Failed to load cinema feed. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialFeed();
  }, [fetchGuestFeed]);

  // Load more movies when reaching the end - using refs to prevent infinite loops
  useEffect(() => {
    // Only check if we haven't already checked for this movie count
    if (
      currentMovieIndex >= movies.length - 3 &&
      hasMore &&
      !isLoadingMoreRef.current &&
      movies.length > 0 &&
      lastCheckedMovieCountRef.current !== movies.length
    ) {
      // Mark that we've checked for this count
      lastCheckedMovieCountRef.current = movies.length;
      
      // Prevent multiple simultaneous loads
      if (isLoadingMoreRef.current || !hasMore || !lastSeenDateRef.current) {
        return;
      }

      isLoadingMoreRef.current = true;
      setIsLoadingMore(true);

      const currentCount = movies.length;
      
      fetchGuestFeed(
        lastSeenDateRef.current,
        "1",
        currentCount.toString()
      )
        .then((result) => {
          const allNewMovies = result.listCinemaMovies || [];
          // Filter out movies with no visuals
          const newMoviesWithVisuals = filterMoviesWithVisuals(allNewMovies);
          
          if (newMoviesWithVisuals.length > 0) {
            setMovies((prev) => [...prev, ...newMoviesWithVisuals]);
            setHasMore(result.additionalMoviesCount > 0);
          } else {
            // If no movies with visuals, check if there are more to load
            setHasMore(result.additionalMoviesCount > 0);
          }
          isLoadingMoreRef.current = false;
          setIsLoadingMore(false);
        })
        .catch((err) => {
          console.error("Error loading more movies:", err);
          // Reset on error so we can retry
          lastCheckedMovieCountRef.current = movies.length - 1;
          isLoadingMoreRef.current = false;
          setIsLoadingMore(false);
        });
    }
  }, [currentMovieIndex, movies.length, hasMore, fetchGuestFeed]);

  // Video initialization
  useEffect(() => {
    if (!currentVisual || !videoRef.current) return;

    const videoElement = videoRef.current;
    const mediaPath =
      currentVisual.media?.path || currentVisual.media?.baseMediaPath;

    if (!mediaPath || isImageFile(mediaPath)) {
      setIsPlaying(false);
      return;
    }

    const initVideo = async () => {
      try {
        // Clean up previous HLS instance
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }

        if (isHlsFile(mediaPath) && Hls.isSupported()) {
          const hls = new Hls({
            startLevel: 0,
            enableWorker: true,
            lowLatencyMode: true,
          });
          await hls.loadSource(mediaPath);
          await hls.attachMedia(videoElement);
          hlsRef.current = hls;

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoElement.play().catch(() => {
              setIsPlaying(false);
            });
          });
        } else if (
          isHlsFile(mediaPath) &&
          videoElement.canPlayType("application/vnd.apple.mpegurl")
        ) {
          videoElement.src = mediaPath;
          videoElement.play().catch(() => {
            setIsPlaying(false);
          });
        } else if (isMp4File(mediaPath)) {
          videoElement.src = mediaPath;
          videoElement.play().catch(() => {
            setIsPlaying(false);
          });
        }
      } catch (err) {
        console.error("Error initializing video:", err);
        setIsPlaying(false);
      }
    };

    initVideo();

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
    };
  }, [currentVisual]);

  // Auto-hide controls
  const hideControlsAfterDelay = useCallback(() => {
    clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      hideControlsAfterDelay();
    }
  }, [isPlaying, hideControlsAfterDelay]);

  // User activity detection
  useEffect(() => {
    const handleUserActivity = () => {
      setShowControls(true);
      if (isPlaying) {
        hideControlsAfterDelay();
      }
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("touchstart", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      clearTimeout(hideControlsTimeout.current);
    };
  }, [isPlaying, hideControlsAfterDelay]);

  // Navigation handlers - matching mobile app behavior
  // Vertical swipe = navigate movies (up = next movie, down = previous movie)
  // Horizontal tap/swipe = navigate visuals within current movie (left = previous visual, right = next visual)
  
  const goToNextMovie = useCallback(() => {
    // Swipe UP = Next movie (index +1)
    if (currentMovieIndex < movies.length - 1) {
      setCurrentMovieIndex((prev) => prev + 1);
      setCurrentVisualIndex(0); // Reset to first visual of new movie
    }
  }, [currentMovieIndex, movies.length]);

  const goToPrevMovie = useCallback(() => {
    // Swipe DOWN = Previous movie (index -1)
    if (currentMovieIndex > 0) {
      setCurrentMovieIndex((prev) => prev - 1);
      setCurrentVisualIndex(0); // Reset to first visual of new movie
    }
  }, [currentMovieIndex]);

  const goToNextVisual = useCallback(() => {
    // Tap RIGHT = Next visual within current movie
    if (!currentMovie) return;

    const visuals = currentMovie.visuals?.items || [];
    if (currentVisualIndex < visuals.length - 1) {
      // Go to next visual in current movie
      setCurrentVisualIndex((prev) => prev + 1);
    } else {
      // If last visual, go to next movie's first visual
      if (currentMovieIndex < movies.length - 1) {
        setCurrentMovieIndex((prev) => prev + 1);
        setCurrentVisualIndex(0);
      }
    }
  }, [currentMovie, currentVisualIndex, currentMovieIndex, movies.length]);

  const goToPrevVisual = useCallback(() => {
    // Tap LEFT = Previous visual within current movie
    if (currentVisualIndex > 0) {
      // Go to previous visual in current movie
      setCurrentVisualIndex((prev) => prev - 1);
    } else {
      // If first visual, go to previous movie's last visual
      if (currentMovieIndex > 0) {
        const prevMovie = movies[currentMovieIndex - 1];
        const prevVisuals = prevMovie?.visuals?.items || [];
        setCurrentMovieIndex((prev) => prev - 1);
        setCurrentVisualIndex(Math.max(0, prevVisuals.length - 1));
      }
    }
  }, [currentVisualIndex, currentMovieIndex, movies]);

  const togglePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => console.warn("Autoplay blocked"));
    }
  }, [isPlaying]);

  // Keyboard navigation - matching mobile app
  // Arrow Up/Down = navigate movies (vertical)
  // Arrow Left/Right = navigate visuals (horizontal)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowUp") {
        // Up = Next movie (swipe up)
        goToNextMovie();
      } else if (e.key === "ArrowDown") {
        // Down = Previous movie (swipe down)
        goToPrevMovie();
      } else if (e.key === "ArrowLeft") {
        // Left = Previous visual (tap left)
        goToPrevVisual();
      } else if (e.key === "ArrowRight") {
        // Right = Next visual (tap right)
        goToNextVisual();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [goToNextVisual, goToPrevVisual, goToNextMovie, goToPrevMovie, togglePlayPause]);

  // Swipe handlers - matching mobile app behavior
  // Vertical swipe = navigate movies (up = next, down = previous)
  // Horizontal swipe/tap = navigate visuals (left = previous, right = next)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    const touch = e.targetTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchEndRef.current = null;
  };

  const onTouchMove = (e) => {
    const touch = e.targetTouches[0];
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };
    // Prevent scrolling while swiping
    if (touchStartRef.current) {
      e.preventDefault();
    }
  };

  const onTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Determine if swipe is primarily horizontal or vertical
    if (absY > absX && absY > minSwipeDistance) {
      // Vertical swipe - navigate MOVIES (like mobile app PageView vertical)
      if (deltaY < 0) {
        // Swipe UP = Next movie
        goToNextMovie();
      } else {
        // Swipe DOWN = Previous movie
        goToPrevMovie();
      }
    } else if (absX > absY && absX > minSwipeDistance) {
      // Horizontal swipe - navigate VISUALS within current movie
      if (deltaX > 0) {
        // Swipe LEFT = Previous visual
        goToPrevVisual();
      } else {
        // Swipe RIGHT = Next visual
        goToNextVisual();
      }
    } else if (absX < 20 && absY < 20) {
      // Small movement = tap, check which side of screen
      const screenWidth = window.innerWidth;
      const tapX = touchStartRef.current.x;
      if (tapX < screenWidth / 2) {
        // Tap LEFT side = Previous visual
        goToPrevVisual();
      } else {
        // Tap RIGHT side = Next visual
        goToNextVisual();
      }
    }

    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  // Mouse swipe handlers
  const mouseStartRef = useRef(null);
  const mouseEndRef = useRef(null);

  const onMouseDown = (e) => {
    mouseEndRef.current = null;
    mouseStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e) => {
    if (!mouseStartRef.current) return;
    mouseEndRef.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    if (!mouseStartRef.current || !mouseEndRef.current) return;
    const deltaX = mouseEndRef.current.x - mouseStartRef.current.x;
    const deltaY = mouseEndRef.current.y - mouseStartRef.current.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absY > absX && absY > minSwipeDistance) {
      // Vertical swipe - navigate MOVIES
      if (deltaY < 0) {
        goToNextMovie();
      } else {
        goToPrevMovie();
      }
    } else if (absX > absY && absX > minSwipeDistance) {
      // Horizontal swipe - navigate VISUALS
      if (deltaX > 0) {
        goToPrevVisual();
      } else {
        goToNextVisual();
      }
    } else if (absX < 20 && absY < 20) {
      // Click/tap - check which side
      const screenWidth = window.innerWidth;
      const clickX = mouseStartRef.current.x;
      if (clickX < screenWidth / 2) {
        goToPrevVisual();
      } else {
        goToNextVisual();
      }
    }

    mouseStartRef.current = null;
    mouseEndRef.current = null;
  };

  // Find next movie with visuals if current movie has none
  useEffect(() => {
    if (currentMovie && (!currentMovie.visuals?.items || currentMovie.visuals.items.length === 0)) {
      // Find next movie with visuals
      const nextMovieIndex = movies.findIndex(
        (movie, index) =>
          index > currentMovieIndex &&
          movie?.visuals?.items &&
          movie.visuals.items.length > 0
      );
      
      if (nextMovieIndex !== -1) {
        setCurrentMovieIndex(nextMovieIndex);
        setCurrentVisualIndex(0);
      } else {
        // Try previous movies
        const prevMovieIndex = movies.findLastIndex(
          (movie, index) =>
            index < currentMovieIndex &&
            movie?.visuals?.items &&
            movie.visuals.items.length > 0
        );
        
        if (prevMovieIndex !== -1) {
          setCurrentMovieIndex(prevMovieIndex);
          setCurrentVisualIndex(0);
        }
      }
    }
  }, [currentMovie, currentMovieIndex, movies]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-[#17111F] to-[#0E0914]">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-gray-200"></div>
            <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-[#CD1A70] animate-spin absolute top-0 left-0"></div>
          </div>
          <div className="text-transparent bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text text-xl font-clash font-medium animate-pulse">
            Loading Cinema...
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && movies.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-[#17111F] to-[#0E0914]">
        <div className="text-center text-white">
          <p className="text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!currentVisual) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-[#17111F] to-[#0E0914]">
        <div className="text-center text-white">
          <p className="text-xl mb-4">No content available</p>
          <p className="text-sm text-white/60">Loading more movies...</p>
        </div>
      </div>
    );
  }

  const mediaPath =
    currentVisual.media?.path || currentVisual.media?.baseMediaPath;
  const thumbnailPath =
    currentVisual.media?.thumbnailImagePath ||
    currentVisual.media?.thumbnailPath;
  const isImage = isImageFile(mediaPath);
  const creator = currentMovie?.createdBy || {};
  const creatorName = [creator.firstName, creator.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-[#17111F] to-[#0E0914] select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Media Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentMovieIndex}-${currentVisualIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            {isImage && mediaPath ? (
              <Image
                src={mediaPath}
                alt={currentVisual.title || "Visual"}
                fill
                className="object-contain"
                priority
                sizes="100vw"
              />
            ) : (
              <>
                {thumbnailPath && (
                  <div className="absolute inset-0">
                    <Image
                      src={thumbnailPath}
                      alt="Thumbnail"
                      fill
                      className="object-cover opacity-50"
                      sizes="100vw"
                    />
                  </div>
                )}
                <video
                  ref={videoRef}
                  crossOrigin="anonymous"
                  playsInline
                  className="absolute inset-0 w-full h-full object-contain"
                  muted={false}
                  loop={false}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Top Gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Top Info */}
            <div className="absolute top-0 left-0 right-0 p-6 pointer-events-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {creator.picture && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                      <Image
                        src={creator.picture}
                        alt={creatorName || "Creator"}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {currentMovie?.title || "Untitled Movie"}
                    </h3>
                    {creatorName && (
                      <p className="text-white/80 text-sm">{creatorName}</p>
                    )}
                  </div>
                </div>
                <div className="text-white/60 text-sm">
                  {currentVisualIndex + 1} /{" "}
                  {currentMovie?.visuals?.items?.length || 0}
                </div>
              </div>
            </div>

            {/* Center Play/Pause Button */}
            {!isImage && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                <button
                  onClick={togglePlayPause}
                  className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  {isPlaying ? (
                    <FaPause className="text-white text-2xl" />
                  ) : (
                    <FaPlay className="text-white text-2xl ml-1" />
                  )}
                </button>
              </div>
            )}

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto">
              {currentVisual.captionText && (
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-white text-lg font-medium mb-4 text-center"
                >
                  {currentVisual.captionText}
                </motion.p>
              )}
              {/* Visual navigation buttons (left/right) */}
              <div className="flex items-center justify-center gap-4 mb-2">
                <button
                  onClick={goToPrevVisual}
                  disabled={currentVisualIndex === 0 && currentMovieIndex === 0}
                  className="p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft />
                </button>
                <div className="text-white/60 text-sm">
                  Visual {currentVisualIndex + 1} / {currentMovie?.visuals?.items?.length || 0}
                </div>
                <button
                  onClick={goToNextVisual}
                  disabled={
                    currentVisualIndex >= (currentMovie?.visuals?.items?.length || 0) - 1 &&
                    currentMovieIndex >= movies.length - 1
                  }
                  className="p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaChevronRight />
                </button>
              </div>
              {/* Movie indicator */}
              <div className="text-center text-white/40 text-xs">
                Movie {currentMovieIndex + 1} / {movies.length}
              </div>
            </div>

            {/* Navigation Hints */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-none">
              <div className="text-white/40 text-xs text-center space-y-1">
                <p>↑↓ Navigate movies</p>
                <p>←→ Navigate visuals</p>
                <p>Tap left/right: Navigate visuals</p>
                <p>Space: Play/Pause</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading More Indicator */}
      {isLoadingMore && (
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm">
          Loading more...
        </div>
      )}
    </div>
  );
}

