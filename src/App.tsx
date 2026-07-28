import { Hero } from './components/Hero';
import { AboutSkills } from './components/AboutSkills';
import { Experience } from './components/Experience';
import { MarqueeSection } from './components/MarqueeSection';
import { FeaturedProjects } from './components/FeaturedProjects';
import { CTASection } from './components/CTASection';

function App() {
  return (
    <>
      <Hero />
      <AboutSkills />
      <Experience />
      <MarqueeSection />
      <FeaturedProjects />
      <CTASection />
    </>
  );
}

export default App;
