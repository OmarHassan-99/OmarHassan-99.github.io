import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Target as Crosshair, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { TryHackMeIcon, CyberDefendersIcon, CyberHazeIcon } from './ui/Icons';
import SectionHeader from './SectionHeader';
import Badge, { getDifficultyVariant } from './ui/Badge';
import { thmLabs, cyberdefendersLabs, cyberhazeLabs } from '../data/labs';

const platformData = {
  THM: thmLabs,
  CyberDefenders: cyberdefendersLabs,
  CyberHaze: cyberhazeLabs,
};

const platformIcons = {
  THM: <TryHackMeIcon size={18} />,
  CyberDefenders: <CyberDefendersIcon size={18} />,
  CyberHaze: <CyberHazeIcon size={18} />,
};

const platformLabels = {
  THM: 'TryHackMe',
  CyberDefenders: 'CyberDefenders',
  CyberHaze: 'CyberHaze',
};

const platformColors = {
  THM: 'from-accent-red to-accent-amber',
  CyberDefenders: 'from-accent-blue to-accent-cyan',
  CyberHaze: 'from-accent-amber to-yellow-400',
};

import { Search, ArrowUpDown } from 'lucide-react';

function LabsTable({ labs }) {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [filter, setFilter] = useState('All');
  const labsPerPage = 10;

  // Filter and Search
  const filteredLabs = labs.filter((l) => {
    const matchesFilter = filter === 'All' || l.difficulty === filter;
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort
  const sortedLabs = [...filteredLabs].sort((a, b) => {
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (sortConfig.key === 'date') {
      const dateA = new Date(aVal);
      const dateB = new Date(bVal);
      if (dateA < dateB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (dateA > dateB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    }

    if (sortConfig.key === 'difficulty') {
      const order = { 'Info': 0, 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      const rankA = order[aVal] ?? 0;
      const rankB = order[bVal] ?? 0;
      if (rankA < rankB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (rankA > rankB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    }
    
    // Normalize string comparisons
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedLabs.length / labsPerPage);
  const visible = sortedLabs.slice(page * labsPerPage, page * labsPerPage + labsPerPage);
  const difficulties = ['All', ...new Set(labs.map((l) => l.difficulty).filter(Boolean))];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setPage(0);
  };

  const handleFilter = (f) => {
    setFilter(f);
    setPage(0);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-soc-border/50">
      {/* Controls Bar */}
      <div className="p-4 border-b border-soc-border/30 bg-soc-surface/40 flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search */}
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={14} className="text-accent-blue" />
          </div>
          <input
            type="text"
            placeholder="> grep -i 'lab name'..."
            value={search}
            onChange={handleSearch}
            className="w-full bg-soc-bg/80 border border-soc-border/50 rounded-lg pl-9 pr-3 py-1.5 text-sm font-mono text-soc-primary focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/50 transition-all placeholder:text-soc-muted"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap justify-center">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => handleFilter(diff)}
              className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-all border ${
                filter === diff
                  ? 'bg-accent-blue text-soc-inverse border-accent-blue/50 shadow-md shadow-accent-blue/20'
                  : 'bg-soc-surface/60 text-soc-secondary border-soc-border/30 hover:border-accent-blue/30 hover:text-soc-primary'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-soc-surface/60 border-b border-soc-border/50 text-xs font-mono text-soc-secondary uppercase tracking-wider">
              <th className="p-4 cursor-pointer hover:text-soc-inverse transition-colors w-16" onClick={() => handleSort('id')}>
                <div className="flex items-center gap-1">ID <ArrowUpDown size={12} className={sortConfig.key === 'id' ? 'text-accent-blue' : 'opacity-30'} /></div>
              </th>
              <th className="p-4 cursor-pointer hover:text-soc-inverse transition-colors" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1">Lab Name <ArrowUpDown size={12} className={sortConfig.key === 'name' ? 'text-accent-blue' : 'opacity-30'} /></div>
              </th>
              <th className="p-4 cursor-pointer hover:text-soc-inverse transition-colors w-32" onClick={() => handleSort('difficulty')}>
                <div className="flex items-center gap-1">Severity <ArrowUpDown size={12} className={sortConfig.key === 'difficulty' ? 'text-accent-blue' : 'opacity-30'} /></div>
              </th>
              {labs.some(l => l.date) && (
                <th className="p-4 cursor-pointer hover:text-soc-inverse transition-colors w-32 hidden sm:table-cell" onClick={() => handleSort('date')}>
                  <div className="flex items-center gap-1">Timestamp <ArrowUpDown size={12} className={sortConfig.key === 'date' ? 'text-accent-blue' : 'opacity-30'} /></div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {visible.length > 0 ? (
                visible.map((lab, i) => (
                  <motion.tr
                    key={lab.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.2 }}
                    className="border-b border-soc-border/20 hover:bg-soc-surface/40 transition-colors group"
                  >
                    <td className="p-4 text-xs font-mono text-soc-muted">#{lab.id}</td>
                    <td className="p-4 text-sm font-semibold text-soc-primary group-hover:text-accent-cyan transition-colors">{lab.name}</td>
                    <td className="p-4">
                      {lab.difficulty && (
                        <Badge variant={getDifficultyVariant(lab.difficulty)}>
                          {lab.difficulty}
                        </Badge>
                      )}
                    </td>
                    {lab.date && (
                      <td className="p-4 text-xs font-mono text-soc-muted hidden sm:table-cell">{lab.date}</td>
                    )}
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-soc-muted font-mono text-sm">
                    No records found matching query.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-3 border-t border-soc-border/30 bg-soc-surface/20 flex justify-between items-center text-xs font-mono">
          <div className="text-soc-muted pl-2">
            Showing {page * labsPerPage + 1}-{Math.min((page + 1) * labsPerPage, sortedLabs.length)} of {sortedLabs.length} entries
          </div>
          <div className="flex gap-1 pr-2">
            <button
              onClick={() => setPage(p => Math.max(p - 1, 0))}
              disabled={page === 0}
              className={`p-1.5 rounded transition-all ${page === 0 ? 'opacity-30 cursor-not-allowed text-soc-muted' : 'text-accent-blue hover:bg-accent-blue/10'}`}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
              disabled={page === totalPages - 1}
              className={`p-1.5 rounded transition-all ${page === totalPages - 1 ? 'opacity-30 cursor-not-allowed text-soc-muted' : 'text-accent-blue hover:bg-accent-blue/10'}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Platforms() {
  const [active, setActive] = useState('THM');

  return (
    <section id="platforms" className="mb-28 scroll-mt-24">
      <SectionHeader
        prompt="tail -f /var/log/platforms.log"
        title="Platform"
        highlight="Labs"
        description="Comprehensive log of completed environments and challenges across various platforms."
      />

      {/* Platform tabs */}
      <div className="flex gap-2 flex-wrap justify-center p-1.5 rounded-2xl bg-soc-surface/40 border border-soc-border/20 mb-8 max-w-fit mx-auto">
        {Object.keys(platformData).map((platform) => (
          <motion.button
            key={platform}
            onClick={() => setActive(platform)}
            className={`px-5 py-2 rounded-xl text-sm font-mono font-semibold transition-all duration-300 flex items-center gap-2 ${
              active === platform
                ? `bg-gradient-to-r ${platformColors[platform]} text-soc-inverse shadow-md`
                : 'text-soc-secondary hover:text-soc-primary hover:bg-soc-surface/60'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {platformIcons[platform]}
            {platformLabels[platform]}
          </motion.button>
        ))}
      </div>

      {/* SIEM Labs Data Table */}
      <LabsTable key={active} labs={platformData[active]} />
    </section>
  );
}
