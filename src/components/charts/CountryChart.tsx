import React, { useMemo } from 'react';
import { Globe, TrendingUp } from 'lucide-react';
import { SpaceMission } from '../../data/spaceMissions';

interface CountryChartProps {
  missions: SpaceMission[];
}

const CountryChart: React.FC<CountryChartProps> = ({ missions }) => {
  const countryData = useMemo(() => {
    const countryStats = missions.reduce((acc, mission) => {
      if (!acc[mission.country]) {
        acc[mission.country] = {
          total: 0,
          successful: 0,
          failed: 0,
          totalCost: 0,
          crewed: 0
        };
      }
      
      acc[mission.country].total++;
      acc[mission.country].totalCost += mission.cost;
      
      if (mission.status === 'Success') {
        acc[mission.country].successful++;
      } else {
        acc[mission.country].failed++;
      }
      
      if (mission.crew > 0) {
        acc[mission.country].crewed++;
      }
      
      return acc;
    }, {} as Record<string, {
      total: number;
      successful: number;
      failed: number;
      totalCost: number;
      crewed: number;
    }>);

    return Object.entries(countryStats)
      .map(([country, stats]) => ({
        country,
        ...stats,
        successRate: stats.total > 0 ? (stats.successful / stats.total * 100) : 0
      }))
      .sort((a, b) => b.total - a.total);
  }, [missions]);

  const maxMissions = Math.max(...countryData.map(d => d.total));
  const maxCost = Math.max(...countryData.map(d => d.totalCost));

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      'United States': '🇺🇸',
      'Soviet Union': '🇷🇺',
      'Russia': '🇷🇺',
      'China': '🇨🇳',
      'Japan': '🇯🇵',
      'India': '🇮🇳',
      'European Space Agency': '🇪🇺',
      'France': '🇫🇷',
      'United Kingdom': '🇬🇧',
      'Israel': '🇮🇱',
      'Iran': '🇮🇷'
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Missions by Country</h2>
        </div>
        <p className="text-purple-200">Space exploration achievements by nation</p>
      </div>

      {/* Country Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countryData.map((country, index) => (
          <div 
            key={country.country}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105"
          >
            {/* Country Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getCountryFlag(country.country)}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{country.country}</h3>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl font-bold text-purple-400">#{index + 1}</span>
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Count Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-200 text-sm">Total Missions</span>
                <span className="text-white font-bold">{country.total}</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ease-out"
                  style={{ width: `${(country.total / maxMissions) * 100}%` }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-green-400 text-xl font-bold">{country.successful}</div>
                <div className="text-purple-200 text-xs">Successful</div>
              </div>
              <div className="text-center">
                <div className="text-red-400 text-xl font-bold">{country.failed}</div>
                <div className="text-purple-200 text-xs">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 text-xl font-bold">{country.crewed}</div>
                <div className="text-purple-200 text-xs">Crewed</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 text-xl font-bold">{country.successRate.toFixed(0)}%</div>
                <div className="text-purple-200 text-xs">Success Rate</div>
              </div>
            </div>

            {/* Cost Information */}
            <div className="border-t border-slate-700 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-200 text-sm">Total Investment</span>
                <span className="text-white font-bold">${country.totalCost.toLocaleString()}M</span>
              </div>
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-1000 ease-out"
                  style={{ width: `${(country.totalCost / maxCost) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-bold text-white mb-4">Global Space Exploration Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">{countryData.length}</div>
            <div className="text-purple-200">Countries/Agencies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {countryData.reduce((sum, c) => sum + c.successful, 0)}
            </div>
            <div className="text-purple-200">Total Successful</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">
              {countryData.reduce((sum, c) => sum + c.crewed, 0)}
            </div>
            <div className="text-purple-200">Crewed Missions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">
              ${countryData.reduce((sum, c) => sum + c.totalCost, 0).toLocaleString()}M
            </div>
            <div className="text-purple-200">Total Investment</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryChart;