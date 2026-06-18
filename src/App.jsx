import { useState, useEffect,useRef  } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Terminal as TerminalIcon, ExternalLink, Briefcase, FileDown, Code2, GraduationCap, Award, Cpu, BookOpen, ArrowDown, Mail, Target, Zap, Trophy, Activity, Target as Crosshair, Globe, Sun, Moon, Users, Heart, Star, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

// Projects Data with images
const projectsData = [
  {
    id: 1,
    title: "WebPatcher: Patch Recommendation System for WebApp Vulnerabilities",
    category: "Security",
    desc: "An autonomous patch recommendation workflow using Langchain and LLMs to identify and remediate web application vulnerabilities through Zaproxy.",
    tags: ["LangChain", "Web-Security", "AI"],
    link: "https://github.com/OmarHassan-99/Graduation-Project",
    image: "./public/images/webpatcher.png"
  },
  {
    id: 2,
    title: "Deploying Cowrie Honeypot with Prometheus Monitoring and Slack Alerting",
    category: "Infrastructure",
    desc: "Deployed Cowrie honeypot with Prometheus monitoring and real-time Slack alerting for attack tracking and threat intelligence gathering.",
    tags: ["Honeypot", "Prometheus", "Slack", "Threat Intel"],
    link: "https://github.com/OmarHassan-99/Deploying-Cowrie-Honeypot-with-Prometheus-Monitoring-and-Slack-Alerting",
    image: "./public/images/cowrie.png"
  },
  {
    id: 3,
    title: "Detection-to-Response SOC Pipeline Using Wazuh, n8n, and TheHive",
    category: "Security",
    desc: "Complete SOC environment utilizing Wazuh for detection, automated incident response via n8n workflows, and case management integrated with TheHive.",
    tags: ["Wazuh", "n8n", "TheHive", "SIEM", "SOAR"],
    link: "https://github.com/OmarHassan-99/Design-and-Implementation-of-a-SOC-Platform-with-SIEM-SOAR-and-Case-Management-Integration",
    image: "./public/images/wazuh.png"
  },
  {
    id: 4,
    title: "Automated Detection Coverage Lookup To MITRE ATT&CK",
    category: "Engineering",
    desc: "A tool that pulls active SIEM rules via API, uses AI to map missing MITRE ATT&CK techniques, and maintains a live coverage inventory in Google Sheets.",
    tags: ["API", "MITRE ATT&CK", "AI", "SIEM"],
    link: "https://github.com/OmarHassan-99/Automated-Detection-Coverage-Lookup-To-MITRE-ATT-CK-",
    image: "./public/images/coverage.png"
  },
  {
    id: 5,
    title: "Autonomous Vulnerability Discovery & Remediation using Nessus, AI Agents, and MCP",
    category: "Automation",
    desc: "End-to-end workflow using Nessus for scanning, AI Agents for risk reprioritization, and MCP for executing Linux remediation commands via SSH with human-in-the-loop approval.",
    tags: ["Nessus", "AI Agents", "MCP",  "n8n"],
    link: "https://github.com/OmarHassan-99/Autonomous-Vulnerability-Discovery-Remediation-using-Nessus-AI-Agents-and-MCP",
    image: "./public/images/mcp.png"
  },
  {
    id: 6,
    title: "Elastic's Ingestion Pipeline using API & Threat Detection Rules",
    category: "Engineering",
    desc: "Engineered data ingestion pipelines using Elastic API and developed custom threat detection rules for enhanced security monitoring.",
    tags: ["ELK","Detection Rules"],
    link: "https://github.com/OmarHassan-99/WE-Innovate-X-Zerosploit-SOC-Tasks/tree/main/SOC%20engineering%20%26%20Detection%20engineering/Elastic%20API%20%2B%20more%20on%20Detection%20Rules",
    image: "./public/images/api.png"
  },
  {
    id: 7,
    title: "ELK Stack Setup",
    category: "Infrastructure",
    desc: "Complete ELK Stack deployment and configuration for log management, including data ingestion pipelines and custom dashboards for security monitoring.",
    tags: ["ELK Stack", "Logstash", "Kibana", "Monitoring"],
    link: "https://github.com/OmarHassan-99/WE-Innovate-X-Zerosploit-SOC-Tasks/tree/main/SOC%20engineering%20%26%20Detection%20engineering/ELK%20Setup%20%2B%20Detection%20Rules",
    image: "./public/images/stack.png"
  },
  {
    id: 8,
    title: "Cryptographic Algorithms using C#",
    category: "Development",
    desc: "Implementation of various cryptographic algorithms in C#, demonstrating understanding of encryption, hashing, and security protocols.",
    tags: ["C#", "Cryptography", "Encryption", "Security"],
    link: "https://github.com/OmarHassan-99/Cryptographic-Algorithms",
    image: "./public/images/crypto.png"
  },
    {
    id: 9,
    title: "Key and Mouse Logger (KeyMouseTracker)",
    category: "Development",
    desc: "KeyMouseTracker is a Python-based keylogger and mouse activity tracker that records keystrokes and mouse interactions with timestamps. The program runs in the background using threading, efficiently logging both keyboard and mouse events concurrently. It writes logs to separate text files for easy analysis.",
    tags: ["python", "spyware", "Security"],
    link: "https://github.com/OmarHassan-99/KeyBoard-and-Mouse-Logger",
    image: "./public/images/logger.png"
  }
  
];

