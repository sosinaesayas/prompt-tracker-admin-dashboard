import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  MessageSquare, 
  AlertTriangle,
  Eye,
  Download,
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  Shield,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import axios from 'axios';

interface Prompt {
  id: string;
  promptText: string;
  timestamp: string;
  aiTool: string;
  employeeId: string;
  employeeName: string;
  deviceId: string;
  clientId: string;
  clientName: string;
  flagSeverity: 'low' | 'medium' | 'high' | 'none';
  isFlagged: boolean;
  metadata: {
    userAgent: string;
    ipAddress: string;
    sessionId: string;
    requestId: string;
  };
  response?: string;
  responseTime?: number;
}

interface PromptStats {
  totalPrompts: number;
  flaggedPrompts: number;
  highRiskPrompts: number;
  mediumRiskPrompts: number;
  lowRiskPrompts: number;
  topAiTools: Array<{ name: string; count: number; percentage: number }>;
  topEmployees: Array<{ name: string; prompts: number; flagged: number }>;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    severity: string;
  }>;
}

const Prompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [stats, setStats] = useState<PromptStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [toolFilter, setToolFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchPrompts();
  }, [currentPage, itemsPerPage, sortField, sortDirection]);

  const fetchPrompts = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        sortBy: sortField,
        sortOrder: sortDirection,
        ...(searchTerm && { search: searchTerm }),
        ...(employeeFilter !== 'all' && { employee: employeeFilter }),
        ...(dateRange.start && { startDate: dateRange.start }),
        ...(dateRange.end && { endDate: dateRange.end }),
        ...(toolFilter !== 'all' && { tool: toolFilter }),
        ...(severityFilter !== 'all' && { severity: severityFilter }),
        ...(clientFilter !== 'all' && { client: clientFilter }),
        ...(flaggedOnly && { flagged: 'true' }),
      });

      const [promptsResponse, statsResponse] = await Promise.all([
        axios.get(`/prompts?${params}`),
        axios.get('/prompts/stats')
      ]);

      setPrompts(promptsResponse.data.data);
      setStats(statsResponse.data.data);
    } catch (error) {
      console.error('Failed to fetch prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSeverityBadge = (severity: string) => {
    const badges = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800',
      none: 'bg-gray-100 text-gray-800'
    };
    return badges[severity as keyof typeof badges] || badges.none;
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'low': return <Shield className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Timestamp', 'Employee', 'AI Tool', 'Prompt Text', 'Severity', 'Client', 'Device ID'];
    const csvContent = [
      headers.join(','),
      ...prompts.map(prompt => [
        prompt.id,
        prompt.timestamp,
        prompt.employeeName,
        prompt.aiTool,
        `"${prompt.promptText.replace(/"/g, '""')}"`,
        prompt.flagSeverity,
        prompt.clientName,
        prompt.deviceId
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `prompts-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Prompt Logs</h2>
          <p className="text-gray-600">Monitor and analyze AI prompt activity across all clients</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportToCSV}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 flex items-center space-x-2 shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Download className="h-5 w-5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Prompts</p>
                <p className="text-3xl font-bold">{stats.totalPrompts.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <MessageSquare className="h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Flagged Prompts</p>
                <p className="text-3xl font-bold">{stats.flaggedPrompts.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <AlertTriangle className="h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">High Risk</p>
                <p className="text-3xl font-bold">{stats.highRiskPrompts.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <AlertTriangle className="h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Flag Rate</p>
                <p className="text-3xl font-bold">
                  {stats.totalPrompts > 0 ? ((stats.flaggedPrompts / stats.totalPrompts) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <select
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="all">All Employees</option>
            {stats?.topEmployees.map(emp => (
              <option key={emp.name} value={emp.name}>{emp.name}</option>
            ))}
          </select>

          <select
            value={toolFilter}
            onChange={(e) => setToolFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="all">All AI Tools</option>
            {stats?.topAiTools.map(tool => (
              <option key={tool.name} value={tool.name}>{tool.name}</option>
            ))}
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="all">All Severities</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
            <option value="none">No Risk</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={flaggedOnly}
                onChange={(e) => setFlaggedOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Flagged Only</span>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              onClick={fetchPrompts}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Filter className="h-5 w-5" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prompts Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('timestamp')}
                    className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                  >
                    <span>Timestamp</span>
                    {sortField === 'timestamp' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('employeeName')}
                    className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                  >
                    <span>Employee</span>
                    {sortField === 'employeeName' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('aiTool')}
                    className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                  >
                    <span>AI Tool</span>
                    {sortField === 'aiTool' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prompt Text
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('flagSeverity')}
                    className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                  >
                    <span>Severity</span>
                    {sortField === 'flagSeverity' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prompts.map((prompt) => (
                <tr key={prompt.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{formatTimestamp(prompt.timestamp)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{prompt.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span>{prompt.aiTool}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="truncate" title={prompt.promptText}>
                      {truncateText(prompt.promptText, 80)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSeverityBadge(prompt.flagSeverity)}`}>
                      {getSeverityIcon(prompt.flagSeverity)}
                      <span className="ml-1">{prompt.flagSeverity}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {prompt.clientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedPrompt(prompt);
                        setShowDetails(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-6 py-3 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-3 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={prompts.length < itemsPerPage}
            className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Prompt Details Modal */}
      {showDetails && selectedPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-2xl rounded-2xl bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Prompt Details</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Prompt Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Prompt Text</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-900">
                        {selectedPrompt.promptText}
                      </div>
                    </div>
                    {selectedPrompt.response && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Response</label>
                        <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-900">
                          {selectedPrompt.response}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Metadata</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Employee</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedPrompt.employeeName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">AI Tool</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedPrompt.aiTool}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Client</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedPrompt.clientName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Device ID</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedPrompt.deviceId}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                        <p className="mt-1 text-sm text-gray-900">{formatTimestamp(selectedPrompt.timestamp)}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Severity</label>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSeverityBadge(selectedPrompt.flagSeverity)}`}>
                          {getSeverityIcon(selectedPrompt.flagSeverity)}
                          <span className="ml-1">{selectedPrompt.flagSeverity}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">IP Address</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedPrompt.metadata.ipAddress}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">User Agent</label>
                      <p className="mt-1 text-sm text-gray-900 truncate">{selectedPrompt.metadata.userAgent}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prompts; 