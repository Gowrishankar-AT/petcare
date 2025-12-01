// pages/staff.tsx
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ------------------ Types ------------------
type Staff = {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "Active" | "On Leave" | "Inactive";
};

// ------------------ Dummy Data ------------------
const sampleStaff: Staff[] = [
  { id: 1, name: "Dr. Emily Carter", role: "Veterinarian", email: "emily@petcare.com", phone: "555-1231", status: "Active" },
  { id: 2, name: "Mark Johnson", role: "Groomer", email: "mark@petcare.com", phone: "555-6443", status: "On Leave" },
  { id: 3, name: "Sarah Lee", role: "Receptionist", email: "sarah@petcare.com", phone: "555-7721", status: "Active" },
  { id: 4, name: "David Wright", role: "Trainer", email: "david@petcare.com", phone: "555-9981", status: "Inactive" },
  { id: 5, name: "Anna Torres", role: "Assistant Vet", email: "anna@petcare.com", phone: "555-4459", status: "Active" },
];

// Status badge colors
const statusColors = {
  Active: "bg-green-100 text-green-700",
  "On Leave": "bg-yellow-100 text-yellow-700",
  Inactive: "bg-red-100 text-red-700",
};

const StaffPage = () => {
  const [staff] = useState(sampleStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] =
    useState<"active" | "leave" | "inactive" | "all">("all");

  // ---------- Filter Logic ----------
  const filteredByStatus = staff.filter((s) => {
    if (filterType === "active") return s.status === "Active";
    if (filterType === "leave") return s.status === "On Leave";
    if (filterType === "inactive") return s.status === "Inactive";
    return true; // all
  });

  const finalFilteredStaff = filteredByStatus.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats
  const activeCount = staff.filter((s) => s.status === "Active").length;
  const leaveCount = staff.filter((s) => s.status === "On Leave").length;
  const inactiveCount = staff.filter((s) => s.status === "Inactive").length;
  const totalCount = staff.length;

  const cardStyle =
    "shadow-md border rounded-xl cursor-pointer hover:shadow-lg transition";

  return (
    <Layout title="Staff Management">
      <div className="p-6 md:p-10 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <input
            type="text"
            placeholder="Search by name, role, email or phone"
            className="border rounded-lg px-4 py-2 w-80 focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ---------- STAT CARDS ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <Card className={cardStyle} onClick={() => setFilterType("active")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Active Staff</p>
              <h2 className="text-3xl font-bold mt-2">{activeCount}</h2>
            </CardContent>
          </Card>

          <Card className={cardStyle} onClick={() => setFilterType("leave")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">On Leave</p>
              <h2 className="text-3xl font-bold mt-2">{leaveCount}</h2>
            </CardContent>
          </Card>

          <Card className={cardStyle} onClick={() => setFilterType("inactive")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Inactive</p>
              <h2 className="text-3xl font-bold mt-2">{inactiveCount}</h2>
            </CardContent>
          </Card>

          <Card className={cardStyle} onClick={() => setFilterType("all")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Total Staff</p>
              <h2 className="text-3xl font-bold mt-2">{totalCount}</h2>
            </CardContent>
          </Card>

        </div>

        {/* ---------- STAFF TABLE ---------- */}
        <Card className="shadow-sm border rounded-xl">
          <CardHeader>
            <CardTitle>
              {filterType === "active" && "Active Staff"}
              {filterType === "leave" && "Staff on Leave"}
              {filterType === "inactive" && "Inactive Staff"}
              {filterType === "all" && "All Staff"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {finalFilteredStaff.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">{s.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{s.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{s.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{s.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[s.status]}`}
                        >
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {finalFilteredStaff.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-gray-400">
                        No staff found.
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

export default StaffPage;
