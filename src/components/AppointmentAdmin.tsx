// pages/appointments.tsx
import React, { useState } from "react";
import Layout from "./Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Appointment = {
  id: number;
  customer: string;
  pet: string;
  date: string;
  time: string;
  treatment: string;
  status: "Upcoming" | "Completed" | "Cancelled";
};

const sampleAppointments: Appointment[] = [
  { id: 1, customer: "John Doe", pet: "Buddy", date: "2025-12-01", time: "10:00 AM", treatment: "Vaccination", status: "Upcoming" },
  { id: 2, customer: "Emma Smith", pet: "Mittens", date: "2025-12-02", time: "11:30 AM", treatment: "Deworming", status: "Completed" },
  { id: 3, customer: "Liam Brown", pet: "Charlie", date: "2025-12-01", time: "02:00 PM", treatment: "Dental Care", status: "Cancelled" },
  { id: 4, customer: "Olivia Johnson", pet: "Coco", date: "2025-12-04", time: "09:00 AM", treatment: "X-Ray", status: "Upcoming" },
  { id: 5, customer: "Sophia Wilson", pet: "Luna", date: "2025-12-01", time: "03:00 PM", treatment: "Surgery", status: "Completed" },
];

const statusColors = {
  Upcoming: "bg-indigo-100 text-indigo-700",
  Completed: "bg-green-100 text-green-700",
  Canceled: "bg-red-100 text-red-700",
};

const AppointmentsPage = () => {
  const [appointments] = useState(sampleAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"today" | "upcoming" | "completed" | "cancelled" | "all">("all");

  // Today's date
  const today = "2025-12-01";

  // ---- Filter Logic ----
  const filteredByType = appointments.filter((a) => {
    if (filterType === "today") return a.date === today;
    if (filterType === "upcoming") return a.status === "Upcoming";
    if (filterType === "completed") return a.status === "Completed";
    if (filterType === "cancelled") return a.status === "Cancelled";
    return true; // all
  });

  // search filter applied on top of type filter
  const finalFilteredAppointments = filteredByType.filter(
    (a) =>
      a.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.pet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats Count
  const todaysCount = appointments.filter((a) => a.date === today).length;
  const upcomingCount = appointments.filter((a) => a.status === "Upcoming").length;
  const completedCount = appointments.filter((a) => a.status === "Completed").length;
  const canceledCount = appointments.filter((a) => a.status === "Cancelled").length;

  // Style for clickable cards
  const cardStyle = "shadow-md border rounded-xl cursor-pointer hover:shadow-lg transition";

  return (
    <Layout title="Appointments">
      <div className="p-6 md:p-10 space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <input
            type="text"
            placeholder="Search by customer or pet"
            className="border rounded-lg px-4 py-2 w-80 focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ---------- CLICKABLE STAT CARDS ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

          <Card className={cardStyle} onClick={() => setFilterType("today")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Today's Appointments</p>
              <h2 className="text-3xl font-bold mt-2">{todaysCount}</h2>
            </CardContent>
          </Card>

          <Card className={cardStyle} onClick={() => setFilterType("upcoming")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Upcoming</p>
              <h2 className="text-3xl font-bold mt-2">{upcomingCount}</h2>
            </CardContent>
          </Card>

          <Card className={cardStyle} onClick={() => setFilterType("completed")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Completed</p>
              <h2 className="text-3xl font-bold mt-2">{completedCount}</h2>
            </CardContent>
          </Card>

          <Card className={cardStyle} onClick={() => setFilterType("cancelled")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Cancelled</p>
              <h2 className="text-3xl font-bold mt-2">{canceledCount}</h2>
            </CardContent>
          </Card>

          <Card className={cardStyle} onClick={() => setFilterType("all")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Total</p>
              <h2 className="text-3xl font-bold mt-2">{appointments.length}</h2>
            </CardContent>
          </Card>

        </div>

        {/* ---------- APPOINTMENTS TABLE ---------- */}
        <Card className="shadow-sm border rounded-xl">
          <CardHeader>
            <CardTitle>
              {filterType === "today" && "Today's Appointments"}
              {filterType === "upcoming" && "Upcoming Appointments"}
              {filterType === "completed" && "Completed Appointments"}
              {filterType === "cancelled" && "Canceled Appointments"}
              {filterType === "all" && "All Appointments"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pet</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Treatment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {finalFilteredAppointments.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">{a.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{a.pet}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{a.treatment}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{a.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{a.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[a.status]}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {finalFilteredAppointments.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-gray-400">
                        No appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </Layout>
  );
};

export default AppointmentsPage;
