// import React from 'react';
// import { 
//   Layers, 
//   ArrowRight, 
//   BarChart3, 
//   CheckCircle, 
//   BrainCircuit, 
//   Share2, 
//   LineChart 
// } from 'lucide-react';

// const Home = () => {
//   // Theme Configuration
//   const theme = {
//     brand: '#5161cf',
//     bg: '#09090b',
//   };

//   return (
//     <div className="min-h-screen text-zinc-100 font-sans selection:bg-[#5161cf] selection:text-white overflow-x-hidden" style={{ backgroundColor: 'black' }}>

//       {/* --- HERO SECTION --- */}
//       <section className="relative pt-32 pb-20 px-6">
//         {/* Background Ambient Glow */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none animate-pulse-slow" style={{ backgroundColor: theme.brand }}></div>

//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
//           {/* Left: Content */}
//           <div className="space-y-6">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#5161cf]/30 bg-[#5161cf]/10 text-[#5161cf] text-xs font-bold">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#5161cf]"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5161cf]"></span>
//               </span>
//               Next Gen Learning
//             </div>

//             <h1 className="text-5xl md:text-7xl font-bold leading-tight">
//               Master your <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5161cf] to-purple-400">
//                 Future Today.
//               </span>
//             </h1>
            
//             <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
//               The all-in-one platform for seamless quizzes, resource sharing, and deep performance analytics for teachers and students.
//             </p>

//             <div className="flex gap-4 pt-4">
//               <button className="px-8 py-4 rounded-xl font-semibold text-white flex items-center gap-2 hover:-translate-y-1 transition-transform shadow-lg shadow-[#5161cf]/25" style={{ backgroundColor: theme.brand }}>
//                 Start Learning <ArrowRight size={18} />
//               </button>
//               <button className="px-8 py-4 rounded-xl font-semibold text-zinc-300 border border-zinc-800 hover:bg-zinc-900 transition-colors">
//                 View Demo
//               </button>
//             </div>
//           </div>

//           {/* Right: 3D Visual */}
//           <div style={{ perspective: '1000px' }} className="relative mt-12 lg:mt-0">
            
//             {/* Floating Glass Card */}
//             <div className="animate-float-3d bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative z-20">
              
//               {/* Header of Card */}
//               <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
//                 <div>
//                   <h3 className="text-lg font-semibold text-white">Student Performance</h3>
//                   <p className="text-xs text-zinc-500">Weekly Analysis</p>
//                 </div>
//                 <BarChart3 size={24} className="text-[#5161cf]" />
//               </div>

//               {/* Animated Bars */}
//               <div className="flex items-end justify-between gap-2 h-48 mb-4 px-2">
//                  {/* Helper function for bars */}
//                  {[40, 70, 50, 90, 65].map((height, i) => (
//                     <div key={i} className="w-full bg-zinc-800 rounded-t-md relative h-full flex items-end group">
//                       <div 
//                         className="w-full rounded-t-md animate-grow-bar transition-all group-hover:opacity-100 opacity-90"
//                         style={{ 
//                           height: `${height}%`, 
//                           backgroundColor: i === 3 ? theme.brand : '#3f3f46', // Highlight the tallest bar
//                           boxShadow: i === 3 ? `0 0 20px ${theme.brand}66` : 'none',
//                           animationDelay: `${i * 0.1}s`,
//                           '--h': `${height}%` // CSS Variable for animation
//                         }} 
//                       />
//                     </div>
//                  ))}
//               </div>

//               <div className="flex justify-between text-xs text-zinc-500 font-mono">
//                 <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
//               </div>

//               {/* Floating Badge */}
//               <div className="absolute -right-6 -top-6 bg-[#1a1a1e] border border-[#5161cf]/30 p-4 rounded-xl shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#5161cf]/20 text-[#5161cf]">
//                     <CheckCircle size={20} className="fill-current" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-zinc-400">Last Quiz</p>
//                     <p className="text-lg font-bold text-white">98%</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Back Glow behind card */}
//             <div className="absolute inset-0 blur-[80px] opacity-20 -z-10 rounded-full" style={{ backgroundColor: theme.brand }}></div>
//           </div>
//         </div>
//       </section>

//       {/* --- FEATURES SECTION --- */}
//       <section className="py-24 border-t border-white/5 bg-[#0c0c0e]">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to excel</h2>
//             <p className="text-zinc-400 max-w-2xl mx-auto">Bridging the gap between classroom teaching and digital analysis.</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <FeatureCard 
//               icon={<BrainCircuit size={24} />}
//               title="Smart Quizzes"
//               desc="Teachers create AI-assisted quizzes. Students attempt them in a distraction-free environment with auto-grading."
//               color={theme.brand}
//             />
//              <FeatureCard 
//               icon={<Share2 size={24} />}
//               title="Resource Sharing"
//               desc="Seamlessly upload and share lecture notes, PDFs, and recorded sessions directly to specific classrooms."
//               color={theme.brand}
//             />
//              <FeatureCard 
//               icon={<LineChart size={24} />}
//               title="Deep Analytics"
//               desc="Visual graphs for students to track progress over time. Teachers get class-average reports instantly."
//               color={theme.brand}
//             />
//           </div>
//         </div>
//       </section>

