import React, { useState, useMemo } from 'react';
import { Rocket, Calendar, Globe, Target, TrendingUp, Filter } from 'lucide-react';
import { spaceMissionsData, getUniqueCountries, getUniqueAgencies, getUniquePurposes } from '../data/spaceMissions';
import TimelineChart from './charts/TimelineChart';
import StatusChart from './charts/StatusChart';
import CountryChart from './charts/CountryChart';
import CostAnalysis from './charts/CostAnalysis';
import MissionTable from './MissionTable';
import FilterPanel from './FilterPanel';

interface Filters {
  dateRange: { start: string; end: string };
  countries: string[];
  agencies: string[];
  purposes: string[];
  status: string[];
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState<Filters>({
    dateRange: { start: '1957-01-01', end: '2022-12-31' },
    countries: [],
    agencies: [],
    purposes: [],
    status: []
  });

  const filteredMissions = useMemo(() => {
    return spaceMissionsData.filter(mission => {
      const missionDate = new Date(mission.date);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);

      const dateInRange = missionDate >= startDate && missionDate <= endDate;
      const countryMatch = filters.countries.length === 0 || filters.countries.includes(mission.country);
      const agencyMatch = filters.agencies.length === 0 || filters.agencies.includes(mission.agency);
      const purposeMatch = filters.purposes.length === 0 || filters.purposes.includes(mission.purpose);
      const statusMatch = filters.status.length === 0 || filters.status.includes(mission.status);

      return dateInRange && countryMatch && agencyMatch && purposeMatch && statusMatch;
    });
  }, [filters]);

  const stats = useMemo(() => {
    const totalMissions = filteredMissions.length;
    const successfulMissions = filteredMissions.filter(m => m.status === 'Success').length;
    const totalCost = filteredMissions.reduce((sum, m) => sum + m.cost, 0);
    const crewedMissions = filteredMissions.filter(m => m.crew > 0).length;

    return {
      totalMissions,
      successfulMissions,
      successRate: totalMissions > 0 ? (successfulMissions / totalMissions * 100).toFixed(1) : '0',
      totalCost: totalCost.toLocaleString(),
      crewedMissions
    };
  }, [filteredMissions]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'countries', label: 'Countries', icon: Globe },
    { id: 'missions', label: 'Missions', icon: Rocket },
    { id: 'filters', label: 'Filters', icon: Filter }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Space Missions Dashboard</h1>
                <p className="text-purple-200">Interactive visualization of space exploration (1957-2022)</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Total Missions</p>
                <p className="text-3xl font-bold text-white">{stats.totalMissions}</p>
              </div>
              <Rocket className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Success Rate</p>
                <p className="text-3xl font-bold text-green-400">{stats.successRate}%</p>
              </div>
              <Target className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Total Cost</p>
                <p className="text-3xl font-bold text-yellow-400">${stats.totalCost}M</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Crewed Missions</p>
                <p className="text-3xl font-bold text-blue-400">{stats.crewedMissions}</p>
              </div>
              <Globe className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-slate-800/30 rounded-lg p-1 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-purple-200 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <StatusChart missions={filteredMissions} />
              <CostAnalysis missions={filteredMissions} />
            </div>
          )}
          
          {activeTab === 'timeline' && (
            <TimelineChart missions={filteredMissions} />
          )}
          
          {activeTab === 'countries' && (
            <CountryChart missions={filteredMissions} />
          )}
          
          {activeTab === 'missions' && (
            <MissionTable missions={filteredMissions} />
          )}
          
          {activeTab === 'filters' && (
            <FilterPanel 
              filters={filters} 
              onFiltersChange={setFilters}
              countries={getUniqueCountries()}
              agencies={getUniqueAgencies()}
              purposes={getUniquePurposes()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;