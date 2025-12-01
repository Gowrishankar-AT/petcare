// pages/pets.tsx
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ------------------ Types ------------------
type Pet = {
  id: number;
  name: string;
  type: string;
  breed: string;
  owner: string;
  age: number;
  status: "Healthy" | "Under Treatment" | "Deceased";
};

// ------------------ Dummy Data ------------------
const samplePets: Pet[] = [
  { id: 1, name: "Buddy", type: "Dog", breed: "Golden Retriever", owner: "John Doe", age: 3, status: "Healthy" },
  { id: 2, name: "Mittens", type: "Cat", breed: "Persian", owner: "Emma Smith", age: 2, status: "Under Treatment" },
  { id: 3, name: "Charlie", type: "Dog", breed: "Bulldog", owner: "Liam Brown", age: 4, status: "Healthy" },
  { id: 4, name: "Coco", type: "Bird", breed: "Parrot", owner: "Olivia Johnson", age: 1, status: "Healthy" },
  { id: 5, name: "Luna", type: "Cat", breed: "Siamese", owner: "Sophia Wilson", age: 5, status: "Deceased" },
];

// Status colors
const statusColors = {
  Healthy: "bg-green-100 text-green-700",
  "Under Treatment": "bg-yellow-100 text-yellow-700",
  Deceased: "bg-red-100 text-red-700",
};

const PetsPage = () => {
  const [pets] = useState(samplePets);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] =
    useState<"healthy" | "treatment" | "deceased" | "all">("all");

  // ---------- Filter Logic ----------
  const filteredByStatus = pets.filter((p) => {
    if (filterType === "healthy") return p.status === "Healthy";
    if (filterType === "treatment") return p.status === "Under Treatment";
    if (filterType === "deceased") return p.status === "Deceased";
    return true; // all
  });

  const finalFilteredPets = filteredByStatus.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats
  const healthyCount = pets.filter((p) => p.status === "Healthy").length;
  const treatmentCount = pets.filter((p) => p.status === "Under Treatment").length;
  const deceasedCount = pets.filter((p) => p.status === "Deceased").length;
  const totalCount = pets.length;

  const cardStyle =
    "shadow-md border rounded-xl cursor-pointer hover:shadow-lg transition";

  return (
    <Layout title="Pet Management">
      <div className="p-6 md:p-10 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">Pet Management</h1>
          <input
            type="text"
            placeholder="Search by name, type, breed or owner"
            className="border rounded-lg px-4 py-2 w-80 focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ---------- STAT CARDS ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <Card className={cardStyle} onClick={() => setFilterType("healthy")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Healthy Pets</p>
              <h2 className="text-3xl font-bold mt-2">{healthyCount}</h2>
            </CardContent>
          </Card>

          <Card className={cardStyle} onClick={() => setFilterType("treatment")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Under Treatment</p>
              <h2 className="text-3xl font-bold mt-2">{treatmentCount}</h2>
            </CardContent>
          </Card>

          <Card className={cardStyle} onClick={() => setFilterType("deceased")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Deceased</p>
              <h2 className="text-3xl font-bold mt-2">{deceasedCount}</h2>
            </CardContent>
          </Card>

          <Card className={cardStyle} onClick={() => setFilterType("all")}>
            <CardContent className="p-5">
              <p className="text-gray-500 text-sm">Total Pets</p>
              <h2 className="text-3xl font-bold mt-2">{totalCount}</h2>
            </CardContent>
          </Card>
        </div>

        {/* ---------- PETS TABLE ---------- */}
        <Card className="shadow-sm border rounded-xl">
          <CardHeader>
            <CardTitle>
              {filterType === "healthy" && "Healthy Pets"}
              {filterType === "treatment" && "Pets Under Treatment"}
              {filterType === "deceased" && "Deceased Pets"}
              {filterType === "all" && "All Pets"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Breed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {finalFilteredPets.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">{p.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{p.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{p.breed}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{p.owner}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{p.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[p.status]}`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {finalFilteredPets.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-gray-400">
                        No pets found.
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

export default PetsPage;
