import React from 'react';
import { 
  Layers, 
  ArrowRight, 
  BarChart3, 
  CheckCircle, 
  BrainCircuit, 
  Share2, 
  LineChart 
} from 'lucide-react';

const Home = () => {
  // Theme Configuration
  const theme = {
    brand: '#5161cf',
    bg: '#09090b',
  };

  return (
    <div className="min-h-screen text-zinc-100 font-sans selection:bg-[#5161cf] selection:text-white overflow-x-hidden" style={{ backgroundColor: 'black' }}>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none animate-pulse-slow" style={{ backgroundColor: theme.brand }}></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#5161cf]/30 bg-[#5161cf]/10 text-[#5161cf] text-xs font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#5161cf]"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5161cf]"></span>
              </span>
              Next Gen Learning
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Master your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5161cf] to-purple-400">
                Future Today.
              </span>
            </h1>
            
            <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
              The all-in-one platform for seamless quizzes, resource sharing, and deep performance analytics for teachers and students.
            </p>

            <div className="flex gap-4 pt-4">
              <button className="px-8 py-4 rounded-xl font-semibold text-white flex items-center gap-2 hover:-translate-y-1 transition-transform shadow-lg shadow-[#5161cf]/25" style={{ backgroundColor: theme.brand }}>
                Start Learning <ArrowRight size={18} />
              </button>
              <button className="px-8 py-4 rounded-xl font-semibold text-zinc-300 border border-zinc-800 hover:bg-zinc-900 transition-colors">
                View Demo
              </button>
            </div>
          </div>

          {/* Right: 3D Visual */}
          <div style={{ perspective: '1000px' }} className="relative mt-12 lg:mt-0">
            
            {/* Floating Glass Card */}
            <div className="animate-float-3d bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative z-20">
              
              {/* Header of Card */}
              <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Student Performance</h3>
                  <p className="text-xs text-zinc-500">Weekly Analysis</p>
                </div>
                <BarChart3 size={24} className="text-[#5161cf]" />
              </div>

              {/* Animated Bars */}
              <div className="flex items-end justify-between gap-2 h-48 mb-4 px-2">
                 {/* Helper function for bars */}
                 {[40, 70, 50, 90, 65].map((height, i) => (
                    <div key={i} className="w-full bg-zinc-800 rounded-t-md relative h-full flex items-end group">
                      <div 
                        className="w-full rounded-t-md animate-grow-bar transition-all group-hover:opacity-100 opacity-90"
                        style={{ 
                          height: `${height}%`, 
                          backgroundColor: i === 3 ? theme.brand : '#3f3f46', // Highlight the tallest bar
                          boxShadow: i === 3 ? `0 0 20px ${theme.brand}66` : 'none',
                          animationDelay: `${i * 0.1}s`,
                          '--h': `${height}%` // CSS Variable for animation
                        }} 
                      />
                    </div>
                 ))}
              </div>

              <div className="flex justify-between text-xs text-zinc-500 font-mono">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
              </div>

              {/* Floating Badge */}
              <div className="absolute -right-6 -top-6 bg-[#1a1a1e] border border-[#5161cf]/30 p-4 rounded-xl shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#5161cf]/20 text-[#5161cf]">
                    <CheckCircle size={20} className="fill-current" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Last Quiz</p>
                    <p className="text-lg font-bold text-white">98%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Glow behind card */}
            <div className="absolute inset-0 blur-[80px] opacity-20 -z-10 rounded-full" style={{ backgroundColor: theme.brand }}></div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 border-t border-white/5 bg-[#0c0c0e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to excel</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Bridging the gap between classroom teaching and digital analysis.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BrainCircuit size={24} />}
              title="Smart Quizzes"
              desc="Teachers create AI-assisted quizzes. Students attempt them in a distraction-free environment with auto-grading."
              color={theme.brand}
            />
             <FeatureCard 
              icon={<Share2 size={24} />}
              title="Resource Sharing"
              desc="Seamlessly upload and share lecture notes, PDFs, and recorded sessions directly to specific classrooms."
              color={theme.brand}
            />
             <FeatureCard 
              icon={<LineChart size={24} />}
              title="Deep Analytics"
              desc="Visual graphs for students to track progress over time. Teachers get class-average reports instantly."
              color={theme.brand}
            />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 bg-black py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <Layers size={20} className="text-[#5161cf]" />
              <span>EduNexus</span>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs">
              Empowering the next generation of learners with data-driven education tools.
            </p>
          </div>
          
          <FooterColumn title="Platform" links={['Quiz Maker', 'Analytics', 'Note Sharing']} hoverColor={theme.brand} />
          <FooterColumn title="Legal" links={['Privacy Policy', 'Terms of Service']} hoverColor={theme.brand} />
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-zinc-600 text-xs">
          © 2024 EduNexus Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

// --- Helper Components for Cleanliness ---

const FeatureCard = ({ icon, title, desc, color }) => (
  <div className="group p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-[#5161cf]/50 transition-all hover:bg-zinc-900/80 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#5161cf]/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
    <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-[#5161cf] transition-colors text-white">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const FooterColumn = ({ title, links, hoverColor }) => (
  <div>
    <h4 className="font-bold mb-4 text-white">{title}</h4>
    <ul className="space-y-2 text-sm text-zinc-500">
      {links.map((link, i) => (
        <li key={i} className="hover:text-[#5161cf] cursor-pointer transition-colors">{link}</li>
      ))}
    </ul>
  </div>
);

export default Home;