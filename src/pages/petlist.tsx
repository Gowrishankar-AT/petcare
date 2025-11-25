import React, { useState } from "react";
import PetForm, { Pet } from "@/components/petform";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const PetListPage: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([
    {
      id: "1",
      name: "Buddy",
      type: "Dog",
      breed: "Labrador",
      age: "3",
      gender: "Male",
      image: "https://placedog.net/400/300?id=1",
    },
    {
      id: "2",
      name: "Luna",
      type: "Cat",
      breed: "Siamese",
      age: "2",
      gender: "Female",
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: "3",
      name: "Rocky",
      type: "Dog",
      breed: "Beagle",
      age: "4",
      gender: "Male",
      image: "https://placedog.net/400/300?id=2",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  // ---- Save Pet (Add or Update) ----
  const handleSavePet = (pet: Pet) => {
    if (editingPet) {
      setPets(pets.map((p) => (p.id === editingPet.id ? { ...pet, id: p.id } : p)));
      setEditingPet(null);
    } else {
      setPets([...pets, { ...pet, id: Date.now().toString() }]);
    }
    setShowForm(false);
  };

  // ---- Edit Pet ----
  const handleEdit = (pet: Pet) => {
    setEditingPet(pet);
    setShowForm(true);
  };

  // ---- Delete Pet ----
  const handleDelete = (id?: string) => {
    if (!id) return;
    setPets(pets.filter((p) => p.id !== id));
  };

  return (
    <Layout title="My Pets">
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100 w-full relative">

        {/* Header: Welcome text and Add Pet button */}
        <div className="w-full max-w-2xl flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Welcome, John!</h2>
            <p className="text-muted-foreground">Manage your pets</p>
          </div>

          <Button
            onClick={() => {
              setEditingPet(null);
              setShowForm(true);
            }}
            disabled={showForm} // disable when form is open
          >
            Add Pet
          </Button>
        </div>

        {/* Pet Form */}
        {showForm && (
          <div className="w-full max-w-md mb-6">
            <PetForm
              initialData={editingPet || undefined}
              onSave={handleSavePet}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Pet List */}
        {!showForm && (
          <div className="w-full max-w-md flex flex-col gap-6">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center"
              >
                {/* Pet Image */}
                {pet.image && (
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <div className="text-center mb-4">
                  <p className="font-semibold text-xl">{pet.name}</p>
                  <p className="text-gray-600">
                    {pet.type}, {pet.age} yr(s), {pet.gender}
                  </p>
                  <p className="text-gray-600">{pet.breed}</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => handleEdit(pet)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(pet.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PetListPage;
