import React from 'react';
import './AboutSkills.css';

interface SkillGroup {
  category: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "C++", "TypeScript", "JavaScript", "SQL", "HTML/CSS"]
  },
  {
    category: "AI/ML & Software",
    skills: ["PyTorch", "OpenCV", "React.js", "Node.js", "Vite", "Framer Motion", "Pandas"]
  },
  {
    category: "Hardware & Tools",
    skills: ["Raspberry Pi", "PCB Design (Altium)", "Linux (Bash)", "Git / GitHub", "Arduino", "SolidWorks"]
  }
];

export const AboutSkills: React.FC = () => {
  return (
    <section className="about-skills-section" id="about">
      <div className="about-skills-container">
        
        {/* Left Column: About Aarav */}
        <div className="about-column">
          <span className="about-eyebrow">Background</span>
          <h2 className="about-title">About <span>Aarav Arya</span></h2>
          <p className="about-paragraph">
            I am a B.Tech Electrical Engineering student at <strong>IIT Mandi</strong>, 
            deeply focused on the intersection of hardware, machine learning, 
            and algorithmic systems. My work spans from high-speed quantitative backtesting 
            models to low-level microcontroller firmware.
          </p>
          <p className="about-paragraph">
            I enjoy building robust systems that translate complex, real-world data 
            (be it market feeds, camera streams, or sensor registers) into fast, 
            actionable software decisions. I run scripts to automate workflow bottlenecks 
            and design hardware layouts for autonomous platforms.
          </p>
          <p className="about-paragraph">
            At IIT Mandi, I am a member of <strong>Team Deimos</strong> (the student rover division) 
            in the Life Sciences sub-team, where I train CNN models to classify rock samples 
            (picrite, basal, basalt) and integrate multi-sensor arrays via Raspberry Pi 
            for real-time geological and environmental telemetry.
          </p>
        </div>

        {/* Right Column: Skills Arsenal */}
        <div className="skills-column">
          <span className="about-eyebrow">Technical Arsenal</span>
          <h2 className="about-title">Skills & <span>Tooling</span></h2>
          
          <div className="skills-groups-grid">
            {skillGroups.map((group, idx) => (
              <div className="skills-card" key={idx}>
                <h3 className="skills-card-category">{group.category}</h3>
                <div className="skills-tag-wrap">
                  {group.skills.map((skill, sIdx) => (
                    <span className="skill-tag" key={sIdx}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
