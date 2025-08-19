export interface AnalyticsStats {
  totalPrompts: number;
  flaggedPrompts: number;
  highRiskPrompts: number;
  topPlatforms: Array<{ name: string; count: number; percentage: number }>;
  recentActivity: Array<{
    id: number;
    prompt: string;
    source: string;
    aiPlatform: string;
    riskLevel: string;
    timestamp: string;
  }>;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }>;
} 