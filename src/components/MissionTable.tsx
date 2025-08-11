import React, { useState, useMemo } from 'react';
import { Search, Calendar, Globe, Rocket, DollarSign, Users, Target } from 'lucide-react';
import { SpaceMission } from '../data/spaceMissions';

interface MissionTableProps {
  missions: SpaceMission[];
}

const MissionTable: React.FC<MissionTableProps> = ({ missions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof SpaceMission>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedMission, setSelectedMission] = useState<SpaceMission | null>(null);

  const filteredAndSortedMissions = useMemo(() => {
    let filtered = missions.filter(mission =>
      mission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [missions, searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof SpaceMission) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'text-green-400 bg-green-400/10';
      case 'Failure': return 'text-red-400 bg-red-400/10';
      case 'Partial Failure': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search missions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="text-purple-200">
            Showing {filteredAndSortedMissions.length} of {missions.length} missions
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-purple-200 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('name')}
                >
                  Mission Name
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-purple-200 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('date')}
                >
                  Date
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-purple-200 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('country')}
                >
                  Country
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-purple-200 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('status')}
                >
                  Status
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-purple-200 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('cost')}
                >
                  Cost (M$)
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-purple-200 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('purpose')}
                >
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredAndSortedMissions.map((mission) => (
                <tr 
                  key={mission.id}
                  className="hover:bg-slate-700/30 cursor-pointer transition-colors"
                  onClick={() => setSelectedMission(mission)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white font-medium">{mission.name}</div>
                    <div className="text-purple-300 text-sm">{mission.agency}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-purple-200">
                    {formatDate(mission.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-purple-200">
                    {mission.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(mission.status)}`}>
                      {mission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-purple-200">
                    ${mission.cost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-purple-200">
                    {mission.purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mission Detail Modal */}
      {selectedMission && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/20">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedMission.name}</h2>
                <button
                  onClick={() => setSelectedMission(null)}
                  className="text-purple-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-purple-200 text-sm">Launch Date</p>
                      <p className="text-white font-medium">{formatDate(selectedMission.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-purple-200 text-sm">Country</p>
                      <p className="text-white font-medium">{selectedMission.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Rocket className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-purple-200 text-sm">Rocket</p>
                      <p className="text-white font-medium">{selectedMission.rocket}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-purple-200 text-sm">Purpose</p>
                      <p className="text-white font-medium">{selectedMission.purpose}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-purple-200 text-sm">Cost</p>
                      <p className="text-white font-medium">${selectedMission.cost.toLocaleString()}M</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-purple-200 text-sm">Crew Size</p>
                      <p className="text-white font-medium">{selectedMission.crew}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-purple-200 text-sm mb-2">Status</p>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedMission.status)}`}>
                      {selectedMission.status}
                    </span>
                  </div>
                  
                  {selectedMission.duration && (
                    <div>
                      <p className="text-purple-200 text-sm">Duration</p>
                      <p className="text-white font-medium">{selectedMission.duration} days</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-purple-200 text-sm mb-2">Description</p>
                <p className="text-white">{selectedMission.description}</p>
              </div>
              
              <div className="mt-6">
                <p className="text-purple-200 text-sm mb-2">Launch Site</p>
                <p className="text-white">{selectedMission.launchSite}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionTable;