import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Terminal as TerminalIcon, ExternalLink, Briefcase, FileDown, Code2, GraduationCap, Award, Cpu, BookOpen, ArrowDown, Mail, Target, Zap, Trophy, Activity, Target as Crosshair, Globe, Sun, Moon, Users, Heart, Star, Phone } from 'lucide-react';

// Projects Data with images
const projectsData = [
  {
    id: 1,
    title: "WebPatcher: Patch Recommendation Agent for WebApp Vulnerabilities",
    category: "Security",
    desc: "An autonomous patch recommendation workflow using n8n and LLMs to identify and remediate web application vulnerabilities through ZAProxy.",
    tags: ["n8n", "LangChain", "ZAProxy", "AppSec"],
    link: "https://github.com/OmarHassan-99",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Deploying Cowrie Honeypot with Prometheus Monitoring and Slack Alerting",
    category: "Infrastructure",
    desc: "Deployed Cowrie honeypot with Prometheus monitoring and real-time Slack alerting for attack tracking and threat intelligence gathering.",
    tags: ["Honeypot", "Prometheus", "Slack", "Threat Intel"],
    link: "https://github.com/OmarHassan-99",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Detection-to-Response SOC Pipeline Using Wazuh, n8n, and TheHive",
    category: "Security",
    desc: "Complete SOC environment utilizing Wazuh for detection, automated incident response via n8n workflows, and case management integrated with TheHive.",
    tags: ["Wazuh", "n8n", "TheHive", "SIEM", "SOAR"],
    link: "https://github.com/OmarHassan-99",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Automated Detection Coverage Lookup To MITRE ATT&CK",
    category: "Engineering",
    desc: "A tool that pulls active SIEM rules via API, uses AI to map missing MITRE ATT&CK techniques, and maintains a live coverage inventory in Google Sheets.",
    tags: ["API", "MITRE ATT&CK", "Python", "SIEM"],
    link: "https://github.com/OmarHassan-99",
    image: "https://images.unsplash.com/photo-1614064641913-6b059828ebce?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Autonomous Vulnerability Discovery & Remediation using Nessus, AI Agents, and MCP",
    category: "Automation",
    desc: "End-to-end workflow using Nessus for scanning, AI Agents for risk reprioritization, and MCP for executing Linux remediation commands via SSH with human-in-the-loop approval.",
    tags: ["Nessus", "AI Agents", "MCP", "Linux", "n8n"],
    link: "https://github.com/OmarHassan-99",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "Elastic's Ingestion Pipeline using API & Threat Detection Rules",
    category: "Engineering",
    desc: "Engineered data ingestion pipelines using Elastic API and developed custom threat detection rules for enhanced security monitoring.",
    tags: ["Elastic", "API", "Detection Rules", "Data Pipeline"],
    link: "https://github.com/OmarHassan-99",
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    title: "ELK Stack Setup",
    category: "Infrastructure",
    desc: "Complete ELK Stack deployment and configuration for log management, including data ingestion pipelines and custom dashboards for security monitoring.",
    tags: ["ELK Stack", "Logstash", "Kibana", "Monitoring"],
    link: "https://github.com/OmarHassan-99",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    title: "Cryptographic Algorithms using C#",
    category: "Development",
    desc: "Implementation of various cryptographic algorithms in C#, demonstrating understanding of encryption, hashing, and security protocols.",
    tags: ["C#", "Cryptography", "Encryption", "Security"],
    link: "https://github.com/OmarHassan-99",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
  }
];

// Labs/Writeups Data with images
const labsData = [
  {
    id: 1,
    title: "VodkaStealer Malware Analysis",
    date: "DFIR Lab",
    desc: "Performed static and dynamic analysis of Windows malware using FlareVM, extracting critical IOCs via PEStudio and Floss for SIEM integration.",
    tags: ["FlareVM", "PEStudio", "Malware Analysis"],
    link: "#",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Multi-Stage Adversary Reconstruction",
    date: "Threat Hunting",
    desc: "Conducted deep-dive investigations in ELK, performing log correlation and timeline analysis to reconstruct an APT attack and identify initial access vectors.",
    tags: ["ELK Stack", "Timeline Analysis", "Winlogbeat"],
    link: "#",
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Cowrie Honeypot Live Attack Monitoring",
    date: "Active Defense",
    desc: "Monitored and documented live brute-force attacks via Cowrie Honeypot, utilizing Prometheus for metrics and tracking adversary behavior.",
    tags: ["Honeypot", "Prometheus", "Slack Alerts"],
    link: "#",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
  }
];

// Internships Data
const internshipsData = [
  {
    id: 1,
    role: "SOC Engineer Intern",
    company: "ZeroSploit MEA",
    date: "Dec 2025 - Jan 2026",
    desc: "Developed an automated Detection Coverage Lookup tool. Engineered an autonomous vulnerability management workflow using n8n and Tenable Nessus. Deployed Microsoft Sentinel with AMA log ingestion.",
    tags: ["MS Sentinel", "n8n", "Nessus", "MITRE ATT&CK"]
  },
  {
    id: 2,
    role: "IT Technical Support Intern",
    company: "ElSewedy Industries (EMAS)",
    date: "Jul 2025 - Aug 2025",
    desc: "Provided technical support to employees, resolving software and hardware issues. Assisted in Active Directory management, including user account creation and troubleshooting domain-related issues. Assisted in deployment and configuration of workstation images.",
    tags: ["Active Directory", "Windows Server", "IT Support"]
  }
];

// Training & Scholarships Data
const trainingData = [
  {
    id: 1,
    role: "SOC Analyst Trainee",
    company: "WE Innovate X ZeroSploit Bootcamp",
    date: "Aug 2025 - Sep 2025",
    desc: "Conducted deep-dive investigations in ELK. Deployed and managed ELK Stack with data ingestion pipelines using Winlogbeat and Sysmon. Performed static and dynamic malware analysis using FlareVM, PEStudio, and Floss.",
    tags: ["ELK Stack", "Malware Analysis", "Sysmon", "Winlogbeat"]
  },
  {
    id: 2,
    role: "Fortinet Cybersecurity Trainee",
    company: "National Communications Institute (NTI & ITIDA)",
    date: "Jul 2025 - Aug 2025",
    desc: "Completed 120-hour cybersecurity program with 90 hours technical training on FortiGate firewalls, IPS, VPNs, and network security fundamentals. Gained practical experience configuring and securing network infrastructures.",
    tags: ["FortiGate", "IPS", "VPNs", "Network Security"]
  },
  {
    id: 3,
    role: "Cisco CyberOps Trainee",
    company: "National Communications Institute (NTI)",
    date: "Apr 2025 - Jul 2025",
    desc: "Completed 72 hours of intensive cybersecurity training with hands-on labs covering threat detection, incident response, and security operations fundamentals aligned with Cisco's CyberOps curriculum.",
    tags: ["Cisco CyberOps", "SOC Workflows", "Threat Detection"]
  },
  {
    id: 4,
    role: "SOC Analyst Diploma",
    company: "IT Gate Academy",
    date: "Jun 2024 - Jun 2025",
    desc: "Completed 360-hour SOC diploma covering CCNA 200-301, Windows Server 2019 (MCSA), Linux Administration I, Fortinet NSE4 Firewall, CEH v13, Incident Response (eCIR), Digital Forensics (eCDFP), and SIEM operations using IBM QRadar and Splunk.",
    tags: ["CCNA", "MCSA", "CEH", "eCIR", "eCDFP", "Splunk", "QRadar"]
  }
];

// Extracurricular Activities Data
const extracurricularData = [
  {
    id: 1,
    role: "CTF Player & Competitor",
    company: "Various CTF Platforms",
    date: "2024 - Present",
    desc: "Active participant in Capture The Flag competitions focusing on blue team, digital forensics, and incident response challenges. Regular contributor to community write-ups and knowledge sharing.",
    tags: ["CTF", "DFIR", "Blue Team", "Write-ups"]
  },
  {
    id: 2,
    role: "Cybersecurity Content Creator",
    company: "Medium Blog & Gitbook",
    date: "2024 - Present",
    desc: "Author technical write-ups and cybersecurity tutorials on Medium and Gitbook, documenting lab solutions, malware analysis techniques, and SOC workflows for the community.",
    tags: ["Technical Writing", "Medium", "Gitbook", "Knowledge Sharing"]
  },
  {
    id: 3,
    role: "Open Source Contributor",
    company: "GitHub Community",
    date: "2023 - Present",
    desc: "Contribute to security-related open source projects, develop custom tools for SOC operations, and maintain public repositories for detection engineering and automation.",
    tags: ["Open Source", "GitHub", "Python", "Security Tools"]
  },
  {
    id: 4,
    role: "Student Volunteer",
    company: "Ain Shams University",
    date: "2023 - 2024",
    desc: "Volunteered in organizing technical workshops and cybersecurity awareness sessions for fellow students. Assisted in setting up lab environments for practical security training.",
    tags: ["Volunteering", "Workshops", "Cyber Awareness", "Training"]
  }
];

// Platform Labs Data
const thmLabs = [
  { id: 1, name: "SOC L1 Pathway (Legacy)", status: "Completed", date: "2024" },
  { id: 2, name: "SOC L1 Pathway (Updated)", status: "Completed", date: "2025" },
  { id: 3, name: "Advanced Endpoint Investigation", status: "Completed", date: "2025" },
  { id: 4, name: "Blue Team Path", status: "In Progress", date: "2025" },
  { id: 5, name: "Cyber Defense Path", status: "In Progress", date: "2025" },
  { id: 6, name: "Red Team Path", status: "Not Started", date: "2025" }
];

const cyberdefendersLabs = [
  { id: 1, name: "BlueYard", status: "Completed", date: "2025" },
  { id: 2, name: "LogAnalysis", status: "Completed", date: "2025" },
  { id: 3, name: "PacketDetective", status: "In Progress", date: "2025" },
  { id: 4, name: "WebStrike", status: "Completed", date: "2025" },
  { id: 5, name: "Phantom", status: "In Progress", date: "2025" }
];

const htbLabs = [
  { id: 1, name: "Starting Point", status: "Completed", date: "2025" },
  { id: 2, name: "Intro to Dante", status: "In Progress", date: "2025" },
  { id: 3, name: "Linux Fundamentals", status: "Completed", date: "2025" }
];

