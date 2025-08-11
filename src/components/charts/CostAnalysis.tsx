import React, { useMemo } from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { SpaceMission } from '../../data/spaceMissions';

interface CostAnalysisProps {
  missions: SpaceMission[];
}

const CostAnalysis: React.FC<CostAnalysisProps> = ({ missions }) => {
  const costData = useMemo(() => {
    // Group missions by decade
    const missionsByDecade = missions.reduce((acc, mission) => {
      const year = new Date(mission.date).getFullYear();
      const decade = Math.floor(year / 10) * 10;
      const decadeLabel = `${decade}s`;
      
      if (!acc[decadeLabel]) {
        acc[decadeLabel] = {
          missions: [],
          totalCost: 0,
          averageCost: 0,
          count: 0
        };
      }
      
      acc[decadeLabel].missions.push(mission);
      acc[decadeLabel].totalCost += mission.cost;
      acc[decadeLabel].count++;
      acc[decadeLabel].averageCost = acc[decadeLabel].totalCost / acc[decadeLabel].count;
      
      return acc;
    }, {} as Record<string, {
      missions: SpaceMission[];
      totalCost: number;
      averageCost: number;
      count: number;
    }>);

    // Sort by decade
    const sortedDecades = Object.entries(missionsByDecade)
      .sort(([a], [b]) => parseInt(a) - parseInt(b));

    // Find most expensive missions
    const expensiveMissions = [...missions]
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 5);

    const maxDecadeCost = Math.max(...Object.values(missionsByDecade).map(d => d.totalCost));
    const maxAverageCost = Math.max(...Object.values(missionsByDecade).map(d => d.averageCost));

    return {
      missionsByDecade: sortedDecades,
      expensiveMissions,
      maxDecadeCost,
      maxAverageCost,
      totalCost: missions.reduce((sum, m) => sum + m.cost, 0),
      averageCost: missions.length > 0 ? missions.reduce((sum, m) => sum + m.cost, 0) / missions.length : 0
    };
  }, [missions]);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <DollarSign className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Cost Analysis</h2>
        </div>
        <p className="text-purple-200">Mission costs and spending trends over time</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-yellow-400" />
            <span className="text-purple-200 text-sm">Total Investment</span>
          </div>
          <div className="text-2xl font-bold text-white">
            ${costData.totalCost.toLocaleString()}M
          </div>
        </div>
        
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span className="text-purple-200 text-sm">Average Cost</span>
          </div>
          <div className="text-2xl font-bold text-white">
            ${costData.averageCost.toFixed(0)}M
          </div>
        </div>
      </div>

      {/* Cost by Decade */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Spending by Decade</h3>
        <div className="space-y-3">
          {costData.missionsByDecade.map(([decade, data]) => (
            <div key={decade} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{decade}</span>
                <div className="text-right">
                  <div className="text-white font-bold">${data.totalCost.toLocaleString()}M</div>
                  <div className="text-purple-300 text-sm">
                    {data.count} missions • Avg: ${data.averageCost.toFixed(0)}M
                  </div>
                </div>
              </div>
              
              {/* Total Cost Bar */}
              <div className="h-6 bg-slate-700 rounded-lg overflow-hidden mb-1">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-1000 ease-out"
                  style={{ width: `${(data.totalCost / costData.maxDecadeCost) * 100}%` }}
                />
              </div>
              
              {/* Average Cost Bar */}
              <div className="h-2 bg-slate-700 rounded-lg overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                  style={{ width: `${(data.averageCost / costData.maxAverageCost) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded"></div>
            <span className="text-purple-200 text-sm">Total Spending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
            <span className="text-purple-200 text-sm">Average Cost</span>
          </div>
        </div>
      </div>

      {/* Most Expensive Missions */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Most Expensive Missions</h3>
        <div className="space-y-3">
          {costData.expensiveMissions.map((mission, index) => (
            <div key={mission.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-500/20 rounded-full">
                  <span className="text-yellow-400 font-bold text-sm">#{index + 1}</span>
                </div>
                <div>
                  <div className="text-white font-medium">{mission.name}</div>
                  <div className="text-purple-300 text-sm">
                    {mission.country} • {new Date(mission.date).getFullYear()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold">${mission.cost.toLocaleString()}M</div>
                <div className="text-purple-300 text-sm">{mission.purpose}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CostAnalysis;