import React from 'react';
import './Marquee.css';

interface MarqueeProps {
  direction?: 'left' | 'right';
  keywords: string[];
}

export const Marquee: React.FC<MarqueeProps> = ({ direction = 'left', keywords }) => {
  // Join keywords with a bullet character and add spacing
  const joinedText = keywords.join('  •  ') + '  •  ';

  return (
    <div className={`marquee-row-container ${direction === 'right' ? 'is--reversed-marquee' : ''}`}>
      {/* Nether Portal Anchored on the Left */}
      <img 
        src="/nether-portal-nobg.png" 
        className="portal-frame portal-left" 
        alt="Nether Portal Frame Left" 
      />

      {/* Repeating Marquee Text Track */}
      <div className="marquee-track">
        <div className={`marquee--textwrapper-hold ${direction === 'right' ? 'reverse' : ''}`}>
          <span className="marquee-text-content">{joinedText}</span>
          <span className="marquee-text-content">{joinedText}</span>
          <span className="marquee-text-content">{joinedText}</span>
          <span className="marquee-text-content">{joinedText}</span>
        </div>
      </div>

      {/* Nether Portal Anchored on the Right */}
      <img 
        src="/nether-portal-nobg.png" 
        className="portal-frame portal-right" 
        alt="Nether Portal Frame Right" 
      />
    </div>
  );
};