//       {/* --- FOOTER --- */}
//       <footer className="border-t border-white/5 bg-black py-12">
//         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
//           <div className="col-span-1 md:col-span-2">
//             <div className="flex items-center gap-2 font-bold text-xl mb-4">
//               <Layers size={20} className="text-[#5161cf]" />
//               <span>Vi Mentor</span>
//             </div>
//             <p className="text-zinc-500 text-sm max-w-xs">
//               Empowering the next generation of learners with data-driven education tools.
//             </p>
//           </div>
          
//           <FooterColumn title="Platform" links={['Quiz Maker', 'Analytics', 'Note Sharing']} hoverColor={theme.brand} />
//           <FooterColumn title="Legal" links={['Privacy Policy', 'Terms of Service']} hoverColor={theme.brand} />
//         </div>
//         <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-zinc-600 text-xs">
//           © 2024 Vi Mentor Inc. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// };

// // --- Helper Components for Cleanliness ---

// const FeatureCard = ({ icon, title, desc, color }) => (
//   <div className="group p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-[#5161cf]/50 transition-all hover:bg-zinc-900/80 relative overflow-hidden">
//     <div className="absolute top-0 right-0 w-32 h-32 bg-[#5161cf]/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
//     <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-[#5161cf] transition-colors text-white">
//       {icon}
//     </div>
//     <h3 className="text-xl font-bold mb-3">{title}</h3>
//     <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
//   </div>
// );

// const FooterColumn = ({ title, links, hoverColor }) => (
//   <div>
//     <h4 className="font-bold mb-4 text-white">{title}</h4>
//     <ul className="space-y-2 text-sm text-zinc-500">
//       {links.map((link, i) => (
//         <li key={i} className="hover:text-[#5161cf] cursor-pointer transition-colors">{link}</li>
//       ))}
//     </ul>
//   </div>
// );

// export default Home;


import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  ArrowRight, 
  BarChart3, 
  CheckCircle, 
  BrainCircuit, 
  Share2, 
  LineChart,
  Bell,
  Calendar,
  Send,
  Clock,
  AlertCircle
} from 'lucide-react';

