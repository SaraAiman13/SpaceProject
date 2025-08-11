import React, { useMemo } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { SpaceMission } from '../../data/spaceMissions';

interface StatusChartProps {
  missions: SpaceMission[];
}

const StatusChart: React.FC<StatusChartProps> = ({ missions }) => {
  const statusData = useMemo(() => {
    const statusCounts = missions.reduce((acc, mission) => {
      acc[mission.status] = (acc[mission.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = missions.length;
    
    return [
      {
        status: 'Success',
        count: statusCounts['Success'] || 0,
        percentage: total > 0 ? ((statusCounts['Success'] || 0) / total * 100) : 0,
        color: 'bg-green-500',
        icon: CheckCircle,
        textColor: 'text-green-400'
      },
      {
        status: 'Failure',
        count: statusCounts['Failure'] || 0,
        percentage: total > 0 ? ((statusCounts['Failure'] || 0) / total * 100) : 0,
        color: 'bg-red-500',
        icon: XCircle,
        textColor: 'text-red-400'
      },
      {
        status: 'Partial Failure',
        count: statusCounts['Partial Failure'] || 0,
        percentage: total > 0 ? ((statusCounts['Partial Failure'] || 0) / total * 100) : 0,
        color: 'bg-yellow-500',
        icon: AlertCircle,
        textColor: 'text-yellow-400'
      }
    ];
  }, [missions]);

  const maxCount = Math.max(...statusData.map(d => d.count));

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Mission Success Rate</h2>
        <p className="text-purple-200">Distribution of mission outcomes</p>
      </div>

      {/* Bar Chart */}
      <div className="space-y-4 mb-6">
        {statusData.map((item) => {
          const Icon = item.icon;
          const barWidth = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
          
          return (
            <div key={item.status} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-5 h-5 ${item.textColor}`} />
                  <span className="text-white font-medium">{item.status}</span>
                </div>
                <div className="text-purple-200 text-sm">
                  {item.count} missions ({item.percentage.toFixed(1)}%)
                </div>
              </div>
              
              <div className="relative h-8 bg-slate-700 rounded-lg overflow-hidden">
                <div 
                  className={`h-full ${item.color} transition-all duration-1000 ease-out rounded-lg`}
                  style={{ width: `${barWidth}%` }}
                />
                <div className="absolute inset-0 flex items-center px-3">
                  <span className="text-white text-sm font-medium">
                    {item.count}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Donut Chart */}
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {statusData.map((item, index) => {
              const radius = 35;
              const circumference = 2 * Math.PI * radius;
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -statusData.slice(0, index).reduce((acc, curr) => 
                acc + (curr.percentage / 100) * circumference, 0
              );
              
              return (
                <circle
                  key={item.status}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke={item.color.replace('bg-', '').replace('-500', '')}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                  style={{
                    stroke: item.status === 'Success' ? '#10b981' : 
                           item.status === 'Failure' ? '#ef4444' : '#f59e0b'
                  }}
                />
              );
            })}
          </svg>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-white">{missions.length}</div>
            <div className="text-purple-200 text-sm">Total Missions</div>
          </div>
        </div>
      </div>

      {/* Success Rate Highlight */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-semibold">
            {statusData[0].percentage.toFixed(1)}% Success Rate
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusChart;