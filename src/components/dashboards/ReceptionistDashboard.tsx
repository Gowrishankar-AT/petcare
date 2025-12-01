// ReceptionistDashboard.tsx
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Layout from "../Layout";

const monthlyStats = [
  { month: "Jan", patients: 120, satisfaction: 78 },
  { month: "Feb", patients: 150, satisfaction: 82 },
  { month: "Mar", patients: 180, satisfaction: 85 },
  { month: "Apr", patients: 160, satisfaction: 80 },
  { month: "May", patients: 200, satisfaction: 88 },
  { month: "Jun", patients: 220, satisfaction: 90 },
  { month: "Jul", patients: 250, satisfaction: 92 },
];

const petTypeData = [
  { name: "Dogs", value: 55 },
  { name: "Cats", value: 30 },
  { name: "Birds", value: 10 },
  { name: "Others", value: 5 },
];

const COLORS = ["#6366f1", "#22c55e", "#f43f5e", "#f59e0b"];

const treatments = [
  { name: "Vaccination", percentage: 80, color: "bg-indigo-500" },
  { name: "Deworming", percentage: 65, color: "bg-green-500" },
  { name: "Dental Care", percentage: 50, color: "bg-rose-500" },
  { name: "X-Ray", percentage: 35, color: "bg-yellow-500" },
];

const modules = [
  { name: "Appointment Management", description: "Manage all customer appointments", page:"adminapp" },
  { name: "Customer Management", description: "View and manage customer information", page:"custmgm" },
  { name: "Pet Management", description: "Track pet details and medical history", page:"pets" },
  { name: "Staff Management", description: "Manage doctors, receptionists, and staff", page:"staff" },
  { name: "Treatment & Services", description: "Manage treatments, services, and pricing", page:"treatment" },
];

const staff = [
  { name: "Dr. Olivia Hart", specialty: "Surgery", avatar: "/avatar1.png" },
  { name: "Dr. Liam Carter", specialty: "Dermatology", avatar: "/avatar2.png" },
  { name: "Dr. Sophia Lane", specialty: "General Vet", avatar: "/avatar3.png" },
];

const ReceptionistDashboard = () => {
  const navigate = useNavigate();
  return (
    <Layout title="Dashboard">
    <div className="p-6 md:p-10 space-y-10">
       <div className="p-6 md:p-10">
      <h1 className="text-2xl font-bold mb-6">Admin Modules</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, i) => (
          <Card
            key={i}
            className="shadow-lg border rounded-xl hover:scale-105 transform transition cursor-pointer"
          >
            <CardHeader onClick={() => navigate(`/${module.page}`)}>
              <CardTitle className="text-lg font-semibold">{module.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">{module.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

      {/* ======================= TOP STATS ======================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Patients",
            value: "3,240",
            trend: "+12%",
            desc: "Compared to last month",
          },
          {
            title: "New Appointments",
            value: "420",
            trend: "+8%",
            desc: "From last month",
          },
          {
            title: "Surgical Procedures",
            value: "78",
            trend: "-5%",
            desc: "From last month",
          },
          {
            title: "Overall Visitors",
            value: "9,820",
            trend: "+20%",
            desc: "From last month",
          },
          
        ].map((stat, i) => (
          <Card key={i} className="shadow-sm border rounded-xl">
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm flex items-center gap-2">
                <span
                  className={`font-medium ${
                    stat.trend.includes("-") ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {stat.trend}
                </span>
                <span className="text-gray-400">{stat.desc}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ======================= MIDDLE CHART SECTION ======================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <Card className="lg:col-span-2 shadow-sm border rounded-xl">
          <CardHeader>
            <CardTitle>Patient Statistics</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyStats}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="patients"
                  stroke="#6366f1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie / Donut Chart */}
        <Card className="shadow-sm border rounded-xl">
          <CardHeader>
            <CardTitle>Patients by Type</CardTitle>
          </CardHeader>
          <CardContent className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={petTypeData}
                  innerRadius={60}
                  outerRadius={95}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {petTypeData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ======================= BOTTOM SECTION ======================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Top Treatments */}
        <Card className="shadow-sm border rounded-xl">
          <CardHeader>
            <CardTitle>Top Treatments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {treatments.map((t, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-sm text-gray-500">{t.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-full rounded-full ${t.color}`}
                    style={{ width: `${t.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Staff */}
        <Card className="shadow-sm border rounded-xl">
          <CardHeader>
            <CardTitle>Staff</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {staff.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={s.avatar} />
                  <AvatarFallback>{s.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-gray-500">{s.specialty}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Satisfaction Rate */}
        <Card className="shadow-sm border rounded-xl">
          <CardHeader>
            <CardTitle>Satisfaction Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-4">92%</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyStats}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="satisfaction"
                    stroke="#22c55e"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
    </Layout>
  );
};

export default ReceptionistDashboard;
