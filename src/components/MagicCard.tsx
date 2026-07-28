import React, { useRef } from 'react';
import './MagicCard.css';

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
}

export const MagicCard: React.FC<MagicCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  };

  return (
    <div 
      ref={cardRef} 
      className={`magic-card ${className}`} 
      onMouseMove={handleMouseMove}
    >
      <div className="magic-card-glow" />
      <div className="magic-card-content">
        {children}
      </div>
    </div>
  );
};