// Labs/Writeups Data with images
// Labs/Writeups Data - No images, no duplicates
// Labs/Writeups Data - Unique entries only
const labsData = [
  {
    id: 1,
    title: "XLMRat Lab — CyberDefenders",
    date: "Jun 20, 2025",
    desc: "Network forensics investigation analyzing malware delivery, deobfuscating scripts, and mapping attacker techniques using MITRE ATT&CK.",
    tags: ["XLMRat", "Network Forensics", "MITRE ATT&CK"],
    link: "https://medium.com/@omar.m.h.shehatta/xlmrat-lab-cyberdefenders-99522de122f5"
  },
  {
    id: 2,
    title: "Silent Breach Lab — CyberDefenders",
    date: "Jun 12, 2025",
    desc: "Analyzed a forensic image to extract communication artifacts, identify malware behavior, and decrypt encrypted files using FTK Imager and PowerShell.",
    tags: ["Silent Breach", "Endpoint Forensics", "FTK Imager"],
    link: "https://medium.com/@omar.m.h.shehatta/silent-breach-lab-cyberdefenders-69eb533a372c"
  },
  {
    id: 3,
    title: "Tusk Infostealer Lab — CyberDefenders",
    date: "Jun 10, 2025",
    desc: "Analyzed threat intelligence and malware configuration to identify TTPs, extract IOCs, and track cryptocurrency flow of the Tusk Infostealer campaign.",
    tags: ["Tusk Infostealer", "Threat Intel", "IOCs"],
    link: "https://medium.com/@omar.m.h.shehatta/tusk-infostealer-lab-cyberdefenders-372b2cb0eca5"
  },
  {
    id: 4,
    title: "PsExec Hunt Lab — CyberDefenders",
    date: "Jun 7, 2025",
    desc: "Analyzed SMB traffic in a PCAP file using Wireshark to identify PsExec lateral movement, compromised systems, and administrative shares.",
    tags: ["PsExec", "Network Forensics", "Wireshark"],
    link: "https://medium.com/@omar.m.h.shehatta/psexec-hunt-lab-cyberdefenders-6fcf181ac31d"
  },
  {
    id: 5,
    title: "The Crime Lab — CyberDefenders",
    date: "Jun 6, 2025",
    desc: "Utilized ALEAPP to analyze Android device artifacts, reconstructing a victim's financial details, movements, and communication patterns.",
    tags: ["The Crime", "Endpoint Forensics", "ALEAPP"],
    link: "https://medium.com/@omar.m.h.shehatta/the-crime-lab-cyberdefenders-110fd625145c"
  },
  {
    id: 6,
    title: "Lespion Lab — CyberDefenders",
    date: "Jun 6, 2025",
    desc: "Investigated an insider threat by analyzing GitHub repositories for exposed credentials and using OSINT tools to correlate online accounts.",
    tags: ["Lespion", "Threat Intel", "OSINT"],
    link: "https://medium.com/@omar.m.h.shehatta/lespion-lab-cyberdefenders-9cc06a4e437b"
  },
  {
    id: 7,
    title: "FakeGPT Lab — CyberDefenders",
    date: "Sep 8, 2025",
    desc: "Analyzed a malicious Chrome extension's code and behavior to identify data theft mechanisms, covert exfiltration, and anti-analysis techniques.",
    tags: ["FakeGPT", "Malware Analysis", "Chrome Extension"],
    link: "https://omarhassan.gitbook.io/omarhassan-docs/cyberdefenders/fakegpt"
  },
  {
    id: 8,
    title: "Lockdown Lab — CyberDefenders",
    date: "Oct 5, 2025",
    desc: "Reconstructed a multi-stage intrusion by analyzing network traffic, memory, and malware artifacts using Wireshark, Volatility, and VirusTotal.",
    tags: ["Lockdown", "Network Forensics", "MITRE ATT&CK"],
    link: "https://omarhassan.gitbook.io/omarhassan-docs/cyberdefenders/lockdown"
  },
  {
    id: 9,
    title: "Splunk BOTS: Trickbot CTF & Zeek/Suricata",
    date: "Mar 19, 2025",
    desc: "Solved Splunk BOTS Corelight Partner Experience challenges covering Trickbot CTF and Zeek/Suricata network analysis scenarios.",
    tags: ["Splunk", "Zeek", "Suricata", "CTF"],
    link: "https://medium.com/@omar.m.h.shehatta/splunk-bots-corelight-partner-experience-trickbot-ctf-zeek-and-suricata-ctf-256f7f33c088"
  },
  {
    id: 10,
    title: "Splunk BOTS: Okta Partner Experience - Coffeecase",
    date: "Jan 21, 2025",
    desc: "Solved the COFFECASE Scenario from Splunk BOTS Okta Partner Experience, investigating identity-based attack patterns.",
    tags: ["Splunk", "Okta", "Incident Response"],
    link: "https://medium.com/@omar.m.h.shehatta/splunk-bots-okta-partner-experience-coffeecase-writeup-a410333d2b3e"
  }
];

// Internships Data with company logos
const internshipsData = [
  {
    id: 1,
    role: "SOC Engineer Intern",
    company: "ZeroSploit MEA",
    date: "Dec 2025 - Jan 2026 · 3 weeks",
    desc: "Developed an automated Detection Coverage Lookup tool. Engineered an autonomous vulnerability management workflow using n8n and Tenable Nessus. Deployed Microsoft Sentinel with AMA log ingestion.",
    tags: ["MS Sentinel", "n8n", "Nessus", "MITRE ATT&CK"],
    logo: "./public/images/zerosploit.jpeg"
  },
  {
    id: 2,
    role: "IT Technical Support Intern",
    company: "ElSewedy Industries (EMAS)",
    date: "Jul 2025 · 1 month",
    desc: "Provided technical support to employees, resolving software and hardware issues. Assisted in Active Directory management, including user account creation and troubleshooting domain-related issues. Assisted in deployment and configuration of workstation images.",
    tags: ["Active Directory", "Windows Server", "IT Support"],
    logo: "./public/images/ELSEWEDY.png"
  }
];

// Training & Scholarships Data with logos
const trainingData = [
  {
    id: 1,
    role: "SOC Analyst Trainee",
    company: "WE Innovate X ZeroSploit Bootcamp",
    date: "Aug 2025 · 1 month",
    desc: "Conducted deep-dive investigations in ELK. Deployed and managed ELK Stack with data ingestion pipelines using Winlogbeat and Sysmon. Performed static and dynamic malware analysis using FlareVM, PEStudio, and Floss.",
    tags: ["ELK Stack", "Malware Analysis", "Sysmon", "Winlogbeat"],
    logo: "./public/images/we.jpeg"
  },
  {
    id: 2,
    role: "Fortinet Cybersecurity Trainee",
    company: "National Communications Institute (NTI & ITIDA)",
    date: "Jul 2025 · 1 month",
    desc: "Completed 120-hour cybersecurity program with 90 hours technical training on FortiGate firewalls, IPS, VPNs, and network security fundamentals. Gained practical experience configuring and securing network infrastructures.",
    tags: ["FortiGate", "IPS", "VPNs", "Network Security"],
    logo: "./public/images/nti.png"
  },
  {
    id: 3,
    role: "Cisco CyberOps Trainee",
    company: "National Communications Institute (NTI)",
    date: "Apr 2025 - Jul 2025 · 3 months",
    desc: "Completed 72 hours of intensive cybersecurity training with hands-on labs covering threat detection, incident response, and security operations fundamentals aligned with Cisco's CyberOps curriculum.",
    tags: ["Cisco CyberOps", "SOC Workflows", "Threat Detection"],
    logo: "./public/images/nti.png"
  },
  {
    id: 4,
    role: "SOC Analyst Diploma",
    company: "IT Gate Academy",
    date: "Jun 2024 - Jun 2025 · 1 year",
    desc: "Completed 360-hour SOC diploma covering CCNA 200-301, Windows Server 2019 (MCSA), Linux Administration I, Fortinet NSE4 Firewall, CEH v13, Incident Response (eCIR), Digital Forensics (eCDFP), and SIEM operations using IBM QRadar and Splunk.",
    tags: ["CCNA", "MCSA", "CEH", "eCIR", "eCDFP", "Splunk", "QRadar"],
    logo: "./public/images/itgate.jfif"
  }
];

