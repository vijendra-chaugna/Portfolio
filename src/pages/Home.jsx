import React, { useState, useEffect } from 'react';
import { Github, Linkedin, ExternalLink, Mail, Phone } from 'lucide-react';
import ProfileImage from '../assets/profile.jpg';

const hellos = [
  "Hello","नमस्ते","Bonjour","こんにちは", "Hola",
];

function LoadingScreen({ onDone }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let count = 0;
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        count++;
        if (count >= hellos.length) {
          clearInterval(cycle);
          onDone();
          return;
        }
        setIndex(count);
        setVisible(true);
      }, 400);
    }, 700);
    return () => clearInterval(cycle);
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0f172a',
    }}>
      <span style={{
        fontSize: 'clamp(48px, 10vw, 100px)',
        fontFamily: 'Georgia, serif',
        color: '#e2e8f0',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        userSelect: 'none',
      }}>
        {hellos[index]}
      </span>
    </div>
  );
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleLoadingDone = () => {
    setLoading(false);
    setTimeout(() => setFadeIn(true), 50);
  };

  useEffect(() => {
    if (loading) return;
    const handleScroll = () => {
      const sections = ['about', 'education', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const smsMessage = `New Portfolio Contact:\nName: ${contactForm.name}\nEmail: ${contactForm.email}\nMessage: ${contactForm.message}`;
    const smsUrl = `sms:+917688996699?body=${encodeURIComponent(smsMessage)}`;
    const emailSubject = `Portfolio Contact from ${contactForm.name}`;
    const emailBody = `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`;
    const emailUrl = `mailto:vijendra.chaugna@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(smsUrl, '_blank');
    setTimeout(() => window.open(emailUrl, '_blank'), 1000);
    setContactForm({ name: '', email: '', message: '' });
    alert('Contact form submitted! Please check if your messaging app opened.');
  };

  const handleInputChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const skills = {
    programming: ["JavaScript", "Python", "C++", "C"],
    frontend: ["React.js", "Tailwind CSS", "Bootstrap", "Chart.js"],
    backend: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs", "JWT Authentication"],
    databases: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
    tools: ["Git", "GitHub", "Linux", "Docker", "Kubernetes", "Figma", "Agile/Scrum"],
  };

  const education = [
    {
      period: "2022 — 2026",
      title: "SARDAR VALLABHBHAI NATIONAL INSTITUTE OF TECHNOLOGY",
      description: "Surat, Gujarat, India",
      technologies: ["B.Tech: Computer Science Engineering"],
    },
    {
      period: "2020 — 2021",
      title: "NALANDA VIDHYALAYA",
      description: "Morbi, Gujarat, India",
      technologies: ["Class XII: CBSE"],
    },
    {
      period: "2018 — 2019",
      title: "AMBUJA VIDYA NIKATAN",
      description: "Kodinar, Gujarat, India",
      technologies: ["Class X: CBSE"],
    },
  ];

  const experiences = [
    {
      period: "MAY 2025 — AUG 2025",
      title: "Software Developer Intern",
      company: "HackHunt",
      technologies: [
        "Developed full-stack applications using React.js, Node.js, Express and Tailwind CSS",
        "Designed REST APIs with JWT authentication for secure user sessions",
        "Worked in Agile workflow including sprint planning and peer code reviews",
        "Optimized front-end components for performance and accessibility",
      ],
    },
  ];

  const projects = [
    {
      title: "LACE & GRACE: E-commerce Web App",
      description:
        "Built scalable e-commerce platform with product catalog and checkout flow. Developed admin dashboard for product, category and order management. Implemented authentication, CRUD APIs and database integration.",
      technologies: ["React.js", "Node.js", "Express", "MongoDB", "MySQL", "Tailwind CSS"],
      link: "https://lace-grace-frontend.vercel.app/",
    },
    {
      title: "Fintech Analytics Platform (Smart Payment Insights Engine)",
      description:
        "Built real-time payment analytics platform simulating 200+ concurrent payment streams using functional programming. Engineered ML-powered anomaly detection for live transaction monitoring. Implemented interactive data visualizations with glassmorphism UI and self-healing AI suggestions.",
      technologies: ["React 18", "Chart.js", "Machine Learning"],
      link: "https://vijendra-chaugna.github.io/Engine/",
    },
    {
      title: "TypeSpeed: Typing Speed Web App",
      description:
        "Developed full-stack typing speed application with real-time WPM, accuracy and mistake tracking. Implemented global leaderboard with MySQL backend and Google OAuth authentication.",
      technologies: ["React.js", "FastAPI", "MySQL", "Tailwind CSS"],
      link: "https://typing-speed-app-mlsd.vercel.app/",
    },
    {
      title: "Portfolio Website",
      description:
        "Designed personal portfolio website to showcase projects and skills. Implemented responsive UI for cross-device compatibility.",
      technologies: ["React.js", "Bootstrap"],
      link: "https://vijendra-chaugna-portfolio.app",
      github: "https://github.com/vijendra-chaugna/portfolio",
    },
  ];

  const NavItem = ({ section, label, isActive }) => (
    <a
      href={`#${section}`}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
      className={`flex items-center gap-4 py-3 px-0 text-left transition-all duration-200 group ${
        isActive ? 'text-slate-200' : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      <div className={`h-px transition-all duration-200 ${
        isActive ? 'w-16 bg-slate-200' : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-300'
      }`} />
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    </a>
  );

  const TechTag = ({ children, variant = 'default' }) => (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
      variant === 'teal' ? 'bg-teal-400/10 text-teal-300' : 'bg-slate-700/50 text-slate-300'
    }`}>
      {children}
    </span>
  );

  const SkillCategory = ({ title, skills }) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => <TechTag key={i} variant="teal">{skill}</TechTag>)}
      </div>
    </div>
  );

  return (
    <>
      {loading && <LoadingScreen onDone={handleLoadingDone} />}

      <div
        className="bg-slate-900 text-slate-400 min-h-screen"
        style={{
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 0.8s ease',
          visibility: loading ? 'hidden' : 'visible',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="lg:flex lg:justify-between lg:gap-4">
            {/* Left Column */}
            <div className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                  Vijendra Chaugna
                </h1>
                <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                  Bachelor of Technology - Computer Science and Engineering
                </h2>
                <p className="mt-4 max-w-xs leading-normal">
                  Batch 2022–2026, Sardar Vallabhbhai National Institute of Technology (Surat, Gujarat)
                </p>

                <nav className="nav hidden lg:block mt-16" aria-label="In-page jump links">
                  <ul className="space-y-1">
                    {['about', 'education', 'skills', 'experience', 'projects', 'contact'].map((s) => (
                      <li key={s}>
                        <NavItem section={s} label={s.charAt(0).toUpperCase() + s.slice(1)} isActive={activeSection === s} />
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="mt-8 flex items-center gap-5">
                <a href="https://github.com/vijendra-chaugna" className="text-slate-400 hover:text-slate-200 transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/vijendra-chaugna/" className="text-slate-400 hover:text-slate-200 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:vijendra.chaugna@gmail.com" className="text-slate-400 hover:text-slate-200 transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Right Column */}
            <div className="pt-24 lg:w-1/2 lg:py-24">

              {/* About */}
              <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                <div className="space-y-4">
                  <img
                    src={ProfileImage} 
                    alt="Vijendra Chaugna"
                    className="h-100 w-full border border-slate-200/10 mb-4 object-cover rounded-lg"
                  />
                  <p>
                    Computer Science student with strong full-stack development skills using React.js, Node.js, Express and modern
                    JavaScript. Experienced in API development, database design and UI optimization. Solved{' '}
                    <span className="text-teal-300 font-semibold">1000+ DSA problems</span> across LeetCode, Codeforces and
                    GeeksforGeeks. Seeking software developer role.
                  </p>
                </div>
              </section>

              {/* Education */}
              <section id="education" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                <div className="space-y-12">
                  {education.map((edu, i) => (
                    <div key={i} className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        {edu.period}
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">{edu.title}</h3>
                        <p className="mt-2 text-sm leading-normal">{edu.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {edu.technologies.map((t, ti) => <TechTag key={ti} variant="teal">{t}</TechTag>)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section id="skills" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-200 mb-8">Technical Skills</h2>
                <SkillCategory title="Programming Languages" skills={skills.programming} />
                <SkillCategory title="Frontend Development" skills={skills.frontend} />
                <SkillCategory title="Backend Development" skills={skills.backend} />
                <SkillCategory title="Databases" skills={skills.databases} />
                <SkillCategory title="Tools & Methodologies" skills={skills.tools} />
              </section>

              {/* Experience */}
              <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                <div className="space-y-12">
                  {experiences.map((exp, i) => (
                    <div key={i} className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        {exp.period}
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          {exp.title} · {exp.company}
                        </h3>
                        <ul className="mt-2 text-sm leading-normal list-disc pl-5 space-y-1">
                          {exp.technologies.map((t, ti) => <li key={ti}>{t}</li>)}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12">
                  <a
                    className="inline-flex items-center font-medium leading-tight text-slate-200 group"
                    href="https://drive.google.com/file/d/13ibhIQ8mk2plIxA4n3FiuIPwCTzEt_JY/view?usp=sharing"
                    target="_blank" rel="noreferrer"
                  >
                    <span className="border-b border-transparent pb-px transition group-hover:border-teal-300">
                      View Full Résumé
                    </span>
                    <ExternalLink className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </a>
                </div>
              </section>

              {/* Projects */}
              <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                <div className="space-y-12">
                  {projects.map((project, i) => (
                    <div key={i} className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                      <div className="z-10 sm:col-span-8">
                        <h3>
                          {project.link && project.link !== '#' ? (
                            <a
                              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                              href={project.link} target="_blank" rel="noreferrer"
                            >
                              <span>{project.title}</span>
                              <ExternalLink className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                            </a>
                          ) : (
                            <span className="text-slate-200">{project.title}</span>
                          )}
                        </h3>
                        <p className="mt-2 text-sm leading-normal">{project.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.technologies.map((t, ti) => <TechTag key={ti} variant="teal">{t}</TechTag>)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Achievements */}
              <section className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-200 mb-8">Achievements</h2>
                <div className="space-y-4 text-sm leading-relaxed">
                  <div className="flex gap-3">
                    <span className="text-teal-300 font-semibold shrink-0">Problem Solving</span>
                    <span>Solved 1000+ DSA problems across LeetCode, Codeforces and GeeksforGeeks</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-teal-300 font-semibold shrink-0">Development</span>
                    <span>Built multiple full-stack projects using modern web technologies</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-teal-300 font-semibold shrink-0">Collaboration</span>
                    <span>Worked in team environments using GitHub and Agile workflows</span>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-200 mb-6">Contact Info</h2>
                    <p className="text-slate-400 mb-6">
                      I'd love to hear from you. I'll get back to you within 24 hours. Thanks for stopping by!
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded">
                          <Mail size={16} className="text-white" />
                        </div>
                        <span className="text-slate-300">vijendra.chaugna@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded">
                          <Phone size={16} className="text-white" />
                        </div>
                        <span className="text-slate-300">+91-7688996699</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-slate-200 mb-6">Contact Me</h2>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                          <input type="text" id="name" name="name" value={contactForm.name} onChange={handleInputChange} required
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                          <input type="email" id="email" name="email" value={contactForm.email} onChange={handleInputChange} required
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message *</label>
                        <textarea id="message" name="message" value={contactForm.message} onChange={handleInputChange} required rows="6"
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 resize-none" />
                      </div>
                      <button type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                        SEND MESSAGE
                      </button>
                    </form>
                  </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-slate-500">
                    <span className="text-blue-400">Vijendra Chaugna</span> | Computer Science & Engineering
                  </div>
                  <div className="flex gap-6 text-sm text-slate-400">
                    <a href="#about" className="hover:text-slate-200 transition-colors">Home</a>
                    <a href="#about" className="hover:text-slate-200 transition-colors">About</a>
                    <a href="#projects" className="hover:text-slate-200 transition-colors">Projects</a>
                    <a href="#contact" className="hover:text-slate-200 transition-colors">Contact</a>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;