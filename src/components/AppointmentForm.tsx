import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Appointment {
  id: string;
  patientId: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface AppointmentFormProps {
  onSuccess: () => void;
  appointment?: Appointment; // Optional for editing
}

const AppointmentForm = ({ onSuccess, appointment }: AppointmentFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    doctorName: '',
    date: '',
    time: '',
    reason: '',
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (appointment) {
      setFormData({
        doctorName: appointment.doctorName,
        date: appointment.date,
        time: appointment.time,
        reason: appointment.reason,
      });
    }
  }, [appointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.doctorName || !formData.date || !formData.time || !formData.reason) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    const appointments: Appointment[] = JSON.parse(localStorage.getItem('appointments') || '[]');

    if (appointment) {
      // Editing existing appointment
      const updatedAppointments = appointments.map((apt) =>
        apt.id === appointment.id
          ? { ...apt, ...formData } // update fields
          : apt
      );
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

      toast({
        title: 'Appointment Updated',
        description: `Your appointment with Dr. ${formData.doctorName} has been updated.`,
      });
    } else {
      // Creating new appointment
      const newAppointment: Appointment = {
        id: crypto.randomUUID(),
        patientId: user?.id || '',
        ...formData,
        status: 'scheduled',
      };
      appointments.push(newAppointment);
      localStorage.setItem('appointments', JSON.stringify(appointments));

      toast({
        title: 'Appointment Booked',
        description: `Your appointment with Dr. ${formData.doctorName} has been scheduled for ${new Date(formData.date).toLocaleDateString()} at ${formData.time}`,
      });
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="doctorName">Doctor Name</Label>
        <Input
          id="doctorName"
          placeholder="Dr. Smith"
          value={formData.doctorName}
          onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          min={new Date().toISOString().split('T')[0]}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="time">Time</Label>
        <Input
          id="time"
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reason">Reason for Visit</Label>
        <Textarea
          id="reason"
          placeholder="Describe your symptoms or reason for visit"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          required
          rows={3}
        />
      </div>
      <Button type="submit" className="w-full">
        {appointment ? 'Update Appointment' : 'Book Appointment'}
      </Button>
    </form>
  );
};

export default AppointmentForm;
