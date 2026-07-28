import React from 'react';
import './Experience.css';

interface TimelineItem {
  year: string;
  role: string;
  organization: string;
  details: string[];
  color: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2025 - Present",
    role: "B.Tech Candidate in Electrical Engineering",
    organization: "Indian Institute of Technology (IIT) Mandi",
    details: [
      "Specializing in Computer Science, Machine Learning, and Algorithmic Trading Systems.",
      "Academics cover Microcontrollers, Deep Learning, Signals & Systems, and Data Structures.",
      "Developing software research models for quantitative analysis and algorithmic candlestick charting."
    ],
    color: "#ff5722"
  },
  {
    year: "2023 - Present",
    role: "Telemetry & Firmware Lead (Team Deimos)",
    organization: "IIT Mandi Student Rover Team",
    details: [
      "Leading hardware telemetry scripting and sensor node sync routines on Raspberry Pi.",
      "Configuring Altium PCB layouts for board microcontroller clusters and I2C/SPI sensor interfaces.",
      "Synchronizing real-time IMU, GPS, and environmental metrics to prevent data latency during remote navigation."
    ],
    color: "#aa3bff"
  },
  {
    year: "2023 - Present",
    role: "Open Source Software & Research Developer",
    organization: "GitHub / Personal Work",
    details: [
      "Built 'Paper Trader', a risk-free quant finance backtesting platform with portfolio analytics.",
      "Designed and trained 'Offroad Semantic Segmentation' deep learning vision models using PyTorch.",
      "Automated video editing workflows with 'Reddit Shorts Generator', compiling narration TTS with overlay video clips."
    ],
    color: "#ff5722"
  }
];

export const Experience: React.FC = () => {
  return (
    <section className="experience-section">
      <div className="experience-container">
        
        {/* Header */}
        <div className="experience-header">
          <span className="experience-eyebrow">Milestones</span>
          <h2 className="experience-title">Academic & <span>Project Journey</span></h2>
          <p className="experience-desc">
            A chronological timeline of my B.Tech career at IIT Mandi, student rover leadership, 
            and algorithmic software development milestones.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="timeline-track-wrapper">
          <div className="timeline-line" />
          
          {timelineData.map((item, idx) => (
            <div className="timeline-item" key={idx}>
              {/* Timeline dot */}
              <div 
                className="timeline-dot" 
                style={{ 
                  backgroundColor: '#030303',
                  borderColor: item.color,
                  boxShadow: `0 0 12px ${item.color}`
                }} 
              />
              
              {/* Timeline date panel (left on large screens) */}
              <div className="timeline-date">
                <span style={{ color: item.color }}>{item.year}</span>
              </div>
              
              {/* Timeline content panel (right on large screens) */}
              <div className="timeline-card-content">
                <h3 className="timeline-role">{item.role}</h3>
                <h4 className="timeline-org">{item.organization}</h4>
                <ul className="timeline-details-list">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
