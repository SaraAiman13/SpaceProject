import React from 'react';
import { Calendar, Globe, Building, Target, CheckCircle } from 'lucide-react';

interface Filters {
  dateRange: { start: string; end: string };
  countries: string[];
  agencies: string[];
  purposes: string[];
  status: string[];
}

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  countries: string[];
  agencies: string[];
  purposes: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  countries,
  agencies,
  purposes
}) => {
  const statusOptions = ['Success', 'Failure', 'Partial Failure'];

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };

  const handleMultiSelectChange = (field: keyof Filters, value: string) => {
    const currentValues = filters[field] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({
      ...filters,
      [field]: newValues
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      dateRange: { start: '1957-01-01', end: '2022-12-31' },
      countries: [],
      agencies: [],
      purposes: [],
      status: []
    });
  };

  const FilterSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ title, icon, children }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
      <div className="flex items-center space-x-2 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );

  const MultiSelectFilter: React.FC<{
    options: string[];
    selectedValues: string[];
    onChange: (value: string) => void;
  }> = ({ options, selectedValues, onChange }) => (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {options.map(option => (
        <label key={option} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedValues.includes(option)}
            onChange={() => onChange(option)}
            className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
          />
          <span className="text-purple-200 text-sm">{option}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Filter Missions</h2>
        <button
          onClick={clearAllFilters}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200"
        >
          Clear All Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FilterSection
          title="Date Range"
          icon={<Calendar className="w-5 h-5 text-purple-400" />}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                min="1957-01-01"
                max="2022-12-31"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                min="1957-01-01"
                max="2022-12-31"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </FilterSection>

        <FilterSection
          title="Countries"
          icon={<Globe className="w-5 h-5 text-purple-400" />}
        >
          <MultiSelectFilter
            options={countries}
            selectedValues={filters.countries}
            onChange={(value) => handleMultiSelectChange('countries', value)}
          />
        </FilterSection>

        <FilterSection
          title="Agencies"
          icon={<Building className="w-5 h-5 text-purple-400" />}
        >
          <MultiSelectFilter
            options={agencies}
            selectedValues={filters.agencies}
            onChange={(value) => handleMultiSelectChange('agencies', value)}
          />
        </FilterSection>

        <FilterSection
          title="Mission Purpose"
          icon={<Target className="w-5 h-5 text-purple-400" />}
        >
          <MultiSelectFilter
            options={purposes}
            selectedValues={filters.purposes}
            onChange={(value) => handleMultiSelectChange('purposes', value)}
          />
        </FilterSection>

        <FilterSection
          title="Mission Status"
          icon={<CheckCircle className="w-5 h-5 text-purple-400" />}
        >
          <MultiSelectFilter
            options={statusOptions}
            selectedValues={filters.status}
            onChange={(value) => handleMultiSelectChange('status', value)}
          />
        </FilterSection>
      </div>

      {/* Active Filters Summary */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">Active Filters</h3>
        <div className="flex flex-wrap gap-2">
          {filters.countries.map(country => (
            <span key={country} className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
              {country}
            </span>
          ))}
          {filters.agencies.map(agency => (
            <span key={agency} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
              {agency}
            </span>
          ))}
          {filters.purposes.map(purpose => (
            <span key={purpose} className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">
              {purpose}
            </span>
          ))}
          {filters.status.map(status => (
            <span key={status} className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-full">
              {status}
            </span>
          ))}
          {(filters.dateRange.start !== '1957-01-01' || filters.dateRange.end !== '2022-12-31') && (
            <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">
              {filters.dateRange.start} to {filters.dateRange.end}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;