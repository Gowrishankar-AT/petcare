// pages/profile.tsx
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Icons
import { User, Mail, Phone, NotebookPen } from "lucide-react";

interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferences?: string;
}

// ✅ Static array of user profiles (replace localStorage)
const userProfiles: CustomerProfile[] = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    phone: "9876543210",
    preferences: "Loves pets",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    phone: "9123456780",
    preferences: "Evening appointments preferred",
  },
];

const Profile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<CustomerProfile>({
    id: "",
    name: "",
    email: "",
    phone: "",
    preferences: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Load profile from static array
  useEffect(() => {
    if (!user) return;

    // Try matching from static array
    const existingProfile = userProfiles.find((p) => p.id === user.id);

    if (existingProfile) {
      setProfileData(existingProfile);
    } else {
      // If no profile found, create one dynamically
      const newProfile: CustomerProfile = {
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        phone: "",
        preferences: "",
      };

      // Add to static array
      userProfiles.push(newProfile);
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

    // Update profile in static array
    const index = userProfiles.findIndex((p) => p.id === profileData.id);
    if (index !== -1) {
      userProfiles[index] = profileData;
    }

    toast({
      title: "Profile Updated",
      description: "Your details have been saved.",
    });

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
        <div className="relative p-6 bg-white rounded-lg shadow space-y-6">

          {/* Edit / Save button inside top-right */}
          <div className="absolute top-4 right-4">
            {isEditing ? (
              <Button onClick={handleSave}>Save</Button>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label>Name</Label>

            {!isEditing ? (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border text-gray-800">
                <User className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{profileData.name || "Not provided"}</span>
              </div>
            ) : (
              <Input
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
              />
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>

            {!isEditing ? (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border text-gray-800">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{profileData.email || "Not provided"}</span>
              </div>
            ) : (
              <Input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>Phone</Label>

            {!isEditing ? (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border text-gray-800">
                <Phone className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{profileData.phone || "Not provided"}</span>
              </div>
            ) : (
              <Input
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
              />
            )}
          </div>

          {/* Preferences */}
          <div className="space-y-2">
            <Label>Preferences</Label>

            {!isEditing ? (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border text-gray-800">
                <NotebookPen className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{profileData.preferences || "No preferences added"}</span>
              </div>
            ) : (
              <Input
                value={profileData.preferences || ""}
                onChange={(e) =>
                  setProfileData({ ...profileData, preferences: e.target.value })
                }
              />
            )}
          </div>

        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-6">
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>

      </div>
    </Layout>
  );
};

export default Profile;
