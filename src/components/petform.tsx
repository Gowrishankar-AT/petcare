import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export interface Pet {
  id?: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  image?: string;
}

interface PetFormProps {
  initialData?: Pet;
  onSave: (pet: Pet) => void;
  onCancel?: () => void;
}

const dogBreeds = ["Labrador", "German Shepherd", "Poodle", "Beagle", "Bulldog", "Other"];
const catBreeds = ["Persian", "Siamese", "Maine Coon", "Ragdoll", "Bengal", "Other"];

const PetForm: React.FC<PetFormProps> = ({ initialData, onSave, onCancel }) => {
  const { toast } = useToast();

  const [petData, setPetData] = useState<Pet>(
    initialData || { name: "", type: "", breed: "", age: "", gender: "" }
  );

  const breedOptions = petData.type === "Dog" ? dogBreeds : petData.type === "Cat" ? catBreeds : [];

  useEffect(() => {
    if (initialData) {
      setPetData(initialData);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!petData.name || !petData.type || !petData.age) {
      toast({
        title: "Validation Error",
        description: "Name, Type, and Age are required",
        variant: "destructive",
      });
      return;
    }
    onSave(petData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto space-y-4">
      <h2 className="text-lg font-semibold">{initialData ? "Edit Pet" : "Add Pet"}</h2>

      <div className="space-y-2">
        <Label>Pet Name</Label>
        <Input
          value={petData.name}
          onChange={(e) => setPetData({ ...petData, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Pet Type</Label>
        <select
          className="border rounded p-2 w-full"
          value={petData.type}
          onChange={(e) => setPetData({ ...petData, type: e.target.value, breed: "" })}
        >
          <option value="">Select</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {petData.type && (
        <div className="space-y-2">
          <Label>Breed</Label>
          {petData.type === "Dog" || petData.type === "Cat" ? (
            <>
              <select
                className="border rounded p-2 w-full"
                value={petData.breed}
                onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
              >
                <option value="">Select Breed</option>
                {breedOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              {petData.breed === "Other" && (
                <Input
                  placeholder="Enter breed manually"
                  onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
                  value={petData.breed === "Other" ? "" : petData.breed}
                />
              )}
            </>
          ) : (
            <Input
              placeholder="Enter breed"
              value={petData.breed}
              onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
            />
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label>Age</Label>
        <Input
          value={petData.age}
          onChange={(e) => setPetData({ ...petData, age: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Gender</Label>
        <Input
          placeholder="Male / Female"
          value={petData.gender}
          onChange={(e) => setPetData({ ...petData, gender: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button onClick={handleSubmit}>{initialData ? "Update" : "Add"}</Button>
      </div>
    </div>
  );
};

export default PetForm;
