import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagicCard } from './MagicCard';
import { ContactForm } from './ContactForm';
import './CTASection.css';

export const CTASection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);

  return (
    <section className="cta-section" ref={containerRef}>
      {/* Scroll-Linked Parallax Background Image */}
      <motion.img
        src="/background.png"
        className="cta-bg-image"
        style={{ y: backgroundY }}
        alt="Night Landscape Background"
      />

      {/* Blending Overlays */}
      <div className="cta-overlay-top" />
      <div className="cta-overlay-bottom" />

      {/* Central Content Card Container */}
      <div className="cta-card-wrapper">
        {/* Mascot Sitting on Top of Card */}
        <img
          src="/llama-nobg.png"
          className="cta-mascot"
          alt="Llama Mascot"
        />

        {/* Glow-Spotlight Hover MagicCard */}
        <MagicCard>
          <div className="cta-card-inner">
            <span className="cta-eyebrow">Get in Touch</span>
            <h2 className="cta-headline">Connect &amp; Collaborate</h2>
            <p className="cta-paragraph">
              Whether you want to discuss quantitative finance strategies,
              offroad semantic segmentations, Raspberry Pi node clusters,
              or just say hello — drop a message below or reach out directly.
            </p>

            {/* Responsive contact row */}
            <div className="cta-links-container">
              <a
                href="mailto:hi.aarav.arya@gmail.com"
                className="cta-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email
              </a>
              <span className="cta-bullet">•</span>
              <a
                href="https://www.linkedin.com/in/aarav-arya"
                className="cta-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <span className="cta-bullet">•</span>
              <a
                href="https://github.com/HypertextAssassin69"
                className="cta-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <span className="cta-bullet">•</span>
              <a
                href="https://www.instagram.com/om_ogus/"
                className="cta-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>

            {/* Inline Contact Form */}
            <ContactForm />
          </div>
        </MagicCard>
      </div>
    </section>
  );
};
