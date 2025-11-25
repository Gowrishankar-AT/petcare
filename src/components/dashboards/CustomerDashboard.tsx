import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import PetForm, { Pet } from "@/components/petform"; // ✅ IMPORT YOUR PET FORM

// SAMPLE DATA
const petsData: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    image:"https://images.unsplash.com/photo-1653763902913-e87c886a4a0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGVucmV0cmlldmVyfGVufDB8fDB8fHww",
  },
  {
    id: "2",
    name: "Milo",
    type: "Dog",
    breed: "Beagle",
    age: "1 year",
    gender: "Male",
    image:"https://images.unsplash.com/photo-1707298737261-069e2d529eaa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhZ2xlfGVufDB8fDB8fHww",
  },
  {
    id: "3",
    name: "Luna",
    type: "Cat",
    breed: "Persian",
    age: "3 years",
    gender: "Female",
    image:"https://images.unsplash.com/photo-1660983947114-d893fcf89c7a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc2lhbiUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const upcomingAppointments = [
  {
    pet: "Buddy",
    date: "Dec 20, 2024",
    vet: "Dr. Karen",
    purpose: "General Checkup",
  },
  {
    pet: "Luna",
    date: "Dec 25, 2024",
    vet: "Dr. Steven",
    purpose: "Skin Allergy Review",
  },
];

const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [showAddPetModal, setShowAddPetModal] = useState(false);

  // ---- NAVIGATION ----
  const goToBook = (pet: Pet) => navigate("/appoint", { state: pet });
  const goToRecords = (pet: Pet) => navigate("/history", { state: pet });
  const goToEdit = (pet: Pet) => navigate("/editpet", { state: pet });

  // ---- SAVE NEW PET ----
  const handleSavePet = (pet: Pet) => {
    console.log("New pet saved:", pet);
    setShowAddPetModal(false);
  };

  return (
    <Layout title="Dashboard">

      {/* ----- PET FORM POPUP MODAL (USING YOUR COMPONENT) ----- */}
      {showAddPetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">

            <button
              onClick={() => setShowAddPetModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>

            {/* Your Imported Pet Form */}
            <PetForm
              onSave={handleSavePet}
              onCancel={() => setShowAddPetModal(false)}
            />
          </div>
        </div>
      )}

      {/* ----- DASHBOARD CONTENT (HIDDEN WHEN POPUP IS OPEN) ----- */}
      <div className={`${showAddPetModal ? "hidden" : "block"} p-6 max-w-6xl mx-auto space-y-10`}>

        {/* UPCOMING APPOINTMENTS */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {upcomingAppointments.map((appt, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-xl shadow flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-semibold">{appt.pet}</p>
                  <p className="text-sm text-gray-600">{appt.purpose}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{appt.date}</p>
                  <p className="text-sm text-gray-500">{appt.vet}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* UPCOMING VACCINATIONS */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Upcoming Vaccinations</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {petsData.map((pet) => (
              <div
                key={pet.id}
                className="p-4 bg-white rounded-xl shadow flex justify-between"
              >
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
            <h2 className="text-2xl font-bold">My Pets</h2>

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
                    onClick={() => goToBook(pet)}
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
