import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { HealthRecord } from '@/store/healthRecordsSlice';

const formSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  heartRate: z.coerce.number().min(40, 'Must be at least 40').max(200, 'Must be at most 200'),
  bloodPressureSystolic: z.coerce.number().min(70, 'Must be at least 70').max(200, 'Must be at most 200'),
  bloodPressureDiastolic: z.coerce.number().min(40, 'Must be at least 40').max(130, 'Must be at most 130'),
  glucose: z.coerce.number().min(50, 'Must be at least 50').max(300, 'Must be at most 300'),
  weight: z.coerce.number().min(30, 'Must be at least 30').max(300, 'Must be at most 300'),
  height: z.coerce.number().min(100, 'Must be at least 100').max(250, 'Must be at most 250'),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface HealthRecordFormProps {
  record?: HealthRecord;
  onSubmit: (data: HealthRecord) => void;
  onCancel: () => void;
}

const HealthRecordForm = ({ record, onSubmit, onCancel }: HealthRecordFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: record?.date || new Date().toISOString().split('T')[0],
      heartRate: record?.heartRate || 72,
      bloodPressureSystolic: record?.bloodPressureSystolic || 120,
      bloodPressureDiastolic: record?.bloodPressureDiastolic || 80,
      glucose: record?.glucose || 95,
      weight: record?.weight || 70,
      height: record?.height || 175,
      notes: record?.notes || '',
    },
  });

  const handleSubmit = (values: FormValues) => {
    const healthRecord: HealthRecord = {
      id: record?.id || Date.now().toString(),
      date: values.date,
      heartRate: values.heartRate,
      bloodPressureSystolic: values.bloodPressureSystolic,
      bloodPressureDiastolic: values.bloodPressureDiastolic,
      glucose: values.glucose,
      weight: values.weight,
      height: values.height,
      notes: values.notes,
    };
    onSubmit(healthRecord);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="heartRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heart Rate (bpm)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="72" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bloodPressureSystolic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Pressure - Systolic (mmHg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="120" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bloodPressureDiastolic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Pressure - Diastolic (mmHg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="80" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="glucose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Glucose (mg/dL)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="95" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="70" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="175" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Add any additional notes..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {record ? 'Update Record' : 'Add Record'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HealthRecordForm;
