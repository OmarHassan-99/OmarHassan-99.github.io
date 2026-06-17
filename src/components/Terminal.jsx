import React from 'react';
import { motion } from 'framer-motion';

export default function Terminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full rounded-xl overflow-hidden bg-[#0A120E] border border-emerald-900/40 shadow-2xl font-mono text-sm flex flex-col"
    >
      {/* Terminal Header (Mac Style) */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#050B08] border-b border-emerald-900/40">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer"></div>
        </div>
        <div className="text-emerald-100/40 text-xs font-sans tracking-wide">
          omar@soc-station:~/portfolio
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-5 text-emerald-100/70 space-y-5 overflow-x-auto">
        
        {/* Command 1: whoami */}
        <div>
          <div className="flex items-center gap-2 text-emerald-500 font-bold mb-1">
            <span>➜</span>
            <span className="text-teal-600">~</span>
            <span className="text-white font-normal">whoami</span>
          </div>
          <div className="pl-4 text-emerald-100/90 border-l-2 border-emerald-900/30 ml-1">
            Omar Mohamed Hassan | Information Systems Senior | Top 1% TryHackMe
          </div>
        </div>

        {/* Command 2: cat json */}
        <div>
          <div className="flex items-center gap-2 text-emerald-500 font-bold mb-1">
            <span>➜</span>
            <span className="text-teal-600">~</span>
            <span className="text-white font-normal">cat core_arsenal.json</span>
          </div>
          <div className="pl-4 text-teal-300/80 border-l-2 border-emerald-900/30 ml-1 whitespace-pre">
            {'{'}<br/>
            &nbsp;&nbsp;<span className="text-emerald-400">"roles"</span>: ["SOC Analyst", "Detection Engineer"],<br/>
            &nbsp;&nbsp;<span className="text-emerald-400">"siem"</span>: ["Splunk", "ELK", "MS Sentinel", "Wazuh"],<br/>
            &nbsp;&nbsp;<span className="text-emerald-400">"automation"</span>: ["n8n", "LangChain", "Python"],<br/>
            &nbsp;&nbsp;<span className="text-emerald-400">"frameworks"</span>: ["MITRE ATT&CK", "Cyber Kill Chain"]<br/>
            {'}'}
          </div>
        </div>

        {/* Command 3: check availability */}
        <div>
          <div className="flex items-center gap-2 text-emerald-500 font-bold mb-1">
            <span>➜</span>
            <span className="text-teal-600">~</span>
            <span className="text-white font-normal">./check_availability.sh</span>
          </div>
          <div className="pl-4 border-l-2 border-emerald-900/30 ml-1 flex items-center gap-2 text-emerald-100/90">
            <span className="text-green-500 font-bold">[+]</span> Status: Exempted from military service. Ready for deployment.
          </div>
        </div>

        {/* Command 4: ls -la */}
        <div>
          <div className="flex items-center gap-2 text-emerald-500 font-bold mb-1">
            <span>➜</span>
            <span className="text-teal-600">~</span>
            <span className="text-white font-normal">ls -la /recent_achievements/</span>
          </div>
          <div className="pl-4 border-l-2 border-emerald-900/30 ml-1 text-emerald-100/60 leading-relaxed whitespace-pre font-mono text-[13px]">
            drwxr-xr-x  omar  admin  <span className="text-emerald-400">WebPatcher_Grad_Project</span><br/>
            drwxr-xr-x  omar  admin  <span className="text-emerald-400">ClickFix_VodkaStealer_Lab</span><br/>
            drwxr-xr-x  omar  admin  <span className="text-emerald-400">ZeroSploit_SOC_Internship</span>
          </div>
        </div>

        {/* Active Prompt with Blinking Cursor */}
        <div className="flex items-center gap-2 text-emerald-500 font-bold pt-2">
          <span>➜</span>
          <span className="text-teal-600">~</span>
          <span className="w-2.5 h-4 bg-emerald-400 animate-pulse"></span>
        </div>

      </div>
    </motion.div>
  );
}