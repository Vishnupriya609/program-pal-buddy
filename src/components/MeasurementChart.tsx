import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MeasurementChartProps {
  data?: Array<{ state: string; probability: number }>;
}

const MeasurementChart = ({ data }: MeasurementChartProps) => {
  const defaultData = [
    { state: '|000⟩', probability: 50 },
    { state: '|001⟩', probability: 0 },
    { state: '|010⟩', probability: 0 },
    { state: '|011⟩', probability: 0 },
    { state: '|100⟩', probability: 0 },
    { state: '|101⟩', probability: 0 },
    { state: '|110⟩', probability: 0 },
    { state: '|111⟩', probability: 50 },
  ];

  const chartData = data || defaultData;

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Measurement Probabilities</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.2)" />
          <XAxis 
            dataKey="state" 
            stroke="hsl(var(--foreground))"
            style={{ fontSize: '0.875rem' }}
          />
          <YAxis 
            stroke="hsl(var(--foreground))"
            style={{ fontSize: '0.875rem' }}
            label={{ value: 'Probability (%)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--primary) / 0.3)',
              borderRadius: '8px'
            }}
          />
          <Bar 
            dataKey="probability" 
            fill="hsl(var(--primary))" 
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MeasurementChart;
