import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Pet } from "@/components/petform";

export interface Appointment {
  id: string;
  patientId: string;
  petId: string;
  petName: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}


interface AppointmentFormProps {
  onSuccess: () => void;
  appointment?: Appointment;       // For editing
  pet?: Pet; // NEW: pet passed from dashboard
}

const AppointmentForm = ({ onSuccess, appointment, pet }: AppointmentFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    doctorName: '',
    date: '',
    time: '',
    reason: '',
  });

  // Pre-fill when editing appointment
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

    // Validation
    if (!formData.doctorName || !formData.date || !formData.time || !formData.reason) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    const appointments: Appointment[] =
      JSON.parse(localStorage.getItem('appointments') || '[]');

    // EDITING MODE
    if (appointment) {
      const updatedAppointments = appointments.map((apt) =>
        apt.id === appointment.id
          ? { ...apt, ...formData }
          : apt
      );

      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

      toast({
        title: 'Appointment Updated',
        description: `Your appointment with Dr. ${formData.doctorName} has been updated.`,
      });

      onSuccess();
      return;
    }

    // **CREATING NEW APPOINTMENT**
    if (!pet) {
      toast({
        title: 'Pet Missing',
        description: 'Could not find pet information.',
        variant: 'destructive',
      });
      return;
    }

    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      patientId: user?.id || '',
      petId: pet.id,
      petName: pet.name,
      doctorName: formData.doctorName,
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
      status: 'scheduled',
    };

    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    toast({
      title: 'Appointment Booked',
      description: `Appointment booked for ${pet.name} with Dr. ${formData.doctorName}.`,
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Show selected pet (READ ONLY) */}
      {pet && (
        <div className="space-y-1 p-3 rounded-md bg-muted">
          <p className="text-sm text-muted-foreground">Booking for:</p>
          <p className="font-semibold">{pet.name}</p>
        </div>
      )}

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
          placeholder="Describe the issue or reason"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          rows={3}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        {appointment ? 'Update Appointment' : 'Book Appointment'}
      </Button>
    </form>
  );
};

export default AppointmentForm;
