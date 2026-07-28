import React from 'react';
import { Marquee } from './Marquee';

export const MarqueeSection: React.FC = () => {
  const hardwareSkills = [
    'Robotics',
    'Embedded Systems',
    'PCB Design',
    'IoT Devices',
    'Arduino',
    'Circuit Theory',
    'Microcontrollers',
    'Sensor Integration',
    'Hardware Prototyping',
    'RC Car Tech'
  ];

  const softwareSkills = [
    'React',
    'TypeScript',
    'Python',
    'Node.js',
    'Vite',
    'Algorithms & Data Structures',
    'Stock Analysis Engines',
    'Video Automation API',
    'Framer Motion',
    'REST APIs'
  ];

  return (
    <section className="marquee-section">
      {/* First row scrolling left */}
      <Marquee direction="left" keywords={hardwareSkills} />
      
      {/* Second row scrolling right (crisscross effect) */}
      <Marquee direction="right" keywords={softwareSkills} />
    </section>
  );
};