// Extracurricular Activities Data with logos
const extracurricularData = [
  {
    id: 1,
    role: "Soft Skills Trainee",
    company: "ASU Career Center",
    date: "Sep 2023 · 2 weeks",
    desc: "Completed training focused on presentation skills, soft skills development, and professional communication at Ain Shams University's Career Center.",
    tags: ["Presentation Skills", "Soft Skills", "Professional Communication"],
    logo: "./public/images/careercenter.jfif"
  },
  {
    id: 2,
    role: "Cybersecurity Trainee",
    company: "Cyberus Stud",
    date: "Aug 2023 · 2 weeks",
    desc: "Completed cybersecurity training covering web-secure coding practices, penetration testing fundamentals, and cyber defense techniques through hands-on exercises.",
    tags: ["Penetration Testing", "Cyber Defense", "Web-Secure Coding"],
    logo: "./public/images/cyberus.jpeg"
  },
  {
    id: 3,
    role: "Problem Solving Trainee",
    company: "acmASCIS Student Chapter",
    date: "Oct 2022 - Feb 2023 · 5 months",
    desc: "Participated in problem-solving training program focusing on critical thinking, data structures, and algorithmic problem-solving techniques at Ain Shams University.",
    tags: ["Critical Thinking", "Data Structures", "Problem Solving"],
    logo: "./public/images/acm.jfif"
  },
  {
    id: 4,
    role: "Technical Team Member",
    company: "MSP Tech Club - ASU",
    date: "Sep 2022 - May 2023 · 9 months",
    desc: "Active member of the technical team working on game design projects using Simple and Fast Multimedia Library (SFML) and participating in club organization and events.",
    tags: ["Game Design", "SFML", "Team Collaboration"],
    logo: "./public/images/msp.png"
  }
];

