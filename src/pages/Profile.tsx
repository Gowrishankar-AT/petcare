// pages/profile.tsx
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferences?: string;
}

const Profile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState<CustomerProfile>({
    id: "",
    name: "",
    email: "",
    phone: "",
    preferences: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load profile from localStorage
  useEffect(() => {
    if (!user) return;
    const storedProfiles = localStorage.getItem("customerProfiles");
    const profiles: CustomerProfile[] = storedProfiles ? JSON.parse(storedProfiles) : [];

    const existingProfile = profiles.find((p) => p.id === user.id);

    if (existingProfile) {
      setProfileData(existingProfile);
    } else {
      // If not found, create a new profile entry
      const newProfile: CustomerProfile = {
        id: user.id,
        name: user.name || "",
        email: "",
        phone: "",
        preferences: "",
      };
      profiles.push(newProfile);
      localStorage.setItem("customerProfiles", JSON.stringify(profiles));
      setProfileData(newProfile);
    }
  }, [user]);

  const handleSave = () => {
    if (!profileData.name || !profileData.email) {
      toast({
        title: "Validation Error",
        description: "Name and Email are required",
        variant: "destructive",
      });
      return;
    }

    const storedProfiles = localStorage.getItem("customerProfiles");
    const profiles: CustomerProfile[] = storedProfiles ? JSON.parse(storedProfiles) : [];

    const index = profiles.findIndex((p) => p.id === profileData.id);
    if (index !== -1) {
      profiles[index] = profileData;
    } else {
      profiles.push(profileData);
    }

    localStorage.setItem("customerProfiles", JSON.stringify(profiles));
    toast({ title: "Profile Updated", description: "Your details have been saved." });
    setIsEditing(false);
  };

  return (
    <Layout title="My Profile">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Owner Information</h2>
          <p className="text-gray-500">View and manage your account details</p>
        </div>

        {/* Profile Form */}
        <div className="p-6 bg-white rounded-lg shadow space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              readOnly={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              readOnly={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              readOnly={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>Preferences</Label>
            <Input
              placeholder="E.g., preferred vet, pet care notes"
              value={profileData.preferences || ""}
              onChange={(e) => setProfileData({ ...profileData, preferences: e.target.value })}
              readOnly={!isEditing}
            />
          </div>

          {/* Edit / Save Button */}
          <div className="flex justify-end">
            {isEditing ? (
              <Button onClick={handleSave}>Save</Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-6">
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
