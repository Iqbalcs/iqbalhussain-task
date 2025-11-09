import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import HealthRecordForm from '@/components/HealthRecordForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addRecord, updateRecord, deleteRecord, HealthRecord } from '@/store/healthRecordsSlice';
import { toast } from 'sonner';

const Records = () => {
  const dispatch = useAppDispatch();
  const records = useAppSelector(state => state.healthRecords.records);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<HealthRecord | undefined>();
  const [deletingId, setDeletingId] = useState<string>('');

  const handleAdd = () => {
    setEditingRecord(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (record: HealthRecord) => {
    setEditingRecord(record);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteRecord(deletingId));
    toast.success('Record deleted successfully');
    setIsDeleteDialogOpen(false);
    setDeletingId('');
  };

  const handleSubmit = (data: HealthRecord) => {
    if (editingRecord) {
      dispatch(updateRecord(data));
      toast.success('Record updated successfully');
    } else {
      dispatch(addRecord(data));
      toast.success('Record added successfully');
    }
    setIsFormOpen(false);
    setEditingRecord(undefined);
  };

  const calculateBMI = (weight: number, height: number) => {
    return (weight / ((height / 100) ** 2)).toFixed(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Health Records</h1>
          <p className="text-muted-foreground">Manage your health data</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Record
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Heart Rate</TableHead>
              <TableHead>BP (S/D)</TableHead>
              <TableHead>Glucose</TableHead>
              <TableHead>BMI</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.date}</TableCell>
                <TableCell>{record.heartRate} bpm</TableCell>
                <TableCell>
                  {record.bloodPressureSystolic}/{record.bloodPressureDiastolic}
                </TableCell>
                <TableCell>{record.glucose} mg/dL</TableCell>
                <TableCell>{calculateBMI(record.weight, record.height)}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {record.notes || '-'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(record)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(record.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRecord ? 'Edit Health Record' : 'Add Health Record'}
            </DialogTitle>
          </DialogHeader>
          <HealthRecordForm
            record={editingRecord}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingRecord(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the health record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Records;
