import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const commands = [
  {
    prompt: 'whoami',
    output: 'Omar Mohamed Hassan',
    type: 'text',
  },
  {
    prompt: 'cat core_arsenal.json',
    output: null,
    type: 'json',
    json: {
      roles: ['SOC Analyst', 'SOC Engineer', "Security Automation Engineer"],
      siem: ['Splunk', 'Q-Radar', 'ELK'],
      automation: ['n8n', 'LangChain'],
      programming_Languages: ['Python', 'C++', 'JavaScript', 'Java'],

    },
  },
  {
    prompt: './check_availability.sh',
    output: '[+] Status: Exempted from military service. Ready for work.',
    type: 'status',
  },
  {
    prompt: 'ls -la /recent_achievements/',
    type: 'ls',
    files: [
      'WebPatcher:_Intelligent_Workflow_For_Detecting_And_Patching_Web_Vulnerabilities_(Graduation_Project)',
      'Advanced_Endpoint_Investigation_THM',
      'ZeroSploit_SOC_Engineer_Internship',
    ],
  },
];

function TypingText({ text, delay = 0, onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, 25);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [displayed, started, text, onComplete]);

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-2 h-4 bg-accent-green/80 ml-0.5 animate-pulse" />
      )}
    </span>
  );
}

export default function Terminal() {
  const [visibleCommands, setVisibleCommands] = useState(0);

  const showNext = () => {
    setVisibleCommands((prev) => Math.min(prev + 1, commands.length));
  };

  // Start showing commands with a delay
  useEffect(() => {
    const timer = setTimeout(() => setVisibleCommands(1), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full rounded-xl overflow-hidden bg-soc-bg/80 border border-soc-border/40 shadow-2xl shadow-black/30 font-mono text-sm"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-soc-surface/80 border-b border-soc-border/40">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-red/80" />
          <div className="w-3 h-3 rounded-full bg-accent-amber/80" />
          <div className="w-3 h-3 rounded-full bg-accent-green/80" />
        </div>
        <div className="text-soc-muted text-xs font-sans tracking-wide">
          omar@soc-station:~/portfolio
        </div>
        <div className="w-14" />
      </div>

      {/* Terminal Body */}
      <div className="p-5 text-slate-300 space-y-5 overflow-x-auto">
        {commands.slice(0, visibleCommands).map((cmd, idx) => (
          <div key={idx}>
            {/* Command prompt */}
            <div className="flex items-center gap-2 text-accent-green font-bold mb-1.5">
              <span>➜</span>
              <span className="text-accent-blue">~</span>
              <span className="text-soc-inverse font-normal">
                <TypingText
                  text={cmd.prompt}
                  delay={idx === 0 ? 0 : 200}
                  onComplete={idx === visibleCommands - 1 ? showNext : undefined}
                />
              </span>
            </div>

            {/* Output */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pl-4 border-l-2 border-soc-border/30 ml-1"
            >
              {cmd.type === 'text' && (
                <p className="text-slate-300/90">{cmd.output}</p>
              )}

              {cmd.type === 'json' && (
                <div className="text-soc-secondary whitespace-pre leading-relaxed">
                  {'{\n'}
                  {Object.entries(cmd.json).map(([key, val], i, arr) => (
                    <span key={key}>
                      {'  '}<span className="text-accent-green">&quot;{key}&quot;</span>: [{val.map((v, vi) => (
                        <span key={vi}><span className="text-accent-cyan">&quot;{v}&quot;</span>{vi < val.length - 1 ? ', ' : ''}</span>
                      ))}]{i < arr.length - 1 ? ',' : ''}{'\n'}
                    </span>
                  ))}
                  {'}'}
                </div>
              )}

              {cmd.type === 'status' && (
                <div className="flex items-center gap-2 text-slate-300/90">
                  <span className="text-accent-green font-bold">[+]</span>
                  <span>Status: Exempted from military service. Ready for deployment.</span>
                </div>
              )}

              {cmd.type === 'ls' && (
                <div className="text-soc-muted leading-relaxed whitespace-pre text-[13px]">
                  {cmd.files.map((f, i) => (
                    <div key={i}>
                      drwxr-xr-x  omar  admin  <span className="text-accent-green">{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        ))}

        {/* Active cursor */}
        <div className="flex items-center gap-2 text-accent-green font-bold pt-1">
          <span>➜</span>
          <span className="text-accent-blue">~</span>
          <span className="w-2.5 h-4 bg-accent-green animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}