// Platform Labs Data
const thmLabs = [
  { id: 1, name: "iOS Analysis", difficulty: "Easy" },
  { id: 2, name: "File Carving", difficulty: "Medium" },
  { id: 3, name: "Diskrupt", difficulty: "Hard" },
  { id: 4, name: "DiskFiltration", difficulty: "Hard" },
  { id: 5, name: "ExfilNode", difficulty: "Medium" },
  { id: 6, name: "Windows Memory & Processes", difficulty: "Medium" },
  { id: 7, name: "Linux Memory Analysis", difficulty: "Medium" },
  { id: 8, name: "Supplemental Memory", difficulty: "Medium" },
  { id: 9, name: "Windows Memory & User Activity", difficulty: "Medium" },
  { id: 10, name: "Windows Memory & Network", difficulty: "Medium" },
  { id: 11, name: "Windows Applications Forensics", difficulty: "Medium" },
  { id: 12, name: "Expediting Registry Analysis", difficulty: "Medium" },
  { id: 13, name: "Windows User Account Forensics", difficulty: "Medium" },
  { id: 14, name: "Windows Network Analysis", difficulty: "Easy" },
  { id: 15, name: "Windows User Activity Analysis", difficulty: "Medium" },
  { id: 16, name: "Blizzard", difficulty: "Medium" },
  { id: 17, name: "Forensic Imaging", difficulty: "Easy" },
  { id: 18, name: "Intro to Cold System Forensics", difficulty: "Easy" },
  { id: 19, name: "EXT Analysis", difficulty: "Medium" },
  { id: 20, name: "Logless Hunt", difficulty: "Medium" },
  { id: 21, name: "NTFS Analysis", difficulty: "Medium" },
  { id: 22, name: "Memory Analysis Introduction", difficulty: "Easy" },
  { id: 23, name: "Memory Acquisition", difficulty: "Easy" },
  { id: 24, name: "Android Analysis", difficulty: "Easy" },
  { id: 25, name: "Mobile Acquisition", difficulty: "Easy" },
  { id: 26, name: "Volatility Essentials", difficulty: "Medium" },
  { id: 27, name: "Linux Process Analysis", difficulty: "Easy" },
  { id: 28, name: "Windows Incident Surface", difficulty: "Medium" },
  { id: 29, name: "Compromised Windows Analysis", difficulty: "Easy" },
  { id: 30, name: "Linux Logs Investigations", difficulty: "Medium" },
  { id: 31, name: "Linux Live Analysis", difficulty: "Medium" },
  { id: 32, name: "IronShade", difficulty: "Medium" },
  { id: 33, name: "Linux Incident Surface", difficulty: "Easy" },
  { id: 34, name: "FAT32 Analysis", difficulty: "Hard" },
  { id: 35, name: "MBR and GPT Analysis", difficulty: "Medium" },
  { id: 36, name: "macOS Forensics: The Basics", difficulty: "Easy" },
  { id: 37, name: "macOS Forensics: Artefacts", difficulty: "Hard" },
  { id: 38, name: "macOS Forensics: Applications", difficulty: "Hard" },
  { id: 39, name: "Mac Hunt", difficulty: "Medium" },
  { id: 40, name: "CRM Snatch", difficulty: "Hard" },
  { id: 41, name: "Shock and Silence", difficulty: "Hard" },
  { id: 42, name: "The Last Trial", difficulty: "Hard" },
  { id: 43, name: "Preparation", difficulty: "Medium" },
  { id: 44, name: "Threat Intel & Containment", difficulty: "Easy" },
  { id: 45, name: "Identification & Scoping", difficulty: "Medium" },
  { id: 46, name: "Eradication & Remediation", difficulty: "Easy" },
  { id: 47, name: "Mayhem", difficulty: "Medium" },
  { id: 48, name: "File and Hash Threat Intel", difficulty: "Easy" },
  { id: 49, name: "Log Analysis with SIEM", difficulty: "Medium" },
  { id: 50, name: "IP and Domain Threat Intel", difficulty: "Medium" },
  { id: 51, name: "Invite Only", difficulty: "Easy" },
  { id: 52, name: "Alert Triage With Splunk", difficulty: "Medium" },
  { id: 53, name: "Initial Access Pot", difficulty: "Hard" },
  { id: 54, name: "Elevating Movement", difficulty: "Hard" },
  { id: 55, name: "Lost in RAMslation", difficulty: "Hard" },
  { id: 56, name: "Shadow Trace", difficulty: "Easy" },
  { id: 57, name: "Alert Triage With Elastic", difficulty: "Medium" },
  { id: 58, name: "Living Off the Land Attacks", difficulty: "Easy" },
  { id: 59, name: "IDS Fundamentals", difficulty: "Easy" },
  { id: 60, name: "Windows Logging for SOC", difficulty: "Easy" },
  { id: 61, name: "Windows Threat Detection 1", difficulty: "Medium" },
  { id: 62, name: "Windows Threat Detection 2", difficulty: "Medium" },
  { id: 63, name: "Detecting Web Shells", difficulty: "Easy" },
  { id: 64, name: "Windows Threat Detection 3", difficulty: "Medium" },
  { id: 65, name: "Web Security Essentials", difficulty: "Easy" },
  { id: 66, name: "Linux Logging for SOC", difficulty: "Easy" },
  { id: 67, name: "Detecting Web Attacks", difficulty: "Easy" },
  { id: 68, name: "Man-in-the-Middle Detection", difficulty: "Easy" },
  { id: 69, name: "Linux Threat Detection 1", difficulty: "Medium" },
  { id: 70, name: "Malware Classification", difficulty: "Easy" },
  { id: 71, name: "Detecting Web DDoS", difficulty: "Easy" },
  { id: 72, name: "Linux Threat Detection 2", difficulty: "Medium" },
  { id: 73, name: "Linux Threat Detection 3", difficulty: "Medium" },
  { id: 74, name: "Exploitation with cURL - Hoperation Eggsploit", difficulty: "Easy" },
  { id: 75, name: "Network Discovery Detection", difficulty: "Medium" },
  { id: 76, name: "Data Exfiltration Detection", difficulty: "Medium" },
  { id: 77, name: "Obfuscation - The Egg Shell File", difficulty: "Medium" },
  { id: 78, name: "XSS - Merry XSSMas", difficulty: "Easy" },
  { id: 79, name: "SOC Alert Triaging - Tinsel Triage", difficulty: "Medium" },
  { id: 80, name: "YARA Rules - YARA mean one!", difficulty: "Medium" },
  { id: 81, name: "Forensics - Registry Furensics", difficulty: "Medium" },
  { id: 82, name: "ICS/Modbus - Claus for Concern", difficulty: "Medium" },
  { id: 83, name: "Race Conditions - Toy to The World", difficulty: "Easy" },
  { id: 84, name: "Containers - DoorDasher's Demise", difficulty: "Medium" },
  { id: 85, name: "CyberChef - Hoperation Save McSkidy", difficulty: "Medium" },
  { id: 86, name: "Phishing - Phishmas Greetings", difficulty: "Medium" },
  { id: 87, name: "Malware Analysis - Malhare.exe", difficulty: "Easy" },
  { id: 88, name: "C2 Detection - Command & Carol", difficulty: "Medium" },
  { id: 89, name: "AWS Security - S3cret Santa", difficulty: "Easy" },
  { id: 90, name: "Web Attack Forensics - Drone Alone", difficulty: "Medium" },
  { id: 91, name: "MITRE", difficulty: "Medium" },
  { id: 92, name: "Elastic Stack: The Basics", difficulty: "Medium" },
  { id: 93, name: "Introduction to SOAR", difficulty: "Medium" },
  { id: 94, name: "SOC L1 Alert Triage", difficulty: "Easy" },
  { id: 95, name: "SOC L1 Alert Reporting", difficulty: "Easy" },
  { id: 96, name: "SOC Workbooks and Lookups", difficulty: "Easy" },
  { id: 97, name: "SOC Metrics and Objectives", difficulty: "Easy" },
  { id: 98, name: "Introduction to EDR", difficulty: "Easy" },
  { id: 99, name: "Network Security Essentials", difficulty: "Easy" },
  { id: 100, name: "Network Traffic Basics", difficulty: "Easy" },
  { id: 101, name: "IDOR - Santa's Little IDOR", difficulty: "Medium" },
  { id: 102, name: "Passwords - A Cracking Christmas", difficulty: "Easy" },
  { id: 103, name: "Prompt Injection - Sched-yule conflict", difficulty: "Easy" },
  { id: 104, name: "Network Discovery - Scan-ta Clause", difficulty: "Easy" },
  { id: 105, name: "AI in Security - old sAInt nick", difficulty: "Easy" },
  { id: 106, name: "Malware Analysis - Egg-xecutable", difficulty: "Medium" },
  { id: 107, name: "x86 Architecture Overview", difficulty: "Easy" },
  { id: 108, name: "x86 Assembly Crash Course", difficulty: "Medium" },
  { id: 109, name: "Intro to Detection Engineering", difficulty: "Easy" },
  { id: 110, name: "Tactical Detection", difficulty: "Medium" },
  { id: 111, name: "Threat Intelligence for SOC", difficulty: "Medium" },
  { id: 112, name: "Elastic: Query Languages", difficulty: "Medium" },
  { id: 113, name: "Custom Alert Rules in Wazuh", difficulty: "Easy" },
  { id: 114, name: "Threat Hunting: Introduction", difficulty: "Easy" },
  { id: 115, name: "Slingshot", difficulty: "Easy" },
  { id: 116, name: "Humans as Attack Vectors", difficulty: "Easy" },
  { id: 117, name: "Systems as Attack Vectors", difficulty: "Easy" },
  { id: 118, name: "SOC Role in Blue Team", difficulty: "Easy" },
  { id: 119, name: "Splunk Basics - Did you SIEM?", difficulty: "Medium" },
  { id: 120, name: "Phishing - Merry Clickmas", difficulty: "Easy" },
  { id: 121, name: "Linux CLI - Shells Bells", difficulty: "Easy" },
  { id: 122, name: "Advent of Cyber Prep Track", difficulty: "Easy" },
  { id: 123, name: "Regular Expressions", difficulty: "Medium" },
  { id: 124, name: "Tempest", difficulty: "Medium" },
  { id: 125, name: "Splunk: Exploring SPL", difficulty: "Medium" },
  { id: 126, name: "Secret Recipe", difficulty: "Medium" },
  { id: 127, name: "Boogeyman 1", difficulty: "Medium" },
  { id: 128, name: "Splunk: Setting up a SOC Lab", difficulty: "Medium" },
  { id: 129, name: "Intro to Logs", difficulty: "Easy" },
  { id: 130, name: "Elastic: Using Logstash", difficulty: "Medium" },
  { id: 131, name: "Splunk: Dashboards and Reports", difficulty: "Easy" },
  { id: 132, name: "Splunk: Data Manipulation", difficulty: "Medium" },
  { id: 133, name: "Boogeyman 2", difficulty: "Medium" },
  { id: 134, name: "Boogeyman 3", difficulty: "Medium" },
  { id: 135, name: "Intro to Log Analysis", difficulty: "Easy" },
  { id: 136, name: "Log Operations", difficulty: "Easy" },
  { id: 137, name: "Fixit", difficulty: "Medium" },
  { id: 138, name: "Critical", difficulty: "Easy" },
  { id: 139, name: "Volatility", difficulty: "Medium" },
  { id: 140, name: "Autopsy", difficulty: "Easy" },
  { id: 141, name: "Phishing Analysis Tools", difficulty: "Easy" },
  { id: 142, name: "Phishing Emails in Action", difficulty: "Easy" },
  { id: 143, name: "Redline", difficulty: "Medium" },
  { id: 144, name: "Phishing Prevention", difficulty: "Easy" },
  { id: 145, name: "The Greenholt Phish", difficulty: "Easy" },
  { id: 146, name: "KAPE", difficulty: "Medium" },
  { id: 147, name: "Windows Forensics 2", difficulty: "Medium" },
  { id: 148, name: "Intro to Malware Analysis", difficulty: "Medium" },
  { id: 149, name: "Linux Forensics", difficulty: "Medium" },
  { id: 150, name: "Velociraptor", difficulty: "Medium" },
  { id: 151, name: "Unattended", difficulty: "Medium" },
  { id: 152, name: "Disgruntled", difficulty: "Easy" },
  { id: 153, name: "Snapped Phish-ing Line", difficulty: "Easy" },
  { id: 154, name: "Cipher's Secret Message", difficulty: "Easy" },
  { id: 155, name: "Phishing Analysis Fundamentals", difficulty: "Easy" },
  { id: 156, name: "Wazuh", difficulty: "Medium" },
  { id: 157, name: "Windows Forensics 1", difficulty: "Medium" },
  { id: 158, name: "Incident Handling With Splunk", difficulty: "Medium" },
  { id: 159, name: "ItsyBitsy", difficulty: "Medium" },
  { id: 160, name: "Benign", difficulty: "Medium" },
  { id: 161, name: "DFIR: An Introduction", difficulty: "Easy" },
  { id: 162, name: "Investigating with Splunk", difficulty: "Medium" },
  { id: 163, name: "Splunk: The Basics", difficulty: "Easy" },
  { id: 164, name: "Retracted", difficulty: "Easy" },
  { id: 165, name: "Monday Monitor", difficulty: "Easy" },
  { id: 166, name: "TShark: CLI Wireshark Features", difficulty: "Medium" },
  { id: 167, name: "TShark Challenge I: Teamwork", difficulty: "Easy" },
  { id: 168, name: "TShark Challenge II: Directory", difficulty: "Easy" },
  { id: 169, name: "TShark: The Basics", difficulty: "Easy" },
  { id: 170, name: "Cryptosystem", difficulty: "Easy" },
  { id: 171, name: "Windows Event Logs", difficulty: "Medium" },
  { id: 172, name: "Sysmon", difficulty: "Easy" },
  { id: 173, name: "Core Windows Processes", difficulty: "Easy" },
  { id: 174, name: "Sysinternals", difficulty: "Easy" },
  { id: 175, name: "Confidential", difficulty: "Easy" },
  { id: 176, name: "Committed", difficulty: "Easy" },
  { id: 177, name: "Brim", difficulty: "Medium" },
  { id: 178, name: "Zeek Exercises", difficulty: "Medium" },
  { id: 179, name: "Wireshark: The Basics", difficulty: "Easy" },
  { id: 180, name: "Wireshark: Packet Operations", difficulty: "Easy" },
  { id: 181, name: "Introduction to SIEM", difficulty: "Easy" },
  { id: 182, name: "Wireshark: Traffic Analysis", difficulty: "Medium" },
  { id: 183, name: "Intro to Endpoint Security", difficulty: "Easy" },
  { id: 184, name: "Osquery: The Basics", difficulty: "Easy" },
  { id: 185, name: "The Game", difficulty: "Easy" },
  { id: 186, name: "Sneaky Patch", difficulty: "Easy" },
  { id: 187, name: "Yara", difficulty: "Easy" },
  { id: 188, name: "TheHive Project", difficulty: "Medium" },
  { id: 189, name: "Snort", difficulty: "Medium" },
  { id: 190, name: "Snort Challenge - Live Attacks", difficulty: "Medium" },
  { id: 191, name: "OpenCTI", difficulty: "Medium" },
  { id: 192, name: "NetworkMiner", difficulty: "Easy" },
  { id: 193, name: "Snort Challenge - The Basics", difficulty: "Medium" },
  { id: 194, name: "MISP", difficulty: "Medium" },
  { id: 195, name: "Mr. Phisher", difficulty: "Easy" },
  { id: 196, name: "Zeek", difficulty: "Medium" },
  { id: 197, name: "Traffic Analysis Essentials", difficulty: "Easy" },
  { id: 198, name: "Trooper", difficulty: "Easy" },
  { id: 199, name: "Eviction", difficulty: "Easy" },
  { id: 200, name: "Summit", difficulty: "Easy" },
  { id: 201, name: "Friday Overtime", difficulty: "Medium" },
  { id: 202, name: "Brains", difficulty: "Easy" },
  { id: 203, name: "Crack the hash", difficulty: "Easy" },
  { id: 204, name: "Blue", difficulty: "Easy" },
  { id: 205, name: "Linux Strength Training", difficulty: "Easy" },
  { id: 206, name: "Linux Fundamentals Part 1", difficulty: "Info" },
  { id: 207, name: "What is Networking?", difficulty: "Info" },
  { id: 208, name: "Junior Security Analyst Intro", difficulty: "Easy" },
  { id: 209, name: "Pyramid Of Pain", difficulty: "Easy" },
  { id: 210, name: "Cyber Kill Chain", difficulty: "Easy" },
  { id: 211, name: "Diamond Model", difficulty: "Easy" },
  { id: 212, name: "Threat Intelligence Tools", difficulty: "Easy" },
  { id: 213, name: "Offensive Security Intro", difficulty: "Easy" },
  { id: 214, name: "Unified Kill Chain", difficulty: "Easy" },
  { id: 215, name: "Defensive Security Intro", difficulty: "Easy" },
  { id: 216, name: "Intro to Cyber Threat Intel", difficulty: "Easy" },
  { id: 217, name: "Billing", difficulty: "Easy" },
  { id: 218, name: "SOC Fundamentals", difficulty: "Easy" }
];

