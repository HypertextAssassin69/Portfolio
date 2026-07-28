import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Marquee } from './Marquee';
import './FeaturedProjects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  repoUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Paper Trader",
    description: "A paper trading simulation platform designed to backtest quantitative strategies, track portfolio metrics, and analyze algorithmic trading risk.",
    thumbnail: "/project_stocks.png",
    repoUrl: "https://github.com/HypertextAssassin69/paper-trader"
  },
  {
    id: 2,
    title: "Reddit Shorts Generator",
    description: "A video automation engine that parses popular Reddit threads, synthesizes text-to-speech audio, and compiles short-form video clips.",
    thumbnail: "/project_shorts.png",
    repoUrl: "https://github.com/HypertextAssassin69/reddit-shorts-generator"
  },
  {
    id: 3,
    title: "Offroad Semantic Segmentation",
    description: "A deep learning semantic segmentation model for classifying and segmenting path boundaries in offroad terrains to assist robotic rover nav.",
    thumbnail: "/project_rover.png",
    repoUrl: "https://github.com/HypertextAssassin69/offroad-semantic-segmentation"
  },
  {
    id: 4,
    title: "RPi Sensors (Team Deimos)",
    description: "A hardware-level library for reading and synchronizing environmental sensors with Raspberry Pi, built for the Team Deimos rover at IIT Mandi.",
    thumbnail: "/project_sensor.png",
    repoUrl: "https://github.com/Team-Deimos-IIT-Mandi/Rpi_Sensors"
  },
  {
    id: 5,
    title: "VeriSync",
    description: "A secure verification and data sync utility for cryptographic authentication, ledger integrity, and secure system communication.",
    thumbnail: "/enchanting-table-nobg.png",
    repoUrl: "https://github.com/HypertextAssassin69/VeriSync"
  },
  {
    id: 6,
    title: "IIT Mandi Quant Fin & Algo",
    description: "A collaborative quantitative finance repository containing automated trading algorithms, financial models, and quantitative backtesting.",
    thumbnail: "/project_stocks.png",
    repoUrl: "https://github.com/HypertextAssassin69/IItMandiQuantFinAndAlgo"
  }
];

// Reusable Project Card Component to keep it modular
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-thumbnail-hold">
        <img 
          src={project.thumbnail} 
          className="project-thumbnail" 
          alt={`${project.title} Preview`} 
        />
      </div>
      <div className="project-info">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        <div className="project-card-links">
          <a 
            href={project.repoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="project-card-link"
          >
            <svg
              height="16"
              width="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}
            >
              <path d="M8 0c4.42 0 8 3.58 8 8 0 3.54-2.29 6.53-5.47 7.59-.4.07-.55-.17-.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
};

export const FeaturedProjects: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax cloud scroll bindings
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Cloud 1: scrolls upwards. Cloud 2: scrolls downwards.
  const cloud1Y = useTransform(scrollYProgress, [0, 1], [-60, 120]);
  const cloud2Y = useTransform(scrollYProgress, [0, 1], [120, -60]);

  // Breathing card variants (staggered translateY + scale loop)
  const cardVariants = {
    breathing: (index: number) => ({
      y: [0, -6, 0],
      scale: [1, 1.015, 1],
      transition: {
        duration: 5.5,
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatType: "reverse" as const,
        delay: index * 0.45
      }
    })
  };

  const handleToggleExpand = () => {
    if (isExpanded) {
      setIsExpanded(false);
      // Smoothly scroll back to the section top on collapse
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 50); // slight timeout to allow height animation to start
    } else {
      setIsExpanded(true);
    }
  };

  const projectKeywords = [
    'Paper Trader',
    'Reddit Shorts Generator',
    'Offroad Semantic Segmentation',
    'RPi Sensors',
    'VeriSync',
    'Quant Fin & Algo'
  ];

  return (
    <section className="projects-section" ref={sectionRef}>
      {/* Scroll-Linked Parallax Clouds */}
      <motion.img 
        src="/cloud.png" 
        className="parallax-cloud cloud-ur" 
        style={{ y: cloud1Y }}
        alt="Background Cloud"
      />
      <motion.img 
        src="/cloud.png" 
        className="parallax-cloud cloud-ll" 
        style={{ y: cloud2Y }}
        alt="Background Cloud"
      />

      <div className="projects-container">
        {/* Centered Heading */}
        <div className="projects-header">
          <div className="projects-title-wrapper">
            <img 
              src="/enchantedbook.png" 
              className="projects-book-accent" 
              alt="Enchanted Book Accent" 
            />
            <h2 className="projects-title">Featured <span>Showcase</span></h2>
          </div>
          <p className="projects-desc">
            A curated gallery of engineering experiments, software scripts, 
            and hardware prototypes spanning IoT systems and automated media.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="projects-grid">
          {/* Default 2 Cards */}
          {projects.slice(0, 2).map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card-wrapper"
              variants={cardVariants}
              animate="breathing"
              custom={index}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}

          {/* Expandable Cards with AnimatePresence */}
          <AnimatePresence>
            {isExpanded && projects.slice(2).map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card-wrapper"
                initial={{ opacity: 0, y: 40, filter: "blur(8px)", scale: 0.97 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, y: 30, filter: "blur(8px)", scale: 0.97 }}
                transition={{ duration: 0.45, delay: index * 0.12, ease: "easeOut" }}
              >
                {/* Breathing loop nested inside entry transition div */}
                <motion.div
                  variants={cardVariants}
                  animate="breathing"
                  custom={index + 2}
                  style={{ height: "100%" }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Custom project-specific marquee repeating pattern (now full-bleed!) */}
      <div style={{ margin: '4.5rem 0' }}>
        <Marquee direction="right" keywords={projectKeywords} />
      </div>

      <div className="projects-container">
        {/* View More / View Less Toggle Pill */}
        <div className="projects-action-wrap">
          <button className="view-more-btn" onClick={handleToggleExpand}>
            <span className="view-more-btn-fill" />
            <span className="view-more-btn-text">
              {isExpanded ? "View Less Showcase" : "View More Showcase"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
