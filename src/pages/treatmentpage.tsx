// pages/treatments.tsx
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ------------------ Types ------------------
type Treatment = {
  id: number;
  name: string;
  category: string;
  staff: string;
  duration: string;
  slots: number;
  price: number;
  status: "Active" | "Unavailable";
};

// ------------------ Dummy Data ------------------
const sampleTreatments: Treatment[] = [
  { id: 1, name: "Basic Grooming", category: "Grooming", staff: "Mark Johnson", duration: "45 mins", slots: 5, price: 30, status: "Active" },
  { id: 2, name: "Vaccination", category: "Medical", staff: "Dr. Emily Carter", duration: "15 mins", slots: 10, price: 50, status: "Active" },
  { id: 3, name: "Dental Cleaning", category: "Medical", staff: "Dr. Emily Carter", duration: "60 mins", slots: 3, price: 120, status: "Unavailable" },
  { id: 4, name: "Full Grooming", category: "Grooming", staff: "Mark Johnson", duration: "90 mins", slots: 2, price: 80, status: "Active" },
  { id: 5, name: "X-Ray Diagnosis", category: "Diagnostics", staff: "Anna Torres", duration: "20 mins", slots: 6, price: 70, status: "Unavailable" },
];

// Status badge colors
const statusColors = {
  Active: "bg-green-100 text-green-700",
  Unavailable: "bg-red-100 text-red-700",
};

const TreatmentPage = () => {
  const [treatments] = useState(sampleTreatments);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] =
    useState<"active" | "inactive" | "all">("all");

  // ---------- Filter Logic ----------
  const filteredByStatus = treatments.filter((t) => {
    if (filterType === "active") return t.status === "Active";
    if (filterType === "inactive") return t.status === "Unavailable";
    return true; // all
  });

  const finalFilteredTreatments = filteredByStatus.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.staff.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats
  const activeCount = treatments.filter((t) => t.status === "Active").length;
  const unavailableCount = treatments.filter((t) => t.status === "Unavailable").length;
  const totalCount = treatments.length;

  const cardStyle =
    "shadow-md border rounded-xl cursor-pointer hover:shadow-lg transition";

  return (
    <Layout title="Treatment & Services Management">
      <div className="p-6 md:p-10 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">Treatment & Services</h1>
          <input
            type="text"
            placeholder="Search by name, category or staff"
            className="border rounded-lg px-4 py-2 w-80 focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ---------- STAT CARDS ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <Card className={cardStyle} onClick={() => setFilterType("active")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Active Services</p>
              <h2 className="text-3xl font-bold mt-2">{activeCount}</h2>
            </CardContent>
          </Card>

          <Card className={cardStyle} onClick={() => setFilterType("inactive")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Unavailable</p>
              <h2 className="text-3xl font-bold mt-2">{unavailableCount}</h2>
            </CardContent>
          </Card>

          <Card className={cardStyle} onClick={() => setFilterType("all")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Total Services</p>
              <h2 className="text-3xl font-bold mt-2">{totalCount}</h2>
            </CardContent>
          </Card>

        </div>

        {/* ---------- TREATMENTS TABLE ---------- */}
        <Card className="shadow-sm border rounded-xl">
          <CardHeader>
            <CardTitle>
              {filterType === "active" && "Active Services"}
              {filterType === "inactive" && "Unavailable Services"}
              {filterType === "all" && "All Services"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Staff</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slots</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price ($)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {finalFilteredTreatments.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">{t.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{t.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{t.staff}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{t.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{t.slots}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${t.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[t.status]}`}
                        >
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {finalFilteredTreatments.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-gray-400">
                        No services found.
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

export default TreatmentPage;
