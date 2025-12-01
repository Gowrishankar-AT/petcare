// pages/customers.tsx
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ------------------ Types ------------------
type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  pets: number;
  location: string;
  status: "Active" | "Inactive";
};

// ------------------ Dummy Data ------------------
const sampleCustomers: Customer[] = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "555-1234", pets: 2, location: "New York", status: "Active" },
  { id: 2, name: "Emma Smith", email: "emma@example.com", phone: "555-9876", pets: 1, location: "Los Angeles", status: "Inactive" },
  { id: 3, name: "Liam Brown", email: "liam@example.com", phone: "555-6754", pets: 3, location: "Chicago", status: "Active" },
  { id: 4, name: "Olivia Johnson", email: "olivia@example.com", phone: "555-4422", pets: 2, location: "Houston", status: "Active" },
  { id: 5, name: "Sophia Wilson", email: "sophia@example.com", phone: "555-9988", pets: 1, location: "Miami", status: "Inactive" },
];

// Status badge colors
const statusColors = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-700",
};

const CustomersManagement = () => {
  const [customers] = useState(sampleCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"active" | "inactive" | "all">("all");

  // ---------- Filter Logic ----------
  const filteredByStatus = customers.filter((c) => {
    if (filterType === "active") return c.status === "Active";
    if (filterType === "inactive") return c.status === "Inactive";
    return true; // all
  });

  const finalFilteredCustomers = filteredByStatus.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats
  const activeCount = customers.filter((c) => c.status === "Active").length;
  const inactiveCount = customers.filter((c) => c.status === "Inactive").length;
  const totalCount = customers.length;

  const cardStyle = "shadow-md border rounded-xl cursor-pointer hover:shadow-lg transition";

  return (
    <Layout title="Customer Management">
      <div className="p-6 md:p-10 space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">Customer Management</h1>
          <input
            type="text"
            placeholder="Search by name, email or phone"
            className="border rounded-lg px-4 py-2 w-80 focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ---------- STAT CARDS ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <Card className={cardStyle} onClick={() => setFilterType("active")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Active Customers</p>
              <h2 className="text-3xl font-bold mt-2">{activeCount}</h2>
            </CardContent>
          </Card>

          <Card className={cardStyle} onClick={() => setFilterType("inactive")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Inactive Customers</p>
              <h2 className="text-3xl font-bold mt-2">{inactiveCount}</h2>
            </CardContent>
          </Card>

          <Card className={cardStyle} onClick={() => setFilterType("all")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Total Customers</p>
              <h2 className="text-3xl font-bold mt-2">{totalCount}</h2>
            </CardContent>
          </Card>

        </div>

        {/* ---------- CUSTOMERS TABLE ---------- */}
        <Card className="shadow-sm border rounded-xl">
          <CardHeader>
            <CardTitle>
              {filterType === "active" && "Active Customers"}
              {filterType === "inactive" && "Inactive Customers"}
              {filterType === "all" && "All Customers"}
            </CardTitle>
          </CardHeader>

          <CardContent>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pets</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {finalFilteredCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">{c.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{c.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{c.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{c.pets}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{c.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[c.status]}`}
                        >
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {finalFilteredCustomers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-gray-400">
                        No customers found.
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

export default CustomersManagement;
