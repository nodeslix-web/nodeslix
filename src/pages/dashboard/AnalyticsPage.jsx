import { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Download,
  TrendingDown,
  TrendingUp,
  Check,
  X,
  Loader2,
  FileSpreadsheet,
  FileJson,
  FileText,
  AlertCircle
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

/* ─── Mock time-series data ─── */
const latencyPoints  = [42, 38, 55, 34, 61, 48, 72, 56, 68, 82, 61, 88, 74, 80, 92, 77, 84, 91, 78, 96, 85, 90, 76, 88];
const bandwidthBars  = [62, 78, 54, 88, 66, 92, 74, 84, 70, 96, 80, 86];
const months         = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const donutSegments = [
  { label: 'Core Systems',  pct: 0.42, color: '#00D4FF' },
  { label: '5G Network',    pct: 0.28, color: '#3A6DFF' },
  { label: 'Edge Gateways', pct: 0.18, color: '#7CEBFF' },
  { label: 'IoT Devices',   pct: 0.12, color: '#a78bfa' },
];

const topMetrics = [
  { label: 'Total Throughput',   value: '7.8 Tbps', delta: '+0.4',   positive: true  },
  { label: 'Peak Latency',       value: '22ms',     delta: '+4ms',   positive: false },
  { label: 'Avg Uptime',         value: '99.97%',   delta: '+0.02%', positive: true  },
  { label: 'Packet Loss',        value: '0.01%',    delta: '-0.005%', positive: true },
  { label: 'Bandwidth Util.',    value: '74%',      delta: '+8%',    positive: false },
  { label: 'AI Optimizations',   value: '1,248',    delta: '+187',   positive: true  },
];

const tableRows = [
  { region: 'Region 1 – North',  throughput: '1.8 Tbps', latency: '6ms',  uptime: '99.99%', status: 'Optimal'  },
  { region: 'Region 2 – South',  throughput: '1.4 Tbps', latency: '9ms',  uptime: '99.96%', status: 'Optimal'  },
  { region: 'Region 3 – East',   throughput: '1.6 Tbps', latency: '7ms',  uptime: '99.98%', status: 'Optimal'  },
  { region: 'Region 4 – West',   throughput: '1.2 Tbps', latency: '11ms', uptime: '99.91%', status: 'Warning'  },
  { region: 'Region 5 – Core',   throughput: '1.8 Tbps', latency: '4ms',  uptime: '99.99%', status: 'Optimal'  },
];

const statusStyle = {
  Optimal: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

/* ─── Line chart ─── */
const LineChart = ({ points, color = '#00D4FF', gradId }) => {
  const svgH = 100; const svgW = 400;
  const max = Math.max(...points); const min = Math.min(...points);
  const range = max - min || 1;
  const coords = points.map((v, i) =>
    `${(i / (points.length - 1)) * svgW},${svgH - ((v - min) / range) * svgH * 0.85 - 7}`
  );
  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${svgH} ${coords.join(' ')} ${svgW},${svgH}`} fill={`url(#${gradId})`} />
      <polyline points={coords.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Data points */}
      {coords.map((c, i) => {
        const [x, y] = c.split(',');
        return <circle key={i} cx={x} cy={y} r="2.5" fill={color} opacity={0.8} />;
      })}
    </svg>
  );
};

/* ─── Bar chart ─── */
const BarChart = ({ bars, labels }) => {
  const max = Math.max(...bars);
  return (
    <svg viewBox="0 0 340 110" className="w-full h-full" preserveAspectRatio="none">
      {bars.map((h, i) => {
        const barH = (h / max) * 80;
        const x = i * 29 + 4;
        return (
          <g key={i}>
            <rect x={x} y={110 - barH - 20} width="22" height={barH} rx="3" fill={`rgba(0,212,255,${0.3 + (h / max) * 0.5})`} />
            <text x={x + 11} y="108" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8">{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
};

/* ─── Donut chart ─── */
const DonutChart = () => {
  const r = 38; const cx = 50; const cy = 50; const stroke = 10;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {donutSegments.map((seg, i) => {
        const dash = seg.pct * circ; const gap = circ - dash;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset * circ}
            strokeLinecap="round" transform="rotate(-90 50 50)" opacity={0.9} />
        );
        offset += seg.pct;
        return el;
      })}
      <text x="50" y="47" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">Network</text>
      <text x="50" y="56" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7">Distribution</text>
    </svg>
  );
};

/* ─────────────────────────────────────────
   ANALYTICS PAGE
───────────────────────────────────────── */
const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const ranges = ['1h', '6h', '24h', '7d', '30d'];

  /* --- Report Export States --- */
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('Last 24 Hours');
  const [selectedSections, setSelectedSections] = useState([
    'Infrastructure Health',
    'Network Performance',
    'AI Optimization Metrics',
    'Traffic Analysis',
    'Latency Statistics',
    'Bandwidth Utilization',
    'Topology Summary'
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [toast, setToast] = useState(null);

  /* --- Toast Trigger Helper --- */
  const triggerToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  /* --- Export Progress Simulated Timer --- */
  const startGeneration = () => {
    if (selectedSections.length === 0) return;
    setIsGenerating(true);
    setGenerationProgress(0);
    const duration = 2500; // 2.5 seconds
    const intervalTime = 50;
    const step = 100 / (duration / intervalTime);
    
    const timer = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            handleExport();
          }, 100);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);
  };

  /* --- Export Dispatcher --- */
  const handleExport = () => {
    try {
      if (exportFormat === 'pdf') {
        handlePDFExport(dateRange, selectedSections);
      } else if (exportFormat === 'csv') {
        handleCSVExport(dateRange, selectedSections);
      } else if (exportFormat === 'json') {
        handleJSONExport(dateRange, selectedSections);
      } else if (exportFormat === 'xlsx') {
        handleExcelExport(dateRange, selectedSections);
      }
      setIsGenerating(false);
      setIsExportModalOpen(false);
      triggerToast('success', 'Report Generated Successfully', 'Your analytics report has been downloaded.');
    } catch (error) {
      console.error(error);
      setIsGenerating(false);
      triggerToast('error', 'Unable to generate report.', 'Please try again.');
    }
  };

  /* --- Export Handlers Implementation --- */
  const handlePDFExport = (range, sections) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const PAGE_WIDTH = 210;
    const PAGE_HEIGHT = 297;
    const MARGIN = 15;
    const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);

    doc.setFont('helvetica');

    const drawFooter = (pageNum, totalPages) => {
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.2);
      doc.line(MARGIN, PAGE_HEIGHT - 18, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 18);

      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.setFont('helvetica', 'normal');
      doc.text('Generated by NodeSlix Analytics Platform', MARGIN, PAGE_HEIGHT - 12);
      doc.text(`Page ${pageNum} of ${totalPages}`, PAGE_WIDTH - MARGIN - 20, PAGE_HEIGHT - 12);
    };

    const drawHeader = (title) => {
      doc.setFillColor(0, 212, 255);
      doc.rect(MARGIN, MARGIN, CONTENT_WIDTH, 4, 'F');

      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(10, 10, 10);
      doc.text('NODESLIX', MARGIN, MARGIN + 14);

      doc.setFillColor(0, 212, 255);
      doc.rect(MARGIN + 32, MARGIN + 9, 2, 6, 'F');

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(120, 120, 120);
      doc.text(`DATE GENERATED: ${new Date().toLocaleString()}`, PAGE_WIDTH - MARGIN - 60, MARGIN + 13);
      doc.text(`RANGE: ${range}`, PAGE_WIDTH - MARGIN - 60, MARGIN + 17);

      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(20, 20, 20);
      doc.text(title, MARGIN, MARGIN + 28);

      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.line(MARGIN, MARGIN + 32, PAGE_WIDTH - MARGIN, MARGIN + 32);
    };

    // PAGE 1
    drawHeader('Enterprise Network Analytics Report');

    let currentY = MARGIN + 40;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text('1. EXECUTIVE SUMMARY & KPI KEY METRICS', MARGIN, currentY);
    currentY += 6;

    const cardW = 86;
    const cardH = 22;

    doc.setFillColor(245, 245, 245);
    doc.rect(MARGIN, currentY, cardW, cardH, 'F');
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.3);
    doc.rect(MARGIN, currentY, cardW, cardH, 'S');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(120, 120, 120);
    doc.text('INFRASTRUCTURE HEALTH', MARGIN + 6, currentY + 6);
    doc.setFontSize(16);
    doc.setTextColor(10, 180, 100);
    doc.text(sections.includes('Infrastructure Health') ? '98.7%' : 'Excluded', MARGIN + 6, currentY + 15);

    doc.setFillColor(245, 245, 245);
    doc.rect(MARGIN + cardW + 8, currentY, cardW, cardH, 'F');
    doc.rect(MARGIN + cardW + 8, currentY, cardW, cardH, 'S');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(120, 120, 120);
    doc.text('AVERAGE LATENCY', MARGIN + cardW + 14, currentY + 6);
    doc.setFontSize(16);
    doc.setTextColor(0, 130, 255);
    doc.text(sections.includes('Latency Statistics') ? '12 ms' : 'Excluded', MARGIN + cardW + 14, currentY + 15);

    currentY += cardH + 6;

    doc.setFillColor(245, 245, 245);
    doc.rect(MARGIN, currentY, cardW, cardH, 'F');
    doc.rect(MARGIN, currentY, cardW, cardH, 'S');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(120, 120, 120);
    doc.text('BANDWIDTH UTILIZATION', MARGIN + 6, currentY + 6);
    doc.setFontSize(16);
    doc.setTextColor(0, 130, 255);
    doc.text(sections.includes('Bandwidth Utilization') ? '72%' : 'Excluded', MARGIN + 6, currentY + 15);

    doc.setFillColor(245, 245, 245);
    doc.rect(MARGIN + cardW + 8, currentY, cardW, cardH, 'F');
    doc.rect(MARGIN + cardW + 8, currentY, cardW, cardH, 'S');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(120, 120, 120);
    doc.text('AI OPTIMIZATION SCORE', MARGIN + cardW + 14, currentY + 6);
    doc.setFontSize(16);
    doc.setTextColor(150, 100, 255);
    doc.text(sections.includes('AI Optimization Metrics') ? '96%' : 'Excluded', MARGIN + cardW + 14, currentY + 15);

    currentY += cardH + 12;

    if (sections.includes('Network Performance')) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(40, 40, 40);
      doc.text('2. REGIONAL PERFORMANCE BREAKDOWN', MARGIN, currentY);
      currentY += 6;

      doc.setFillColor(240, 242, 245);
      doc.rect(MARGIN, currentY, CONTENT_WIDTH, 8, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(60, 60, 60);
      doc.text('REGION', MARGIN + 4, currentY + 5.5);
      doc.text('THROUGHPUT', MARGIN + 55, currentY + 5.5);
      doc.text('LATENCY', MARGIN + 90, currentY + 5.5);
      doc.text('UPTIME', MARGIN + 125, currentY + 5.5);
      doc.text('STATUS', MARGIN + 155, currentY + 5.5);

      currentY += 8;

      tableRows.forEach((row) => {
        doc.setDrawColor(240, 240, 240);
        doc.setLineWidth(0.2);
        doc.line(MARGIN, currentY + 7.5, PAGE_WIDTH - MARGIN, currentY + 7.5);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text(row.region, MARGIN + 4, currentY + 5);
        doc.text(row.throughput, MARGIN + 55, currentY + 5);
        doc.text(row.latency, MARGIN + 90, currentY + 5);
        doc.text(row.uptime, MARGIN + 125, currentY + 5);

        if (row.status === 'Optimal') {
          doc.setTextColor(10, 180, 100);
        } else {
          doc.setTextColor(220, 140, 10);
        }
        doc.setFont('helvetica', 'bold');
        doc.text(row.status, MARGIN + 155, currentY + 5);
        currentY += 8;
      });
    }

    drawFooter(1, 2);

    // PAGE 2
    doc.addPage();
    drawHeader('Enterprise Network Analytics Report');

    currentY = MARGIN + 40;

    if (sections.includes('Latency Statistics')) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(40, 40, 40);
      doc.text('3. NETWORK LATENCY TREND', MARGIN, currentY);
      currentY += 6;

      const chartX = MARGIN;
      const chartY = currentY;
      const chartW = CONTENT_WIDTH;
      const chartH = 40;

      doc.setFillColor(248, 249, 250);
      doc.rect(chartX, chartY, chartW, chartH, 'F');
      doc.setDrawColor(220, 224, 230);
      doc.setLineWidth(0.3);
      doc.rect(chartX, chartY, chartW, chartH, 'S');

      doc.setDrawColor(240, 240, 240);
      doc.setLineWidth(0.15);
      for (let g = 1; g < 4; g++) {
        const gy = chartY + (chartH / 4) * g;
        doc.line(chartX, gy, chartX + chartW, gy);
      }

      const minVal = Math.min(...latencyPoints);
      const maxVal = Math.max(...latencyPoints);
      const valRange = maxVal - minVal || 1;

      const pointsCount = latencyPoints.length;
      const xInterval = chartW / (pointsCount - 1);

      doc.setDrawColor(0, 180, 255);
      doc.setLineWidth(0.6);

      let lastX = 0, lastY = 0;
      latencyPoints.forEach((val, i) => {
        const px = chartX + i * xInterval;
        const py = chartY + chartH - 4 - ((val - minVal) / valRange) * (chartH - 8);

        if (i > 0) {
          doc.line(lastX, lastY, px, py);
        }
        lastX = px;
        lastY = py;
      });

      doc.setFillColor(0, 180, 255);
      latencyPoints.forEach((val, i) => {
        const px = chartX + i * xInterval;
        const py = chartY + chartH - 4 - ((val - minVal) / valRange) * (chartH - 8);
        doc.ellipse(px, py, 0.7, 0.7, 'F');
      });

      doc.setFontSize(7);
      doc.setTextColor(120, 120, 120);
      doc.setFont('helvetica', 'normal');
      doc.text(`Peak Latency: ${maxVal}ms`, chartX + 4, chartY + 6);
      doc.text(`Min Latency: ${minVal}ms`, chartX + 4, chartY + chartH - 4);
      doc.text('24h Timeline Analysis (Hourly)', chartW - 38, chartY + chartH - 4);

      currentY += chartH + 12;
    }

    if (sections.includes('Bandwidth Utilization')) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(40, 40, 40);
      doc.text('4. BANDWIDTH UTILIZATION (MONTHLY TREND)', MARGIN, currentY);
      currentY += 6;

      const chartX = MARGIN;
      const chartY = currentY;
      const chartW = CONTENT_WIDTH;
      const chartH = 40;

      doc.setFillColor(248, 249, 250);
      doc.rect(chartX, chartY, chartW, chartH, 'F');
      doc.setDrawColor(220, 224, 230);
      doc.setLineWidth(0.3);
      doc.rect(chartX, chartY, chartW, chartH, 'S');

      const maxVal = Math.max(...bandwidthBars);
      const barsCount = bandwidthBars.length;
      const barSpacing = chartW / barsCount;
      const barWidth = barSpacing - 5;

      doc.setFillColor(120, 180, 255);

      bandwidthBars.forEach((val, i) => {
        const bx = chartX + i * barSpacing + 2.5;
        const barH = (val / maxVal) * (chartH - 12);
        const by = chartY + chartH - 6 - barH;

        doc.rect(bx, by, barWidth, barH, 'F');

        doc.setFontSize(6.5);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'bold');
        doc.text(months[i], bx + (barWidth / 2) - 1.5, chartY + chartH - 2);
      });

      currentY += chartH + 12;
    }

    if (sections.includes('AI Optimization Metrics')) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(40, 40, 40);
      doc.text('5. AI OPTIMIZATION PIPELINE PERFORMANCE', MARGIN, currentY);
      currentY += 6;

      const pipeline = [
        { label: 'Telemetry Ingestion',      score: 100, colorRGB: [0, 180, 255] },
        { label: 'Traffic Optimization',     score: 97,  colorRGB: [50, 120, 255] },
        { label: 'Routing Intelligence',     score: 94,  colorRGB: [100, 180, 255] },
        { label: 'Predictive Analytics',     score: 91,  colorRGB: [150, 120, 255] },
        { label: 'Autonomous Orchestration', score: 89,  colorRGB: [220, 140, 10] }
      ];

      pipeline.forEach((s) => {
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text(s.label, MARGIN + 4, currentY + 4);

        const barX = MARGIN + 55;
        const barY = currentY + 1.5;
        const barW = 100;
        const barH = 3;

        doc.setFillColor(240, 240, 240);
        doc.rect(barX, barY, barW, barH, 'F');

        doc.setFillColor(s.colorRGB[0], s.colorRGB[1], s.colorRGB[2]);
        doc.rect(barX, barY, barW * (s.score / 100), barH, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(40, 40, 40);
        doc.text(`${s.score}%`, barX + barW + 4, currentY + 4);

        currentY += 6.5;
      });
    }

    drawFooter(2, 2);

    doc.save(`nodeslix_analytics_report_${range.toLowerCase().replace(/ /g, '_')}.pdf`);
  };

  const handleCSVExport = (range, sections) => {
    let csvContent = '';
    
    csvContent += `"NodeSlix Analytics Report"\n`;
    csvContent += `"Generated At:","${new Date().toLocaleString()}"\n`;
    csvContent += `"Date Range:","${range}"\n\n`;

    if (sections.includes('Infrastructure Health') || sections.includes('Network Performance') || sections.includes('Bandwidth Utilization')) {
      csvContent += `"KEY METRICS SUMMARY"\n`;
      csvContent += `"Metric","Value"\n`;
      if (sections.includes('Infrastructure Health')) {
        csvContent += `"Infrastructure Health","98.7%"\n`;
        csvContent += `"Active Nodes","1248"\n`;
        csvContent += `"Packet Loss","0.2%"\n`;
      }
      if (sections.includes('Network Performance')) {
        csvContent += `"Average Latency","12 ms"\n`;
        csvContent += `"Average Uptime","99.97%"\n`;
        csvContent += `"Peak Latency","22ms"\n`;
        csvContent += `"Total Throughput","7.8 Tbps"\n`;
      }
      if (sections.includes('Bandwidth Utilization')) {
        csvContent += `"Bandwidth Utilization","72%"\n`;
      }
      if (sections.includes('AI Optimization Metrics')) {
        csvContent += `"AI Optimization Score","96%"\n`;
      }
      csvContent += `\n`;
    }

    if (sections.includes('Network Performance')) {
      csvContent += `"REGIONAL BREAKDOWN"\n`;
      csvContent += `"Region","Throughput","Latency","Uptime","Status"\n`;
      tableRows.forEach(row => {
        csvContent += `"${row.region}","${row.throughput}","${row.latency}","${row.uptime}","${row.status}"\n`;
      });
      csvContent += `\n`;
    }

    if (sections.includes('Traffic Analysis')) {
      csvContent += `"TRAFFIC DISTRIBUTION BY LAYER"\n`;
      csvContent += `"Layer","Percentage"\n`;
      donutSegments.forEach(seg => {
        csvContent += `"${seg.label}","${(seg.pct * 100).toFixed(0)}%"\n`;
      });
      csvContent += `\n`;
    }

    if (sections.includes('AI Optimization Metrics')) {
      csvContent += `"AI OPTIMIZATION SCORES BY PIPELINE STAGE"\n`;
      csvContent += `"Pipeline Stage","Score"\n`;
      const pipeline = [
        { label: 'Telemetry Ingestion', score: 100 },
        { label: 'Traffic Optimization', score: 97 },
        { label: 'Routing Intelligence', score: 94 },
        { label: 'Predictive Analytics', score: 91 },
        { label: 'Autonomous Orchestration', score: 89 }
      ];
      pipeline.forEach(item => {
        csvContent += `"${item.label}","${item.score}%"\n`;
      });
      csvContent += `\n`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nodeslix_analytics_report_${range.toLowerCase().replace(/ /g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleJSONExport = (range, sections) => {
    const reportData = {
      reportName: 'NodeSlix Analytics Report',
      generatedAt: new Date().toISOString(),
      parameters: {
        dateRange: range,
        includedSections: sections,
      },
      metrics: {},
      dataSets: {}
    };

    if (sections.includes('Infrastructure Health')) {
      reportData.metrics.infrastructureHealth = '98.7%';
      reportData.metrics.activeNodes = 1248;
      reportData.metrics.packetLoss = '0.2%';
    }
    if (sections.includes('Network Performance')) {
      reportData.metrics.avgUptime = '99.97%';
      reportData.metrics.peakLatency = '22ms';
      reportData.metrics.totalThroughput = '7.8 Tbps';
      reportData.dataSets.regionalPerformance = tableRows;
    }
    if (sections.includes('AI Optimization Metrics')) {
      reportData.metrics.aiOptimizationScore = '96%';
      reportData.metrics.aiOptimizations = 1248;
      reportData.dataSets.aiOptimizationPipeline = [
        { stage: 'Telemetry Ingestion', score: 100 },
        { stage: 'Traffic Optimization', score: 97 },
        { stage: 'Routing Intelligence', score: 94 },
        { stage: 'Predictive Analytics', score: 91 },
        { stage: 'Autonomous Orchestration', score: 89 }
      ];
    }
    if (sections.includes('Traffic Analysis')) {
      reportData.dataSets.trafficDistribution = donutSegments;
    }
    if (sections.includes('Latency Statistics')) {
      reportData.dataSets.latencyTrendHistory = latencyPoints;
    }
    if (sections.includes('Bandwidth Utilization')) {
      reportData.metrics.bandwidthUtilization = '72%';
      reportData.dataSets.monthlyBandwidthUsage = bandwidthBars.map((bar, i) => ({
        month: months[i],
        throughputTbps: bar
      }));
    }
    if (sections.includes('Topology Summary')) {
      reportData.dataSets.topologySummary = {
        description: 'Dynamic network topologies analyzed across 5G nodes, Edge gateways and Core layers.',
        activeLayers: ['Core Systems', '5G Network', 'Edge Gateways', 'IoT Devices']
      };
    }

    const jsonStr = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nodeslix_analytics_report_${range.toLowerCase().replace(/ /g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExcelExport = (range, sections) => {
    const wb = XLSX.utils.book_new();

    const overviewData = [
      ["NodeSlix Analytics Platform - Enterprise Report"],
      ["Generated At:", new Date().toLocaleString()],
      ["Date Range:", range],
      [],
      ["REPORT SECTIONS EXPORTED"],
      ...sections.map(sec => [sec]),
      [],
      ["KEY ENTERPRISE KPI METRICS"],
      ["Metric", "Value", "Baseline Target"],
      ["Infrastructure Health", "98.7%", ">= 98.0%"],
      ["Average Latency", "12 ms", "<= 15 ms"],
      ["Bandwidth Utilization", "72%", "60% - 80%"],
      ["AI Optimization Score", "96%", ">= 90%"],
      ["Packet Loss", "0.2%", "<= 0.5%"],
      ["Active Nodes", "1,248", "N/A"]
    ];
    const wsOverview = XLSX.utils.aoa_to_sheet(overviewData);
    XLSX.utils.book_append_sheet(wb, wsOverview, "Overview");

    if (sections.includes('Infrastructure Health')) {
      const infraData = [
        ["INFRASTRUCTURE HEALTH METRICS"],
        ["Metric", "Value", "Status"],
        ["Core Health Rating", "98.7%", "Optimal"],
        ["Active Network Nodes", 1248, "Active"],
        ["Overall Packet Loss", "0.2%", "Optimal"],
        [],
        ["REGIONAL PERFORMANCE BREAKDOWN"],
        ["Region", "Throughput", "Latency", "Uptime", "Status"],
        ...tableRows.map(row => [row.region, row.throughput, row.latency, row.uptime, row.status])
      ];
      const wsInfra = XLSX.utils.aoa_to_sheet(infraData);
      XLSX.utils.book_append_sheet(wb, wsInfra, "Infrastructure");
    }

    if (sections.includes('AI Optimization Metrics')) {
      const aiData = [
        ["AI OPTIMIZATION & AUTOMATION SUMMARY"],
        ["Metric", "Value"],
        ["Autonomous Orchestration Rating", "96%"],
        ["AI Optimizations Executed", 1248],
        [],
        ["PIPELINE STAGE EFFICIENCY RATES"],
        ["Stage / Ingest Node", "Score / Percent"],
        ["Telemetry Ingestion", "100%"],
        ["Traffic Optimization", "97%"],
        ["Routing Intelligence", "94%"],
        ["Predictive Analytics", "91%"],
        ["Autonomous Orchestration", "89%"]
      ];
      const wsAI = XLSX.utils.aoa_to_sheet(aiData);
      XLSX.utils.book_append_sheet(wb, wsAI, "AI Metrics");
    }

    if (sections.includes('Traffic Analysis') || sections.includes('Bandwidth Utilization') || sections.includes('Latency Statistics')) {
      const trafficData = [
        ["NETWORK TRAFFIC & BANDWIDTH UTILIZATION"],
        ["Overall Bandwidth Utilization", "72%"],
        ["Avg Throughput (Current)", "7.8 Tbps"],
        [],
        ["MONTHLY THROUGHPUT HISTORY"],
        ["Month", "Throughput (Tbps)"],
        ...months.map((m, idx) => [m, bandwidthBars[idx]]),
        [],
        ["BANDWIDTH DISTRIBUTION BY NETWORK LAYER"],
        ["Layer Name", "Allocation Ratio"],
        ...donutSegments.map(seg => [seg.label, `${(seg.pct * 100).toFixed(0)}%`])
      ];
      const wsTraffic = XLSX.utils.aoa_to_sheet(trafficData);
      XLSX.utils.book_append_sheet(wb, wsTraffic, "Traffic");
    }

    XLSX.writeFile(wb, `nodeslix_analytics_report_${range.toLowerCase().replace(/ /g, '_')}.xlsx`);
  };

  const isGenerateDisabled = selectedSections.length === 0;

  return (
    <div className="p-5 md:p-6 space-y-7">
      {/* Page Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Analytics</p>
          <h1 className="mt-1 text-2xl font-extrabold text-white">Network Analytics</h1>
          <p className="mt-1 text-sm text-nodeslix-muted">Deep insights into performance, capacity, and efficiency trends.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
            {ranges.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setTimeRange(r)}
                className={[
                  'px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200',
                  timeRange === r
                    ? 'bg-nodeslix-accent/15 text-nodeslix-accent'
                    : 'text-nodeslix-muted hover:text-white',
                ].join(' ')}
              >{r}</button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 text-nodeslix-muted hover:text-white hover:border-white/20 transition-all text-xs font-semibold active:scale-95 duration-200"
          >
            <Download size={13} /> Export
          </button>
        </div>
      </div>

      {/* Top metrics */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {topMetrics.map((m, i) => (
          <Motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="flex flex-col gap-2 p-4 surface-card"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-nodeslix-muted/70 uppercase tracking-wider font-semibold">{m.label}</p>
              <span className={`flex items-center gap-0.5 text-[10px] font-bold ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                {m.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {m.delta}
              </span>
            </div>
            <p className="text-xl font-extrabold text-white">{m.value}</p>
          </Motion.div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Latency trend */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ borderColor: 'rgba(0,212,255,0.25)' }}
          className="flex flex-col gap-4 p-5 surface-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Latency Trend</p>
              <p className="text-[10px] text-nodeslix-muted/60 mt-0.5">Average round-trip time (ms)</p>
            </div>
            <span className="text-[10px] font-bold text-nodeslix-accent bg-nodeslix-accent/10 px-2 py-0.5 rounded-full">
              Avg 8ms
            </span>
          </div>
          <div className="h-36">
            <LineChart points={latencyPoints} color="#00D4FF" gradId="latGrad" />
          </div>
        </Motion.div>

        {/* Bandwidth usage */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          whileHover={{ borderColor: 'rgba(0,212,255,0.25)' }}
          className="flex flex-col gap-4 p-5 surface-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Bandwidth Utilization</p>
              <p className="text-[10px] text-nodeslix-muted/60 mt-0.5">Monthly throughput (Tbps)</p>
            </div>
            <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
              7.8 Tbps Peak
            </span>
          </div>
          <div className="h-36">
            <BarChart bars={bandwidthBars} labels={months} />
          </div>
        </Motion.div>

        {/* Network distribution donut */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ borderColor: 'rgba(0,212,255,0.25)' }}
          className="flex flex-col gap-4 p-5 surface-card"
        >
          <div>
            <p className="text-xs font-bold text-white">Traffic Distribution</p>
            <p className="text-[10px] text-nodeslix-muted/60 mt-0.5">Bandwidth allocation by layer</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-36 w-36 shrink-0">
              <DonutChart />
            </div>
            <div className="flex-1 space-y-3">
              {donutSegments.map((seg) => (
                <div key={seg.label} className="flex items-center gap-3">
                  <span className="block rounded-full size-2 shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="flex-1 text-xs text-nodeslix-muted">{seg.label}</span>
                  <span className="text-xs font-bold text-white">{(seg.pct * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </Motion.div>

        {/* AI performance */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          whileHover={{ borderColor: 'rgba(0,212,255,0.25)' }}
          className="flex flex-col gap-4 p-5 surface-card"
        >
          <div>
            <p className="text-xs font-bold text-white">AI Optimization Score</p>
            <p className="text-[10px] text-nodeslix-muted/60 mt-0.5">Rolling efficiency rating per pipeline stage</p>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Telemetry Ingestion',      score: 100, color: '#00D4FF' },
              { label: 'Traffic Optimization',     score: 97,  color: '#3A6DFF' },
              { label: 'Routing Intelligence',     score: 94,  color: '#7CEBFF' },
              { label: 'Predictive Analytics',     score: 91,  color: '#a78bfa' },
              { label: 'Autonomous Orchestration', score: 89,  color: '#f59e0b' },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-[10px] text-nodeslix-muted w-36 shrink-0 truncate">{s.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <Motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: s.score / 100 }}
                    transition={{ duration: 0.7, delay: i * 0.08 + 0.3, ease: 'easeOut' }}
                    style={{ originX: 0, backgroundColor: s.color }}
                    className="h-full rounded-full"
                  />
                </div>
                <span className="text-[10px] font-bold text-white w-8 text-right shrink-0">{s.score}%</span>
              </div>
            ))}
          </div>
        </Motion.div>
      </div>

      {/* Regional breakdown table */}
      <section>
        <p className="mb-1 section-kicker">Regions</p>
        <h2 className="mb-4 text-base font-bold text-white">Regional Performance Breakdown</h2>
        <div className="overflow-hidden surface-card">
          {/* Table header */}
          <div className="grid grid-cols-5 px-4 py-3 border-b border-white/[0.07] text-[10px] font-bold uppercase tracking-widest text-nodeslix-muted/50">
            <span>Region</span>
            <span className="text-right">Throughput</span>
            <span className="text-right">Latency</span>
            <span className="text-right">Uptime</span>
            <span className="text-right">Status</span>
          </div>
          {tableRows.map((row, i) => (
            <Motion.div
              key={row.region}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-5 items-center px-4 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-xs font-semibold text-white">{row.region}</span>
              <span className="text-xs text-right text-nodeslix-muted">{row.throughput}</span>
              <span className="text-xs text-right text-nodeslix-muted">{row.latency}</span>
              <span className="text-xs text-right text-nodeslix-muted">{row.uptime}</span>
              <div className="flex justify-end">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${statusStyle[row.status]}`}>
                  {row.status}
                </span>
              </div>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* Modal Dialog & Backdrop Overlay */}
      <AnimatePresence>
        {isExportModalOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-xs p-4"
            onClick={() => {
              if (!isGenerating) setIsExportModalOpen(false);
            }}
          >
            <Motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.35 }}
              className="w-full max-w-lg bg-[#0C0C0C]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {isGenerating ? (
                /* Generating Progress Mode */
                <div className="flex flex-col items-center justify-center p-8 space-y-6 text-center">
                  <div className="relative flex items-center justify-center">
                    <Motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                      className="size-16 rounded-full border-2 border-t-[#00D4FF] border-r-transparent border-b-[#00D4FF]/20 border-l-transparent"
                    />
                    <div className="absolute size-8 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center">
                      <Loader2 size={16} className="text-[#00D4FF] animate-spin" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="text-base font-extrabold text-white">Generating analytics report...</h3>
                    <p className="text-xs text-nodeslix-muted">Assembling secure client-side enterprise data datasets...</p>
                  </div>
                  
                  <div className="w-full max-w-xs space-y-2">
                    <div className="w-full h-2 overflow-hidden border rounded-full bg-white/5 border-white/10">
                      <Motion.div
                        style={{ width: `${generationProgress}%` }}
                        className="h-full bg-gradient-to-r from-[#00D4FF] to-[#3A6DFF] rounded-full"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-nodeslix-muted px-0.5">
                      <span>{Math.round(generationProgress)}%</span>
                      <span className="animate-pulse text-[#00D4FF]">Compiling</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Report Options Form Mode */
                <div className="p-6 space-y-6 md:p-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-extrabold text-white">Export Analytics Report</h2>
                      <button
                        type="button"
                        onClick={() => setIsExportModalOpen(false)}
                        className="flex items-center justify-center transition-colors border rounded-lg size-7 border-white/5 hover:border-white/15 bg-white/2 hover:bg-white/5 text-nodeslix-muted hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-nodeslix-muted mt-1.5">Choose the format and data range for your report.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Report Format Selector */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-nodeslix-muted uppercase tracking-wider">Report Format</label>
                        <select
                          value={exportFormat}
                          onChange={(e) => setExportFormat(e.target.value)}
                          className="w-full bg-[#151515] border border-white/8 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00D4FF] transition-colors"
                        >
                          <option value="pdf">PDF (Document)</option>
                          <option value="xlsx">Excel (.xlsx)</option>
                          <option value="csv">CSV (Table Data)</option>
                          <option value="json">JSON (Structured)</option>
                        </select>
                      </div>

                      {/* Date Range Selector */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-nodeslix-muted uppercase tracking-wider">Date Range</label>
                        <select
                          value={dateRange}
                          onChange={(e) => setDateRange(e.target.value)}
                          className="w-full bg-[#151515] border border-white/8 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00D4FF] transition-colors"
                        >
                          <option value="Last 24 Hours">Last 24 Hours</option>
                          <option value="Last 7 Days">Last 7 Days</option>
                          <option value="Last 30 Days">Last 30 Days</option>
                          <option value="Last 90 Days">Last 90 Days</option>
                          <option value="Custom">Custom (UI only)</option>
                        </select>
                      </div>
                    </div>

                    {/* Checkbox Sections */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-nodeslix-muted uppercase tracking-wider">Report Sections</label>
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedSections.length === 7) {
                              setSelectedSections([]);
                            } else {
                              setSelectedSections([
                                'Infrastructure Health',
                                'Network Performance',
                                'AI Optimization Metrics',
                                'Traffic Analysis',
                                'Latency Statistics',
                                'Bandwidth Utilization',
                                'Topology Summary'
                              ]);
                            }
                          }}
                          className="text-[9px] font-bold text-[#00D4FF] hover:underline"
                        >
                          {selectedSections.length === 7 ? 'Deselect All' : 'Select All'}
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 bg-[#151515]/60 border border-white/5 rounded-xl p-3.5 max-h-44 overflow-y-auto">
                        {[
                          'Infrastructure Health',
                          'Network Performance',
                          'AI Optimization Metrics',
                          'Traffic Analysis',
                          'Latency Statistics',
                          'Bandwidth Utilization',
                          'Topology Summary'
                        ].map((sec) => {
                          const isChecked = selectedSections.includes(sec);
                          return (
                            <label key={sec} className="flex items-center gap-2.5 cursor-pointer py-1">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  if (isChecked) {
                                    setSelectedSections(selectedSections.filter((s) => s !== sec));
                                  } else {
                                    setSelectedSections([...selectedSections, sec]);
                                  }
                                }}
                                className="sr-only"
                              />
                              <div className={`size-4 rounded border flex items-center justify-center transition-all ${
                                isChecked
                                  ? 'bg-[#00D4FF] border-[#00D4FF] text-black'
                                  : 'border-white/20 bg-transparent text-transparent'
                              }`}>
                                <Check size={10} strokeWidth={4} />
                              </div>
                              <span className="text-[11px] text-nodeslix-muted hover:text-white transition-colors select-none">{sec}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Dialog Controls */}
                  <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setIsExportModalOpen(false)}
                      className="px-4 py-2 text-xs font-bold transition-all border border-white/10 hover:border-white/20 hover:bg-white/5 text-nodeslix-muted hover:text-white rounded-xl"
                    >
                      Cancel
                    </button>
                    <Motion.button
                      type="button"
                      whileHover={isGenerateDisabled ? {} : { y: -2 }}
                      whileTap={isGenerateDisabled ? {} : { scale: 0.98 }}
                      onClick={startGeneration}
                      disabled={isGenerateDisabled}
                      className={`px-4.5 py-2.5 bg-gradient-to-r from-[#00D4FF] to-[#3A6DFF] hover:from-[#1DD9FF] hover:to-[#5A8DFF] text-black font-extrabold rounded-xl text-xs shadow-lg shadow-[#00D4FF]/20 flex items-center gap-2 transition-all ${
                        isGenerateDisabled ? 'opacity-40 cursor-not-allowed' : ''
                      }`}
                    >
                      <Download size={13} />
                      Generate Report
                    </Motion.button>
                  </div>
                </div>
              )}
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Floating Top-Right Success/Error Toasts */}
      <AnimatePresence>
        {toast && (
          <Motion.div
            initial={{ opacity: 0, y: -20, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, x: 50, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`fixed top-6 right-6 z-[100] flex items-center gap-3.5 px-4.5 py-4 rounded-2xl border shadow-2xl backdrop-blur-xl w-80 ${
              toast.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-white'
                : 'bg-red-500/10 border-red-500/20 text-white'
            }`}
          >
            <div className="flex items-center justify-center flex-shrink-0 border size-9 rounded-xl bg-white/5 border-white/10">
              {toast.type === 'success' ? (
                <Check size={18} className="text-emerald-400" />
              ) : (
                <AlertCircle size={18} className="text-red-400" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold leading-tight">{toast.title}</h4>
              <p className="text-[11px] text-nodeslix-muted mt-0.5 leading-normal">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="flex-shrink-0 transition-colors text-nodeslix-muted hover:text-white"
            >
              <X size={14} />
            </button>
          </Motion.div>
        )}
      </AnimatePresence>

      <div className="h-4" />
    </div>
  );
};

export default AnalyticsPage;
