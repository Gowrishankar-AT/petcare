import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Pet } from "@/components/petform";

// --------------- Types ----------------
interface CompletedAppointment {
  id: string;
  service: string;
  veterinarian: string;
  date: string;
  prescriptionImage?: string; // optional image
}

interface MedicalRecord {
  id: string;
  condition: string;
  treatment: string;
  vetNotes: string;
  date: string;
  recordImage?: string; // optional image
}

interface HospitalVisit {
  id: string;
  visitReason: string;
  veterinarian: string;
  date: string;
  notes: string;
}

// ---------------- Component ----------------
const HistoryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get selected pet from dashboard
  const selectedPet = location.state as Pet | undefined;

  if (!selectedPet) {
    return (
      <Layout title="Medical History">
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <p className="text-lg text-gray-600">
            No pet selected. Please go back to your <span className="font-semibold cursor-pointer text-blue-600" onClick={() => navigate(-1)}>dashboard</span> and select a pet.
          </p>
        </div>
      </Layout>
    );
  }

  // ---------------- MOCK DATA ----------------
  const completedAppointments: CompletedAppointment[] = [
    {
      id: "1",
      service: "Annual Vaccination",
      veterinarian: "Dr. Wilson",
      date: "2025-01-12",
      prescriptionImage: "https://www.researchgate.net/publication/345830022/figure/fig17/AS:957640066748426@1605330592186/A-sample-prescription-image-in-grayscale-version.png",
    },
    {
      id: "2",
      service: "Grooming + Nail Trim",
      veterinarian: "Dr. Evans",
      date: "2025-02-03",
    },
  ];

  const medicalRecords: MedicalRecord[] = [
    {
      id: "1",
      condition: "Flea Allergy Dermatitis",
      treatment: "Topical medication + flea prevention",
      vetNotes: "Advised monthly flea preventive.",
      date: "2024-11-20",
      recordImage: "https://www.researchgate.net/publication/345830022/figure/fig17/AS:957640066748426@1605330592186/A-sample-prescription-image-in-grayscale-version.png",
    },
    {
      id: "2",
      condition: "Ear Mite Infection",
      treatment: "Cleaning + anti-parasitic drops",
      vetNotes: "Follow-up in 2 weeks.",
      date: "2024-10-05",
    },
  ];

  const hospitalVisits: HospitalVisit[] = [
    {
      id: "1",
      visitReason: "Vomiting + Dehydration",
      veterinarian: "Dr. Lee",
      date: "2024-08-10",
      notes: "IV fluids administered; observed for 6 hours.",
    },
  ];

  return (
    <Layout title={`${selectedPet.name} - Medical History`}>
      <div className="min-h-screen bg-gray-100 p-6 max-w-4xl mx-auto space-y-10">

        {/* Pet Info */}
        <section className="flex items-center gap-6 bg-white p-4 rounded shadow">
          <img src={selectedPet.image} alt={selectedPet.name} className="w-24 h-24 rounded-full object-cover" />
          <div>
            <h2 className="text-2xl font-bold">{selectedPet.name}</h2>
            <p className="text-gray-600">{selectedPet.type}, {selectedPet.age} yr(s), {selectedPet.gender}</p>
            <p className="text-gray-600">{selectedPet.breed}</p>
          </div>
        </section>

        {/* Completed Appointments */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">📅 Completed Appointments</h2>
          <div className="bg-white rounded shadow p-4 space-y-4">
            {completedAppointments.map((appt) => (
              <div key={appt.id} className="border-b pb-3 last:border-none">
                <p><strong>Service:</strong> {appt.service}</p>
                <p><strong>Veterinarian:</strong> {appt.veterinarian}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                {appt.prescriptionImage && (
                  <img src="https://www.researchgate.net/publication/345830022/figure/fig17/AS:957640066748426@1605330592186/A-sample-prescription-image-in-grayscale-version.png" alt="Prescription" className="mt-2 w-48 h-32 object-cover rounded" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Medical Records */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">📋 Medical Records</h2>
          <div className="bg-white rounded shadow p-4 space-y-4">
            {medicalRecords.map((record) => (
              <div key={record.id} className="border-b pb-3 last:border-none">
                <p><strong>Condition:</strong> {record.condition}</p>
                <p><strong>Treatment:</strong> {record.treatment}</p>
                <p><strong>Vet Notes:</strong> {record.vetNotes}</p>
                <p><strong>Date:</strong> {record.date}</p>
                {record.recordImage && (
                  <img src={record.recordImage} alt="Medical Record" className="mt-2 w-48 h-32 object-cover rounded" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Hospital Visits */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">🏥 Hospital / Emergency Visits</h2>
          <div className="bg-white rounded shadow p-4 space-y-4">
            {hospitalVisits.map((visit) => (
              <div key={visit.id} className="border-b pb-3 last:border-none">
                <p><strong>Reason:</strong> {visit.visitReason}</p>
                <p><strong>Veterinarian:</strong> {visit.veterinarian}</p>
                <p><strong>Notes:</strong> {visit.notes}</p>
                <p><strong>Date:</strong> {visit.date}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default HistoryPage;
