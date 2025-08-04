import React, { useState, useEffect } from 'react';
import { Github, Linkedin, ExternalLink, Star, Download, Mail, Phone, MessageSquare } from 'lucide-react';
import ProfileImage from '../assets/profile.jpg';

const Home = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'education', 'experience', 'projects', 'contact'];
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
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    // Create SMS message
    const smsMessage = `New Portfolio Contact:\nName: ${contactForm.name}\nEmail: ${contactForm.email}\nMessage: ${contactForm.message}`;
    const smsUrl = `sms:+917688996699?body=${encodeURIComponent(smsMessage)}`;
    
    // Create email message
    const emailSubject = `Portfolio Contact from ${contactForm.name}`;
    const emailBody = `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`;
    const emailUrl = `mailto:vijendra.chaugna@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Try to open SMS first, then email as fallback
    window.open(smsUrl, '_blank');
    setTimeout(() => {
      window.open(emailUrl, '_blank');
    }, 1000);
    
    // Reset form
    setContactForm({ name: '', email: '', message: '' });
    alert('Contact form submitted! Please check if your messaging app opened.');
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const education = [
    {
      period: "2022 — PRESENT",
      title: "SARDAR VALLABHBHAI NATIONAL INSTITUTE OF TECHNOLOGY",
      company: "",
      description: "Surat,Gujarat,India",
      technologies: ["B-Tech : Computer Science Engineering"]
    },
    {
      period: "2020 — 2021",
      title: "NALANDA VIDHYALAYA",
      company: "",
      description: "Morbi,Gujarat,India",
      technologies: ["Class XII : Central Board of Secondary Education"]
    },
    {
      period: "2018 — 2019", 
      title: "AMBUJA VIDYA NIKATAN",
      company: "",
      description: "Kodinar,Gujarat,India",
      technologies: ["Class X : Central Board of Secondary Education"]
    }
  ];

  const experiences = [
    {
      period: "MAY 2025 — AUG 2025",
      title: "Developer Intern",
      company: "HackHunt",
      description: "",
      technologies: [
        "Developed and maintained full-stack web applications using React, Tailwind CSS, Node.js",
        "Collaborated with a team to design and implement RESTful APIs for seamless frontend-backend communication",
        "Implemented user authentication and authorization using JWT, enhancing security",
        "Participated in meetings, contributing to sprint planning and code reviews",
        "Improved UI/UX based on user feedback, increasing user satisfaction"
      ]
    }
  ];

  const projects = [
    {
      title: "LACE AND GRACE : E-commerce website",
      description: "Developed a dynamic frontend interface using React, displaying all customer orders and integrating and admin panel for seamless product listing and management.Built a robust backend with Node.js and Express to handle API requests, process data, and interact with MongoDB and MySQL databases for full-stack functionality.",
      image: "../assets/project1.png",
      technologies: ["Frontend : React and Tailwind CSS", "Backend : Node.js and Express.js" ," Databases : MongoDB"],
      link: "https://lace-grace-frontend.vercel.app/?fbclid=PAQ0xDSwL9L-VleHRuA2FlbQIxMAABpwjMT8I028GwlNHTn3wHaKHdVuWeleWwH7lU6nGzZzc0vhGp_GJmvqsDH6eM_aem_DrVNus65JNVdNo9eugK26g"
    },
    {
      title: "FactFrontline : A news website : Stay informed with FactFrontline!",
      description: "FactFrontline is the perfect app for staying up-to-date with the latest in weather, market trends, politics,and current affairs.This app fetches data from NewsAPI.org, and presents it in a user-friendly and organized manner.Categorized as per need and interest.",
      image: "/api/placeholder/200/120", 
      technologies: [" Bootstrap","React"],
      link: "#"
    },
    {
      title: "My Portfolio Website",
      description: "Designed and developed a responsive personal portfolio to showcase my skills, projects, and experience. Implemented smooth scrolling, dynamic section highlighting, and a clean UI with interactive elements.",
      image: "../assets/portfolio-screenshot.png",
      technologies: ["React.js", "Tailwind CSS", "Lucide React (Icons)"],
      link: "#",
      github: "https://github.com/vijendra-chaugna/portfolio"
    }
  ];

  const NavItem = ({ section, label, isActive, onClick }) => (
    <a
      href={`#${section}`}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(section)?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }}
      className={`flex items-center gap-4 py-3 px-0 text-left transition-all duration-200 group ${
        isActive ? 'text-slate-200' : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      <div className={`h-px transition-all duration-200 ${
        isActive ? 'w-16 bg-slate-200' : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-300'
      }`} />
      <span className="text-xs font-bold uppercase tracking-widest">
        {label}
      </span>
    </a>
  );

  const TechTag = ({ children, variant = 'default' }) => (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
      variant === 'teal' 
        ? 'bg-teal-400/10 text-teal-300' 
        : 'bg-slate-700/50 text-slate-300'
    }`}>
      {children}
    </span>
  );

  return (
    <div className="bg-slate-900 text-slate-400 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left Column - Header & Navigation */}
          <div className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                Vijendra Chaugna
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                Computer Science Engineer
              </h2>
              <p className="mt-4 max-w-xs leading-normal">
              Batch 2022-2026 , Sardar Vallabhbhai National Institute of Technology   (Surat, Gujarat)
              </p>

              {/* Navigation */}
              <nav className="nav hidden lg:block mt-16" aria-label="In-page jump links">
                <ul className="space-y-1">
                  <li>
                    <NavItem 
                      section="about" 
                      label="About" 
                      isActive={activeSection === 'about'}
                    />
                  </li>
                  <li>
                    <NavItem 
                      section="education" 
                      label="Education" 
                      isActive={activeSection === 'education'}
                    />
                  </li>
                  <li>
                    <NavItem 
                      section="experience" 
                      label="Experience" 
                      isActive={activeSection === 'experience'}
                    />
                  </li>
                  <li>
                    <NavItem 
                      section="projects" 
                      label="Projects" 
                      isActive={activeSection === 'projects'}
                    />
                  </li>
                  <li>
                    <NavItem 
                      section="contact" 
                      label="Contact" 
                      isActive={activeSection === 'contact'}
                    />
                  </li>
                </ul>
              </nav>
            </div>

            {/* Social Links */}
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

          {/* Right Column - Content */}
          <div className="pt-24 lg:w-1/2 lg:py-24">
            {/* About Section */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="space-y-4">
                <img 
                  src={ProfileImage} 
                  alt="Vijendra Chaugna"
                  className="h-100 w-full border border-slate-200/10 mb-4 object-cover rounded-lg"
                />
                <p>
                  I am a Computer Science student with a passion for problem-solving and continuous learning. Solved over 500+ Data
                  Structures and Algorithms (DSA) questions across various platforms, showcasing strong analytical and logical thinking.
                  Actively expanding my skill set through hands-on projects and learning modern web development technologies to become a
                  well-rounded software engineer.
                </p>
              </div>
            </section>

            {/* Education Section */}
            <section id="education" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="space-y-12">
                {education.map((edu, index) => (
                  <div key={index} className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                      {edu.period}
                    </header>
                    <div className="z-10 sm:col-span-6">
                      <h3 className="font-medium leading-snug text-slate-200">
                        <div>
                          <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base">
                            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                            <span>{edu.title}{edu.company}</span>
                          </span>
                        </div>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">{edu.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {edu.technologies.map((tech, techIndex) => (
                          <TechTag key={techIndex} variant="teal">{tech}</TechTag>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div key={index} className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                      {exp.period}
                    </header>
                    <div className="z-10 sm:col-span-6">
                      <h3 className="font-medium leading-snug text-slate-200">
                        <div>
                          <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base">
                            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                            <span>{exp.title} • {exp.company}</span>
                          </span>
                        </div>
                      </h3>
                      <ul className="mt-2 text-sm leading-normal list-disc pl-5 space-y-1">
                        {exp.technologies.map((tech, techIndex) => (
                          <li key={techIndex}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <a className="inline-flex items-center font-medium leading-tight text-slate-200 font-semibold text-slate-200 group" href="https://drive.google.com/file/d/17HvLvY5E05qghTkyMwATK2jczGjQzoAg/view?usp=drive_link" target="_blank" rel="noreferrer">
                  <span>
                    <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                      View Full Résumé
                    </span>
                    <ExternalLink className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
                  </span>
                </a>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="space-y-12">
                {projects.map((project, index) => (
                  <div key={index} className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className="z-10 sm:order-2 sm:col-span-6">
                      <h3>
  {project.link && project.link !== '#' ? (
    <a 
      className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base" 
      href={project.link} 
      target="_blank" 
      rel="noreferrer"
    >
      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
      <span>{project.title}</span>
      <ExternalLink className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
    </a>
  ) : (
    // Fallback when no valid link exists
    <span className="text-slate-200">{project.title}</span>
  )}
</h3>
                      <p className="mt-2 text-sm leading-normal">{project.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <TechTag key={techIndex} variant="teal">{tech}</TechTag>
                        ))}
                      </div>
                    </div>
                    <div className="z-10 sm:order-1 sm:col-span-2">
                      
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-200 mb-6">Contact Info</h2>
                  <p className="text-slate-400 mb-6">
                    We'd love to hear from you. I will get back to you within 24 hours. 
                    Thanks for stopping by!
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

                {/* Contact Form */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-200 mb-6">Contact Me</h2>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={contactForm.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={contactForm.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        required
                        rows="6"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 resize-none"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                      SEND MESSAGE
                    </button>
                  </form>
                </div>
              </div>

              {/* Footer */}
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
  );
};

export default Home;