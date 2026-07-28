import { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import './Hero.css';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLHeadingElement>(null);

  // States for preloading and transition
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRenderReal, setShouldRenderReal] = useState(false);

  // Interaction tracking and Lerp coordinates
  const hasInteracted = useRef(false);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef<number | null>(null);

  // Helper to initialize center position
  const getCenter = () => {
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
  };

  // Preload images
  useEffect(() => {
    let baseLoaded = false;
    let flameLoaded = false;

    const checkLoaded = () => {
      if (baseLoaded && flameLoaded) {
        setIsLoaded(true);
        // Wait for skeleton fade out animation, then fully render real content
        setTimeout(() => {
          setShouldRenderReal(true);
        }, 800);
      }
    };

    const imgBase = new Image();
    imgBase.src = '/transparent-base.png';
    imgBase.onload = () => {
      baseLoaded = true;
      checkLoaded();
    };
    imgBase.onerror = () => {
      baseLoaded = true; // Fallback
      checkLoaded();
    };

    const imgFlame = new Image();
    imgFlame.src = '/transparent-flame.png';
    imgFlame.onload = () => {
      flameLoaded = true;
      checkLoaded();
    };
    imgFlame.onerror = () => {
      flameLoaded = true; // Fallback
      checkLoaded();
    };

    // Initialize default center positions on load
    const center = getCenter();
    targetX.current = center.x;
    targetY.current = center.y;
    currentX.current = center.x;
    currentY.current = center.y;

    return () => {
      imgBase.onload = null;
      imgFlame.onload = null;
    };
  }, []);

  // Update center when resizing before any user interaction
  useEffect(() => {
    const handleResize = () => {
      if (!hasInteracted.current) {
        const center = getCenter();
        targetX.current = center.x;
        targetY.current = center.y;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Word Reveal Effect for intro text (runs once on mount)
  useEffect(() => {
    const introElement = introRef.current;
    if (introElement) {
      const text = introElement.textContent || "";
      const words = text.split(' ');
      introElement.textContent = ''; // Clear text content
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'word-reveal';
        span.textContent = word + ' '; // Preserve trailing space
        span.style.animationDelay = `${index * 0.05}s`;
        introElement.appendChild(span);
      });
    }
  }, []);

  // Mouse and Touch Listeners & RAF Loop (bound to the Hero container bounds)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Position update handlers
    const updatePosition = (clientX: number, clientY: number) => {
      hasInteracted.current = true;
      const rect = container.getBoundingClientRect();
      targetX.current = clientX - rect.left;
      targetY.current = clientY - rect.top;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      const rect = container.getBoundingClientRect();
      targetX.current = rect.width / 2;
      targetY.current = rect.height / 2;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEndOrCancel = () => {
      const rect = container.getBoundingClientRect();
      targetX.current = rect.width / 2;
      targetY.current = rect.height / 2;
    };

    // Register passive listeners on the container bounds
    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEndOrCancel, { passive: true });
    container.addEventListener('touchcancel', handleTouchEndOrCancel, { passive: true });

    // 2. Animation loop (lerp)
    const tick = () => {
      // smooth += (mouse - smooth) * 0.1
      currentX.current += (targetX.current - currentX.current) * 0.1;
      currentY.current += (targetY.current - currentY.current) * 0.1;

      // Apply CSS custom properties to the flame layer ref
      if (flameRef.current) {
        flameRef.current.style.setProperty('--x', `${currentX.current}px`);
        flameRef.current.style.setProperty('--y', `${currentY.current}px`);
      }

      rafId.current = requestAnimationFrame(tick);
    };

    // Start loop
    rafId.current = requestAnimationFrame(tick);

    // 3. Cleanup on unmount
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEndOrCancel);
      container.removeEventListener('touchcancel', handleTouchEndOrCancel);

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const handleExplore = () => {
    const section = document.querySelector('.projects-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-container" ref={containerRef}>
      {/* Pulsing Skeleton Loader */}
      {!shouldRenderReal && (
        <div className={`skeleton-container ${isLoaded ? 'fade-out' : ''}`}>
          <div className="skeleton-spotlight-pulse" />
          <div className="skeleton-content">
            <div className="skeleton-subtitle-line" style={{ width: '60%', height: '24px', marginBottom: '2rem' }} />
            <div className="skeleton-badge" />
            <div className="skeleton-title-line" />
            <div className="skeleton-title-line-short" />
            <div className="skeleton-subtitle-line" />
            <div className="skeleton-subtitle-line-short" />
            <div className="skeleton-actions">
              <div className="skeleton-btn" />
              <div className="skeleton-btn" />
            </div>
          </div>
        </div>
      )}

      {/* Background Layers */}
      <div className={`hero-bg-wrapper ${isLoaded ? 'loaded' : ''}`}>
        <div className="hero-base-img" />
        <div className="hero-reveal-img" ref={flameRef} />
      </div>

      {/* Actual Hero Content */}
      <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
        <h2 ref={introRef} className="hero-intro">
          Hello there, I’m an electrical engineering student at IIT Mandi, building at the intersection of hardware, software, and creative tech.
        </h2>
        <div className="hero-badge">
          <Sparkles size={14} />
          Interactive Portfolio
        </div>
        <h1 className="hero-title">
          Igniting Ideas Into <br />
          <span>Digital Experiences</span>
        </h1>
        <p className="hero-subtitle">
          Welcome to the creative tech forge. Hover, swipe, or drag anywhere across the screen 
          to unleash the underlying element through the spotlight reveal.
        </p>
        <div className="hero-actions">
          <button className="hero-btn hero-btn-primary" onClick={handleExplore}>
            Explore Showcase
            <ArrowRight size={18} />
          </button>

          <a
            href="/Resume_newest.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >
            <span className="resume-btn-fill" />
            <span className="resume-btn-text">View Resume</span>
            <span className="resume-btn-icon-circle">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </a>

          <a
            href="https://github.com/HypertextAssassin69/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <svg
              height="18"
              width="18"
              viewBox="0 0 16 16"
              fill="currentColor"
              style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}
            >
              <path d="M8 0c4.42 0 8 3.58 8 8 0 3.54-2.29 6.53-5.47 7.59-.4.07-.55-.17-.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            View Source
          </a>
        </div>
      </div>
    </div>
  );
};
