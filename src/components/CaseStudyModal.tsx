import React from 'react';
import './CaseStudyModal.css';

interface CaseStudy {
  title: string;
  problem: string;
  approach: string;
  result: string;
  stack: string[];
}

const caseStudiesData: Record<number, CaseStudy> = {
  1: {
    title: "Paper Trader",
    problem: "Traditional quantitative backtests are slow and difficult to analyze across multiple variables. Testing strategies on live feeds carries financial risk, creating a high barrier to entry for research.",
    approach: "Developed a pandas/python backtesting engine that simulates market executions over historical candlestick intervals. Modeled trading fees, slippage, and stop-loss logic to mirror live brokerage rules. Integrated simple visual metrics.",
    result: "Achieved backtesting cycles under 2 seconds for a full year of historical 1-minute ticker data. Provided clean quantitative metric readouts (Sharpe ratio, max drawdown, win rate) to optimize entry/exit rules.",
    stack: ["Python", "Pandas", "NumPy", "Backtesting", "Matplotlib"]
  },
  2: {
    title: "Reddit Shorts Generator",
    problem: "Creating short-form video content manually requires hours of reading, scripting, voiceover recording, and timeline synchronization, limiting video creators to slow release cycles.",
    approach: "Built a Python script utilizing REST APIs to scrape viral text threads. Deployed text-to-speech synthesis to automate narrations, and synced audio file lengths to dynamically overlay video backgrounds and generate subtitles.",
    result: "Reduced video creation time from 2 hours to 40 seconds per video. Automatically generated videos compile correct aspect ratios, subtitle overlays, and voice narrations, ready for short-form uploads.",
    stack: ["Python", "gTTS", "Pillow", "FFmpeg", "MoviePy"]
  },
  3: {
    title: "Offroad Semantic Segmentation",
    problem: "Offroad robotic rovers navigate unstructured, irregular terrain (rocks, gravel, mud) without paved lane markers, making standard road-vision models useless and obstacle boundary identification extremely difficult.",
    approach: "Trained a deep learning U-Net semantic segmentation architecture in PyTorch using a custom dataset of offroad driving trails. Integrated OpenCV for image preprocessing, morphological filtering, and path center extraction.",
    result: "Attained real-time path segmentation at 28 FPS on local CPU, identifying terrain boundaries and calculating path centers with over 89% pixel accuracy to prevent rover tip-overs.",
    stack: ["Python", "PyTorch", "OpenCV", "U-Net", "NumPy"]
  },
  4: {
    title: "RPi Sensors (Team Deimos)",
    problem: "Multiple rover sensor lines (IMU, GPS, moisture, temperature) communicate asynchronously, leading to register collision, sensor lockups, and telemetry latency during remote space rover traversal.",
    approach: "Wrote a modular C++ library for Raspberry Pi to query sensors concurrently. Optimized I2C and SPI bus parameters and implemented circular buffer logs to cache data packets during signal dropouts.",
    result: "Secured a 99.8% sensor packet delivery rate over continuous 4-hour test runs. Eliminated sensor bus locking and reduced telemetry latency from 180ms to less than 15ms.",
    stack: ["C++", "Raspberry Pi", "I2C / SPI", "POSIX Threads", "CMake"]
  },
  5: {
    title: "VeriSync",
    problem: "Secure cryptographic verification of hardware events is difficult to execute in real-time, leaving local microchips vulnerable to data spoofing.",
    approach: "Implemented local key pairs and cryptographic signature checks using SHA-256 and RSA. Configured clean Node.js backends to manage authentication handshakes and coordinate state logs.",
    result: "Blocked unauthorized commands instantly while keeping handshake validation cycles under 5ms, ensuring hardware integrity.",
    stack: ["TypeScript", "Node.js", "Crypto API", "Express.js"]
  },
  6: {
    title: "IIT Mandi Quant Fin & Algo",
    problem: "New student analysts face steep learning curves when learning mathematical asset modeling, statistical Arbitrage, and algorithm backtesting.",
    approach: "Built a collection of Jupyter Notebooks demonstrating quantitative finance concepts, incorporating historical price fetching, statistical correlation checks, and moving average cross scripts.",
    result: "Created a reusable academic framework for quantitative studies, enabling analysts to quickly spin up, optimize, and evaluate trading models.",
    stack: ["Python", "Jupyter", "SciPy", "Statsmodels", "Yahoo Finance API"]
  }
};

interface CaseStudyModalProps {
  projectId: number;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ projectId, onClose }) => {
  const data = caseStudiesData[projectId];

  if (!data) return null;

  // Handle overlay click to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-card">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">{data.title} <span>Case Study</span></h2>
          <button className="modal-close-btn" onClick={onClose}>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="modal-body">
          {/* Section 1: The Problem */}
          <div className="modal-section">
            <h3 className="modal-section-title">
              <span className="modal-badge problem-badge">01</span>
              The Problem
            </h3>
            <p className="modal-section-text">{data.problem}</p>
          </div>

          {/* Section 2: The Approach */}
          <div className="modal-section">
            <h3 className="modal-section-title">
              <span className="modal-badge approach-badge">02</span>
              The Approach
            </h3>
            <p className="modal-section-text">{data.approach}</p>
          </div>

          {/* Section 3: The Result */}
          <div className="modal-section">
            <h3 className="modal-section-title">
              <span className="modal-badge result-badge">03</span>
              The Result
            </h3>
            <p className="modal-section-text">{data.result}</p>
          </div>

          {/* Section 4: Stack used */}
          <div className="modal-section">
            <h3 className="modal-section-title-stack">Technologies Utilized</h3>
            <div className="modal-stack-tags">
              {data.stack.map((tech, idx) => (
                <span className="modal-tech-tag" key={idx}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
