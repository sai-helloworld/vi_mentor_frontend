// import react from 'react'
// export default function about() {
//     return (
//     <>
//     <h1 style={{color:'white'}}>helloworld</h1>
//     <div>hai</div>
//     </>
//     );

// }


import React from 'react';
import { 
  Code2, 
  Cpu, 
  Globe, 
  Zap, 
  Layers, 
  Github, 
  Linkedin, 
  Twitter, 
  Coffee,
  Terminal,
  History
} from 'lucide-react';

const About = () => {
  const THEME = {
    primary: '#5161cf',
    bg: '#09090b',
  };

  return (
    <div className="min-h-screen text-zinc-100 font-sans selection:bg-[#5161cf] selection:text-white overflow-x-hidden" style={{ backgroundColor: THEME.bg }}>
      
      {/* --- NAVBAR (Consistent with Home) --- */}
      {/* <nav className="fixed w-full z-50 border-b border-white/10 backdrop-blur-md bg-black/30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: THEME.primary }}>
              <Layers size={20} />
            </div>
            <span>Vi Mentor</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="text-white cursor-default">About Us</span>
            <a href="#" className="hover:text-white transition-colors">Careers</a>
          </div>
          <button className="px-5 py-2 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-all" style={{ backgroundColor: THEME.primary }}>
            Contact Us
          </button>
        </div>
      </nav> */}

      {/* --- HERO: THE MISSION --- */}
      <section className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#5161cf] opacity-[0.03] skew-x-12 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5161cf] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#5161cf]/30 bg-[#5161cf]/10 text-[#5161cf] text-xs font-bold mb-8">
            <Globe size={12} />
            <span>Global Mission</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            We are building the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
              Digital Cortex of Education.
            </span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Vi Mentor isn't just a platform; it's a movement to democratize high-quality assessment tools. We bridge the gap between intuition and data.
          </p>
        </div>
      </section>

      {/* --- STATS STRIP --- */}
      <section className="py-12 border-b border-white/5 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatItem number="50K+" label="Active Students" />
          <StatItem number="1.2M" label="Quizzes Attempted" />
          <StatItem number="99.9%" label="Uptime Reliability" />
          <StatItem number="24/7" label="Teacher Support" />
        </div>
      </section>

      {/* --- CREATIVE DEV TEAM SECTION --- */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Terminal className="text-[#5161cf]" />
              The Architects
            </h2>
            <p className="text-zinc-400 mt-2">Meet the engineering minds behind the nexus.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Developer 1 */}
            <DevCard 
              name="Sai Pavan Middela"
              role="Lead Architect"
              image="https://api.dicebear.com/9.x/miniavs/svg?seed=Maria"
              tags={['React', 'Node.js', 'GraphQL']}
              stats={[
                { label: 'Commits', val: 92 },
                { label: 'Coffee', val: 100 },
                { label: 'Bugs', val: 12 }
              ]}
              color="#5161cf"
            />
            {/* Developer 2 */}
            <DevCard 
              name="Gowri Jashwanth"
              role="UI/UX Visionary"
              image="https://api.dicebear.com/9.x/personas/svg?seed=Jack"
              tags={['Figma', 'Tailwind', 'Motion']}
              stats={[
                { label: 'Pixels', val: 98 },
                { label: 'Creativity', val: 95 },
                { label: 'Sleep', val: 40 }
              ]}
              color="#a855f7" // Purple accent variant
            />
            {/* Developer 3 */}
            <DevCard 
              name="Gokul krishna"
              role="Data Scientist"
              image="https://api.dicebear.com/9.x/avataaars/svg?seed=Christopher"
              tags={['Python', 'TensorFlow', 'SQL']}
              stats={[
                { label: 'Logic', val: 99 },
                { label: 'Models', val: 85 },
                { label: 'Social', val: 30 }
              ]}
              color="#10b981" // Emerald accent variant
            />
          </div>
        </div>
      </section>

      {/* --- OUR STORY (Timeline) --- */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#0c0c0e]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 flex items-center justify-center gap-3">
            <History className="text-[#5161cf]" />
            Origin Story
          </h2>
          
          <div className="relative border-l border-white/10 ml-6 md:ml-1/2 pl-8 md:pl-0">
            <TimelineItem 
              year="2022" 
              title="The Spark" 
              desc="Started in a dorm room when we realized grading paper quizzes was a waste of human potential."
              side="left"
            />
            <TimelineItem 
              year="2023" 
              title="The Beta" 
              desc="Launched to 5 local schools. The system crashed twice, but the teachers loved the analytics."
              side="right"
            />
            <TimelineItem 
              year="2024" 
              title="EduNexus V1" 
              desc="Full public launch. AI grading implementation and the introduction of the student performance graph."
              side="left"
              current
            />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 bg-black py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 font-bold text-xl mb-4">
            <Layers size={20} className="text-[#5161cf]" />
            <span>Vi Mentor</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © 2024 Vi Mentor Inc. Coding the future of education.
          </p>
        </div>
      </footer>
    </div>
  );
};

/* --- SUB-COMPONENTS FOR CREATIVITY --- */

const StatItem = ({ number, label }) => (
  <div className="group">
    <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-[#5161cf] transition-colors">
      {number}
    </div>
    <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">{label}</div>
  </div>
);

// The "Holographic" Developer Card
const DevCard = ({ name, role, image, tags, stats, color }) => (
  <div className="group relative bg-zinc-900/40 border border-white/10 rounded-2xl p-6 overflow-hidden hover:border-opacity-50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(81,97,207,0.15)]">
    
    {/* Grid Background Effect on Hover */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 border border-white/10 group-hover:scale-105 transition-transform duration-300">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#5161cf] transition-colors">{name}</h3>
            <p className="text-xs font-mono text-zinc-500">{role}</p>
          </div>
        </div>
        <div className="flex gap-2 text-zinc-500">
          <Github size={16} className="hover:text-white cursor-pointer" />
          <Linkedin size={16} className="hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, i) => (
          <span key={i} className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-white/5 border border-white/5 text-zinc-400">
            {tag}
          </span>
        ))}
      </div>

      {/* "Stats" Bars */}
      <div className="space-y-3 font-mono text-xs">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-16 text-zinc-500 text-right">{stat.label}</span>
            <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out group-hover:w-[var(--val)] w-0"
                style={{ 
                  backgroundColor: color, 
                  '--val': `${stat.val}%`,
                  width: '30%' // Default collapsed width
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TimelineItem = ({ year, title, desc, side, current }) => {
  const isLeft = side === 'left';
  return (
    <div className={`relative mb-12 md:mb-24 md:w-1/2 ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
      {/* Dot on the timeline */}
      <div className={`absolute top-0 w-4 h-4 rounded-full border-4 border-[#09090b] ${current ? 'bg-[#5161cf] shadow-[0_0_15px_#5161cf]' : 'bg-zinc-700'} 
        -left-[22px] md:left-auto ${isLeft ? 'md:-right-[10px]' : 'md:-left-[10px]'}`}
      ></div>
      
      {/* Content */}
      <div className={`relative p-6 rounded-xl border ${current ? 'border-[#5161cf]/50 bg-[#5161cf]/5' : 'border-white/5 bg-zinc-900/30'}`}>
        <span className="text-5xl font-bold absolute -top-8 text-white/5 select-none z-0 right-4">{year}</span>
        <div className="relative z-10">
          <h3 className={`text-xl font-bold mb-2 ${current ? 'text-[#5161cf]' : 'text-white'}`}>{title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default About;