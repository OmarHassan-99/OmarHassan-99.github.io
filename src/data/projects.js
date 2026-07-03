// Projects Data with images
const projectsData = [
  {
    id: 1,
    title: "WebPatcher: Patch Recommendation System for WebApp Vulnerabilities",
    category: "Security",
    desc: "An autonomous patch recommendation workflow using Langchain and LLMs to identify and remediate web application vulnerabilities through Zaproxy.",
    tags: ["LangChain", "Web-Security", "AI"],
    link: "https://github.com/OmarHassan-99/Graduation-Project",
    image: "./images/webpatcher.webp"
  },
  {
    id: 2,
    title: "Deploying Cowrie Honeypot with Prometheus Monitoring and Slack Alerting",
    category: "Infrastructure",
    desc: "Deployed Cowrie honeypot with Prometheus monitoring and real-time Slack alerting for attack tracking and threat intelligence gathering.",
    tags: ["Honeypot", "Prometheus", "Slack", "Threat Intel"],
    link: "https://github.com/OmarHassan-99/Deploying-Cowrie-Honeypot-with-Prometheus-Monitoring-and-Slack-Alerting",
    image: "./images/cowrie.webp"
  },
  {
    id: 3,
    title: "Detection-to-Response SOC Pipeline Using Wazuh, n8n, and TheHive",
    category: "Security",
    desc: "Complete SOC environment utilizing Wazuh for detection, automated incident response via n8n workflows, and case management integrated with TheHive.",
    tags: ["Wazuh", "n8n", "TheHive", "SIEM", "SOAR"],
    link: "https://github.com/OmarHassan-99/Design-and-Implementation-of-a-SOC-Platform-with-SIEM-SOAR-and-Case-Management-Integration",
    image: "./images/wazuh.webp"
  },
  {
    id: 4,
    title: "Automated Detection Coverage Lookup To MITRE ATT&CK",
    category: "Engineering",
    desc: "A tool that pulls active SIEM rules via API, uses AI to map missing MITRE ATT&CK techniques, and maintains a live coverage inventory in Google Sheets.",
    tags: ["API", "MITRE ATT&CK", "AI", "SIEM"],
    link: "https://github.com/OmarHassan-99/Automated-Detection-Coverage-Lookup-To-MITRE-ATT-CK-",
    image: "./images/coverage.webp"
  },
  {
    id: 5,
    title: "Autonomous Vulnerability Discovery & Remediation using Nessus, AI Agents, and MCP",
    category: "Automation",
    desc: "End-to-end workflow using Nessus for scanning, AI Agents for risk reprioritization, and MCP for executing Linux remediation commands via SSH with human-in-the-loop approval.",
    tags: ["Nessus", "AI Agents", "MCP", "n8n"],
    link: "https://github.com/OmarHassan-99/Autonomous-Vulnerability-Discovery-Remediation-using-Nessus-AI-Agents-and-MCP",
    image: "./images/mcp.webp"
  },
  {
    id: 6,
    title: "Elastic's Ingestion Pipeline using API & Threat Detection Rules",
    category: "Engineering",
    desc: "Engineered data ingestion pipelines using Elastic API and developed custom threat detection rules for enhanced security monitoring.",
    tags: ["ELK", "Detection Rules"],
    link: "https://github.com/OmarHassan-99/WE-Innovate-X-Zerosploit-SOC-Tasks/tree/main/SOC%20engineering%20%26%20Detection%20engineering/Elastic%20API%20%2B%20more%20on%20Detection%20Rules",
    image: "./images/api.webp"
  },
  {
    id: 7,
    title: "ELK Stack Setup",
    category: "Infrastructure",
    desc: "Complete ELK Stack deployment and configuration for log management, including data ingestion pipelines and custom dashboards for security monitoring.",
    tags: ["ELK Stack", "Logstash", "Kibana", "Monitoring"],
    link: "https://github.com/OmarHassan-99/WE-Innovate-X-Zerosploit-SOC-Tasks/tree/main/SOC%20engineering%20%26%20Detection%20engineering/ELK%20Setup%20%2B%20Detection%20Rules",
    image: "./images/stack.webp"
  },
  {
    id: 8,
    title: "Cryptographic Algorithms using C#",
    category: "Development",
    desc: "Implementation of various cryptographic algorithms in C#, demonstrating understanding of encryption, hashing, and security protocols.",
    tags: ["C#", "Cryptography", "Encryption", "Security"],
    link: "https://github.com/OmarHassan-99/Cryptographic-Algorithms",
    image: "./images/crypto.webp"
  },
  {
    id: 9,
    title: "Key and Mouse Logger (KeyMouseTracker)",
    category: "Development",
    desc: "KeyMouseTracker is a Python-based keylogger and mouse activity tracker that records keystrokes and mouse interactions with timestamps. The program runs in the background using threading, efficiently logging both keyboard and mouse events concurrently. It writes logs to separate text files for easy analysis.",
    tags: ["python", "spyware", "Security"],
    link: "https://github.com/OmarHassan-99/KeyBoard-and-Mouse-Logger",
    image: "./images/logger.webp"
  }
];

export default projectsData;