const cyberdefendersLabs = [
  { id: 1, name: "ClickFix - VodkaStealer", status: "", date: "6/17/2026", difficulty: "Medium" },
  { id: 2, name: "Operation Cronos - Lockbit", status: "", date: "6/16/2026", difficulty: "Easy" },
  { id: 3, name: "Qradar101", status: "", date: "5/28/2026", difficulty: "Medium" },
  { id: 4, name: "KrakenKeylogger", status: "", date: "5/19/2026", difficulty: "Medium" },
  { id: 5, name: "XWorm", status: "", date: "12/2/2025", difficulty: "Medium" },
  { id: 6, name: "Lockdown", status: "", date: "10/5/2025", difficulty: "Easy" },
  { id: 7, name: "FakeGPT", status: "", date: "8/29/2025", difficulty: "Easy" },
  { id: 8, name: "PhishStrike", status: "", date: "8/18/2025", difficulty: "Medium" },
  { id: 9, name: "OpenWire", status: "", date: "7/22/2025", difficulty: "Medium" },
  { id: 10, name: "WireDive", status: "", date: "7/4/2025", difficulty: "Medium" },
  { id: 11, name: "Reveal", status: "", date: "6/28/2025", difficulty: "Easy" },
  { id: 12, name: "Web Investigation", status: "", date: "6/26/2025", difficulty: "Easy" },
  { id: 13, name: "RedLine", status: "", date: "6/24/2025", difficulty: "Easy" },
  { id: 14, name: "IcedID", status: "", date: "6/21/2025", difficulty: "Easy" },
  { id: 15, name: "Tomcat Takeover", status: "", date: "6/20/2025", difficulty: "Easy" },
  { id: 16, name: "Ramnit", status: "", date: "6/19/2025", difficulty: "Easy" },
  { id: 17, name: "XLMRat", status: "", date: "6/19/2025", difficulty: "Easy" },
  { id: 18, name: "Silent Breach", status: "", date: "6/12/2025", difficulty: "Medium" },
  { id: 19, name: "GrabThePhisher", status: "", date: "6/11/2025", difficulty: "Easy" },
  { id: 20, name: "Insider", status: "", date: "6/10/2025", difficulty: "Easy" },
  { id: 21, name: "DanaBot", status: "", date: "6/9/2025", difficulty: "Easy" },
  { id: 22, name: "3CX Supply Chain", status: "", date: "6/8/2025", difficulty: "Easy" },
  { id: 23, name: "Red Stealer", status: "", date: "6/8/2025", difficulty: "Easy" },
  { id: 24, name: "Tusk Infostealer", status: "", date: "6/8/2025", difficulty: "Easy" },
  { id: 25, name: "PsExec Hunt", status: "", date: "6/7/2025", difficulty: "Easy" },
  { id: 26, name: "The Crime", status: "", date: "6/6/2025", difficulty: "Easy" },
  { id: 27, name: "Lespion", status: "", date: "6/6/2025", difficulty: "Easy" },
  { id: 28, name: "Amadey - APT-C-36", status: "", date: "6/5/2025", difficulty: "Medium" },
  { id: 29, name: "Yellow RAT", status: "", date: "6/4/2025", difficulty: "Easy" },
  { id: 30, name: "PoisonedCredentials", status: "", date: "6/4/2025", difficulty: "Easy" },
  { id: 31, name: "Oski", status: "", date: "6/4/2025", difficulty: "Easy" },
  { id: 32, name: "WebStrike", status: "", date: "6/4/2025", difficulty: "Easy" }
];


const cyberhazeLabs = [
  { id: 1, name: "E-Evil PDF", difficulty: "Easy" },
  { id: 2, name: "Telegram Malicious Extension", difficulty: "Hard" },
  { id: 3, name: "Phishing Investigation: Wallet Verification Scam", difficulty: "Medium" },
  { id: 4, name: "Shadow Rat", difficulty: "Medium" },
  { id: 5, name: "OSINT - MITRE (3)", difficulty: "Medium" },
  { id: 6, name: "OSINT - MITRE (2)", difficulty: "Easy" },
  { id: 7, name: "OSINT - MITRE (1)", difficulty: "Easy" },
  { id: 8, name: "You have got mail", difficulty: "Medium" }
];
// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", duration = 2000, className = "" }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
};

// Platform Labs Display with Pagination and Filter
const PlatformLabsDisplay = ({ labs, darkMode, platformIcons, activePlatform }) => {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('All');
  const labsPerPage = 6;
  
  const filteredLabs = filter === 'All' ? labs : labs.filter(lab => lab.difficulty === filter);
  const totalPages = Math.ceil(filteredLabs.length / labsPerPage);
  
  const visibleLabs = filteredLabs.slice(page * labsPerPage, page * labsPerPage + labsPerPage);

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  // Reset page when filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(0);
  };

  // Get unique difficulties for filter buttons
  const difficulties = ['All', ...new Set(labs.map(lab => lab.difficulty).filter(Boolean))];

  return (
    <div className="relative">
      {/* Filter Buttons */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {difficulties.map((diff) => (
          <motion.button
            key={diff}
            onClick={() => handleFilterChange(diff)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              filter === diff
                ? darkMode
                  ? 'bg-purple-600 text-white border-purple-500'
                  : 'bg-purple-600 text-white border-purple-500'
                : darkMode
                  ? 'bg-[#0E1A14] text-emerald-100/50 border-emerald-900/30 hover:border-purple-500/50'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-purple-500/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {diff}
          </motion.button>
        ))}
      </div>

      {/* Navigation Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mb-6 px-2">
          <motion.button
            onClick={prevPage}
            disabled={page === 0}
            className={`p-2 rounded-full border transition-all ${
              page === 0 
                ? 'opacity-30 cursor-not-allowed' 
                : darkMode 
                  ? 'bg-[#0E1A14] border-purple-700 text-purple-400 hover:bg-purple-900/50' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
            whileHover={page !== 0 ? { scale: 1.1 } : {}}
            whileTap={page !== 0 ? { scale: 0.9 } : {}}
          >
            <ChevronLeft size={20} />
          </motion.button>

          <span className={`text-sm font-semibold ${darkMode ? 'text-emerald-100/60' : 'text-gray-500'}`}>
            {filteredLabs.length > 0 ? `${page * labsPerPage + 1}-${Math.min((page + 1) * labsPerPage, filteredLabs.length)} of ${filteredLabs.length}` : '0 labs'}
          </span>

          <motion.button
            onClick={nextPage}
            disabled={page === totalPages - 1}
            className={`p-2 rounded-full border transition-all ${
              page === totalPages - 1 
                ? 'opacity-30 cursor-not-allowed' 
                : darkMode 
                  ? 'bg-[#0E1A14] border-purple-700 text-purple-400 hover:bg-purple-900/50' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
            whileHover={page !== totalPages - 1 ? { scale: 1.1 } : {}}
            whileTap={page !== totalPages - 1 ? { scale: 0.9 } : {}}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      )}

      {/* Labs Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${filter}-${page}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {visibleLabs.map((lab, index) => (
            <motion.div 
              key={lab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className={`rounded-xl p-4 transition-all group border ${
                darkMode ? 'bg-[#0E1A14] border-emerald-900/30 hover:border-purple-500/30' : 'bg-white border-gray-200 hover:border-purple-500/30 hover:shadow-lg'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className={`text-sm font-bold line-clamp-2 flex-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{lab.name}</h3>
                {lab.difficulty && (
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${
                    lab.difficulty === 'Easy' 
                      ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50'
                      : lab.difficulty === 'Medium'
                      ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/50'
                      : lab.difficulty === 'Hard'
                      ? 'bg-red-900/30 text-red-400 border border-red-800/50'
                      : 'bg-blue-900/30 text-blue-400 border border-blue-800/50'
                  }`}>
                    {lab.difficulty}
                  </span>
                )}
              </div>
              {lab.date && <p className={`text-xs ${darkMode ? 'text-emerald-100/40' : 'text-gray-500'}`}>{lab.date}</p>}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Page Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === page 
                  ? 'bg-purple-400 w-4' 
                  : darkMode ? 'bg-purple-900' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activePlatform, setActivePlatform] = useState('THM');
  const [activeJourneyTab, setActiveJourneyTab] = useState('internships');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [writeupIndex, setWriteupIndex] = useState(0);

  



 const platformData = {
  THM: thmLabs,
  CyberDefenders: cyberdefendersLabs,
  CyberHaze: cyberhazeLabs
};

  const platformIcons = {
    THM: <Activity size={20} />,
    CyberDefenders: <Crosshair size={20} />,
    CyberHaze: <Shield size={20} />
  };

  const platformColors = {
  THM: "from-red-500 to-orange-500",
  CyberDefenders: "from-purple-500 to-pink-500",
  CyberHaze: "from-amber-500 to-yellow-500"
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

  const maxProjectIndex = Math.ceil(projectsData.length / 3) - 1;
  const maxWriteupIndex = Math.ceil(labsData.length / 3) - 1;

  const nextProject = () => setProjectIndex((prev) => (prev + 1) % (maxProjectIndex + 1));
  const prevProject = () => setProjectIndex((prev) => (prev - 1 + maxProjectIndex + 1) % (maxProjectIndex + 1));
  const nextWriteup = () => setWriteupIndex((prev) => (prev + 1) % (maxWriteupIndex + 1));
  const prevWriteup = () => setWriteupIndex((prev) => (prev - 1 + maxWriteupIndex + 1) % (maxWriteupIndex + 1));

  const visibleProjects = projectsData.slice(projectIndex * 3, projectIndex * 3 + 3);
  const visibleWriteups = labsData.slice(writeupIndex * 3, writeupIndex * 3 + 3);

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

      {/* Background Curvy Lines */}
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

      {/* Navbar */}
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
        <div className="w-full flex justify-between items-center">
          {/* Far Left - Navigation Links */}
          <div className={`flex gap-8 text-sm font-semibold ${darkMode ? 'text-emerald-100/60' : 'text-gray-600'}`}>
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
          
          {/* Far Right - Dark mode toggle and Social Icons */}
          <div className="flex items-center gap-4 ml-auto">
            <motion.button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors ${darkMode ? 'text-emerald-100/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            
            <motion.a href="https://github.com/OmarHassan-99" target="_blank" rel="noreferrer" className={`transition-colors ${darkMode ? 'text-emerald-100/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} title="GitHub" whileHover={{ scale: 1.2, y: -2 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>
            
            <motion.a href="http://www.linkedin.com/in/omar-hassan9999" target="_blank" rel="noreferrer" className={`transition-colors ${darkMode ? 'text-emerald-100/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} title="LinkedIn" whileHover={{ scale: 1.2, y: -2 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
            
            <motion.a href="https://medium.com/%40omar.m.h.shehatta" target="_blank" rel="noreferrer" className={`transition-colors ${darkMode ? 'text-emerald-100/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} title="Medium Blog" whileHover={{ scale: 1.2, y: -2 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
            </motion.a>
            
            <motion.a href="https://tryhackme.com/p/OmarHassan007" target="_blank" rel="noreferrer" className={`transition-colors ${darkMode ? 'text-emerald-100/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} title="TryHackMe" whileHover={{ scale: 1.2, y: -2 }}>
              <Activity size={18} />
            </motion.a>
            
            <motion.a href="https://cyberdefenders.org/p/OmarHassan/" target="_blank" rel="noreferrer" className={`transition-colors ${darkMode ? 'text-emerald-100/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} title="CyberDefenders" whileHover={{ scale: 1.2, y: -2 }}>
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
              <img src="./images/profile.jpeg" alt="Omar Hassan" className="w-full h-full object-cover" />
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

          <motion.div 
            className="flex flex-col items-center md:items-start text-center md:text-left flex-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm font-mono mb-4 transition-colors ${
                darkMode ? 'bg-[#0E1A14] border-emerald-900/30 text-emerald-200' : 'bg-gray-100 border-gray-300 text-gray-700'
              }`}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16,185,129,0.2)" }}
            >
              <TerminalIcon size={14} className="text-emerald-400" />
              <span className="text-emerald-500">$</span> whoami
              <span className={`ml-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}></span>
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
              <span>SOC Analyst & Security Engineer</span>
            </motion.div>
            
            <motion.p 
              className={`text-sm mb-4 font-mono ${darkMode ? 'text-emerald-400/80' : 'text-emerald-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Computer Science Graduate 2026 | Ain Shams University | BSc. in Information Systems
            </motion.p>

            <motion.p 
              className={`text-sm md:text-base leading-relaxed mb-6 ${darkMode ? 'text-emerald-100/70' : 'text-gray-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Passionate SOC Analyst focused on Detection Engineering, Threat Hunting, Digital Forensics, and Security Automation. Building cybersecurity projects, SIEM solutions, and n8n-powered workflows while continuously learning and sharing knowledge through technical research and hands-on labs.
            </motion.p>

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
              <motion.a 
                href="./Omar_Hassan_CV.pdf" 
                download 
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all font-mono"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TerminalIcon size={18} /> find . -name "Omar_Hassan_CV.pdf"
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
{/* STATISTICS SECTION */}
<motion.section 
  className="mb-32"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
      <AnimatedCounter end={8} suffix="+" duration={2000} className="text-4xl font-black text-emerald-400 mb-1" />
      <p className="font-semibold text-sm uppercase tracking-wider text-emerald-300">Security Projects</p>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg transition-all border ${
        darkMode ? 'bg-[#0E1A14] border-teal-800/50 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-500 hover:shadow-xl'
      }`}
    >
      <div className="p-3 bg-teal-500/10 rounded-full mb-3">
        <BookOpen size={24} className="text-teal-400" />
      </div>
      <AnimatedCounter end={10} suffix="+" duration={2000} className="text-4xl font-black text-teal-400 mb-1" />
      <p className="font-semibold text-sm uppercase tracking-wider text-teal-300">Write-ups</p>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg transition-all border ${
        darkMode ? 'bg-[#0E1A14] border-teal-800/50 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-500 hover:shadow-xl'
      }`}
    >
      <div className="p-3 bg-teal-500/10 rounded-full mb-3">
        <Crosshair size={24} className="text-teal-400" />
      </div>
      <AnimatedCounter end={250} suffix="+" duration={2000} className="text-4xl font-black text-teal-400 mb-1" />
      <p className="font-semibold text-sm uppercase tracking-wider text-teal-300">Labs</p>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
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
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg transition-all border ${
        darkMode ? 'bg-[#0E1A14] border-purple-800/50 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-500 hover:shadow-xl'
      }`}
    >
      <div className="p-3 bg-purple-500/10 rounded-full mb-3">
        <Target size={24} className="text-purple-400" />
      </div>
      <h3 className="text-4xl font-black text-purple-400 mb-1">#30 🇪🇬</h3>
      <p className="font-semibold text-sm uppercase tracking-wider text-purple-300">CyberDefenders</p>
    </motion.div>
  </div>
</motion.section>

        {/* PROJECTS SECTION - Carousel with buttons */}
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

          <div className="relative">
            {/* Left Button */}
            <motion.button
              onClick={prevProject}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border shadow-lg transition-all ${
                darkMode ? 'bg-[#0E1A14] border-emerald-700 text-emerald-400 hover:bg-emerald-900/50' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Right Button */}
            <motion.button
              onClick={nextProject}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border shadow-lg transition-all ${
                darkMode ? 'bg-[#0E1A14] border-emerald-700 text-emerald-400 hover:bg-emerald-900/50' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>

            {/* Projects Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={projectIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12"
              >
                {visibleProjects.map((project) => (
                  <motion.div 
                    key={project.id}
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
              </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: maxProjectIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setProjectIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === projectIndex ? 'bg-emerald-400 w-4' : 'bg-emerald-800'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED WRITEUPS SECTION - No carousel, no images */}
{/* FEATURED WRITEUPS SECTION - Carousel with buttons */}
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

  <div className="relative">
    {/* Left Button */}
    <motion.button
      onClick={prevWriteup}
      className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border shadow-lg transition-all ${
        darkMode ? 'bg-[#0E1A14] border-teal-700 text-teal-400 hover:bg-teal-900/50' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ChevronLeft size={24} />
    </motion.button>

    {/* Right Button */}
    <motion.button
      onClick={nextWriteup}
      className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full border shadow-lg transition-all ${
        darkMode ? 'bg-[#0E1A14] border-teal-700 text-teal-400 hover:bg-teal-900/50' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ChevronRight size={24} />
    </motion.button>

    {/* Writeups Grid */}
    <AnimatePresence mode="wait">
      <motion.div
        key={writeupIndex}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12"
      >
        {visibleWriteups.map((lab) => (
          <motion.div 
            key={lab.id} 
            whileHover={{ y: -5 }}
            className={`rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group border ${
              darkMode ? 'bg-[#0E1A14] border-emerald-900/30 hover:border-teal-500/50' : 'bg-white border-gray-200 hover:border-teal-500/50 hover:shadow-xl'
            }`}
          >
            <div className="p-6 flex flex-col flex-grow">
              <div className="mb-3">
                <span className="text-[10px] font-bold tracking-wider text-teal-400 uppercase">{lab.date}</span>
              </div>
              <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{lab.title}</h3>
              <p className={`text-sm mb-4 flex-grow leading-relaxed ${darkMode ? 'text-emerald-100/60' : 'text-gray-600'}`}>{lab.desc}</p>
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
              <motion.a 
  href={lab.link}
  target="_blank"
  rel="noreferrer"
  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  <BookOpen size={14} /> Read Write-up
</motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>

    {/* Dots Indicator */}
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: maxWriteupIndex + 1 }, (_, i) => (
        <button
          key={i}
          onClick={() => setWriteupIndex(i)}
          className={`w-2 h-2 rounded-full transition-all ${
            i === writeupIndex ? 'bg-teal-400 w-4' : 'bg-teal-800'
          }`}
        />
      ))}
    </div>
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
          onClick={() => { setActivePlatform(platform);  }}
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

  {/* Labs Display with Pagination */}
  <PlatformLabsDisplay 
    labs={platformData[activePlatform]} 
    darkMode={darkMode} 
    platformIcons={platformIcons}
    activePlatform={activePlatform}
  />
</section>

        {/* JOURNEY SECTION with Photo Circles */}
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
                        {/* Photo Circle and Header */}
                        <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                          {/* Circular Photo */}
                          <motion.div 
                            className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500/50 shadow-lg shrink-0"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <img 
                              src={job.logo} 
                              alt={job.company}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent"></div>
                          </motion.div>
                          
                          {/* Title and Company */}
                          <div className={`flex flex-col ${index % 2 === 0 ? 'md:text-right md:items-end' : 'md:text-left md:items-start'} items-start text-left`}>
                            <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase mb-1">{job.date}</span>
                            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{job.role}</h3>
                            <p className="text-emerald-300/80 text-sm font-semibold">{job.company}</p>
                          </div>
                        </div>
                        
                        <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-emerald-100/60' : 'text-gray-600'}`}>{job.desc}</p>
                        <div className="flex flex-wrap gap-2 justify-start">
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
          <p>© 2026 Omar Mohamed Hassan</p>
          
        </motion.footer>

      </main>
    </div>
  );
}