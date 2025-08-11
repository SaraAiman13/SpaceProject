import React, { useMemo } from 'react';
import { SpaceMission } from '../../data/spaceMissions';

interface TimelineChartProps {
  missions: SpaceMission[];
}

const TimelineChart: React.FC<TimelineChartProps> = ({ missions }) => {
  const timelineData = useMemo(() => {
    const missionsByYear = missions.reduce((acc, mission) => {
      const year = new Date(mission.date).getFullYear();
      if (!acc[year]) {
        acc[year] = { total: 0, successful: 0, failed: 0 };
      }
      acc[year].total++;
      if (mission.status === 'Success') {
        acc[year].successful++;
      } else {
        acc[year].failed++;
      }
      return acc;
    }, {} as Record<number, { total: number; successful: number; failed: number }>);

    const years = Object.keys(missionsByYear).map(Number).sort();
    const maxMissions = Math.max(...Object.values(missionsByYear).map(d => d.total));

    return { missionsByYear, years, maxMissions };
  }, [missions]);

  const getBarHeight = (count: number) => {
    return (count / timelineData.maxMissions) * 200;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Mission Timeline</h2>
        <p className="text-purple-200">Space missions launched by year (1957-2022)</p>
      </div>

      <div className="relative">
        {/* Chart Container */}
        <div className="overflow-x-auto">
          <div className="flex items-end space-x-1 min-w-full" style={{ minWidth: `${timelineData.years.length * 20}px` }}>
            {timelineData.years.map(year => {
              const data = timelineData.missionsByYear[year];
              const successHeight = getBarHeight(data.successful);
              const failHeight = getBarHeight(data.failed);
              
              return (
                <div key={year} className="flex flex-col items-center group relative">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="bg-slate-900 text-white text-xs rounded-lg p-2 whitespace-nowrap border border-purple-500/20">
                      <div className="font-semibold">{year}</div>
                      <div className="text-green-400">✓ {data.successful} successful</div>
                      <div className="text-red-400">✗ {data.failed} failed</div>
                      <div className="text-purple-200">Total: {data.total}</div>
                    </div>
                  </div>
                  
                  {/* Stacked Bar */}
                  <div className="flex flex-col items-center">
                    {/* Failed missions (top) */}
                    {data.failed > 0 && (
                      <div 
                        className="w-4 bg-red-500 hover:bg-red-400 transition-colors duration-200 rounded-t"
                        style={{ height: `${failHeight}px` }}
                      />
                    )}
                    {/* Successful missions (bottom) */}
                    {data.successful > 0 && (
                      <div 
                        className={`w-4 bg-green-500 hover:bg-green-400 transition-colors duration-200 ${data.failed === 0 ? 'rounded-t' : ''} rounded-b`}
                        style={{ height: `${successHeight}px` }}
                      />
                    )}
                  </div>
                  
                  {/* Year Label */}
                  <div className="text-xs text-purple-300 mt-2 transform -rotate-45 origin-top-left">
                    {year}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-8">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-purple-200 text-sm">Successful Missions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-purple-200 text-sm">Failed Missions</span>
          </div>
        </div>

        {/* Key Milestones */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-purple-400 text-sm font-medium">Space Race Era</div>
            <div className="text-white font-bold">1957-1975</div>
            <div className="text-purple-200 text-sm">
              {missions.filter(m => {
                const year = new Date(m.date).getFullYear();
                return year >= 1957 && year <= 1975;
              }).length} missions
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-purple-400 text-sm font-medium">Shuttle Era</div>
            <div className="text-white font-bold">1981-2011</div>
            <div className="text-purple-200 text-sm">
              {missions.filter(m => {
                const year = new Date(m.date).getFullYear();
                return year >= 1981 && year <= 2011;
              }).length} missions
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-purple-400 text-sm font-medium">Commercial Era</div>
            <div className="text-white font-bold">2008-2022</div>
            <div className="text-purple-200 text-sm">
              {missions.filter(m => {
                const year = new Date(m.date).getFullYear();
                return year >= 2008 && year <= 2022;
              }).length} missions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineChart;