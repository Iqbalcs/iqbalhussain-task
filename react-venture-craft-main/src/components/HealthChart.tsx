import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';

interface HealthChartProps {
  metric: 'heartRate' | 'bloodPressure' | 'glucose' | 'bmi';
  title: string;
}

const HealthChart = ({ metric, title }: HealthChartProps) => {
  const records = useAppSelector(state => state.healthRecords.records);
  const theme = useAppSelector(state => state.theme.mode);

  const chartData = [...records]
    .reverse()
    .map(record => {
      const bmi = record.weight / ((record.height / 100) ** 2);
      
      if (metric === 'heartRate') {
        return { date: record.date, value: record.heartRate };
      } else if (metric === 'bloodPressure') {
        return { 
          date: record.date, 
          systolic: record.bloodPressureSystolic,
          diastolic: record.bloodPressureDiastolic,
        };
      } else if (metric === 'glucose') {
        return { date: record.date, value: record.glucose };
      } else {
        return { date: record.date, value: parseFloat(bmi.toFixed(1)) };
      }
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis 
              dataKey="date" 
              stroke={theme === 'dark' ? '#94a3b8' : '#64748b'}
              fontSize={12}
            />
            <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            {metric === 'bloodPressure' ? (
              <>
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                  name="Systolic"
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--secondary))' }}
                  name="Diastolic"
                />
              </>
            ) : (
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HealthChart;
