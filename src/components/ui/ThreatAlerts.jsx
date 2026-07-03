import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Info, AlertTriangle } from 'lucide-react';

const ALERTS = [
  { type: 'warning', message: 'Unauthorized connection blocked from 192.168.1.45', source: 'Firewall' },
  { type: 'info', message: 'Threat Intelligence definitions updated', source: 'Wazuh' },
  { type: 'critical', message: 'Malware signature detected in temporary files', source: 'Defender' },
  { type: 'info', message: 'System baseline scan completed successfully', source: 'Audit' },
  { type: 'warning', message: 'Multiple failed login attempts detected', source: 'Active Directory' },
  { type: 'info', message: 'New vulnerability report ingested from NVD', source: 'Threat Intel' },
  { type: 'critical', message: 'Suspicious outbound traffic on port 4444', source: 'IDS/IPS' },
];

export default function ThreatAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Add a random alert every 15 to 45 seconds
    const spawnAlert = () => {
      const randomAlert = {
        ...ALERTS[Math.floor(Math.random() * ALERTS.length)],
        id: Date.now(),
      };
      
      setAlerts((prev) => [...prev, randomAlert]);

      // Remove after 6 seconds
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== randomAlert.id));
      }, 6000);

      const nextSpawnTime = Math.random() * 30000 + 15000;
      setTimeout(spawnAlert, nextSpawnTime);
    };

    const initialTimeout = setTimeout(spawnAlert, 5000);

    return () => clearTimeout(initialTimeout);
  }, []);

  const getIcon = (type) => {
    switch(type) {
      case 'critical': return <ShieldAlert size={16} className="text-accent-red" />;
      case 'warning': return <AlertTriangle size={16} className="text-accent-amber" />;
      default: return <Info size={16} className="text-accent-blue" />;
    }
  };

  const getColor = (type) => {
    switch(type) {
      case 'critical': return 'border-accent-red/50 shadow-accent-red/10';
      case 'warning': return 'border-accent-amber/50 shadow-accent-amber/10';
      default: return 'border-accent-blue/50 shadow-accent-blue/10';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none w-72">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`glass-card rounded-xl p-3 border-l-4 ${getColor(alert.type)} shadow-lg bg-soc-bg/95 backdrop-blur-xl`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getIcon(alert.type)}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-soc-secondary">
                    {alert.source}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-500" />
                  <span className="text-[9px] font-mono text-soc-muted">
                    {new Date().toLocaleTimeString([], { hour12: false })}
                  </span>
                </div>
                <p className="text-xs text-soc-primary leading-snug">
                  {alert.message}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