const letsdefendLabs = [
  { id: 1, name: "SOC Fundamentals", status: "Completed", date: "2025" },
  { id: 2, name: "Incident Response", status: "In Progress", date: "2025" },
  { id: 3, name: "Log Analysis", status: "Completed", date: "2025" },
  { id: 4, name: "Malware Analysis", status: "Completed", date: "2025" }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activePlatform, setActivePlatform] = useState('THM');
  const [activeJourneyTab, setActiveJourneyTab] = useState('internships');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const platformData = {
    THM: thmLabs,
    CyberDefenders: cyberdefendersLabs,
    HTB: htbLabs,
    LetsDefend: letsdefendLabs
  };

  const platformIcons = {
    THM: <Activity size={20} />,
    CyberDefenders: <Crosshair size={20} />,
    HTB: <Cpu size={20} />,
    LetsDefend: <Shield size={20} />
  };

  const platformColors = {
    THM: "from-red-500 to-orange-500",
    CyberDefenders: "from-purple-500 to-pink-500",
    HTB: "from-green-500 to-emerald-500",
    LetsDefend: "from-blue-500 to-cyan-500"
  };

  const journeyData = 
    activeJourneyTab === 'internships' ? internshipsData :
    activeJourneyTab === 'training' ? trainingData :
    extracurricularData;

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }));

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#060F0A] text-gray-100' : 'bg-gray-50 text-gray-900'} font-sans selection:bg-emerald-500/30 overflow-x-hidden`}>
      
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-emerald-400/30 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Interactive Mouse Glow */}
      <div 
        className="fixed pointer-events-none z-10 transition-opacity duration-300"
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Background Curvy Lines - No Polygons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="absolute w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <motion.path 
            d="M0,300 C300,100 600,500 900,300 C1200,100 1500,400 1800,250" 
            stroke={darkMode ? "#10B981" : "#059669"} 
            strokeWidth="2.5" 
            fill="none"
            opacity="0.2"
            animate={{ d: [
              "M0,300 C300,100 600,500 900,300 C1200,100 1500,400 1800,250",
              "M0,350 C300,500 600,200 900,400 C1200,600 1500,300 1800,350",
              "M0,300 C300,100 600,500 900,300 C1200,100 1500,400 1800,250"
            ]}}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M0,500 C400,300 700,700 1000,450 C1300,200 1600,600 1800,400" 
            stroke={darkMode ? "#14B8A6" : "#0D9488"} 
            strokeWidth="2" 
            fill="none"
            opacity="0.15"
            animate={{ d: [
              "M0,500 C400,300 700,700 1000,450 C1300,200 1600,600 1800,400",
              "M0,450 C400,600 700,300 1000,550 C1300,750 1600,350 1800,500",
              "M0,500 C400,300 700,700 1000,450 C1300,200 1600,600 1800,400"
            ]}}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M0,700 C250,500 500,300 800,600 C1100,900 1400,500 1800,650" 
            stroke={darkMode ? "#34D399" : "#10B981"} 
            strokeWidth="1.5" 
            fill="none"
            opacity="0.1"
            animate={{ d: [
              "M0,700 C250,500 500,300 800,600 C1100,900 1400,500 1800,650",
              "M0,650 C250,800 500,600 800,500 C1100,400 1400,700 1800,550",
              "M0,700 C250,500 500,300 800,600 C1100,900 1400,500 1800,650"
            ]}}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Navbar - Removed Contact button, kept only icons */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={`sticky top-0 z-50 backdrop-blur-md border-b px-6 py-4 transition-all duration-300 ${
          scrolled ? 'shadow-lg' : ''
        } ${
          darkMode ? 'bg-[#060F0A]/90 border-emerald-900/30' : 'bg-white/90 border-gray-200'
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.div 
            className="text-2xl font-extrabold tracking-tighter cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Omar<span className="text-emerald-500">.Hassan</span>
          </motion.div>
          <div className={`hidden md:flex gap-8 text-sm font-semibold ${darkMode ? 'text-emerald-100/60' : 'text-gray-600'}`}>
            {['About', 'Projects', 'Writeups', 'Platforms', 'Journey'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="hover:text-emerald-400 transition-colors relative group"
                whileHover={{ scale: 1.1 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {/* Dark/Light Mode Toggle */}
            <motion.button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors ${darkMode ? 'text-emerald-100/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            
            {/* Social Icons */}
            <motion.a href="https://github.com/OmarHassan-99" target="_blank" rel="noreferrer" className={`hidden sm:block transition-colors ${darkMode ? 'text-emerald-100/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} title="GitHub" whileHover={{ scale: 1.2, y: -2 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>
            
            <motion.a href="https://linkedin.com/in/omarhassan" target="_blank" rel="noreferrer" className={`hidden sm:block transition-colors ${darkMode ? 'text-emerald-100/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} title="LinkedIn" whileHover={{ scale: 1.2, y: -2 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
            
            <motion.a href="https://medium.com/@omarhassan" target="_blank" rel="noreferrer" className={`hidden sm:block transition-colors ${darkMode ? 'text-emerald-100/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} title="Medium Blog" whileHover={{ scale: 1.2, y: -2 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
            </motion.a>
            
            <motion.a href="https://tryhackme.com/p/omarhassan" target="_blank" rel="noreferrer" className={`hidden sm:block transition-colors ${darkMode ? 'text-emerald-100/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} title="TryHackMe" whileHover={{ scale: 1.2, y: -2 }}>
              <Activity size={18} />
            </motion.a>
            
            <motion.a href="https://cyberdefenders.org/p/omarhassan" target="_blank" rel="noreferrer" className={`hidden sm:block transition-colors ${darkMode ? 'text-emerald-100/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} title="CyberDefenders" whileHover={{ scale: 1.2, y: -2 }}>
              <Crosshair size={18} />
            </motion.a>
          </div>
        </div>
      </motion.nav>

      <main className="max-w-6xl mx-auto px-6 py-10 md:py-20 relative z-10">
        
        {/* HERO SECTION */}
        <motion.section 
          id="about"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-20"
        >
          {/* Circular Profile Image */}
          <motion.div 
            className="relative w-64 h-64 md:w-80 md:h-80 shrink-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-full blur-3xl opacity-20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -left-4 top-1/4 bg-[#0E1A14] p-2.5 rounded-full border border-emerald-800/50 text-emerald-400 z-10 shadow-lg hidden md:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <TerminalIcon size={20} />
            </motion.div>
            <motion.div 
              className="absolute -right-2 bottom-1/3 bg-[#0E1A14] p-2.5 rounded-full border border-teal-800/50 text-teal-400 z-10 shadow-lg hidden md:block"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <Shield size={20} />
            </motion.div>
            <motion.div 
              className="relative w-full h-full rounded-full border-4 border-[#060F0A] overflow-hidden z-0 ring-4 ring-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80" alt="Omar Hassan" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div 
              className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#060F0A] border border-emerald-900/50 px-4 py-1.5 rounded-full flex items-center gap-2 z-10 whitespace-nowrap shadow-xl"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-100">Open for Opportunities</span>
            </motion.div>
          </motion.div>

          {/* Content Area */}
          <motion.div 
            className="flex flex-col items-center md:items-start text-center md:text-left flex-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* whoami terminal */}
            <motion.div 
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm font-mono mb-4 transition-colors ${
                darkMode ? 'bg-[#0E1A14] border-emerald-900/30 text-emerald-200' : 'bg-gray-100 border-gray-300 text-gray-700'
              }`}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16,185,129,0.2)" }}
            >
              <TerminalIcon size={14} className="text-emerald-400" />
              <span className="text-emerald-500">$</span> whoami
              <span className={`ml-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Omar Mohamed Hassan</span>
              <span className="w-2 h-4 bg-emerald-500 animate-pulse ml-1"></span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-black mb-3 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Omar <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Hassan</span>
            </motion.h1>
            
            <motion.div 
              className={`text-xl md:text-2xl font-bold mb-2 flex items-center gap-2 justify-center md:justify-start ${darkMode ? 'text-emerald-100/80' : 'text-gray-700'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-emerald-500"><TerminalIcon size={24}/></span>
              <span>SOC Analyst & Detection Engineer</span>
            </motion.div>
            
            <motion.p 
              className={`text-sm mb-4 font-mono ${darkMode ? 'text-emerald-400/80' : 'text-emerald-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Computer Science Graduate | Ain Shams University | 2026
            </motion.p>

            <motion.p 
              className={`text-sm md:text-base leading-relaxed mb-6 ${darkMode ? 'text-emerald-100/70' : 'text-gray-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Passionate Security Researcher building resilient systems, hunting threats, and automating security intelligence. Specializing in SIEM pipelines, malware analysis, and SOAR integrations.
            </motion.p>

            {/* Contact & Location with Phone */}
            <motion.div 
              className={`flex flex-wrap gap-3 justify-center md:justify-start mb-6 text-sm ${darkMode ? 'text-emerald-100/60' : 'text-gray-500'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="flex items-center gap-1"><Mail size={14} className="text-emerald-400"/> omar.m.h.shehatta@gmail.com</span>
              <span className="flex items-center gap-1"><Phone size={14} className="text-emerald-400"/> +20-115-888-5496</span>
              <span className="flex items-center gap-1"><Globe size={14} className="text-emerald-400"/> Cairo, Egypt</span>
              <span className="flex items-center gap-1"><Shield size={14} className="text-emerald-400"/> Military Exempted</span>
            </motion.div>

            <motion.div 
              className="flex flex-wrap justify-center md:justify-start gap-4 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              {/* Download CV with terminal command style */}
              <motion.a 
                href="/Omar_Hassan_CV.pdf" 
                download 
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all font-mono"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TerminalIcon size={18} /> find . -name "OmarHassanCV.pdf"
              </motion.a>
              <motion.a 
                href="mailto:omar.m.h.shehatta@gmail.com" 
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 border px-8 py-3.5 rounded-full text-sm font-bold transition-all ${
                  darkMode ? 'border-emerald-800 text-emerald-300 hover:bg-[#0E1A14] hover:text-emerald-200' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={18} /> Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* STATISTICS SECTION */}
        <motion.section 
          className="mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg transition-all border ${
                darkMode ? 'bg-[#0E1A14] border-emerald-800/50 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-500 hover:shadow-xl'
              }`}
            >
              <div className="p-3 bg-emerald-500/10 rounded-full mb-3">
                <Code2 size={24} className="text-emerald-400" />
              </div>
              <h3 className="text-4xl font-black text-emerald-400 mb-1">8+</h3>
              <p className="font-semibold text-sm uppercase tracking-wider text-emerald-300">Projects</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg transition-all border ${
                darkMode ? 'bg-[#0E1A14] border-teal-800/50 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-500 hover:shadow-xl'
              }`}
            >
              <div className="p-3 bg-teal-500/10 rounded-full mb-3">
                <Crosshair size={24} className="text-teal-400" />
              </div>
              <h3 className="text-4xl font-black text-teal-400 mb-1">50+</h3>
              <p className="font-semibold text-sm uppercase tracking-wider text-teal-300">Labs</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg transition-all border ${
                darkMode ? 'bg-[#0E1A14] border-blue-800/50 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500 hover:shadow-xl'
              }`}
            >
              <div className="p-3 bg-blue-500/10 rounded-full mb-3">
                <Trophy size={24} className="text-blue-400" />
              </div>
              <h3 className="text-4xl font-black text-blue-400 mb-1">Top 1%</h3>
              <p className="font-semibold text-sm uppercase tracking-wider text-blue-300">THM Rank</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg transition-all border ${
                darkMode ? 'bg-[#0E1A14] border-purple-800/50 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-500 hover:shadow-xl'
              }`}
            >
              <div className="p-3 bg-purple-500/10 rounded-full mb-3">
                <Target size={24} className="text-purple-400" />
              </div>
              <h3 className="text-4xl font-black text-purple-400 mb-1">Top 5%</h3>
              <p className="font-semibold text-sm uppercase tracking-wider text-purple-300">CyberDefenders</p>
            </motion.div>
          </div>
        </motion.section>

        {/* PROJECTS SECTION - 3 per row */}
        <section id="projects" className="mb-32 scroll-mt-24">
          <motion.div 
            className="flex flex-col items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-3">Featured <span className="text-emerald-400">Projects</span></h2>
            <p className={`text-center max-w-2xl ${darkMode ? 'text-emerald-100/50' : 'text-gray-600'}`}>
              End-to-end security environments, automated pipelines, and custom SOC tooling.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col border ${
                  darkMode ? 'bg-[#0E1A14] border-emerald-900/30 hover:border-emerald-500/50' : 'bg-white border-gray-200 hover:border-emerald-500/50 hover:shadow-2xl'
                }`}
              >
                <div className="h-40 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-[#0E1A14]' : 'from-white'} to-transparent opacity-60`}></div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className={`text-base font-bold mb-2 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                  <p className={`text-xs mb-4 flex-grow leading-relaxed line-clamp-3 ${darkMode ? 'text-emerald-100/60' : 'text-gray-600'}`}>{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 4).map(tag => (
                      <span 
                        key={tag} 
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                          darkMode ? 'bg-[#060F0A] text-emerald-300 border-emerald-900/50' : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border ${
                      darkMode ? 'bg-[#060F0A] hover:bg-[#0a1811] text-emerald-100 border-emerald-900/50' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Code2 size={14} /> View Source
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURED WRITEUPS SECTION */}
        <section id="writeups" className="mb-32 scroll-mt-24">
          <motion.div 
            className="flex flex-col items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-3">Featured <span className="text-teal-400">Write-ups</span></h2>
            <p className={`text-center max-w-2xl ${darkMode ? 'text-emerald-100/50' : 'text-gray-600'}`}>
              Practical investigations, malware analysis, and DFIR scenarios documented step-by-step.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labsData.map((lab, index) => (
              <motion.div 
                key={lab.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group border ${
                  darkMode ? 'bg-[#0E1A14] border-emerald-900/30 hover:border-teal-500/50' : 'bg-white border-gray-200 hover:border-teal-500/50 hover:shadow-xl'
                }`}
              >
                <div className="h-40 overflow-hidden relative">
                  <img 
                    src={lab.image} 
                    alt={lab.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-[#0E1A14]' : 'from-white'} to-transparent opacity-60`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen size={40} className="text-white/30 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="text-[10px] font-bold tracking-wider text-teal-400 uppercase">{lab.date}</span>
                  </div>
                  <h3 className={`text-base font-bold mb-2 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{lab.title}</h3>
                  <p className={`text-xs mb-4 flex-grow leading-relaxed line-clamp-3 ${darkMode ? 'text-emerald-100/60' : 'text-gray-600'}`}>{lab.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {lab.tags.map(tag => (
                      <span 
                        key={tag} 
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                          darkMode ? 'bg-[#060F0A] text-emerald-300 border-emerald-900/50' : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.button 
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BookOpen size={14} /> Read Write-up
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PLATFORMS SECTION */}
        <section id="platforms" className="mb-32 scroll-mt-24">
          <motion.div 
            className="flex flex-col items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-3">Platform <span className="text-purple-400">Labs</span></h2>
            <p className={`text-center max-w-2xl ${darkMode ? 'text-emerald-100/50' : 'text-gray-600'}`}>
              Completed labs and challenges across various cybersecurity platforms.
            </p>
            
            <div className={`flex gap-3 flex-wrap justify-center p-1 rounded-full mt-8 border ${
              darkMode ? 'bg-[#0E1A14] border-emerald-900/30' : 'bg-white border-gray-200'
            }`}>
              {Object.keys(platformData).map(platform => (
                <motion.button 
                  key={platform}
                  onClick={() => setActivePlatform(platform)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activePlatform === platform 
                      ? `bg-gradient-to-r ${platformColors[platform]} text-white shadow-md` 
                      : `${darkMode ? 'text-emerald-100/50 hover:text-emerald-200 hover:bg-[#060F0A]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {platformIcons[platform]}
                  {platform === 'THM' ? 'TryHackMe' : platform === 'HTB' ? 'HackTheBox' : platform}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="wait">
              {platformData[activePlatform].map((lab, index) => (
                <motion.div 
                  key={lab.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`rounded-xl p-5 transition-all group border ${
                    darkMode ? 'bg-[#0E1A14] border-emerald-900/30 hover:border-purple-500/30' : 'bg-white border-gray-200 hover:border-purple-500/30 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-purple-900/20 text-purple-400 rounded-lg">
                      {platformIcons[activePlatform]}
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      lab.status === 'Completed' 
                        ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50' 
                        : lab.status === 'In Progress'
                        ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/50'
                        : 'bg-gray-900/30 text-gray-400 border border-gray-800/50'
                    }`}>
                      {lab.status}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{lab.name}</h3>
                  <p className={`text-xs ${darkMode ? 'text-emerald-100/40' : 'text-gray-500'}`}>{lab.date}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* JOURNEY SECTION */}
        <section id="journey" className="mb-32 scroll-mt-24">
          <motion.div 
            className="flex flex-col items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-3">Professional <span className="text-emerald-400">Journey</span></h2>
            <p className={`text-center max-w-2xl mb-8 ${darkMode ? 'text-emerald-100/50' : 'text-gray-600'}`}>
              My experience in cybersecurity and IT operations.
            </p>
            
            <div className={`flex gap-3 flex-wrap justify-center p-1 rounded-full border ${
              darkMode ? 'bg-[#0E1A14] border-emerald-900/30' : 'bg-white border-gray-200'
            }`}>
              {[
                { key: 'internships', icon: <Briefcase size={16} />, label: 'Internships' },
                { key: 'training', icon: <GraduationCap size={16} />, label: 'Training & Scholarships' },
                { key: 'extracurricular', icon: <Users size={16} />, label: 'Extracurricular Activities' }
              ].map((tab) => (
                <motion.button 
                  key={tab.key}
                  onClick={() => setActiveJourneyTab(tab.key)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activeJourneyTab === tab.key 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' 
                      : `${darkMode ? 'text-emerald-100/50 hover:text-emerald-200 hover:bg-[#060F0A]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.icon} {tab.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-emerald-600/50 via-teal-500/30 to-transparent"></div>
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                {journeyData.map((job, index) => (
                  <motion.div 
                    key={`${activeJourneyTab}-${job.id}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className={`flex flex-col md:flex-row gap-6 items-start relative ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className={`rounded-2xl p-6 transition-all border ${
                        darkMode ? 'bg-[#0E1A14] border-emerald-900/30 hover:border-emerald-500/30' : 'bg-white border-gray-200 hover:border-emerald-500/30 hover:shadow-lg'
                      }`}>
                        <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">{job.date}</span>
                        <h3 className={`text-xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{job.role}</h3>
                        <p className="text-emerald-300/80 text-sm font-semibold mb-3">{job.company}</p>
                        <p className={`text-sm leading-relaxed ${darkMode ? 'text-emerald-100/60' : 'text-gray-600'}`}>{job.desc}</p>
                        <div className="flex flex-wrap gap-2 mt-4 justify-start md:justify-start">
                          {job.tags.map(tag => (
                            <motion.span 
                              key={tag} 
                              className={`text-xs font-medium px-2.5 py-1 rounded-md border ${
                                darkMode ? 'bg-[#060F0A] text-emerald-300 border-emerald-900/50' : 'bg-gray-100 text-gray-700 border-gray-300'
                              }`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <motion.div 
                      className="hidden md:block relative z-10"
                      whileHover={{ scale: 1.5 }}
                    >
                      <div className="w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#060F0A] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    </motion.div>
                    <div className="flex-1 hidden md:block"></div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Footer */}
        <motion.footer 
          className={`text-center text-sm py-8 border-t ${darkMode ? 'text-emerald-100/40 border-emerald-900/20' : 'text-gray-500 border-gray-200'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>© 2026 Omar Mohamed Hassan. Built with React & Tailwind CSS.</p>
          <p className="mt-1">SOC Analyst | Detection Engineer | Security Researcher</p>
        </motion.footer>

      </main>
    </div>
  );
}