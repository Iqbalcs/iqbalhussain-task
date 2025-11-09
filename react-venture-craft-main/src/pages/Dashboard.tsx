import { Activity, Heart, Droplet, Scale } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import HealthChart from '@/components/HealthChart';
import { useAppSelector } from '@/store/hooks';

const Dashboard = () => {
  const records = useAppSelector(state => state.healthRecords.records);
  
  const latestRecord = records[0];
  const bmi = latestRecord 
    ? (latestRecord.weight / ((latestRecord.height / 100) ** 2)).toFixed(1)
    : '0.0';

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return 'warning';
    if (bmi >= 18.5 && bmi < 25) return 'normal';
    if (bmi >= 25 && bmi < 30) return 'warning';
    return 'danger';
  };

  const getHeartRateStatus = (hr: number) => {
    if (hr < 60 || hr > 100) return 'warning';
    return 'normal';
  };

  const getBloodPressureStatus = (sys: number, dia: number) => {
    if (sys > 140 || dia > 90) return 'danger';
    if (sys > 130 || dia > 80) return 'warning';
    return 'normal';
  };

  const getGlucoseStatus = (glucose: number) => {
    if (glucose < 70 || glucose > 140) return 'danger';
    if (glucose > 100) return 'warning';
    return 'normal';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Health Dashboard</h1>
        <p className="text-muted-foreground">Your latest health metrics at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Heart Rate"
          value={latestRecord?.heartRate.toString() || '0'}
          unit="bpm"
          icon={Heart}
          status={latestRecord ? getHeartRateStatus(latestRecord.heartRate) : 'normal'}
          trend={2.5}
        />
        <MetricCard
          title="Blood Pressure"
          value={latestRecord ? `${latestRecord.bloodPressureSystolic}/${latestRecord.bloodPressureDiastolic}` : '0/0'}
          unit="mmHg"
          icon={Activity}
          status={latestRecord ? getBloodPressureStatus(latestRecord.bloodPressureSystolic, latestRecord.bloodPressureDiastolic) : 'normal'}
          trend={-1.2}
        />
        <MetricCard
          title="Glucose"
          value={latestRecord?.glucose.toString() || '0'}
          unit="mg/dL"
          icon={Droplet}
          status={latestRecord ? getGlucoseStatus(latestRecord.glucose) : 'normal'}
          trend={0.8}
        />
        <MetricCard
          title="BMI"
          value={bmi}
          unit="kg/m²"
          icon={Scale}
          status={getBMIStatus(parseFloat(bmi))}
          trend={-0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthChart metric="heartRate" title="Heart Rate Trends" />
        <HealthChart metric="bloodPressure" title="Blood Pressure Trends" />
        <HealthChart metric="glucose" title="Glucose Trends" />
        <HealthChart metric="bmi" title="BMI Trends" />
      </div>
    </div>
  );
};

export default Dashboard;
