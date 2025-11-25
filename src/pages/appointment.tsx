import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus } from 'lucide-react';
import AppointmentForm from '@/components/AppointmentForm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Appointment {
  id: string;
  patientId: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const AppointmentPage = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const userAppointments = storedAppointments.filter((apt: Appointment) => apt.patientId === user?.id);
    setAppointments(userAppointments);
  }, [user]);

  const handleAppointmentBooked = () => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const userAppointments = storedAppointments.filter((apt: Appointment) => apt.patientId === user?.id);
    setAppointments(userAppointments);
    setIsDialogOpen(false);
    setSelectedAppointment(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-primary text-primary-foreground';
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleEditClick = (apt: Appointment) => {
    setSelectedAppointment(apt);
    setIsDialogOpen(true);
  };

  const handleCancelClick = (apt: Appointment) => {
    const appointmentDateTime = new Date(`${apt.date}T${apt.time}`);
    if (appointmentDateTime.getTime() - new Date().getTime() <= 24 * 60 * 60 * 1000) {
      alert("You can only cancel appointments more than 24 hours in advance.");
      return;
    }

    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = storedAppointments.map((a: Appointment) =>
      a.id === apt.id ? { ...a, status: 'cancelled' } : a
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    handleAppointmentBooked();
  };

  return (
    <Layout title="My Appointments">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Welcome, {user?.name}!</h2>
            <p className="text-muted-foreground">Manage your appointments</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {selectedAppointment ? "Edit Appointment" : "Book Appointment"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{selectedAppointment ? "Edit Appointment" : "Book New Appointment"}</DialogTitle>
                <DialogDescription>
                  Fill in the details {selectedAppointment ? "to update your appointment" : "to book your appointment"}
                </DialogDescription>
              </DialogHeader>
              <AppointmentForm
                appointment={selectedAppointment || undefined}
                onSuccess={handleAppointmentBooked}
              />
            </DialogContent>
          </Dialog>
        </div>

        {appointments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No appointments yet</p>
              <Button onClick={() => setIsDialogOpen(true)}>Book Your First Appointment</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {appointments.map((apt) => {
              const appointmentDateTime = new Date(`${apt.date}T${apt.time}`);
              const canCancel = appointmentDateTime.getTime() - new Date().getTime() > 24 * 60 * 60 * 1000;
              const isDisabled = apt.status === 'cancelled'; // disable buttons if cancelled

              return (
                <Card key={apt.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Dr. {apt.doctorName}</CardTitle>
                        <CardDescription>{apt.reason}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(apt.status)}>
                        {apt.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(apt.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{apt.time}</span>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(apt)}
                        disabled={isDisabled} // disable if cancelled
                      >
                        Edit
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={!canCancel || isDisabled} // disable if cancelled or within 24h
                        onClick={() => handleCancelClick(apt)}
                      >
                        Cancel
                      </Button>
                    </div>
                    {!canCancel && !isDisabled && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Cannot cancel within 24 hours of the appointment
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AppointmentPage;
