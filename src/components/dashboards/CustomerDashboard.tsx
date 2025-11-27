import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import PetForm, { Pet } from "@/components/petform";
import AppointmentForm from "@/components/AppointmentForm";
import type { Appointment } from "@/components/AppointmentForm";

import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "../ui/dialog";

// SAMPLE DATA
const initialPetsData: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    image:
      "https://images.unsplash.com/photo-1653763902913-e87c886a4a0c?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Milo",
    type: "Dog",
    breed: "Beagle",
    age: "1 year",
    gender: "Male",
    image:
      "https://images.unsplash.com/photo-1707298737261-069e2d529eaa?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "Luna",
    type: "Cat",
    breed: "Persian",
    age: "3 years",
    gender: "Female",
    image:
      "https://images.unsplash.com/photo-1660983947114-d893fcf89c7a?w=600&auto=format&fit=crop&q=60",
  },
];

const upcomingAppointments = [
  {
    pet: "Luna",
    date: "2025-11-28",
    time: "10:00 AM",
    vet: "Dr. Karen",
    purpose: "Routine Checkup",
  },
  {
    pet: "Buddy",
    date: "2025-12-31",
    time: "02:30 PM",
    vet: "Dr. Steven",
    purpose: "Vaccination",
  },
];

const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [petsData, setPetsData] = useState<Pet[]>(initialPetsData);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [showEditPetModal, setShowEditPetModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<typeof upcomingAppointments[0] | null>(null);

  // NAVIGATION
  const goToRecords = (pet: Pet) => navigate("/history", { state: pet });
  const goTopets = () => navigate("/petlist");
  const goToappoint = () => navigate("/appoint");

  const openAppointmentForm = (pet: Pet, appointment?: typeof upcomingAppointments[0]) => {
    setSelectedPet(pet);
    setSelectedAppointment(appointment ?? null);
    setShowAppointmentForm(true);
  };

  const goToEdit = (pet: Pet) => {
    setSelectedPet(pet);
    setShowEditPetModal(true);
  };

  const handleSavePet = (pet: Pet) => {
    if (pet.id) {
      setPetsData((prev) => prev.map((p) => (p.id === pet.id ? pet : p)));
    } else {
      const newPet = { ...pet, id: crypto.randomUUID() };
      setPetsData((prev) => [...prev, newPet]);
    }

    setShowAddPetModal(false);
    setShowEditPetModal(false);
  };

  const upcomingAppointments: Appointment[] = [
    {
      id: "a1",
      patientId: "u1",
      petId: "3",
      petName: "Luna",
      doctorName: "Dr. Karen",
      date: "2025-11-28",
      time: "10:00 AM",
      reason: "Routine Checkup",
      status: "scheduled",
    },
    {
      id: "a2",
      patientId: "u1",
      petId: "1",
      petName: "Buddy",
      doctorName: "Dr. Steven",
      date: "2025-12-31",
      time: "02:30 PM",
      reason: "Vaccination",
      status: "scheduled",
    }
  ];

  const handleCancelAppointment = (appt: typeof upcomingAppointments[0]) => {
    alert(`Appointment for ${appt.petName} on ${appt.date} cancelled!`);
  };

  return (
    <Layout title="Dashboard">

      {/* ----------------- ADD PET MODAL ----------------- */}
      {showAddPetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowAddPetModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>
            <PetForm onSave={handleSavePet} onCancel={() => setShowAddPetModal(false)} />
          </div>
        </div>
      )}

      {/* ----------------- EDIT PET MODAL ----------------- */}
      {showEditPetModal && selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowEditPetModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>
            <PetForm
              initialData={selectedPet}
              onSave={handleSavePet}
              onCancel={() => setShowEditPetModal(false)}
            />
          </div>
        </div>
      )}

      {/* ----------------- APPOINTMENT FORM MODAL ----------------- */}
      {showAppointmentForm && selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => {
                setShowAppointmentForm(false);
                setSelectedAppointment(null);
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>
            <AppointmentForm
              appointment={selectedAppointment ?? undefined}
              pet={selectedPet}
              onSuccess={() => {
                setShowAppointmentForm(false);
                setSelectedAppointment(null);
              }}
            />
          </div>
        </div>
      )}

      {/* ----------------- MAIN DASHBOARD CONTENT ----------------- */}
      <div
        className={`${
          showAddPetModal || showEditPetModal || showAppointmentForm ? "hidden" : "block"
        } p-6 max-w-6xl mx-auto space-y-10`}
      >
        {/* UPCOMING APPOINTMENTS */}
        <section>
          <div onClick={goToappoint} style={{ cursor: "pointer" }}>
            <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {upcomingAppointments.map((appt, i) => {
              const pet = petsData.find((p) => p.name === appt.petName);
              if (!pet) return null;

              return (
                <div key={i} className="p-4 bg-white rounded-xl shadow flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">{appt.petName}</p>
                    <p className="text-sm text-gray-600">{appt.reason}</p>
                    <Badge className="bg-primary text-white">Scheduled</Badge>
                  </div>

                  <div className="text-right flex flex-col gap-1">
                    <Badge variant="secondary" className="flex justify-center">
                      in 2 days
                    </Badge>
                    <p className="text-sm text-gray-500">{appt.date} {appt.time}</p>

                    <div className="flex gap-2 mt-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openAppointmentForm(pet, appt)}
                      >
                        Edit
                      </Button>

                      {/* Cancel Confirmation Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            Cancel
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-sm">
                          <DialogHeader>
                            <DialogTitle>Confirm Cancellation</DialogTitle>
                          </DialogHeader>

                          <p>Are you sure you want to cancel this appointment?</p>

                          <DialogFooter className="flex justify-end gap-2 mt-4">

                            {/* UPDATED: "No" closes dialog */}
                            <DialogTrigger asChild>
                              <Button variant="outline">No</Button>
                            </DialogTrigger>

                            <Button
                              variant="destructive"
                              onClick={() => handleCancelAppointment(appt)}
                            >
                              Yes, Cancel
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* UPCOMING VACCINATIONS */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Upcoming Vaccinations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {petsData.map((pet) => (
              <div key={pet.id} className="p-4 bg-white rounded-xl shadow flex justify-between">
                <div>
                  <p className="text-lg font-semibold">{pet.name}</p>
                  <p className="text-sm text-gray-600">{pet.breed}</p>
                </div>
                <p className="font-medium">Next Schedule: TBD</p>
              </div>
            ))}
          </div>
        </section>

        {/* MY PETS */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div onClick={goTopets} style={{ cursor: "pointer" }}>
              <h2 className="text-2xl font-bold">My Pets</h2>
            </div>

            <button
              onClick={() => setShowAddPetModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add Pet +
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {petsData.map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-4"
              >
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-40 object-cover rounded-md"
                />

                <h3 className="text-xl font-semibold mt-3">{pet.name}</h3>
                <p className="text-gray-600">{pet.breed}</p>
                <p className="text-gray-600 text-sm">{pet.age}</p>

                <div className="mt-4 space-y-2">
                  <button
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                    onClick={() => openAppointmentForm(pet)}
                  >
                    Book Appointment
                  </button>

                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    onClick={() => goToRecords(pet)}
                  >
                    Medical Record
                  </button>

                  <button
                    className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800"
                    onClick={() => goToEdit(pet)}
                  >
                    Edit Pet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