const Home = () => {
  // Theme Configuration
  const theme = {
    brand: '#5161cf',
    bg: '#09090b',
  };

  // --- AUTH & NOTIFICATION STATE ---
  const [userRole, setUserRole] = useState(null); // 'teacher', 'student', or null
  const [userId, setUserId] = useState(null);
  
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifs, setLoadingNotifs] = useState(false);
  
  // Teacher-specific state for the form
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({
    assignmentIndex: "",
    title: "",
    message: "",
    deadline: "" // 📌 Now mandatory
  });
  const [formStatus, setFormStatus] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 1. INITIAL LOAD & AUTH CHECK ---
  useEffect(() => {
    const teacherId = localStorage.getItem("teacher_id");
    const studentRoll = localStorage.getItem("student_roll_number");

    if (teacherId) {
      setUserRole('teacher');
      setUserId(teacherId);
      fetchTeacherData(teacherId);
    } else if (studentRoll) {
      setUserRole('student');
      setUserId(studentRoll);
      fetchStudentData(studentRoll);
    }
  }, []);

  // --- 2. DATA FETCHING ---
  const fetchStudentData = async (roll) => {
    setLoadingNotifs(true);
    try {
      const notifRes = await fetch(`http://127.0.0.1:8000/api/student/${roll}/notifications/`);
      if (notifRes.ok) {
        const data = await notifRes.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Failed to fetch student notifications", error);
    } finally {
      setLoadingNotifs(false);
    }
  };

  const fetchTeacherData = async (id) => {
    setLoadingNotifs(true);
    try {
      const assignRes = await fetch(`http://127.0.0.1:8000/api/teacher/${id}/assignments/`);
      if (assignRes.ok) {
        const assignData = await assignRes.json();
        setAssignments(assignData.assignments || []);
        if (assignData.assignments?.length > 0) {
          setFormData(prev => ({ ...prev, assignmentIndex: "0" }));
        }
      }
      fetchTeacherNotifications(id);
    } catch (error) {
      console.error("Failed to fetch teacher data", error);
    }
  };

  const fetchTeacherNotifications = async (id) => {
    try {
      const notifRes = await fetch(`http://127.0.0.1:8000/api/teacher/${id}/notifications/`);
      if (notifRes.ok) {
        const data = await notifRes.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Failed to fetch teacher history", error);
    } finally {
      setLoadingNotifs(false);
    }
  };

  // --- 3. TEACHER SUBMIT NOTIFICATION ---
  const handleCreateNotification = async (e) => {
    e.preventDefault();
    setFormStatus({ text: "", type: "" });

    // 📌 Updated validation to strictly require the deadline
    if (!formData.title || !formData.message || formData.assignmentIndex === "" || !formData.deadline) {
      setFormStatus({ text: "Please fill in all required fields, including the deadline.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    const selectedAssignment = assignments[formData.assignmentIndex];
    
    // Format deadline for Django
    const formattedDeadline = new Date(formData.deadline).toISOString();

    const payload = {
      teacher_id: userId,
      section_id: selectedAssignment.section_id,
      subject_id: selectedAssignment.subject_id,
      title: formData.title,
      message: formData.message,
      deadline: formattedDeadline
    };

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/notifications/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setFormStatus({ text: "✅ Notification sent successfully!", type: "success" });
        setFormData({ ...formData, title: "", message: "", deadline: "" });
        fetchTeacherNotifications(userId); // Refresh history
      } else {
        setFormStatus({ text: "⚠️ Failed to send notification.", type: "error" });
      }
    } catch (err) {
      setFormStatus({ text: "⚠️ Server error.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 4. EXPIRATION LOGIC ---
  const now = new Date();
  
  let visibleNotifications = [];

  if (userRole === 'teacher') {
    // Teachers: Keep all active notifications + the MOST RECENT expired one
    let foundExpired = false;
    visibleNotifications = notifications.filter(notif => {
      const isExpired = notif.deadline && new Date(notif.deadline) <= now;
      if (!isExpired) {
        return true; // Keep active
      } else {
        if (!foundExpired) {
          foundExpired = true;
          return true; // Keep the first expired one we find
        }
        return false; // Drop older expired ones
      }
    });
  } else {
    // Students: Only see active notifications
    visibleNotifications = notifications.filter(notif => !notif.deadline || new Date(notif.deadline) > now);
  }

  // --- RENDER HELPERS ---
  const renderNotificationCard = (notif, isTeacher) => {
    const isExpired = notif.deadline && new Date(notif.deadline) < now;

    return (
      <div key={notif.id} className={`bg-zinc-900/80 border p-5 rounded-xl transition-all relative ${isExpired ? 'border-red-500/20 opacity-75' : 'border-white/5 hover:border-[#5161cf]/50'}`}>
        
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <Bell size={18} className={isExpired ? "text-red-500" : "text-[#5161cf]"} />
            {notif.title}
            {isTeacher && isExpired && (
              <span className="ml-2 text-[10px] uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <AlertCircle size={10} /> Expired (Last Task)
              </span>
            )}
          </h4>
          <span className="text-xs text-zinc-500">{notif.created_at}</span>
        </div>
        
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed whitespace-pre-wrap">
          {notif.message}
        </p>
        
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/5 text-xs text-zinc-500">
          {!isTeacher && (
            <div className="flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded">
              <span className="font-semibold text-zinc-300">From:</span> {notif.teacher_name}
            </div>
          )}
          <div className="flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded">
            <span className="font-semibold text-zinc-300">Subject:</span> {notif.subject_name}
          </div>
          {isTeacher && (
            <div className="flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded">
              <span className="font-semibold text-zinc-300">To Section:</span> {notif.section_name}
            </div>
          )}
          {notif.deadline && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded border ${isExpired ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
              <Clock size={12} />
              <span className="font-semibold">Deadline:</span> {new Date(notif.deadline).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-zinc-100 font-sans selection:bg-[#5161cf] selection:text-white overflow-x-hidden bg-[#09090b]">

      {/* --- CONDITIONAL TOP SECTION (HERO vs DASHBOARD) --- */}
      {!userRole ? (
        /* Original Landing Page Hero */
        <section className="relative pt-32 pb-20 px-6">
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
              </div>
            </div>

            {/* Right: 3D Visual */}
            <div style={{ perspective: '1000px' }} className="relative mt-12 lg:mt-0 hidden md:block">
              <div className="animate-float-3d bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative z-20">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Student Performance</h3>
                    <p className="text-xs text-zinc-500">Weekly Analysis</p>
                  </div>
                  <BarChart3 size={24} className="text-[#5161cf]" />
                </div>
                <div className="flex items-end justify-between gap-2 h-48 mb-4 px-2">
                   {[40, 70, 50, 90, 65].map((height, i) => (
                      <div key={i} className="w-full bg-zinc-800 rounded-t-md relative h-full flex items-end group">
                        <div 
                          className="w-full rounded-t-md transition-all group-hover:opacity-100 opacity-90"
                          style={{ height: `${height}%`, backgroundColor: i === 3 ? theme.brand : '#3f3f46' }} 
                        />
                      </div>
                   ))}
                </div>
              </div>
              <div className="absolute inset-0 blur-[80px] opacity-20 -z-10 rounded-full" style={{ backgroundColor: theme.brand }}></div>
            </div>
          </div>
        </section>

      ) : (

        /* LOGGED IN DASHBOARD (Notifications) */
        <section className="relative pt-24 pb-12 px-6 min-h-[60vh]">
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold mb-8 border-b border-white/10 pb-4">
              Welcome back {userRole === 'teacher' ? 'Teacher' : 'Student'}
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* TEACHER ONLY: Create Notification Form */}
              {userRole === 'teacher' && (
                <div className="lg:col-span-1 bg-zinc-900/60 border border-white/10 p-6 rounded-2xl h-fit">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Send size={20} className="text-[#5161cf]" /> Broadcast Notice
                  </h3>
                  
                  <form onSubmit={handleCreateNotification} className="space-y-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Target Class & Subject <span className="text-red-500">*</span></label>
                      <select 
                        required
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white outline-none focus:border-[#5161cf]"
                        value={formData.assignmentIndex}
                        onChange={(e) => setFormData({...formData, assignmentIndex: e.target.value})}
                      >
                        {assignments.length === 0 && <option value="">No classes assigned</option>}
                        {assignments.map((assign, idx) => (
                          <option key={idx} value={idx}>
                            {assign.section_name} - {assign.subject_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Title <span className="text-red-500">*</span></label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Tomorrow's Test"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white outline-none focus:border-[#5161cf]"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Message <span className="text-red-500">*</span></label>
                      <textarea 
                        required
                        rows="4"
                        placeholder="Type your announcement..."
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white outline-none focus:border-[#5161cf] resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <div>
                      {/* 📌 Label updated and required attribute added */}
                      <label className="block text-xs text-zinc-400 mb-1">Deadline <span className="text-red-500">*</span></label>
                      <input 
                        required
                        type="datetime-local" 
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white outline-none focus:border-[#5161cf]"
                        style={{ colorScheme: "dark" }}
                        value={formData.deadline}
                        onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting || assignments.length === 0}
                      className="w-full py-3 rounded-lg font-bold text-white bg-[#5161cf] hover:bg-[#4050b5] disabled:opacity-50 transition-colors"
                    >
                      {isSubmitting ? "Sending..." : "Send Notification"}
                    </button>

                    {formStatus.text && (
                      <div className={`p-3 rounded-lg text-sm text-center ${formStatus.type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                        {formStatus.text}
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* SHARED: Notifications Inbox / History */}
              <div className={userRole === 'teacher' ? "lg:col-span-2" : "lg:col-span-3 max-w-4xl mx-auto w-full"}>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Calendar size={20} className="text-[#5161cf]" /> 
                  {userRole === 'teacher' ? 'Sent Notifications (Active & Last Task)' : 'Your Notifications'}
                </h3>

                {loadingNotifs ? (
                  <div className="animate-pulse flex flex-col gap-4">
                    {[1,2,3].map(n => (
                      <div key={n} className="h-32 bg-zinc-900/50 rounded-xl w-full border border-white/5"></div>
                    ))}
                  </div>
                ) : visibleNotifications.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {visibleNotifications.map(notif => renderNotificationCard(notif, userRole === 'teacher'))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-zinc-900/30 rounded-xl border border-dashed border-white/10 text-zinc-500">
                    <Bell size={40} className="mx-auto mb-3 opacity-20" />
                    <p>No active notifications right now.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* --- FEATURES SECTION (Always visible below) --- */}
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
            />
             <FeatureCard 
              icon={<Share2 size={24} />}
              title="Resource Sharing"
              desc="Seamlessly upload and share lecture notes, PDFs, and recorded sessions directly to specific classrooms."
            />
             <FeatureCard 
              icon={<LineChart size={24} />}
              title="Deep Analytics"
              desc="Visual graphs for students to track progress over time. Teachers get class-average reports instantly."
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
              <span>Vi Mentor</span>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs">
              Empowering the next generation of learners with data-driven education tools.
            </p>
          </div>
          
          <FooterColumn title="Platform" links={['Quiz Maker', 'Analytics', 'Note Sharing']} />
          <FooterColumn title="Legal" links={['Privacy Policy', 'Terms of Service']} />
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-zinc-600 text-xs">
          © 2024 Vi Mentor Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

// --- Helper Components ---
const FeatureCard = ({ icon, title, desc }) => (
  <div className="group p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-[#5161cf]/50 transition-all hover:bg-zinc-900/80 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#5161cf]/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
    <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-[#5161cf] transition-colors text-white">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const FooterColumn = ({ title, links }) => (
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