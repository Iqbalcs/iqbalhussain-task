import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HealthRecord {
  id: string;
  date: string;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  glucose: number;
  weight: number;
  height: number;
  notes?: string;
}

interface HealthRecordsState {
  records: HealthRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: HealthRecordsState = {
  records: [
    {
      id: '1',
      date: '2025-01-01',
      heartRate: 72,
      bloodPressureSystolic: 120,
      bloodPressureDiastolic: 80,
      glucose: 95,
      weight: 70,
      height: 175,
      notes: 'Feeling good'
    },
    {
      id: '2',
      date: '2025-01-05',
      heartRate: 75,
      bloodPressureSystolic: 118,
      bloodPressureDiastolic: 78,
      glucose: 92,
      weight: 69.5,
      height: 175,
      notes: 'Morning checkup'
    },
    {
      id: '3',
      date: '2025-01-10',
      heartRate: 68,
      bloodPressureSystolic: 122,
      bloodPressureDiastolic: 82,
      glucose: 98,
      weight: 70.2,
      height: 175,
      notes: 'After exercise'
    },
  ],
  loading: false,
  error: null,
};

const healthRecordsSlice = createSlice({
  name: 'healthRecords',
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<HealthRecord>) => {
      state.records.unshift(action.payload);
    },
    updateRecord: (state, action: PayloadAction<HealthRecord>) => {
      const index = state.records.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.records[index] = action.payload;
      }
    },
    deleteRecord: (state, action: PayloadAction<string>) => {
      state.records = state.records.filter(r => r.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addRecord, updateRecord, deleteRecord, setLoading, setError } = healthRecordsSlice.actions;
export default healthRecordsSlice.reducer;
