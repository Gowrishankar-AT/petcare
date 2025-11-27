import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, ChevronRight } from 'lucide-react';
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

  // ------------------------
  // LOAD APPOINTMENTS
  // ------------------------
  useEffect(() => {
    if (!user) return;

    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const userAppointments = storedAppointments.filter(
      (apt: Appointment) => apt.patientId === user.id
    );

    setAppointments(userAppointments);
  }, [user]);

  // ------------------------
  // SORTED + GROUPED LOGIC
  // ------------------------
  const { upcoming, past, nextAppointment } = useMemo(() => {
    const now = new Date();

    const upcomingAppointments = appointments
      .filter((a) => a.status === 'scheduled' && new Date(`${a.date}T${a.time}`) > now)
      .sort(
        (a, b) =>
          new Date(`${a.date}T${a.time}`).getTime() -
          new Date(`${b.date}T${b.time}`).getTime()
      );

    const pastAppointments = appointments
      .filter(
        (a) =>
          a.status !== 'scheduled' ||
          new Date(`${a.date}T${a.time}`) <= now
      )
      .sort(
        (a, b) =>
          new Date(`${b.date}T${b.time}`).getTime() -
          new Date(`${a.date}T${a.time}`).getTime()
      );

    return {
      upcoming: upcomingAppointments,
      past: pastAppointments,
      nextAppointment: upcomingAppointments[0] || null
    };
  }, [appointments]);

  // ------------------------
  // HELPERS
  // ------------------------
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-primary text-primary-foreground';
      case 'completed':
        return 'bg-green-600 text-white';
      case 'cancelled':
        return 'bg-red-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRelativeLabel = (date: string, time: string) => {
    const target = new Date(`${date}T${time}`);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    if (days > 1) return `In ${days} days`;

    return "";
  };

  const handleAppointmentBooked = () => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const userAppointments = storedAppointments.filter((apt: Appointment) => apt.patientId === user?.id);
    setAppointments(userAppointments);
    setIsDialogOpen(false);
    setSelectedAppointment(null);
  };

  const handleEditClick = (apt: Appointment) => {
    setSelectedAppointment(apt);
    setIsDialogOpen(true);
  };

  const handleCancelClick = (apt: Appointment) => {
    const target = new Date(`${apt.date}T${apt.time}`);
    if (target.getTime() - new Date().getTime() <= 24 * 60 * 60 * 1000) {
      alert("You can only cancel appointments more than 24 hours in advance.");
      return;
    }

    const stored = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updated = stored.map((a: Appointment) =>
      a.id === apt.id ? { ...a, status: 'cancelled' } : a
    );

    localStorage.setItem('appointments', JSON.stringify(updated));
    handleAppointmentBooked();
  };

  // ------------------------
  // UI RENDER
  // ------------------------
  return (
    <Layout title="My Appointments">
      <div className="space-y-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Hello, {user?.name} 👋</h2>
            <p className="text-muted-foreground">Here are your appointments</p>
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
                <DialogTitle>
                  {selectedAppointment ? "Edit Appointment" : "New Appointment"}
                </DialogTitle>
                <DialogDescription>
                  Fill in the details below.
                </DialogDescription>
              </DialogHeader>

              {/* <AppointmentForm
                appointment={selectedAppointment || undefined}
                onSuccess={handleAppointmentBooked}
              /> */}
            </DialogContent>
          </Dialog>
        </div>

        {/* ========================= */}
        {/* NEXT UPCOMING APPOINTMENT */}
        {/* ========================= */}
        {nextAppointment && (
          <Card className="border-primary/40 shadow-sm">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Next Appointment</CardTitle>
                <CardDescription>
                  With Dr. {nextAppointment.doctorName}
                </CardDescription>
              </div>
              <ChevronRight className="text-muted-foreground" />
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(nextAppointment.date).toLocaleDateString()}</span>
                <Badge>{getRelativeLabel(nextAppointment.date, nextAppointment.time)}</Badge>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{nextAppointment.time}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ========================= */}
        {/* UPCOMING APPOINTMENTS */}
        {/* ========================= */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>

          {upcoming.length === 0 ? (
            <p className="text-muted-foreground text-sm">No upcoming appointments.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {upcoming.map((apt) => (
                <Card key={apt.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg">Dr. {apt.doctorName}</CardTitle>
                        <CardDescription>{apt.reason}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(apt.status)}>{apt.status}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(apt.date).toLocaleDateString()}</span>
                      <Badge variant="secondary">{getRelativeLabel(apt.date, apt.time)}</Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{apt.time}</span>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditClick(apt)}>
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleCancelClick(apt)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* ========================= */}
        {/* PAST APPOINTMENTS */}
        {/* ========================= */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Past Appointments</h3>

          {past.length === 0 ? (
            <p className="text-muted-foreground text-sm">No past appointments.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {past.map((apt) => (
                <Card key={apt.id} className="opacity-80">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg">Dr. {apt.doctorName}</CardTitle>
                        <CardDescription>{apt.reason}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(apt.status)}>{apt.status}</Badge>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default AppointmentPage;
